import Vue from 'vue';
import Vuex, { StoreOptions, Store } from 'vuex';
import { IRootState } from './types';
import { createAuthenticationModule } from './authentication';
import { createSiteInformationModule } from './site-information';

const store: StoreOptions<IRootState> = {
	strict: true,
	modules: {
		authentication: createAuthenticationModule(),
		siteInformation: createSiteInformationModule(),
	},
};

export function createStore(vueInstance = Vue) {
	vueInstance.use(Vuex);

	return new Store<IRootState>(store);
}
