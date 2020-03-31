// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import InstantSearch from 'vue-instantsearch'

import DefaultLayout from '~/layouts/Default.vue'

const appMixins = {
  methods: {
    cleanFormatMarkdown (lines) {
      // in case we have other operations to do, like properly
      // *todo* formatting included [name](url) links if VueMarkdown doesn't???
      // *todo* but a more complete markdown converter may be appearing on the horizon.
      return this.fixMarkdownLinks(this.stripFrontMatter(lines))
    },
    stripFrontMatter: function (lines) {
      // *todo* later some way that VueMarkdown handles this itself? Not apparently...
      return lines.replace(/---\n.+---\n/gs, '')
    },
    fixMarkdownLinks (lines) {
      // *todo* add to this alternate fix for in-folder local images,
      // which also don't get parsed
      return lines.replace(/[\[](.*)[\]]\s[[\(](.*)[\)]/,
        '<a href="$2" target="_blank" rel="noreferrer noopener">$1</a>')
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
