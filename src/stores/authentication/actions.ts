import { ActionTree } from 'vuex';
import { IAuthenticationState } from './types';
import { IRootState } from '../types';

import { Helper } from '@/services/helper/helper.service';

import { AuthAPI } from '@/api/authenttication.api';
import { UserAPI } from '@/api/user.api';

const helper: Helper = new Helper();

export const actions: ActionTree<IAuthenticationState, IRootState> = {
	logInUser: ({ commit }, loginData): Promise<any> => {
		const authRequest: AuthAPI = new AuthAPI();

		return authRequest
			.login({}, loginData)
			.then((requestData) => {
				if (!requestData.data) {
					return false;
				} else {
					helper.setCookie(process.env.VUE_APP_AUTH_COOKIE, requestData.data);

					commit('SET_TOKEN', requestData.data);
					commit('SET_IS_LOGIN', true);

					const userRequest = new UserAPI(requestData.data);
					return userRequest
						.myuser()
						.then((userRequestData) => {
							if (userRequestData) {
								commit('SET_AUTH_DATA', userRequestData.data);

								return true;
							} else {
								return false;
							}
						})
						.catch((error) => false);
				}
			})
			.catch(() => false);
	},
	logOutUser: ({ commit }): void => {
		helper.deleteCookie(process.env.VUE_APP_AUTH_COOKIE);

		commit('SET_TOKEN', '');
		commit('SET_IS_LOGIN', false);
		commit('SET_AUTH_DATA', {});
	},
	saveToken: ({ commit }, token: string): void => {
		commit('SET_TOKEN', token);
	},
	saveAuthData: ({ commit }, userInformation: object): void => {
		commit('SET_IS_LOGIN', true);
		commit('SET_AUTH_DATA', userInformation);
	},
	updateAuthData: ({ commit }, userInformation: object): void => {
		commit('SET_AUTH_DATA', userInformation);
	},
};
