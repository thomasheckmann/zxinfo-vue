//const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  /*
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()],
  },*/
  transpileDependencies: ["vuetify"],
  lintOnSave: true,
pluginOptions: {
    compression:{
      brotli: {
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          level: 11,
        },
        minRatio: 0.8,
      },
      gzip: {
        filename: '[path][base].gz',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      }
    }
  }
};
