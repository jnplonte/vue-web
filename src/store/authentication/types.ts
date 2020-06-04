export interface AuthenticationState {
  isAdmin: boolean;
  isLogIn: boolean;
  userKey: string;
  lfToken: string;
  lfCustKey: string;
  lfAPIToken: string;
  adminLegacyKey: string;
  userInformation: object;
  userData: object;
}
