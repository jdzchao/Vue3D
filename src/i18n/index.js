import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

// import custom I18N
import zhcn from './zhcn.yml'
import en from './en.yml'

Vue.locale('zhcn', Object.assign(zhcn));
Vue.locale('en', Object.assign(en));

function SetLocale(locale) {
  Vue.config.lang = locale;
}

const i18n = {
  SetLocale: SetLocale
};

export default i18n;
