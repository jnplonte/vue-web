import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoggerMixin } from '@/mixins/logger/logger';

import { DEFAULT_FORM_DATA, DEFAULT_ROLES, IFormProps } from '@/views/user/user.constants.tsx';

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
    this.requiredRules = [
      (v) => !!v || 'required',
    ];

    this.emailRules = [
      (v) => !!v || 'required',
      (v) => /.+@.+\..+/.test(v) || 'valid email',
    ];

    this.passwordRules =  [
      (v) => !!v || 'required',
      (v) => (!!v && (v).length >= 8) || 'invalid',
    ];

    this.confirmPasswordRules =  [
      (v) => !!v || 'required',
      (v) => (this.formData.password === v) || 'password not match',
    ];
  }

  private get confirmText(): string {
    return (this.$props.type).toUpperCase();
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
      return 'Insert User';
    } else {
      return 'Update User';
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
