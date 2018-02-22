import path, { extname } from 'path'; // eslint-disable-line
import glob from 'glob-all'; // eslint-disable-line
import CSSNext from 'postcss-cssnext'; // eslint-disable-line
import PostCSSImport from 'postcss-import'; // eslint-disable-line
// import PostCSSMixins from 'postcss-mixins'; // eslint-disable-line
import PostCSSSmartAsset from 'postcss-smart-asset'; // eslint-disable-line
import PostCSSSVG from 'postcss-svg'; // eslint-disable-line
import PostCSSURLMapper from 'postcss-url-mapper'; // eslint-disable-line
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line
import PurifyCSSPlugin from 'purifycss-webpack'; // eslint-disable-line
import { getIfUtils, removeEmpty } from 'webpack-config-utils'; // eslint-disable-line

/*
########################################
                        Configs

Dev and prod configs for handling CSS
########################################
*/
const prodCSS = () =>
  ExtractTextPlugin.extract({
    use: [
      {
        loader: 'css-loader',
        options: {
          // minimize: true,
          // sourceMap: true,
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]__[local]__[hash:8]',
          // url: false,
          // import: false,
          // root: '/',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            PostCSSImport, // ({ addDependencyTo: 'webpack' }) - Seems deprecated
            CSSNext({
              browsers: [
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'last 2 Safari versions',
                'last 2 Edge versions',
                'last 2 ChromeAndroid versions',
                'last 2 iOS versions',
                'not < 0.5%',
              ],
              features: {
                applyRule: false, // Deprecated feature, so turn it off.
                customProperties: false, // Deprecated feature, so turn it off.
              },
            }),
          ],
          sourceMap: true,
        },
      },
    ],
  });
const devCSS = [
  'style-loader',
  {
    loader: 'css-loader', // Also allows url-loader to find images
    options: { importLoaders: 1, },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [
        PostCSSImport, // ({ addDependencyTo: 'webpack' }) - Seems deprecated
        // PostCSSMixins,
        CSSNext({
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Safari versions',
            'last 2 Edge versions',
            'last 2 ChromeAndroid versions',
            'last 2 iOS versions',
            'not < 0.5%',
          ],
          features: {
            applyRule: false, // Deprecated, so turning off.
            customProperties: false, // Deprecated, so turning off.
          },
        }),
      ],
    },
  },
];
/*
########################################
                        Plugins
########################################
*/
const extractCSS = new ExtractTextPlugin({
  allChunks: true, // Needed to work with CommonsChunkPlugin to extract the CSS from those extracted chunks.
  filename: 'styles.[contenthash:8].css',
});
const purifyCSS = new PurifyCSSPlugin({
  paths: glob.sync([
    path.join(__dirname, '../../../src/**/*.js'),
    path.join(__dirname, '../../../src/**/*.html'),
  ]),
  minimize: true,
});
/*
########################################
              Exported Webpack Config
########################################
*/
export default env => {
  const { ifProduction, } = getIfUtils(env);

  return {
    module: {
      rules: [
        {
          test: /\.postcss($|\?)/i,
          exclude: /node_modules/,
          use: ifProduction(prodCSS(extractCSS), devCSS),
        },
      ],
    },
    plugins: removeEmpty([ifProduction(extractCSS), purifyCSS,]), // purifyCSS must come after extractCSS
  };
};
