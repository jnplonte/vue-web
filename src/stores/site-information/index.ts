import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ISiteInformationState } from './types';
import { IRootState } from '../types';

const SiteInformationModule: Module<ISiteInformationState, IRootState> = {
  namespaced: true,
  state: () => {
      return {
        notificationData: {},
      };
  },
  getters,
  actions,
  mutations,
};

export function createSiteInformationModule() {
  return SiteInformationModule;
}
