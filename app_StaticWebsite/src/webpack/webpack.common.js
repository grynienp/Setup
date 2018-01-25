import path from 'path';
import DotenvWebpackPlugin from 'dotenv-webpack'; // eslint-disable-line
import dotEnv from 'dotenv-safe'; // eslint-disable-line
import pkg from '../../package.json';

/*
########################################
                        Constants
########################################
*/
// Used just within this particular config file.
const env = dotEnv.load({
  path: path.resolve(__dirname, './../env/common.env'),
  sample: path.resolve(__dirname, './../env/common.example.env')
}).parsed;

// Make webpack add these to the program-wide process.env object.
const dotEnvWebpack = new DotenvWebpackPlugin({
  path: path.resolve(__dirname, '../env/common.env'),
  safe: false
});

// Make the paths cross-platform and then export them out for the higher-level configs.
function setPaths() {
  const SRC_FULL_PATH = path.resolve(__dirname, '../../', env.SRC);

  return {
    SRC_FULL_PATH,
    VERSION: pkg.version
  };
}
const PATHS = setPaths();
module.exports.PATHS = PATHS;

/*
########################################
              Exported Webpack Config
########################################
*/
module.exports.config = {
  target: env.platform,

  entry: {
    main: [
      'babel-polyfill', // Imports polyfills from babel-polyfill based on the given browserlist (ion this project, located in package.json).
      // 'core-js/es6/promise', // Shim for dealing with Promise-based code that features like Code Splitting writes to weback's bootstrap after it processes the loaders. -> Handled in babelLoader's 'transform-runtime' ??
      path.join(PATHS.SRC_FULL_PATH, 'js/main.js')
    ]
    // page: [
    //   'babel-polyfill',
    //   'core-js/es6/promise',
    //   path.join(PATHS.SRC_FULL_PATH, 'js/page.js')
    // ]
  },

  // Prevents weird fs errors. See 'Weird Findings' #6
  externals: {
    fs: 'commonjs fs'
  },

  // node: {
  //   fs: 'empty'
  //   // fs: 'commonjs fs'
  // },

  // Allow absolute paths in imports.
  resolve: {
    modules: ['node_modules', PATHS.SRC_FULL_PATH],
    extensions: ['.js']
  }

  // plugins: []
};
