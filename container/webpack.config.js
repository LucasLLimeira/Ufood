const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  // Ponto de entrada assíncrono — necessário para o Module Federation negociar
  // a versão dos módulos compartilhados antes de carregar qualquer código React
  entry: './src/index.js',

  mode: 'development',

  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
    hot: true,
    historyApiFallback: true,
  },

  output: {
    publicPath: 'http://localhost:3000/',
    clean: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        // Transpila JSX e ES moderno para JavaScript compatível com browsers
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        // Pipeline CSS: PostCSS (Tailwind + Autoprefixer) → css-loader → style-loader
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      // Declara os remotes: nome_local → nome_remoto@URL_do_remoteEntry
      remotes: {
        cardapio: 'cardapio@http://localhost:3001/remoteEntry.js',
        pedido: 'pedido@http://localhost:3002/remoteEntry.js',
      },
      // Compartilha React como singleton para garantir uma única instância
      // mesmo com múltiplos micros carregados em paralelo
      shared: {
        react: { singleton: true, requiredVersion: '^18.2.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.2.0' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
