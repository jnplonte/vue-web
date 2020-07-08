import { Getter } from 'vuex-class';
import { Component, Watch, Mixins } from 'vue-property-decorator';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoadingMixin } from '@/mixins/loading/loading';

import { UserAPI } from '@/api/user.api';

import { VForm } from '@/types';

@Component({
  name: 'Profile',
  components: {},
})

export default class Profile extends Mixins(HelperMixin, LoadingMixin) {
  @Getter('token', { namespace: 'authentication' }) $token;
  @Getter('authData', { namespace: 'authentication' }) $authData;

  private userAPI: UserAPI = null;
  private formData: object = {
    username: null,
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
  };

  private requiredRules: any = [];

  private get form(): VForm {
    return this.$refs['formProfile'] as VForm;
  }

  created(): void {
    this.loading = false;

    this.userAPI = new UserAPI(this.$token);

    this.initData();
    this.defineFormRules();
  }

  private initData() {
    this.formData = {
      username: this.$authData.username || '',
      firstName: this.$authData.firstName || '',
      lastName: this.$authData.lastName || '',
      phone: this.$authData.phone || '',
      email: this.$authData.email || '',
    };
  }

  private defineFormRules() {
    this.requiredRules = [
      (v) => !!v || this.$t('error.required'),
    ];
  }

  async updateProfile() {
    console.log(this.formData, '<<<<<');
    // const isFormValid: boolean = this.form.validate();

    // if (!isFormValid || !this.isAnyChanges) {
    //   return;
    // }

    // this.$loading = true;

    // const res = await this.userAPI.updateUserInfo({
    //   userId: this.$authData.id,
    //   payload: this.data,
    // });

    // if (res.status === 'failed') {
    //   this.$addSnackbar({
    //     type: 'error',
    //     message: this.$t('notification.data.updateFailed'),
    //   });

    //   this.$loading = false;
    //   return;
    // }

    // this.$addSnackbar({
    //   type: 'success',
    //   message: this.$t('notification.data.updateSuccess'),
    // });

    // this.oriData = { ...this.data };
    // this.isAnyChanges = false;
    // this.$loading = false;
  }
}
