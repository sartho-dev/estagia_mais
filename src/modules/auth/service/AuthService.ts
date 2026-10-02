import bcrypt from "bcrypt";
import { createHash, randomBytes } from "node:crypto";
import { AppError } from "../../../shared/errors/AppError";
import { IAuthAccountProvider } from "../interfaces/IAuthAccountProvider";
import { ISessionRepository } from "../interfaces/ISessionRepository";
import { AccountRole, AuthContext } from "../types/AccountRole";
import { LoginInput } from "../validators/LoginValidator";

// RNF01: bcrypt with cost 12 minimum (used for the timing-equalising hash)
const BCRYPT_COST = 12;

// RNF02: sessions expire after 60 minutes without use
export const SESSION_IDLE_MS = 60 * 60 * 1000;

// Hard ceiling, so a session that is used constantly still ends eventually.
export const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

// last_used_at is only rewritten when it is older than this, so a busy client
// does not cause one database write per request.
const TOUCH_THROTTLE_MS = 60 * 1000;

export type LoginResult = {
  token: string;
  accountId: string;
  role: AccountRole;
  idleTimeoutMinutes: number;
};

const INVALID_CREDENTIALS = "Invalid email or password";
const INVALID_SESSION = "Invalid or expired session";

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export class AuthService {
  private providersByRole: Map<AccountRole, IAuthAccountProvider>;

  // A real bcrypt hash that no password matches. Compared against when the
  // email does not exist, so "unknown email" takes as long as "wrong password"
  // and the response time does not reveal which emails are registered.
  private dummyHash: Promise<string>;

  constructor(
    private providers: IAuthAccountProvider[],
    private sessions: ISessionRepository,
    private now: () => Date = () => new Date(),
  ) {
    this.providersByRole = new Map(providers.map((p) => [p.role, p]));
    this.dummyHash = bcrypt.hash(
      randomBytes(16).toString("hex"),
      BCRYPT_COST,
    );
  }

  // RF01
  async login(input: LoginInput): Promise<LoginResult> {
    // RN06: an email is unique across ALL kinds of account, so the first
    // provider that knows it is the right one.
    let found: {
      provider: IAuthAccountProvider;
      id: string;
      passwordHash: string;
    } | null = null;

    for (const provider of this.providers) {
      const account = await provider.findForLogin(input.email);
      if (account) {
        found = { provider, ...account };
        break;
      }
    }

    const hashToCompare = found ? found.passwordHash : await this.dummyHash;
    const passwordMatches = await bcrypt.compare(input.password, hashToCompare);

    // Same message for unknown email, wrong password and inactive account.
    if (!found || !passwordMatches) {
      throw new AppError(INVALID_CREDENTIALS, 401);
    }

    // 256 random bits; only the hash is stored.
    const token = randomBytes(32).toString("base64url");

    await this.sessions.create({
      accountType: found.provider.role,
      accountId: found.id,
      tokenHash: hashToken(token),
      now: this.now(),
    });

    return {
      token,
      accountId: found.id,
      role: found.provider.role,
      idleTimeoutMinutes: SESSION_IDLE_MS / 60_000,
    };
  }

  // RF01 / RF02 / RNF02: called by the authenticate middleware on every
  // protected request.
  async authenticate(token: string): Promise<AuthContext> {
    const now = this.now();
    const session = await this.sessions.findByTokenHash(hashToken(token));

    if (!session || session.revokedAt) {
      throw new AppError(INVALID_SESSION, 401);
    }

    const idleFor = now.getTime() - session.lastUsedAt.getTime();
    const age = now.getTime() - session.createdAt.getTime();

    if (idleFor > SESSION_IDLE_MS || age > SESSION_MAX_AGE_MS) {
      await this.sessions.revoke(session.id, now);
      throw new AppError(INVALID_SESSION, 401);
    }

    // RF10 / RF20: a deactivated account loses access immediately.
    const provider = this.providersByRole.get(session.accountType);
    const stillActive = provider
      ? await provider.isActive(session.accountId)
      : false;

    if (!stillActive) {
      await this.sessions.revoke(session.id, now);
      throw new AppError(INVALID_SESSION, 401);
    }

    if (idleFor > TOUCH_THROTTLE_MS) {
      await this.sessions.touch(session.id, now);
    }

    return {
      sessionId: session.id,
      accountId: session.accountId,
      role: session.accountType,
    };
  }

  // RF01
  async logout(sessionId: string): Promise<void> {
    await this.sessions.revoke(sessionId, this.now());
  }

  // To be called when an account is deactivated or its password changes.
  async revokeAllSessions(
    role: AccountRole,
    accountId: string,
  ): Promise<void> {
    await this.sessions.revokeAllForAccount(role, accountId, this.now());
  }
}
