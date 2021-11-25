import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import NotFoundView from '@/views/not-found/not-found.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('not found view', () => {
	let store;
	const $t = () => {};

	beforeEach(() => {
		const storeValue = {
			namespaced: true,
			state: () => {
				return {
					token: '',
					isLogIn: false,
					authData: {},
				};
			},
			getters: {
				token: jest.fn(),
				isLogIn: jest.fn(),
				authData: jest.fn(),
			},
			actions: {
				logInUser: jest.fn(),
				logOutUser: jest.fn(),
				saveToken: jest.fn(),
				saveAuthData: jest.fn(),
				updateAuthData: jest.fn(),
			},
		};

		store = new Vuex.Store({
			modules: {
				authentication: storeValue,
			},
			strict: true,
		});
	});

	it('should render not found page', () => {
		const wrapper = shallowMount(NotFoundView, {
			store,
			localVue,
			mocks: { $t },
			propsData: {},
			stubs: ['router-link'],
		});

		expect(wrapper.find('h1').exists()).toBeTruthy();
		expect(wrapper.find('.go-home').exists()).toBeTruthy();
	});

	it('should go back to home page', async () => {
		const wrapper = shallowMount(NotFoundView, {
			store,
			localVue,
			mocks: {
				$t,
				$route: {
					fullPath: '/page-not-found',
				},
			},
			propsData: {},
			stubs: ['router-link'],
		});

		const gobackButton = wrapper.find('.go-home');

		await gobackButton.trigger('click');

		console.log(wrapper.vm.$route.fullPath);
		expect(gobackButton.attributes('to')).toBe('/');
	});
});
