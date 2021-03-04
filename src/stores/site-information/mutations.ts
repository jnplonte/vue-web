import { MutationTree } from 'vuex';
import { ISiteInformationState } from './types';

export const mutations: MutationTree<ISiteInformationState> = {
	SET_NOTIFICATION_DATA: (state: ISiteInformationState, notifyData: object) => {
		state.notificationData = notifyData;
	},
	SET_LOADING: (state: ISiteInformationState, loading: boolean) => {
		state.loading = loading;
	},
};
