import { ActionTree } from 'vuex';
import { IAuthenticationState } from './types';
import { IRootState } from '../types';

import { Helper } from '@/services/helper/helper.service';
// import { Request } from '@/services/request/request.service';

const helper: Helper = new Helper();

export const actions: ActionTree<IAuthenticationState, IRootState> = {
  logInUser: ({ commit }, { loginData }): Promise<any> => {
    console.log(loginData);

    commit('SET_TOKEN', 'xxxxxxxxxx');
    commit('SET_IS_LOGIN', true);
    commit('SET_AUTH_DATA', {test: 'data'});

    return Promise.resolve(true);
  },
  logOutUser: ({ commit }): void => {
    helper.deleteCookie(process.env.VUE_APP_AUTH_COOKIE);

    commit('SET_TOKEN', '');
    commit('SET_IS_LOGIN', false);
    commit('SET_AUTH_DATA', {});
  },
  saveToken: ({ commit }, token: string): void => {
    commit('SET_TOKEN', token);
  },
  saveAuthData: ({ commit }, userInformation: object): void => {
    commit('SET_IS_LOGIN', true);
    commit('SET_AUTH_DATA', {test: 'data'});
  },
};
