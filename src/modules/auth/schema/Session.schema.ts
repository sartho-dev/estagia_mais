import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { AccountRole } from "../types/AccountRole";

// Server-side session. Keeping sessions in the database (instead of stateless
// JWTs) is what makes two requirements simple:
//   - logout really ends the session (RF01)
//   - deactivating an account stops its access immediately (RF20)
@Entity("sessions")
@Index(["accountType", "accountId"])
export class Session {
  // RNF09: UUID primary key
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "account_type", type: "enum", enum: AccountRole })
  accountType: AccountRole;

  // Points to students / responsibles / admins depending on account_type, so
  // it cannot be a database foreign key (RNF08's exception: polymorphic).
  @Column({ name: "account_id", type: "uuid" })
  accountId: string;

  // SHA-256 (hex) of the token. The token itself is never stored, so a leaked
  // database does not leak usable sessions.
  @Column({ name: "token_hash", type: "char", length: 64, unique: true })
  tokenHash: string;

  @Column({ name: "created_at", type: "timestamptz" })
  createdAt: Date;

  // RNF02: sliding idle timeout is measured from here
  @Column({ name: "last_used_at", type: "timestamptz" })
  lastUsedAt: Date;

  @Column({ name: "revoked_at", type: "timestamptz", nullable: true })
  revokedAt: Date | null;
}
