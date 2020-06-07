import Vue from 'vue';
import Vuex, { StoreOptions, Store } from 'vuex';
import { IRootState } from './types';
import { createAuthenticationModule } from './authentication';

const store: StoreOptions<IRootState> = {
  strict: true,
  modules: {
    authentication: createAuthenticationModule(),
  },
};

export function createStore(vueInstance = Vue) {
  vueInstance.use(Vuex);

  return new Store<IRootState>(store);
}
