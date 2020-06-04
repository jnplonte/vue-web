import { Getter, Action } from 'vuex-class';
import { Component, Mixins, Prop } from 'vue-property-decorator';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoggerMixin } from '@/mixins/logger/logger';

@Component({
  name: 'TopbarComponent',
  components: {},
})

export default class TopbarComponent extends Mixins(HelperMixin, LoggerMixin) {
  @Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;
  @Getter('userInformation', { namespace: 'authentication' }) $userInformation;
  @Action('changeLanguage', { namespace: 'common' }) $changeLanguage;
  @Action('logOutUser', { namespace: 'authentication' }) $logOutUser;

  private companyName: string = '';
  private languages: Array<object | null> = [];

  created(): void {
    this.companyName = process.env.VUE_APP_NAME;
    this.languages = [
      { code: 'en', label: this.$t('language.english') },
      { code: 'sc', label: this.$t('language.simplifiedChinese') },
      { code: 'tc', label: this.$t('language.traditionalChinese') },
    ];
  }

  mounted(): void {}

  setLang(langCode: string) {
    if (langCode !== this.$i18n.locale) {
      const messages = this.$i18n.getLocaleMessage(langCode);
      if (Object.keys(messages).length === 0) {
        this.$i18n.setLocaleMessage(langCode, require(`../../../../locales/${langCode}.json`));
      }

      this.$i18n.locale = langCode;
      this.$changeLanguage(langCode);
    }
  }

  logOutUser(): void {
    this.$logOutUser({ routePath: this.$route.fullPath, isReload: true });
  }
}
