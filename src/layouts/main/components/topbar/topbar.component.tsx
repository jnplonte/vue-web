import { Getter, Action } from 'vuex-class';
import { Component, Mixins } from 'vue-property-decorator';

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

  private appName: string = '';
  private appLogo: string = '';
  private languages: Array<object | null> = [];
  private isSmall: boolean = false;

  created(): void {
    this.appName = process.env.VUE_APP_NAME;
    this.appLogo = process.env.VUE_APP_LOGO;
    this.languages = [
      { code: 'en', label: 'ENGLISH' },
      { code: 'tg', label: 'TAGALOG' },
    ];
  }

  mounted(): void {
    this.isSmall = (window.innerWidth <= 600);

    window.addEventListener('resize', () => {
      this.isSmall = (window.innerWidth <= 600);
    }, true);
  }

  setLang(langCode: string) {
    if (langCode !== this.$i18n.locale) {
      const messages = this.$i18n.getLocaleMessage(langCode);
      if (Object.keys(messages).length === 0) {
        let langFile: string = '_english';
        switch (langCode) {
          case 'en':
            langFile = '_english';
            break;
          case 'tg':
            langFile = '_tagalog';
            break;
        }
        this.$i18n.setLocaleMessage(langCode, require(`../../../../locales/${langFile}.json`));
      }

      this.$i18n.locale = langCode;
      this.$changeLanguage(langCode);
    }
  }

  logOutUser(): void {
    this.$logOutUser({ routePath: this.$route.fullPath, isReload: true });
  }

  openNav(): void {
    this.$emit('openNav', true);
  }
}
