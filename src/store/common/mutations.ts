import { MutationTree } from 'vuex';
import { CommonState } from './types';

export const mutations: MutationTree<CommonState> = {
  SET_LANGUAGE: (state: CommonState, langCode: string): void => {
    state.language = langCode;
  },
  SET_BREADCRUMB_LIST: (state: CommonState, data: Array<Object>): void => {
    state.breadcrumbList = data || [];
  },
  SET_LOADING: (state: CommonState, loading: boolean): void => {
    state.loading = loading;
  },
  SET_DARK_THEME: (state: CommonState, theme: boolean): void => {
    state.isDarkTheme = theme;
  },
  SET_IS_FULLSCREEN: (state: CommonState, data: boolean): void => {
    state.isFullscreen = data;
  },
  SET_MAIN_CONTAINER_HEIGHT: (state: CommonState, data: number): void => {
    state.mainContainerHeight = data;
  },
  SET_VISITED_ROUTES: (state: CommonState, data: Array<object>): void => {
    state.visitedRoutes = data;
  },
  ADD_SNACKBAR: (state: CommonState, data: Array<object>): void => {
    state.snackbars = [
      ...state.snackbars,
      data
    ];
  },
  REMOVE_SNACKBAR: (state: CommonState, index: number): void => {
    state.snackbars[index]['isShow'] = false;
  },
};
