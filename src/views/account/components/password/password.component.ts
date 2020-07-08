import { Getter, Action } from 'vuex-class';
import { Component, Mixins, Watch } from 'vue-property-decorator';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoadingMixin } from '@/mixins/loading/loading';

import { UserAPI } from '@/api/user.api';

import { VForm } from '@/types';

@Component({
  name: 'Security',
  components: {
  },
})

export default class Profile extends Mixins(HelperMixin, LoadingMixin) {
  @Getter('token', { namespace: 'authentication' }) $token;
  @Getter('authData', { namespace: 'authentication' }) $authData;

  private userAPI: UserAPI = null;
  private formData: object = {
    password: null,
    passwordConfirm: null,
  };

  private newPwdRules: any = [];
  private newPwdConfirmRules: any = [];

  private get form(): VForm {
    return this.$refs['formPassword'] as VForm;
  }

  created(): void {
    this.loading = false;

    this.userAPI = new UserAPI(this.$token);

    this.defineFormRules();
  }

  private defineFormRules() {
    this.newPwdRules = [
      (v) => !!v || this.$t('placeholder.required'),
      (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,})/.test(v) || this.$t('error.passwordInvalid'),
    ];

    this.newPwdConfirmRules = [
      (v) => !!v || this.$t('placeholder.required'),
      (v) => this.formData['password'] === v || this.$t('error.passwordDosentMatch'),
    ];
  }

  async updatePassword() {
  console.log(this.formData, '<<<');
  //   const isFormValid: boolean = this.form.validate();

  //   if (!isFormValid) {
  //     return;
  //   }

  //   this.$loading = true;

  //   const finalPayload = { password: this.helper.md5Encode(this.data['password']) };
  //   const res = await this.userAPI.updateUserInfo({
  //     userId: this.$authData.id,
  //     payload: finalPayload,
  //   });

  //   if (res.status === 'failed') {
  //     this.$addSnackbar({
  //       type: 'error',
  //       message: this.$t('notification.data.updateFailed'),
  //     });

  //     this.resetForm();
  //     this.$loading = false;
  //     return;
  //   }

  //   this.$addSnackbar({
  //     type: 'success',
  //     message: this.$t('notification.data.updateSuccess'),
  //   });

  //   this.resetForm();
  //   this.$loading = false;
  }

  // resetForm() {
  //   this.form.reset();
  // }
}
