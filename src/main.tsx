import './styles/sass/index.scss';

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import vuetifyOptions from '@/plugins/vuetify/index';

import { createRouter } from '@/routes';
import { createStore } from '@/stores';
import { createLocale } from '@/locales';

import App from './App.vue';

import { UserAPI } from '@/api/user.api';
import { Helper } from '@/services/helper/helper.service';

Vue.config.productionTip = false;

const i18n = createLocale(Vue);
const store = createStore(Vue);
const router = createRouter(Vue, store);
const vuetify = new Vuetify({
    ...vuetifyOptions,
    lang: { t: (key, ...params) => i18n.t(key, params) as string },
});

const initVueApp = () => {
  new Vue({
    i18n,
    store,
    router,
    vuetify,
    render: (h) => h(App),
  }).$mount('#jnpl-root');
};

const helper: Helper = new Helper();
const authToken: string = helper.getCookie(process.env.VUE_APP_AUTH_COOKIE);
if (authToken) {
    const userRequest = new UserAPI(authToken);
    userRequest.myuser()
      .then((requestData) => {
        if (requestData.data) {
          store.dispatch('authentication/saveToken', authToken);
          store.dispatch('authentication/saveAuthData', requestData.data);
        } else {
          store.dispatch('authentication/logOutUser');
        }

        initVueApp();
      })
      .catch((error) => {
        console.log(error);
      });
} else {
  initVueApp();
}
