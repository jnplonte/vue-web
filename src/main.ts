import './styles/sass/index.scss';

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import vuetifyOptions from '@/plugins/vuetify/index';

import { createRouter } from './router';
import { createStore } from './store';
import { createTranslation } from './translations';

import App from './App.vue';

Vue.config.productionTip = false;

const store = createStore(Vue);
const i18n = createTranslation(Vue);
const router = createRouter(Vue, store, i18n);
const vuetify = new Vuetify({
  ...vuetifyOptions,
  lang: { t: (key, ...params) => i18n.t(key, params) as string },
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#jnpl-root');
