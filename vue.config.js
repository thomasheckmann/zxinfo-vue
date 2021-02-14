//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
//const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");

module.exports = {
  /*
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()],
    plugins: [new BundleAnalyzerPlugin()],
  },*/
  transpileDependencies: ["vuetify"],
  lintOnSave: false,
};
