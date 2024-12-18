const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');
const { DefinePlugin } = require('webpack')

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/invoice-generator-api'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
      transformers: [
      {
         name: '@nestjs/swagger/plugin',
          options: {
            dtoFileNameSuffix: ['.dto.ts', '.entity.ts'],
         },
        },
      ],
    }),

  ],
};