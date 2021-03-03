import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import { Getter } from 'vuex-class';

@Component({
  name: 'TopbarComponent',
  components: {},
})

export default class TopbarComponent extends Vue {
  @Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;

  private appName: string = '';
  private appLogo: string = '';

  private isSmall: boolean = false;

  created(): void {
    this.appName = process.env.VUE_APP_NAME;
    this.appLogo = process.env.VUE_APP_LOGO;
  }

  mounted(): void {
    this.isSmall = (window.innerWidth <= 600);

    window.addEventListener('resize', () => {
      this.isSmall = (window.innerWidth <= 600);
    }, true);
  }

  setLang(locale: string) {
    if (locale !== this.$i18n.locale) {
      const lngKey: string = process.env.VUE_APP_LOCALE || '';
      const messages = this.$i18n.getLocaleMessage(locale);
      if (Object.keys(messages).length === 0) {
        let langFile: string = '_english';
        switch (locale) {
          case 'en':
            langFile = '_english';
            break;
          case 'tg':
            langFile = '_tagalog';
            break;
        }
        this.$i18n.setLocaleMessage(locale, require(`../../../../locales/${langFile}.json`));
      }

      this.$i18n.locale = locale;
      window.localStorage.setItem(lngKey, locale);
    }
  }

  signOut(): void {
    this.$emit('signOut');
  }

  openNav(): void {
    this.$emit('openNav', true);
  }

  get homePage(): string {
    return (this.$isLogIn) ? '/dashboard' : '/';
  }
}
