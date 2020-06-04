import Vue from 'vue';
import VueI18n from 'vue-i18n';
import enLocale from 'vuetify/es5/locale/en';

export function createLocale(vueInstance = Vue) {
  vueInstance.use(VueI18n);

  // the translations
  const messages: any = {
    en: {
      ...require('./_english.json'),
      $vuetify: enLocale,
    },
    tg: {
      ...require('./_tagalog.json'),
      $vuetify: enLocale,
    },
  };

  // localstorage check
  const lngKey: string = process.env.VUE_APP_LOCALE || '';
  let lng: string = process.env.VUE_APP_DEFAULT_LOCALE || 'en';
  if (window.localStorage.getItem(lngKey)) {
    lng = window.localStorage.getItem(lngKey) || 'en';
  } else {
    window.localStorage.setItem(lngKey, process.env.VUE_APP_DEFAULT_LOCALE || 'en');
  }

  return new VueI18n({
    locale: lng,
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    messages,
  });
}
