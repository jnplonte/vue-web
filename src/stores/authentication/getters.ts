import { GetterTree } from 'vuex';
import { AuthenticationState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<AuthenticationState, RootState> = {
  isAdmin(state: AuthenticationState): boolean {
    return state.isAdmin;
  },
  isLogIn(state: AuthenticationState): boolean {
    return state.isLogIn;
  },
  userKey(state: AuthenticationState): string {
    return (state.isLogIn) ? state.userKey : '';
  },
  lfToken(state: AuthenticationState): string {
    return (state.isLogIn) ? state.lfToken : '';
  },
  lfCustKey(state: AuthenticationState): string {
    return (state.isLogIn) ? state.lfCustKey : '';
  },
  lfAPIToken(state: AuthenticationState): string {
    return (state.isLogIn) ? state.lfAPIToken : '';
  },
  adminLegacyKey(state: AuthenticationState): string {
    return (state.isLogIn) ? state.adminLegacyKey : '';
  },
  userInformation(state: AuthenticationState): object {
    return (state.isLogIn) ? state.userInformation : {};
  },
  userData(state: AuthenticationState): object {
    return (state.isLogIn) ? state.userData : {};
  }
};
