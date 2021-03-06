import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Helper } from '@/services/helper/helper.service';

@Component
export class HelperMixin extends Vue {
	protected helper: Helper;

	beforeCreate(): void {
		if (!this.helper) {
			this.helper = new Helper();
		}
	}

	get roleIdAdmin(): number {
		return Number(process.env.VUE_APP_ROLE_ID_ADMIN);
	}
}
