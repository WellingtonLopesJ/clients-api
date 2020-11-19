module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 3000,
  },

  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },

  chainWebpack: config => {
    config.module.rules.delete('eslint')
  },
}
