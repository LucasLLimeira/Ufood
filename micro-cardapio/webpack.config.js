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
    port: 3001,
    hot: true,
    // Permite que o container (porta 3000) carregue este remote
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
  },

  output: {
    // URL pública necessária para o container localizar o remoteEntry.js
    publicPath: 'http://localhost:3001/',
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
      // Nome com que este micro se identifica para os outros
      name: 'cardapio',
      // Arquivo gerado que o container irá carregar remotamente
      filename: 'remoteEntry.js',
      // Componente exposto para consumo externo
      exposes: {
        './Cardapio': './src/App',
      },
      // Compartilha React como singleton para evitar duas instâncias em memória
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
