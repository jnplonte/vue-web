import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { Getter } from 'vuex-class';

@Component({
	name: 'NotFoundView',
})
export default class NotFoundView extends Vue {
	@Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;

	get homePage(): string {
		return this.$isLogIn ? '/dashboard' : '/';
	}
}
