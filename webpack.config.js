const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
// const PROD = JSON.parse(process.env.PROD_ENV || '0');

const terserOptions = {};

module.exports = {
  target: 'web',
  mode: 'production',
  // entry: './src/Nino/nino.ts',
  entry: './src/game/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'nino.js',
    path: path.resolve(__dirname, 'public/js')
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            properties: {
              reserved: ['driveTo']
            }
          }
        }
      })
    ]
  }
};
