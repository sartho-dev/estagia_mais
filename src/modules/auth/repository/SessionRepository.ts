import { IsNull, Repository } from "typeorm";
import { Session } from "../schema/Session.schema";
import { ISessionRepository } from "../interfaces/ISessionRepository";
import { AccountRole } from "../types/AccountRole";

export class SessionRepository implements ISessionRepository {
  constructor(private repository: Repository<Session>) {}

  async create(data: {
    accountType: AccountRole;
    accountId: string;
    tokenHash: string;
    now: Date;
  }): Promise<Session> {
    const session = this.repository.create({
      accountType: data.accountType,
      accountId: data.accountId,
      tokenHash: data.tokenHash,
      createdAt: data.now,
      lastUsedAt: data.now,
      revokedAt: null,
    });

    return await this.repository.save(session);
  }

  async findByTokenHash(tokenHash: string): Promise<Session | null> {
    return await this.repository.findOne({ where: { tokenHash } });
  }

  async touch(sessionId: string, at: Date): Promise<void> {
    await this.repository.update({ id: sessionId }, { lastUsedAt: at });
  }

  async revoke(sessionId: string, at: Date): Promise<void> {
    await this.repository.update(
      { id: sessionId, revokedAt: IsNull() },
      { revokedAt: at },
    );
  }

  async revokeAllForAccount(
    accountType: AccountRole,
    accountId: string,
    at: Date,
  ): Promise<void> {
    await this.repository.update(
      { accountType, accountId, revokedAt: IsNull() },
      { revokedAt: at },
    );
  }
}
