import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { CommonState } from './types';
import { RootState } from '../types';
import { Helper } from '@/services/helper/helper.service';

const helper: Helper = new Helper();

export const state: CommonState = {
  language: helper.getCookie(process.env.VUE_APP_LOCALE_COOKIE) || process.env.VUE_APP_LOCALE,
  breadcrumbList: [],
  loading: true,
  isDarkTheme: null,
  isFullscreen: false,
  mainContainerHeight: 0,
  visitedRoutes: [],
  snackbars: [],
};

const namespaced: boolean = true;

const CommonModule: Module<CommonState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};

export function createCommonModule() {
  return CommonModule;
}
