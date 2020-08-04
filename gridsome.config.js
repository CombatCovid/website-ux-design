
const webpack = require('webpack')
const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0

const sidebarConfig = require ('./sidebar.config.js');

const tailwind = require('tailwindcss');
// const purgecss = require('@fullhuman/postcss-purgecss');

const postcssPlugins = [tailwind()];
// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'CombatCovid',
  // pathPrefix: '/SPA-website', // NO NO NO NO NO! At least for general use. Completely explodes the build manifest

  settings:{
    sidebar: sidebarConfig,
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content',
        path: '**/*.md',
        typeName: 'Docs',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['noopener', 'noreferrer'],
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    }
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          GRIDSOME_CC_APP_VERSION: '"' + version + '"'
        }
      })
    ]
  }
}
