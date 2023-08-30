const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const { merge } = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const { workspaceRoot } = require('@nx/devkit');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  withReact(),
  (config, { options }) => {
    // Update the webpack config as needed here.
    // e.g. `config.plugins.push(new MyPlugin())`
    return merge(config, {
      entry: {
        content: './src/main.tsx',
      },
      output: {
        filename: '[name].js',
      },
      plugins: [
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(workspaceRoot, 'apps/extension/public'),
              to: path.resolve(workspaceRoot, 'dist/apps/extension'),
            },
            {
              from: path.resolve(workspaceRoot, 'apps/extension/manifest.json'),
              to: path.resolve(workspaceRoot, 'dist/apps/extension'),
            },
          ],
        }),
      ],
    });
  }
);
