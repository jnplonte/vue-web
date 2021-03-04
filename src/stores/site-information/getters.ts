import { GetterTree } from 'vuex';
import { ISiteInformationState } from './types';
import { IRootState } from '../types';

export const getters: GetterTree<ISiteInformationState, IRootState> = {
	notificationData(state: ISiteInformationState): object {
		return state.notificationData ? state.notificationData : {};
	},
	loading(state: ISiteInformationState): boolean {
		return state.loading;
	},
};
