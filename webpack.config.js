const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const asset = (file) => path.resolve('src/assets', file || '');
const publicDir = (file) => path.resolve('public', file || '');

/**
 * The Twilight watcher pushes local changes to the connected store while
 * `npm run watch` is running. It is only meaningful for a live dev session, so
 * it is loaded lazily and skipped when the CLI context is not available.
 */
const themeWatchers = () => {
  if (process.env.ZIRAR_DISABLE_WATCHER === '1') {
    return [];
  }

  try {
    const ThemeWatcher = require('@salla.sa/twilight/watcher.js');
    return [new ThemeWatcher()];
  } catch (error) {
    console.warn('[zirar] Twilight watcher is not available, skipping it.', error.message);
    return [];
  }
};

module.exports = {
  entry: {
    app: [asset('styles/app.scss'), asset('js/wishlist.js'), asset('js/app.js'), asset('js/blog.js')],
    home: asset('js/home.js'),
    'product-card': asset('js/partials/product-card.js'),
    'main-menu': asset('js/partials/main-menu.js'),
    'wishlist-card': asset('js/partials/wishlist-card.js'),
    'add-product-toast': asset('js/partials/add-product-toast.js'),
    'digital-files': asset('js/partials/digital-files.js'),
    checkout: [asset('js/cart.js'), asset('js/thankyou.js')],
    pages: [asset('js/loyalty.js'), asset('js/brands.js')],
    product: [asset('js/product.js'), asset('js/products.js')],
    order: asset('js/order.js'),
    testimonials: asset('js/testimonials.js'),
  },
  output: {
    path: publicDir(),
    clean: true,
    chunkFilename: '[name].[contenthash].js',
  },
  stats: { modules: false, assetsSort: 'size', assetsSpace: 50 },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/(node_modules)/, asset('js/twilight.js')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'postcss-loader',
          // `api: 'modern'` keeps us off Dart Sass's deprecated legacy JS API.
          { loader: 'sass-loader', options: { api: 'modern' } },
        ],
      },
    ],
  },
  plugins: [
    ...themeWatchers(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({ patterns: [{ from: asset('images'), to: publicDir('images') }] }),
  ],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
};
