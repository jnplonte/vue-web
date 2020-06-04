import { Getter, Action } from 'vuex-class';
import { Component, Mixins, Prop } from 'vue-property-decorator';

import { Request } from '@/services/request/request.service';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoggerMixin } from '@/mixins/logger/logger';

@Component({
  name: 'TopbarComponent',
  components: {},
})

export default class TopbarComponent extends Mixins(HelperMixin, LoggerMixin) {
  @Getter('isAdmin', { namespace: 'authentication' }) $isAdmin;
  @Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;
  @Getter('userInformation', { namespace: 'authentication' }) $userInformation;
  @Getter('isFullscreen', { namespace: 'common' }) $isFullscreen;
  @Action('changeLanguage', { namespace: 'common' }) $changeLanguage;
  @Action('logOutUser', { namespace: 'authentication' }) $logOutUser;

  @Prop({ type: Boolean, default: false }) isShowSidebar: boolean;

  protected request: Request;
  private companyName: string = process.env.VUE_APP_NAME;
  private isNavBarColored: boolean = false;
  private isNavBarTransparent: boolean = true;
  private isShowLang: boolean = false;
  private isShowUser: boolean = false;
  private languages: Array<object | null> = [];

  get homeRoute(): string {
    return (this.$isAdmin) ? '/admin-dashboard' : '/dashboard/general';
  }

  beforeDestroy(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  beforeCreate(): void {
    if (!this.request) { this.request = new Request('application/json'); }
  }

  created(): void {
    window.addEventListener('scroll', this.handleScroll);

    if (window.localStorage.getItem('isLoggedIn') && (!window.localStorage.getItem('hasNoAccess'))) {
      window.localStorage.removeItem('isLoggedIn');
    }

    this.languages = [
      { code: 'en', label: this.$t('language.english') },
      { code: 'sc', label: this.$t('language.simplifiedChinese') },
      { code: 'tc', label: this.$t('language.traditionalChinese') },
    ];
  }

  mounted(): void {}

  handleScroll() {
    if (this.helper.get(document, 'documentElement.scrollTop') >= 10 || this.helper.get(document, 'body.scrollTop') >= 10) {
      this.isNavBarColored = true;
      this.isNavBarTransparent = false;
    } else {
      this.isNavBarColored = false;
      this.isNavBarTransparent = true;
    }
  }

  updateSidebar(value: boolean = true): void {
    this.$emit('onUpdateSidebar', value);
  }

  setLang(langCode: string) {
    if (langCode !== this.$i18n.locale) {
      const messages = this.$i18n.getLocaleMessage(langCode);
      if (Object.keys(messages).length === 0) {
        this.$i18n.setLocaleMessage(langCode, require(`../../translations/${langCode}.json`));
      }

      this.$i18n.locale = langCode;
      this.$changeLanguage(langCode);
    }
  }

  logOutUser(): void {
    this.$logOutUser({ routePath: this.$route.fullPath, isReload: true });
  }

  refreshBrowser(): void {
    location.reload();
  }

  handleThemeChanged() {
    this.$isDarkTheme = !this.$isDarkTheme;
  }

  goTo(routeName: string) {
    this.$router.push({ name: routeName });
  }
}
