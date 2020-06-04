import { ActionTree } from 'vuex';
import { CommonState } from './types';
import { RootState } from '../types';

export const actions: ActionTree<CommonState, RootState> = {
  changeLanguage: ({ commit }, langCode: string): void => {
    const lngKey: string = process.env.VUE_APP_LOCALE || '';
    window.localStorage.setItem(lngKey, langCode);

    commit('SET_LANGUAGE', langCode);
  },
};
