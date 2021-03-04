import { Component, Mixins, Prop } from 'vue-property-decorator';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoadingMixin } from '@/mixins/loading/loading';

@Component({
	name: 'SearchInputComponent',
	components: {},
})
export default class SearchInputComponent extends Mixins(HelperMixin, LoadingMixin) {
	private searchValue: string = '';

	handleSearch() {
		let targetValue: string | null = null;

		if (this.helper.isNotEmpty(this.searchValue)) {
			targetValue = `username:${this.searchValue}`;
		} else {
			targetValue = null;
		}

		this.$emit('refreshData', { key: 'query', value: targetValue });
	}
}
