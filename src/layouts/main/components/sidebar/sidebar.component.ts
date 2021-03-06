import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { SidebarNav, Profile } from './components';

@Component({
	name: 'SidebarComponent',
	components: {
		profile: Profile,
		'sidebar-nav': SidebarNav,
	},
})
export default class SidebarComponent extends Vue {
	@Prop({ type: Boolean, default: false }) openNavValue: boolean;

	private isSmall: boolean = false;

	get pages(): object[] {
		return [
			{
				name: 'dashboard',
				title: this.$t('menu.dashboard'),
				href: '/dashboard',
				icon: 'mdi-apps',
			},
			{
				name: 'user',
				title: this.$t('menu.user'),
				href: '/user',
				icon: 'mdi-account-multiple',
			},
		];
	}

	@Watch('value')
	openNav(newVal) {
		this.$emit('openNav', newVal);
	}

	mounted(): void {
		this.isSmall = window.innerWidth <= 600;

		window.addEventListener(
			'resize',
			() => {
				this.isSmall = window.innerWidth <= 600;
			},
			true
		);
	}

	get isOpen(): boolean {
		return this.$props.openNavValue;
	}

	set isOpen(newVal) {
		this.$emit('openNav', newVal);
	}
}
