import { Getter, Action } from 'vuex-class';
import { Component, Mixins } from 'vue-property-decorator';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoadingMixin } from '@/mixins/loading/loading';

import { UserAPI } from '@/api/user.api';

@Component({
  name: 'Profile',
  components: {},
})

export default class Profile extends Mixins(HelperMixin, LoadingMixin) {
  @Getter('token', { namespace: 'authentication' }) $token;
  @Getter('authData', { namespace: 'authentication' }) $authData;
  @Action('updateAuthData', { namespace: 'authentication' }) $updateAuthData;
  @Action('setNotificationData', { namespace: 'siteInformation' }) $setNotificationData;

  private userAPI: UserAPI = null;
  private formData: object = {
    username: null,
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
  };

  private requiredRules: any = [];

  private get form(): any {
    return this.$refs['formProfile'];
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
    const isFormValid: boolean = this.form.validate();

    if (!isFormValid) {
      return;
    }

    this.loading = true;

    const requestData: any = await this.userAPI.put({id: this.$authData.id}, this.formData);
    if (!requestData) {
        this.$setNotificationData({ type: 'error', message: this.$t('error.userUpdate') });
    } else {
        this.$setNotificationData({ type: 'success', message: this.$t('success.userUpdate') });
    }

    this.$updateAuthData({ ...this.$authData, ...this.formData });
    this.loading = false;
  }
}
