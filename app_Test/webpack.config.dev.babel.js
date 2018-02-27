import path from 'path';
import webpack from 'webpack';
import PostCSSImport from 'postcss-import'; // eslint-disable-line
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import combineLoaders from 'webpack-combine-loaders';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default () => {
  const Html = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    inject: 'body',
  });

  return {
    entry: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      'webpack/hot/dev-server',
      // 'babel-regenerator-runtime', // Allows use of generators in front-end
      path.resolve(__dirname, 'src/index.jsx'),
    ],
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    plugins: [
      new webpack.ProgressPlugin(),
      Html,
      new ExtractTextPlugin('styles.css', { allChunks: true }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
          WEBPACK: true,
        },
      }),
    ],
    resolve: {
      modules: ['node_modules', path.resolve(__dirname, 'src')],
      extensions: ['.js', '.jsx', '.json', 'postcss', 'css'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?/i,
          use: {
            loader: 'babel-loader',
          },
        },
        // PROD
        // {
        //   test: /\.css$/,
        //   use: ExtractTextPlugin.extract({
        //     fallback: 'style-loader',
        //     use: combineLoaders([
        //       {
        //         loader: 'css-loader',
        //         options: {
        //           modules: true,
        //           localIdentName: '[name]__[local]__[hash:base64:5]',
        //         },
        //       },
        //       'postcss-loader',
        //     ]),
        //   }),
        // },
        // DEV
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]__[hash:8]',
              },
            },
            'postcss-loader',
          ],
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 100000, // Anything larger than 10kb will be emitted as a separate file.
                mimetype: 'application/font-woff',
                name: 'assets/fonts/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'application/octet-stream',
                name: 'assets/fonts/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                mimetype: 'image/svg+xml',
                name: 'assets/images/[name].[hash:8].[ext]',
              },
            },
            'img-loader',
          ],
        },
        {
          test: /\.(jpe?g|png|gif|ico|ttf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                // name: '../assets/fonts/[name].[hash:8].[ext]',
                name: 'assets/images/[name].[hash:8].[ext]',
              },
            },
            'img-loader',
          ],
        },
      ],
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      watchContentBase: true,
      hot: true,
      progress: true,
      overlay: true,
    },
  };
};
