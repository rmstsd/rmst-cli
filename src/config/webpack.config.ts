import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import dirFilename from '../utils/dirFilename.js'

export default function webpackConfig(): webpack.Configuration {
  const entry = path.resolve(process.cwd(), 'src', 'index.ts')
  console.log('entry', entry)

  const { __dirname } = dirFilename()

  return {
    entry,
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index_bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${process.cwd()}/public/index.html`
      })
    ],

    mode: 'development',
    devtool: 'source-map',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    stats: 'errors-warnings',
    infrastructureLogging: {
      level: 'none'
    },
    // 配置模块规则
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: [['@babel/plugin-proposal-decorators', { version: '2023-01' }]]
          },
          exclude: '/node-modules/'
        }
      ]
    }
  }
}
