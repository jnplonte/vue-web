import { GetterTree } from 'vuex';
import { IAuthenticationState } from './types';
import { IRootState } from '../types';

export const getters: GetterTree<IAuthenticationState, IRootState> = {
  token(state: IAuthenticationState): string {
    return (state.token) ? state.token : '';
  },
  isLogIn(state: IAuthenticationState): boolean {
    return state.isLogIn;
  },
  authData(state: IAuthenticationState): object {
    return (state.authData) ? state.authData : {};
  },
};
