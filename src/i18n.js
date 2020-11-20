import Vue from 'vue'
import VueI18n from 'vue-i18n'

import pt from 'vuetify/lib/locale/pt'
import en from 'vuetify/lib/locale/en'

Vue.use(VueI18n)

const messages = {
  en: {
    ...require('@/locales/en.json'),
  },
  pt: {
    ...require('@/locales/pt.json'),
    $vuetify: pt,
  },
}

export default new VueI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  messages,
})
