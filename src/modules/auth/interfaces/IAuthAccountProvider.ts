import { AccountRole } from "../types/AccountRole";

export type LoginAccount = {
  id: string;
  passwordHash: string;
};

// One provider per kind of account. The auth module does not know about the
// student/responsible/admin tables; each of those modules plugs in here.
export interface IAuthAccountProvider {
  readonly role: AccountRole;

  // ACTIVE accounts only, including the password hash. null if none.
  findForLogin(email: string): Promise<LoginAccount | null>;

  // Checked on every request, so deactivation (RF10 / RF20) takes effect
  // immediately.
  isActive(accountId: string): Promise<boolean>;
}
