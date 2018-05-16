const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");
const rewireLess = require('react-app-rewire-less');
const theme = require("./src/custom.js");

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [ tsImportPluginFactory({
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      }) ]
    })
  };


  config = rewireLess.withLoaderOptions({
    //modifyVars: { "@primary-color": "#1DA57A","@layout-sider-background":"blue","@menu-dark-color" : "lightblue" },
    modifyVars : theme
  })(config, env);


  // config.externals= {
  //   'react': 'window.React',
  //   'react-dom':'window.ReactDOM'
  // }

  // config.plugins.push(
  //   new CopyWebpackPlugin([{ from: 'lib', to: 'lib' }])
  // )

  return config;
}