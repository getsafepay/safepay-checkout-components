import { join, resolve } from 'path';
import TerserPlugin from "terser-webpack-plugin";
import { __dirname } from './dirname.js';
import { define } from './define.js';

export function getWebpackConfig({
  context = process.cwd(),
  entry = './src/index',
  filename,
  modulename,
  libraryTarget = 'umd',
  test = (process.env.NODE_ENV === 'test'),
  debug = test,
  minify = !test && !debug,
  options = {},
  vars = {},
  path = resolve('./dist'),
  env = (test ? 'test' : 'production'),
  optimize = (env !== 'local'),
  sourcemaps = minify,
  babelConfig = join(__dirname, '../.babelrc-browser')
}) {

  const enableSourceMap = sourcemaps && !test;
  const enableBeautify = debug || test || !minify;

  if (filename && !filename.endsWith('.js')) {
    if (minify && !filename.endsWith('.min')) {
      filename = `${filename}.min`
    }
    filename = `${filename}.js`
  }

  vars = {
    ...vars,
    __MIN__: minify,
    __TEST__: test,
    __FILE_NAME__: filename,
    __DEBUG__: debug,
    __ENV__: env,
    __LOCAL__: env === 'local',
    __DEV__: env === 'development',
    __SANDBOX__: env === 'sandbox',
    __PRODUCTION__: env === 'production'
  }

  const mode = (debug || test) ? 'development' : 'production';
  
  const plugins = [
    define(vars)
  ];

  const optimization = optimize ? {
    minimize:           true,
    concatenateModules: true,
    minimizer:          [
      new TerserPlugin({
        test:          /\.js$/,
        terserOptions: {
          warnings: false,
          compress: {
            pure_getters:  true,
            unsafe_proto:  true,
            passes:        3,
            join_vars:     minify,
            sequences:     minify,
            drop_debugger: !debug
          },
          output: {
            beautify: enableBeautify
          },
          mangle: minify ? true : false,
          sourceMap: enableSourceMap
        },
        parallel:  true,
      })
    ]
  } : {};

  if (enableSourceMap) {
    options.devtool = 'source-map';
  }

  const globalObject = `(typeof self !== 'undefined' ? self : this)`;

  const rules = [];

  rules.push({
    test:    /\.m?(j|t)sx?$/,
    exclude: /(dist)/,
    loader:  'babel-loader',
    options: {
      extends: babelConfig
    }
  }, {
    test: /\.svg$/,
    type: 'asset',
    use: 'svgo-loader'
  });

  const library = {
    name: modulename
  }

  if (libraryTarget) {
    library.type = libraryTarget
  }

  const output = {
    path,
    filename,
    library,
    globalObject,
    umdNamedDefine: true,
    pathinfo:       false
  };

  return {
    context,
    mode,
    entry,
    output,
    resolve: {
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx'],
      modules: [
        __dirname,
        'node_modules'
      ]
    },
    module: {
      rules
    },
    bail: true,
    optimization,
    plugins,
    ...options
  }
}