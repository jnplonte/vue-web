import { MutationTree } from 'vuex';
import { IAuthenticationState } from './types';

export const mutations: MutationTree<IAuthenticationState> = {
  SET_TOKEN: (state: IAuthenticationState, token: string) => {
    state.token = token;
  },
  SET_IS_LOGIN: (state: IAuthenticationState, islogin: boolean) => {
    state.isLogIn = islogin;
  },
  SET_AUTH_DATA: (state: IAuthenticationState, authData: object) => {
    state.authData = authData;
  },
};
