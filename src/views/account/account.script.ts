import { Component, Mixins } from 'vue-property-decorator';
import { LoadingMixin } from '@/mixins/loading/loading';

import { Profile, Password } from './components';

@Component({
	name: 'AccountView',
	components: {
		profile: Profile,
		password: Password,
	},
})
export default class AccountView extends Mixins(LoadingMixin) {
	private tabItems: string[] = ['profile', 'password'];

	private selectedTab: number = 0;
}
