import Vue from 'vue'
import Vuex from 'vuex'
import store from '~/store'
import axios from 'axios'


// Import client to vuex to pass data to actions
// import { defaultClient as apolloClient } from '../main'

Vue.use(Vuex)

// helpers -- have to be this way; Vuex is not like a Vue component

const safeEnv = (value, preset) => { // don't use words like default...
  if (!value) {
    value = preset
  }
  return value
}

const repoQuery = `
  query RepoByName {
  repository(name: "${repoName}", owner: "CombatCovid") {
    readMe: object(expression: "${branch}:README.md") {
    ... on Blob {
        text
      }
    }
    summaryImg: object(expression: "${branch}:summary.jpg") {
      __typename
      commitResourcePath
      commitUrl
    ... on Blob {
        isBinary
        byteSize
        commitUrl
      }
    }
    docs: object(expression: "${branch}:docs") {
    ... on Tree {
        id
        entries {
          lang: name
          object {
          ... on Tree {
              entries {
                name
                #                 mode
                type
                object {
                ... on Blob {
                    text
                    isBinary
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`

export default new Vuex.Store({
  state:{
    loading:false,
    language:"EN",
    currentRepos:[],
    currentSummaryMarkdown: 'retrieving...',
    // may not need or separate these; initial ideas
    // selectedRepo:null,
    // repoDocs:[],
    // repoImages:[],

    // config of repos
    currentRepoAccount: process.env.GRIDSOME_REPO_ACCOUNT,
    currentRepoKey: process.env.GRIDSOME_REPO_KEY,
    currentRepoBranch: safeEnv(process.env.GRIDSOME_REPO_BRANCH, 'develop'),

    // Algolia presets
    currentAlgoIndex: process.env.GRIDSOME_ALGO_SEARCH_INDEX,
    currentAlgoAppId: process.env.GRIDSOME_ALGO_APPLICATION_ID,
    currentAlgoSearchKey: process.env.GRIDSOME_ALGO_SEARCH_KEY,
    currentAlgoAdminKey: process.env.GRIDSOME_ALGO_ADMIN_KEY,
    currentAlgoIndexesList: process.env.GRIDSOME_ALGO_INDEXES_LIST,

    // Axios config
    currentAxiosWireTimeout: safeEnv(process.env.GRIDSOME_AXIOS_WIRE_TIMEOUT, 5000)
  },
  created () {
    if (this.state.currentAlgoAdminKey) {
      console.log('enabled for admin')
    }
  },
  mutations:{
    // Change the state of language, for example
    loadRepo (context, design = null) {
      if (!design || design.length <= 0) {
        console.log ('loadRepo: no design given to load')
        return;
      }
      console.log ('loadRepo: design is ' + JSON.stringify(design))
      console.log ('loadRepo: context is ' + JSON.stringify(context))

      // all right, let's query the design with all parts we need off Github
      // *todo* first thing we'll get is the Summary, but soon all in one query, take off that in client

      // n.b. this is _essential_ logic to cause an actual timeout from
      // axios's hung promise if instead of a server answering, there is no
      // response at all. Without it, the app -- and the web browser --
      // until the alert comes up to shut down the window or tab.
      // Promise cancellation is done this way, at least by Axios now
      const CancelToken = axios.CancelToken
      const source = CancelToken.source(function (c) {
        console.log ('Cancelling as no connection occurred: ' + c)
      })

      setTimeout(() => {
        source.cancel()
      }, this.getters.axiosWireTimeout)

      const summaryDocUrl = 'https://raw.githubusercontent.com/CombatCovid/' +
        design + '/' + this.getters.repoBranch + '/README.md'
      // *todo* see about modules for this sort of thing, but also better to do it earlier in chain
      // Vue.htmlSanitize(design) + '/' + this.getters.repoBranch + '/README.md'

      const config = {
        timeout: this.getters.axiosWireTimeout + 1000,
        cancelToken: source.token
      }

      // console.log ('fetching summary doc from: ' + summaryDocUrl
      // + ', with timeout: ' + store.getters.axiosWireTimeout + 'ms.'

      axios.get(summaryDocUrl, config)
        .then(response => {
            console.log('retrieved summaryMarkdown: ' + response.data)
            this.state.currentSummaryMarkdown = response.data
          },
          error => {
            console.log('summaryMarkdown retrieval error: ' + JSON.stringify(error))
            this.currentSummaryMarkdown = 'summaryMarkdown retrieval error: ' + JSON.stringify(error)
          })
    }
  },
  actions:{
    // initiate asynchronous repo/s load, for example
    loadDesign ({ commit, state }, design) {
      console.log ('loadDesign: currentRepos: ' + JSON.stringify(state.currentRepos))
      commit('loadRepo', design)
    }
  },
  getters:{ // Dispatch current state values
    // data for the Viewer
    repos: state => state.currentRepos,
    summaryMarkdown: state => state.currentSummaryMarkdown,

    // central project repo information
    repoAccount: state => state.currentRepoAccount,
    repoKey: state => state.currentRepoKey,
    repoBranch: state => state.currentRepoBranch,

    // tuning
    axiosWireTimeout: state => state.currentAxiosWireTimeout,

    // Algolia access information
    algoIndexName: state => state.currentAlgoIndex,
    algoAppId: state => state.currentAlgoAppId,
    algoSearchKey: state => state.currentAlgoSearchKey,
    algoAdminKey: state => state.currentAlgoAdminKey, // null if not any, normal & correct
    algoIndexesList: state => {
      let list = []
      console.log('initial: ' + state.currentAlgoIndexesList)
      try {
        list = JSON.parse(state.currentAlgoIndexesList)
      }
      catch (err) {
        console.log('store.algoIndexesList error: ' + err)
      }
      return list
    },
  }
})
