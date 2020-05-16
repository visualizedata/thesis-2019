module.exports = {
  devServer: {
    host: "localhost"
  },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    svgRule.uses.clear();

    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  },
  publicPath: process.env.NODE_ENV === "production" ? "/thesis2019/" : "/"
};
