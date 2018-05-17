const path = require('path');

const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");
const rewireLess = require('react-app-rewire-less');
const theme = require("./src/custom.js");

const CopyWebpackPlugin = require('copy-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

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



  
 /*  config.entry = {
    index:[
      require.resolve('react-dev-utils/webpackHotDevClient'),
      require.resolve('./config/polyfills'),
      require.resolve('react-error-overlay'),
      'src/index.tsx'
    ],
    admin:[
      require.resolve('react-dev-utils/webpackHotDevClient'),
      require.resolve('./config/polyfills'),
      require.resolve('react-error-overlay'),
      "src/admin.tsx"
    ]
  }
  config.output ={
    pathinfo: true,
    path: path.join(__dirname, "build"),
    // This does not produce a real file. It's just the virtual path that is
    // served by WebpackDevServer in development. This is the JS bundle
    // containing code from all our entry points, and the Webpack runtime.
    filename: 'static/js/[name]bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: 'static/js/[name].chunk.js',
    // This is the URL that app is served from. We use "/" in development.
    publicPath: '/',
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  }

  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["index"],
      template: resolveApp('public/index.html'),
    }),
  );

  config.plugins.push(
    
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["admin"],
      template: resolveApp('public/admin.html'),
      filename: 'admin.html',
    }),
  ); */




  // config.externals= {
  //   'react': 'window.React',
  //   'react-dom':'window.ReactDOM'
  // }

  // config.plugins.push(
  //   new CopyWebpackPlugin([{ from: 'lib', to: 'lib' }])
  // )

  return config;
}