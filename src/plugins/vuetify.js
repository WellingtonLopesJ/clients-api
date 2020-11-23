import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/i18n'
import '@/sass/overrides.sass'

Vue.use(Vuetify)

const theme = {
  primary: '#0B4F6C',
  secondary: '#9197AE',
  accent: '#EDFFEC',
  info: '#0B4F6C',
}

export default new Vuetify({
  lang: {
    t: (key, params) => i18n.t(key, params),
  },
  theme: {
    themes: {
      dark: theme,
      light: theme,
    },
  },
})
