import { ActionTree } from 'vuex';
import { CommonState } from './types';
import { RootState } from '../types';
import { Helper } from '@/services/helper/helper.service';

const helper: Helper = new Helper();

export const actions: ActionTree<CommonState, RootState> = {
  changeLanguage: ({ commit }, langCode: string): void => {
    helper.setCookie(process.env.VUE_APP_LOCALE_COOKIE, langCode, helper.getDomain(), 90);
    commit('SET_LANGUAGE', langCode);
  },
};
