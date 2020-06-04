import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { AuthenticationState } from './types';
import { RootState } from '../types';
import { Helper } from '@/services/helper/helper.service';

const helper: Helper = new Helper();

export const state: AuthenticationState = {
  isAdmin: false,
  isLogIn: helper.isValidToken(process.env.VUE_APP_AUTH_COOKIE),
  userKey: helper.isValidToken(process.env.VUE_APP_AUTH_COOKIE) ? helper.getCookie(process.env.VUE_APP_AUTH_COOKIE) : '',
  lfToken: helper.isValidToken(process.env.VUE_APP_AUTH_COOKIE) ? helper.getCookie(process.env.VUE_APP_AUTH_COOKIE).split('|')[0] : null,
  lfCustKey: helper.isValidToken(process.env.VUE_APP_AUTH_COOKIE) ? helper.getCookie(process.env.VUE_APP_AUTH_COOKIE).split('|')[1] : null,
  lfAPIToken: helper.isValidToken(process.env.VUE_APP_AUTH_COOKIE) ? helper.getCookie(process.env.VUE_APP_AUTH_COOKIE).split('|')[2] : null,
  adminLegacyKey: helper.getCookie(process.env.VUE_APP_LOGFLOWS_ADMIN_COOKIE) || null,
  userInformation: {},
  userData: {},
};

const namespaced: boolean = true;

const AuthenticationModule: Module<AuthenticationState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};

export function createAuthenticationModule() {
  return AuthenticationModule;
}
