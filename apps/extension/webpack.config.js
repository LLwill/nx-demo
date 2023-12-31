const { composePlugins, withNx } = require('@nx/webpack');
const webpack = require('webpack');
const { withReact } = require('@nx/react');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const { workspaceRoot } = require('@nx/devkit');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const WebextensionPlugin =
  require('@webextension-toolbox/webpack-webextension-plugin').default;

const appPath = path.resolve(workspaceRoot, 'apps/extension');

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

function getClientEnvironment() {
  // Grab NX_* environment variables and prepare them to be injected
  // into the application via DefinePlugin in webpack configuration.
  const NX_APP = /^NX_/i;

  const raw = Object.keys(process.env)
    .filter((key) => NX_APP.test(key))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, {});

  // Stringify all values so we can feed into webpack DefinePlugin
  return {
    'process.env': Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };
}

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config, { options, context }) => {
  const { outputPath, projectRoot, watch } = options;
  // console.log(options, 'composePlugins');
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  const __config = merge(config, {
    // target: ['node'],
    entry: {
      background: './src/background/index.ts',
    },
    output: {
      filename: '[name].js',
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(workspaceRoot, `${projectRoot}/public`),
            to: path.resolve(outputPath),
          },
          {
            from: path.resolve(workspaceRoot, `${projectRoot}/manifest.json`),
            to: path.resolve(outputPath),
          },
        ],
      }),
      new webpack.DefinePlugin({
        ...getClientEnvironment(),
        global: 'globalThis',
      }),
      new NodePolyfillPlugin(),
      watch &&
        new WebextensionPlugin({
          vendor: 'chrome',
          autoreload: true,
          quiet: true,
        }),
    ],
    module: {
      rules: [
        {
          test: lessRegex,
          use: [
            {
              loader: require.resolve('style-loader'),
              options: {
                insert: function (element) {
                  var __ml_styles_dom__ = document.getElementById(
                    '__xm_shadow_dom_style__'
                  );
                  if (__ml_styles_dom__) {
                    __ml_styles_dom__.appendChild(element);
                  } else {
                    const styleDiv = document.createElement('div');
                    styleDiv.id = '__xm_shadow_dom_style__';
                    styleDiv.appendChild(element);
                    document.body.appendChild(styleDiv);
                  }
                },
              },
            },
            {
              loader: require.resolve('css-loader'),
            },
            {
              loader: require.resolve('less-loader'),
            },
          ],
        },
      ],
    },
  });
  return __config;
});
