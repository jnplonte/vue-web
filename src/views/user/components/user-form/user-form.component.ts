import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoggerMixin } from '@/mixins/logger/logger';

import { DEFAULT_FORM_DATA, DEFAULT_ROLES, IFormProps } from '@/views/user/user.constants';

@Component({
	name: 'UserFormComponent',
	components: {},
})
export default class UserFormComponent extends Mixins(HelperMixin, LoggerMixin) {
	@Prop({ default: null }) data: any;
	@Prop({ type: Boolean, default: false }) value: boolean;
	@Prop({ type: String, default: 'insert' }) type: string;

	protected formData: IFormProps = Object.assign({}, DEFAULT_FORM_DATA);

	private roles: object[] = DEFAULT_ROLES;

	private requiredRules: any = [];
	private emailRules: any = [];
	private passwordRules: any = [];
	private confirmPasswordRules: any = [];

	@Watch('$props.value')
	private onUpdateValue(newVal) {
		if (newVal) {
			if (this.$props.data) {
				this.formData = Object.assign({}, this.$props.data);
			}
		} else {
			this.form.resetValidation();
			this.formData = Object.assign({}, DEFAULT_FORM_DATA);
		}
	}

	created() {
		if (this.$props.data) {
			this.formData = this.$props.data;
		}

		this.defineFormRules();
	}

	private get form(): any {
		return this.$refs['form'];
	}

	private defineFormRules() {
		this.requiredRules = [(v) => !!v || this.$t('error.required')];

		this.emailRules = [(v) => !!v || 'required', (v) => /.+@.+\..+/.test(v) || this.$t('error.email')];

		this.passwordRules = [
			(v) => !!v || 'required',
			(v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/.test(v) || this.$t('error.passwordInvalid'),
		];

		this.confirmPasswordRules = [
			(v) => !!v || 'required',
			(v) => this.formData.password === v || this.$t('error.passwordDosentMatch'),
		];
	}

	private get confirmText(): string {
		if (this.$props.type === 'insert') {
			return this.$t('user.confirnInsert') as string;
		} else {
			return this.$t('user.confirmUpdate') as string;
		}
	}

	private get confirmIcon(): string {
		if (this.$props.type === 'insert') {
			return 'mdi-account-plus';
		} else {
			return 'mdi-pencil';
		}
	}

	private get confirmHeaderText(): string {
		if (this.$props.type === 'insert') {
			return this.$t('user.headerInsert') as string;
		} else {
			return this.$t('user.headerUpdate') as string;
		}
	}

	private updateUser() {
		const isFormValid: boolean = this.form.validate();

		if (!isFormValid) {
			return;
		}

		this.$emit('onUpdate', this.helper.cleanDataRemoveNull(this.formData));
	}

	private cancelUser() {
		this.$emit('onCancel');
	}
}
