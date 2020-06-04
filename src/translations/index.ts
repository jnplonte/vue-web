import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from 'vuetify/es5/locale/en';
import scLocale from 'vuetify/es5/locale/zh-Hans';
import tcLocale from 'vuetify/es5/locale/zh-Hant';
import { Helper } from '@/services/helper/helper.service';

export function createTranslation(vueInstance = Vue) {
  vueInstance.use(VueI18n);

  const helper: Helper = new Helper();

  let locale = helper.getCookie(process.env.VUE_APP_LOCALE_COOKIE);
  if (!locale) {
    locale = process.env.VUE_APP_LOCALE || 'en';
    helper.setCookie(process.env.VUE_APP_LOCALE_COOKIE, locale, helper.getDomain(), 90);
  }

  const messages: any = {
    en: {
      ...require('./en.json'),
      $vuetify: enLocale,
    },
    sc: {
      ...require('./sc.json'),
      $vuetify: scLocale,
    },
    tc: {
      ...require('./tc.json'),
      $vuetify: tcLocale,
    }
  };

  return new VueI18n({
    locale: locale,
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages,
  });
}
