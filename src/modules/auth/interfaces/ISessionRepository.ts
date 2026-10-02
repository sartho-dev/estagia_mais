import { Session } from "../schema/Session.schema";
import { AccountRole } from "../types/AccountRole";

export interface ISessionRepository {
  create(data: {
    accountType: AccountRole;
    accountId: string;
    tokenHash: string;
    now: Date;
  }): Promise<Session>;

  findByTokenHash(tokenHash: string): Promise<Session | null>;

  // Sliding idle timeout (RNF02)
  touch(sessionId: string, at: Date): Promise<void>;

  // Logout (RF01)
  revoke(sessionId: string, at: Date): Promise<void>;

  // For account deactivation / password change: ends every session at once
  revokeAllForAccount(
    accountType: AccountRole,
    accountId: string,
    at: Date,
  ): Promise<void>;
}
