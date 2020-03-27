// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Discover Designs...',
  plugins: [
    {
      use: '@gridsome/vue-remark',
      options: {
        typeName: 'Documentation', // Required
        baseDir: './content/docs', // Where .md files are located
        pathPrefix: '/docs', // Add route prefix. Optional
        template: './src/templates/Docs.vue' // Optional
      }
    },
    {
      use: '@gridsome/source-graphql',
      options: {
        url: 'https://api.github.com/graphql',
        fieldName: 'gitapi',
        typeName: 'GitApi',
        headers: {
          Authorization: 'Bearer ' + process.env.CC_SINGLE_AUTH
        }
      },
    }
  ]
}
