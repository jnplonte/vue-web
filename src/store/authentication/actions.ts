import { ActionTree } from 'vuex';
import { AuthenticationState } from './types';
import { RootState } from '../types';
import { Helper } from '@/services/helper/helper.service';
import { Request } from '@/services/request/request.service';
import { ToolsAPI } from '@/api/tools.api';

const helper: Helper = new Helper();
const request: Request = new Request('application/json');

export const actions: ActionTree<AuthenticationState, RootState> = {
  logInUser: ({ commit }, { loginData, remember, logflows }): Promise<any> => {
    if (!logflows) {
      if (loginData['username'] === process.env.VUE_APP_ADMIN_USER && loginData['password'] === process.env.VUE_APP_ADMIN_PASS) {
        const toolsAPI: ToolsAPI = new ToolsAPI();

        return toolsAPI.encodeKey({
          companyId: 1,
          userId: 1,
        }).then(res => {
          const domain: string = helper.getDomain();
          helper.setCookie(process.env.VUE_APP_AUTH_COOKIE, process.env.VUE_APP_ADMIN_KEY, domain, 1);
          helper.setCookie(process.env.VUE_APP_LOGFLOWS_COOKIE, 0, domain, 1);
          helper.setCookie(process.env.VUE_APP_LOGFLOWS_ADMIN_COOKIE, helper.get(res, 'data', null), domain, 1);

          commit('SET_IS_ADMIN', true);
          commit('SET_IS_LOGIN', true);
          commit('SET_USER_KEY', process.env.VUE_APP_ADMIN_KEY);
          commit('SET_LF_TOKEN', process.env.VUE_APP_ADMIN_KEY.split('|')[0]);
          commit('SET_LF_CUST_KEY', process.env.VUE_APP_ADMIN_KEY.split('|')[1]);
          commit('SET_LF_API_TOKEN', process.env.VUE_APP_ADMIN_KEY.split('|')[2]);
          return Promise.resolve('/admin-dashboard');
        }).catch(err => {
          return Promise.resolve(false);
        });
      } else {
        // API CALL FOR NOT LOGFLOWS USERS
        return Promise.resolve(false);
      }
    }

    return request
      .post('LEGACY_AUTH', `login?test=${process.env.VUE_APP_DEBUG_MODE || 'false'}`, null, loginData)
      .then((data) => {
        if (data.failed) {
          return false;
        }

        const expiry: number = (remember) ? 5 : 1;
        const userKey: string = (
          data['data'] &&
          data['data']['token'] &&
          data['data']['custKey'] &&
          data['data']['apiToken']
        )
          ? `${data['data']['token']}|${data['data']['custKey']}|${data['data']['apiToken']}`
          : '';
        const domain: string = helper.getDomain();

        helper.setCookie(process.env.VUE_APP_AUTH_COOKIE, userKey, domain, expiry);
        helper.setCookie(process.env.VUE_APP_LOGFLOWS_COOKIE, 1, domain, expiry);

        commit('SET_IS_LOGIN', true);
        commit('SET_USER_KEY', userKey);
        commit('SET_LF_TOKEN', userKey.split('|')[0]);
        commit('SET_LF_CUST_KEY', userKey.split('|')[1]);
        commit('SET_LF_API_TOKEN', userKey.split('|')[2]);
        return '/dashboard';
      })
      .catch(() => false);
  },
  logOutUser: ({ commit, state }, { routePath, isReload }): void => {
    const domain = helper.getDomain();

    helper.deleteCookie(process.env.VUE_APP_AUTH_COOKIE, domain);
    helper.deleteCookie(process.env.VUE_APP_LOGFLOWS_COOKIE, domain);

    window.localStorage.setItem('isLoggedOut', '1');

    if (!state.isAdmin) {
      window.localStorage.setItem('rQuery', helper.encode(routePath.substring(1)));
    }

    commit('SET_IS_LOGIN', false);
    commit('SET_USER_KEY', '');
    commit('SET_LF_TOKEN', '');
    commit('SET_LF_CUST_KEY', '');
    commit('SET_LF_API_TOKEN', '');
    commit('SET_USER_INFORMATION', {});

    if (isReload) {
      window.location.reload();
    }
  },
  loadUserInformation: ({ commit }, userInformation: object): Promise<any> => {
    if (Number(helper.getCookie(process.env.VUE_APP_LOGFLOWS_COOKIE)) === 0) {
      if (userInformation['lfToken'] === process.env.VUE_APP_ADMIN_KEY) {
        commit('SET_USER_INFORMATION', {
          user: { 'name': 'administrator' },
          company: { 'name': 'Logflows', 'country': 'hk' },
          customerKey: process.env.VUE_APP_CUSTOMER_KEY_HASH,
        });
        return Promise.resolve(true);
      } else {
        // API CALL FOR NOT LOGFLOWS USERS
        return Promise.resolve(false);
      }
    }

    const userKey = userInformation['lfToken'];
    const requestAuth: Request = new Request('application/json', userKey);
    const requestAi: Request = new Request('application/json', process.env.VUE_APP_SECRET_KEY_HASH);

    return requestAuth
      .get('LEGACY_CORE', `myuser?test=${process.env.VUE_APP_DEBUG_MODE || 'false'}&type=report`)
      .then((res) => {
        if (!res['data'] || helper.isEmptyObject(res['data'])) {
          return Promise.reject('1');
        }

        if (helper.isEmpty(res['data']['customerKey'])) {
          window.localStorage.setItem('hasNoAccess', '1');
          return Promise.reject('2');
        }

        commit('SET_USER_INFORMATION', res['data']);
        commit('SET_IS_ADMIN', false);

        return requestAi
          .get('ANALYTICS_CUSTOMER', res['data']['customerKey'], {
            [process.env.VUE_APP_CUSTOMER_KEY]: process.env.VUE_APP_CUSTOMER_KEY_HASH,
            key: 'key',
          });
      })
      .then((res) => {
        if (!res['data'] || helper.isEmptyObject(res['data'])) {
          return Promise.reject('1');
        }

        const reportCategories = helper.get(res, 'data.data.reportCategories', []);
        const reportRoutes = helper.get(res, 'data.data.reportRoutes', []);

        const data: object = {
          company: helper.get(res, 'data.company', ''),
          country: helper.get(res, 'data.data.country', ''),
          latlng: helper.get(res, 'data.data.latlng', ''),
          timezone: helper.get(res, 'data.data.timezone', 8),
          reportCategories,
          reportRoutes,
        };

        commit('SET_USER_DATA', data);
        return true;
      })
      .catch((error) => error);
  },
  updateUserSetting: ({ commit }, settingInformation: object): void => {
    commit('SET_USER_SETTING', settingInformation);
  }
};
