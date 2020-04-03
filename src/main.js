// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import InstantSearch from 'vue-instantsearch'

import DefaultLayout from '~/layouts/Default.vue'

const appMixins = {
  methods: {
    cleanFormatMarkdown (lines, site = 'https://github.com/') {
      // these are all for Markdown formats that don't get parsed by VueMarkDown
      // which is otherwise the best available
      // we do images first, as their match is more specific than similar-looking links
      lines = this.fixAllMarkdownImages(this.stripFrontMatter(lines), site)
      return this.fixUrlMarkdownLinks(lines)
    },
    stripFrontMatter: function (lines) {
      // *todo* later some way that VueMarkdown handles this itself? Not apparently...
      return lines.replace(/---\n.+---\n/gs, '')
    },
    fixUrlMarkdownLinks (lines) {
      // *todo* add to this alternate fix for in-folder local images,
      // which also don't get parsed
      return lines.replace(/[^\!]\[(.*)\]\s?\((.*)\)/gmi,
        '<a href="$2" target="_blank" rel="noreferrer noopener">$1</a>')
    },
    fixAllMarkdownImages (lines, site = 'https://github.com/') {
      // this preserves necessary order dependence
      // we allow fixUrlPathedMarkdownImages() to match any link, http/s or not
      // this is so a link without a protocol will also be matched
      // thus the more specific fixLocalPathedMarkdownImages() must run first
      lines = this.fixLocalPathedMarkdownImages(lines, site)
      return this.fixUrlPathedMarkdownImages(lines, site)
    },
    fixLocalPathedMarkdownImages (lines, site = 'https://github.com/') {
      lines = lines.replace(/\!\[(.*)\]\s?\([\.\/]+(.*)\)/gmi,
        `<img src="${site}/$2" target="_blank" class='md-image-fit'><p class="md-caption-fit">$1</p>`)
      return lines
    },
    fixUrlPathedMarkdownImages (lines, site = 'https://github.com/') {
      lines = lines.replace(/\!\[(.*)\]\s?\((.*)\)/gmi,
        `<img src="${site}/$2" target="_blank" class='md-image-fit'>`)
      return lines
    },
    spaceDashes: function (str) {
      return str.replace(/[-]/g, ' ')
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
