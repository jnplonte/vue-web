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
  private confirmPasswordRules: any = [];

  @Watch('$props.value')
  private onUpdateValue(newVal) {
    if (!newVal) {
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

    this.confirmPasswordRules =  [
      (v) => !!v || 'required',
      (v) => (this.formData.password === v) || 'password not match',
    ];
  }

  private get confirmText(): string {
    return (this.$props.type).toUpperCase();
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
