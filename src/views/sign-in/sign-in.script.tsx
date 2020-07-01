import * as md5 from 'md5';
import { Component, Mixins } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoggerMixin } from '@/mixins/logger/logger';

import { IFormProps } from './sign-in.constant';

@Component({
  name: 'SignInView',
  components: {},
})

export default class SignInView extends Mixins(HelperMixin, LoggerMixin) {
  @Action('logInUser', { namespace: 'authentication' }) $logInUser;
  @Action('setNotificationData', { namespace: 'siteInformation' }) $setNotificationData;

  private appName: string = process.env.VUE_APP_NAME || '';

  private formState: IFormProps =  {
    isValid: false,
    username: 'spiderman',
    password: '11111111',
  };

  private formRules: object = {};

  created() {
    this.formRules = {
      username: [
        (value) => (!!value) || this.$i18n.t('error.usernameRequired'),
      ],
      password: [
        (value) => (!!value) || this.$i18n.t('error.passwordRequired'),
        (value) => (!!value && (value).length >= 8) || this.$i18n.t('error.passwordInvalid'),
      ],
    };
  }

  async handleSignIn() {
    if (this.formState.isValid) {
      const apiData: object = {
        username: this.formState.username,
        password: md5(this.formState.password),
      };

      const isSignIn: boolean =  await this.$logInUser(apiData);
      if (!isSignIn) {
        this.$setNotificationData({ type: 'error', message: this.$i18n.t('error.login') });
        this.formState.password = '';
      } else {
        this.$setNotificationData({ type: 'success', message: this.$i18n.t('success.login') });
        this.$router.push({ path: '/dashboard' });
      }
    }
  }
}
