// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import DefaultLayout from '~/layouts/Default.vue'



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


  Vue.use(Vuetify)

  appOptions.vuetify = new Vuetify(opts);

  Vue.component('Layout', DefaultLayout)
}
