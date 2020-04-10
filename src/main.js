// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import InstantSearch from 'vue-instantsearch'

import DefaultLayout from '~/layouts/Default.vue'

const appMixins = {
  methods: {
    cleanFormatMarkdown (lines,
                         site = 'https://github.com/',
                         gitUrlRepoFolder = 'need repoFolder') {
      // these are all for Markdown formats that don't get parsed by VueMarkDown
      // which is otherwise the best available
      // we do images first, as their match is more specific than similar-looking links
      // *todo* need also to fix docs.md so they are not links...!
      lines = this.fixAllMarkdownImages(this.stripFrontMatter(lines), site, gitUrlRepoFolder)
      return this.fixAllWebLinks(lines, site, gitUrlRepoFolder)
    },
    stripFrontMatter: function (lines) {
      // *todo* later some way that VueMarkdown handles this itself? Not apparently...
      return lines.replace(/---[-]*\n.+---\n/gs, '')
    },
    fixAllWebLinks (lines, site, gitUrlRepoFolder) {
      // this preserves necessary order dependence
      lines = this.fixDirectInlineWebLinks(lines, site, gitUrlRepoFolder)
      lines = this.fixUrlMarkdownLinks(lines, site, gitUrlRepoFolder)
      lines = this.fixLocalPathedMarkdownLinks(lines, site, gitUrlRepoFolder)
      return lines
    },
    fixLocalPathedMarkdownLinks (lines, site, gitUrlRepoFolder) {
      // *todo* as we discover how
      // lines = lines.replace(/([^\!]|^)\[\s*([\w-_\s]+[^\[])*\s*\]\s*\([\.\/]+([^\)]*)\s*\)/gmi,
      //   ' <a href="' + `${gitUrlRepoFolder}` + '$3" target="_blank" rel="noreferrer noopener">$2</a>')
      lines = lines.replace(/([^\!]|^)\[\s*([\w-_\s]+[^\[])*\s*\]\s*\([\.\/]+([^\)]*)\s*\)/gmi,
        ' <a href="' + `${gitUrlRepoFolder}` + '$3" target="_blank" rel="noreferrer noopener">$2</a>')
      // console.log('fixlocalpathedlinks:gitRepoUrLFolder: ' + gitUrlRepoFolder)
      // console.log('fixlocalpathedlinks: ' + lines)
      return lines
    },
    fixUrlMarkdownLinks (lines) {
      // which also don't get parsed
      lines = lines.replace(/([^\!]|^)\[\s*(\w.*)\]\s*\(\s*(\w.*)\s*\)/gmi,
        '<a href="$3" target="_blank" rel="noreferrer noopener"> $2</a>')
      // console.log('fixUrlMarkdownLinks: |' + lines + '|')
      return lines
    },
    fixDirectInlineWebLinks (lines) {
      // which also don't get parsed
      return lines.replace(/href\s?\=\s?['"](.*)['"]/gmi,
        '<a href="$1" target="_blank" rel="noreferrer noopener"> $1</a>')
    },
    fixAllMarkdownImages (lines, site, gitUrlRepoFolder) {
      // this preserves necessary order dependence
      // we allow fixUrlPathedMarkdownImages() to match any link, http/s or not
      // this is so a link without a protocol will also be matched
      // thus the more specific fixLocalPathedMarkdownImages() must run first
      lines = this.fixLocalPathedMarkdownImages(lines, site, gitUrlRepoFolder)
      return this.fixUrlMarkdownImages(lines, site, gitUrlRepoFolder)
    },
    fixLocalPathedMarkdownImages (lines, site, gitUrlRepoFolder) {
      lines = lines.replace(/\!\[(.*)\]\s?\([\.\/]+(.*)\)/gmi,
        ` <img src="${site}/$2" target="_blank" class='md-image-fit'><p class="md-caption-fit"> $1</p>`)
      return lines
    },
    fixUrlMarkdownImages (lines, site = 'https://github.com/') {
      lines = lines.replace(/\!\[(.*)\]\s?\((\w.*)\)/gmi,
        ` <img src="${site}/$2" target="_blank" class='md-image-fit'>`)
      return lines
    },
    safeImageFileType (fileName) {
      return fileName.search(/jpg|png|jpeg|gif/) > 0
    },
    spaceDashes: function (str) {
      return str.replace(/[-_]/g, ' ') // consider _ to be dash, to be friendly, low friction
    },
    titleCase: function (str) {
      // thanks for saving time: https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
      return str.toLowerCase().split(' ').map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      }).join(' ');
    },
    htmlSanitize: function (str) {
      // be careful to include the g -- or miss further bad htmls following an disallowed one
      const cleared = str.replace(/<(?!a|\/a|img\s*\/?)[^>]+>/g, "")
      // when testing
      // console.log('cleared: ' + cleared)
      return cleared
    },
    unscopeBasisMarkup (text) {
      return text
        .replace(/<h([\d])/ig, '<h$1 class="h$1-unscoped"')
        .replace(/<li/ig, '<li class="li-unscoped"')
        .replace(/<p/ig, '<p class="p-unscoped"')
        // *todo* add to similarly as needed -- carefully
    }
  }
}

export default function (Vue, { router, head, isClient, appOptions }) {
  // Set default layout as a global component
  const opts = {
    icons: {
      iconfont: 'mdiSvg',
    },
    theme: {
      options: { customProperties: true },
      themes: {
        light: {
          primary: '#040404',
          secondary: '#0c0c0c',
          accent: '#767f94',
        },
      },
    },
  };

  Vue.mixin(appMixins)
  Vue.use(Vuetify)
  Vue.use(InstantSearch)

  appOptions.vuetify = new Vuetify(opts);
  Vue.component('Layout', DefaultLayout)
}
