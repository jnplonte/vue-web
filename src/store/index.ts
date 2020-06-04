import Vue from 'vue';
import Vuex, { StoreOptions, Store } from 'vuex';
import { RootState } from './types';
import { createAuthenticationModule } from './authentication';
import { createCommonModule } from './common';

const store: StoreOptions<RootState> = {
  strict: true,
  modules: {
    authentication: createAuthenticationModule(),
    common: createCommonModule(),
  },
};

export function createStore(vueInstance = Vue) {
  vueInstance.use(Vuex);

  return new Store<RootState>(store);
}
