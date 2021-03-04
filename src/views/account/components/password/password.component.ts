import * as md5 from 'md5';
import { Getter, Action } from 'vuex-class';
import { Component, Mixins, Watch } from 'vue-property-decorator';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoadingMixin } from '@/mixins/loading/loading';

import { UserAPI } from '@/api/user.api';

@Component({
	name: 'Security',
	components: {},
})
export default class Profile extends Mixins(HelperMixin, LoadingMixin) {
	@Getter('token', { namespace: 'authentication' }) $token;
	@Getter('authData', { namespace: 'authentication' }) $authData;
	@Action('setNotificationData', { namespace: 'siteInformation' }) $setNotificationData;

	private userAPI: UserAPI = null;
	private formData: object = {
		password: null,
		passwordConfirm: null,
	};

	private newPwdRules: any = [];
	private newPwdConfirmRules: any = [];

	private get form(): any {
		return this.$refs['formPassword'];
	}

	created(): void {
		this.loading = false;

		this.userAPI = new UserAPI(this.$token);

		this.defineFormRules();
	}

	private defineFormRules() {
		this.newPwdRules = [
			(v) => !!v || this.$t('error.required'),
			(v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/.test(v) || this.$t('error.passwordInvalid'),
		];

		this.newPwdConfirmRules = [
			(v) => !!v || this.$t('error.required'),
			(v) => this.formData['password'] === v || this.$t('error.passwordDosentMatch'),
		];
	}

	async updatePassword() {
		const isFormValid: boolean = this.form.validate();

		if (!isFormValid) {
			return;
		}

		this.loading = true;

		const requestData: any = await this.userAPI.put(
			{ id: this.$authData.id },
			{
				password: md5(this.formData['password'] || ''),
			}
		);
		if (!requestData) {
			this.$setNotificationData({ type: 'error', message: this.$i18n.t('error.userUpdate') });
		} else {
			this.$setNotificationData({ type: 'success', message: this.$i18n.t('success.userUpdate') });
		}

		this.form.reset();
		this.loading = false;
	}
}
