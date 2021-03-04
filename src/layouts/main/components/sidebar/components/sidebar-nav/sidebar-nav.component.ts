import { Component, Prop, Watch, Mixins } from 'vue-property-decorator';
import { HelperMixin } from '@/mixins/helper/helper';

@Component({
	name: 'SidebarNavComponent',
	components: {},
})
export default class SidebarNavComponent extends Mixins(HelperMixin) {
	@Prop({ type: Array, default: [] }) pages: Array<any | null>;

	private path: string = 'dashboard';

	mounted() {
		this.$nextTick(() => {
			this.path = this.$route.name;
		});
	}

	@Watch('$route.name')
	onChangeRoute(newVal) {
		this.path = newVal;
	}

	get activeRoute(): string {
		return this.path;
	}

	get pageList(): Array<any | null> {
		return this.$props.pages;
	}
}
