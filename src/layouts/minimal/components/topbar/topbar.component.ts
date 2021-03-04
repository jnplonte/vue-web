import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { Getter } from 'vuex-class';

@Component({
	name: 'TopbarComponent',
	components: {},
})
export default class TopbarComponent extends Vue {
	@Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;

	private appName: string = '';
	private appLogo: string = '';

	created(): void {
		this.appName = process.env.VUE_APP_NAME;
		this.appLogo = process.env.VUE_APP_LOGO;
	}

	get homePage(): string {
		return this.$isLogIn ? '/dashboard' : '/';
	}
}
