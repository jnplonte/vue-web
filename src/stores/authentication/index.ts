import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { IAuthenticationState } from './types';
import { IRootState } from '../types';

const AuthenticationModule: Module<IAuthenticationState, IRootState> = {
  namespaced: true,
  state: () => {
      return {
        token: '',
        isLogIn: false,
        authData: {},
      };
  },
  getters,
  actions,
  mutations,
};

export function createAuthenticationModule() {
  return AuthenticationModule;
}
