import { GetterTree } from 'vuex';
import { CommonState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<CommonState, RootState> = {
  language(state: CommonState): string {
    return state.language;
  },
  breadcrumbList(state: CommonState): Array<object> {
    return state.breadcrumbList;
  },
  loading(state: CommonState): boolean {
    return state.loading;
  },
  isDarkTheme(state: CommonState): boolean {
    return state.isDarkTheme;
  },
  isFullscreen(state: CommonState): boolean {
    return state.isFullscreen;
  },
  mainContainerHeight(state: CommonState): number {
    return state.mainContainerHeight;
  },
  visitedRoutes(state: CommonState): Array<object> {
    return state.visitedRoutes;
  },
  snackbars(state: CommonState): Array<object> {
    return state.snackbars;
  },
};
