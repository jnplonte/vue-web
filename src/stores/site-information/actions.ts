import { ActionTree } from 'vuex';
import { ISiteInformationState } from './types';
import { IRootState } from '../types';

import { Helper } from '@/services/helper/helper.service';

const helper: Helper = new Helper();

export const actions: ActionTree<ISiteInformationState, IRootState> = {
  setNotificationData: ({ commit }, notifyData: object): void => {
    commit('SET_NOTIFICATION_DATA', notifyData);
  },
  hasNotificationData: ({ state }): boolean => {
    return (!helper.isEmptyObject(state.notificationData));
  },
  setLoading: ({ commit }, loading: boolean): void => {
    commit('SET_LOADING', loading);
  },
};
