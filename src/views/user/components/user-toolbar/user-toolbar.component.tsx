import * as md5 from 'md5';

import { Getter, Action } from 'vuex-class';
import { Component, Mixins } from 'vue-property-decorator';

import { LoadingMixin } from '@/mixins/loading/loading';

import { IFormProps } from '@/views/user/user.constants.tsx';

import UserForm from '@/views/user/components/user-form/user-form.vue';

import { UserAPI } from '@/api/user.api';

@Component({
  name: 'UserToolbarComponent',
  components: {
    'user-form': UserForm,
  },
})

export default class UserToolbarComponent extends Mixins(LoadingMixin) {
  @Getter('token', { namespace: 'authentication' }) $token;
  @Action('setNotificationData', { namespace: 'siteInformation' }) $setNotificationData;

  private userAPI: UserAPI;

  private isAddModalOpen: boolean = false;

  created() {
    this.userAPI = new UserAPI(this.$token);
  }

  handleAddOpen() {
    this.isAddModalOpen = true;
  }

  handleAddClose() {
    this.isAddModalOpen = false;
  }

  async handleAddConfirm(data: IFormProps) {
    const apiData: object = {
      username: data.username,
      email: data.email,
      password: md5(data.password),
      roleId: Number(data.roleId),
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone || '',
    };

    const requestData: any = await this.userAPI.post(apiData);
    if (!requestData) {
      this.$setNotificationData({ type: 'error', message: this.$i18n.t('error.userCreate') });
    } else {
      this.$setNotificationData({ type: 'success', message: this.$i18n.t('success.userCreate') });

      this.$emit('refreshData', {});
      this.isAddModalOpen = false;
    }
  }
}
