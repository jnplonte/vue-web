import { MutationTree } from 'vuex';
import { AuthenticationState } from './types';

export const mutations: MutationTree<AuthenticationState> = {
  SET_IS_ADMIN: (state: AuthenticationState, isAdmin: boolean) => {
    state.isAdmin = isAdmin;
  },
  SET_IS_LOGIN: (state: AuthenticationState, islogin: boolean) => {
    state.isLogIn = islogin;
  },
  SET_USER_KEY: (state: AuthenticationState, userkey: string) => {
    state.userKey = userkey;
  },
  SET_LF_TOKEN: (state: AuthenticationState, data: string) => {
    state.lfToken = data;
  },
  SET_LF_CUST_KEY: (state: AuthenticationState, data: string) => {
    state.lfCustKey = data;
  },
  SET_LF_API_TOKEN: (state: AuthenticationState, data: string) => {
    state.lfAPIToken = data;
  },
  SET_ADMIN_LEGACY_KEY: (state: AuthenticationState, data: string) => {
    state.adminLegacyKey = data;
  },
  SET_USER_INFORMATION: (state: AuthenticationState, userinformation: object) => {
    state.userInformation = userinformation;
  },
  SET_USER_DATA: (state: AuthenticationState, userdata: object) => {
    state.userData = userdata;
  }
};
