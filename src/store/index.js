import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence, { MockStorage } from 'vuex-persist'
import axios from 'axios'

import store from '~/store'

Vue.use(Vuex)

// helpers and local objects -- have to be this way; Vuex is not like a Vue component

const safeEnv = (value, preset) => { // don't use words like default...
  if (!value) {
    value = preset
  }
  return value
}

// as ever, non-browser must be catered for during build
const vuexLocal = (typeof window === 'undefined')
  ? new VuexPersistence({
      storage: new MockStorage() // their catering cart, completely hidden from documentation...
    })
  : new VuexPersistence({
      storage: window.localStorage,
      reducer: (state) => ({
        currentLastRepoName: state.currentLastRepoName, // just this, at first. later, much
      }),
    })

// here the store state composition. We'll soon put more complex objects in it

export default new Vuex.Store({
  state:{
    loading:false,
    language:"EN",
    currentPage:null,
    currentRepos:[],
    currentLastRepoName: null,
    currentSummaryMarkdown: 'retrieving...',

    // GitHub API config
    currentGithubPersonalAuthKey: process.env.GRIDSOME_CC_SINGLE_AUTH,

    // config of repos
    currentRepoAccount: process.env.GRIDSOME_REPO_ACCOUNT,
    currentRepoKey: process.env.GRIDSOME_REPO_KEY,
    currentRepoBranch: safeEnv(process.env.GRIDSOME_REPO_BRANCH, 'develop'),

    // Algolia presets
    currentAlgoSearchIndex: process.env.GRIDSOME_ALGO_SEARCH_INDEX,
    currentAlgoAppId: process.env.GRIDSOME_ALGO_APPLICATION_ID,
    currentAlgoSearchKey: process.env.GRIDSOME_ALGO_SEARCH_KEY,
    currentAlgoAdminKey: process.env.GRIDSOME_ALGO_ADMIN_KEY,
    currentAlgoIndexesList: process.env.GRIDSOME_ALGO_INDEXES_LIST,

    // Axios config
    currentAxiosWireTimeout: safeEnv(process.env.GRIDSOME_AXIOS_WIRE_TIMEOUT, 5000)
  },
  plugins: [
    vuexLocal.plugin // don't lose me; persistence happens here
  ],
  created () {
    if (this.state.currentAlgoAdminKey) {
      console.log('enabled for admin')
    }
    console.log('recovered state.currentLastRepoName: ' + state.currentLastRepoName)
  },
  mutations:{
    PAGE_PATH:(state, value) => {
      state.currentPage = value;
    },

    // Change the state of language, for example
    loadRepo (context, namedDesign = null) {
      // console.log ('loadRepo: namedDesign is ' + JSON.stringify(namedDesign))
      // console.log ('loadRepo: context is ' + JSON.stringify(context))

      // *todo* this will get interesting as we start multiple memory, really using it to advantage
      if (namedDesign && namedDesign.repo) {
        this.state.currentRepos.push(namedDesign.repo)
        this.state.currentSummaryMarkdown = namedDesign.repo.repository.readMe.text
        this.state.currentLastRepoName = namedDesign.design
      } else if(namedDesign && namedDesign.errors) {
        console.log('store loadRepo: errors: ' + JSON.stringify(namedDesign.errors) +
          ', context: ' + JSON.stringify(context))
      } else {
        console.log('store loadRepo: Error: no namedDesign!: context: '
          + JSON.stringify(context))
      }
    },
    setLastRepoName (context, design) {
      this.state.currentLastRepoName = design
    },
    setAlgoSearchIndex (context, indexName = null) {
      this.state.currentAlgoSearchIndex = indexName
    },

    // *todo* these, possibly other presets needing careful feed until Vuex reducer is sorted out
    setAlgoSearchIndexesList (context, indexesList = null) {
      this.state.currentAlgoIndexesList = indexesList
    },
    setCheckerBuilderReposInfo (context, repoInfo = null) {
      this.state.currentLastRepoName = repoInfo
    },
    // end reducer temporary sortings
  },
  actions:{

    loadDesign ({ commit, state }, design) {
      if (!design || design.length <= 0) {
        console.log ('loadDesign: no design given to load')
        // *todo* this will mostly work; fully when we browser-persist aspects of Vuex state
        const lastDesign = this.getters.lastRepoName
        if (lastDesign) {
          console.log('will try loading last repo seen: ' + lastDesign)
          design = lastDesign // that is, design to be used here
        } else {
          // *todo* remember to improve no-soap presentation on DesignDetail itself...
          return;
        }
      }
      // console.log('actual loadDesign:design: ' + design)
      store.commit('setLastRepoName', design) // this is where we remember it for next time

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

      const timeoutID = setTimeout(() => {
        source.cancel()
      }, this.getters.axiosWireTimeout)

      const repoName = design
      const branch = 'develop' // *todo* don't forget to parameteretize as menu comes in

      const repoQuery =
        `query repoQuery { 
  repository(name: "${repoName}", owner: "CombatCovid") {
    name
    nameWithOwner
    isPrivate
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

      const gitApiQueryUrl = 'https://api.github.com/graphql'
      const token = this.state.currentGithubPersonalAuthKey
      const headers = {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }

      // console.log('headers: ' + JSON.stringify(headers))
      const config = {
        method: 'post',
        url: gitApiQueryUrl,
        data: { query: repoQuery },
        headers: headers,
        timeout: this.getters.axiosWireTimeout + 1000,
        cancelToken: source.token
      }

      axios(config)
        .then(response => {
            commit('loadRepo', {
              design: design,
              repo: response.data.data,
              errors: null
            })
            commit('setLastRepoName', design)
          },
          error => {
            const nsg = 'repo[' + design+ '] retrieval error: ' + JSON.stringify(error)
            console.log(msg)
            commit('loadRepo', {
              design: design,
              repo: null,
              errors: msg
            })
          })
        .finally(function () {
          clearTimeout(timeoutID)
        })
    }
  },
  getters:{ // Dispatch current state values
    // data for the Viewer
    githubPersonalAuthKey: state => state.currentGithubPersonalAuthKey,
    designRepos: state => state.currentRepos,
    summaryMarkdown: state => state.currentSummaryMarkdown,

    // central project repo information
    repoAccount: state => state.currentRepoAccount,
    repoKey: state => state.currentRepoKey,
    repoBranch: state => state.currentRepoBranch,

    // tuning
    axiosWireTimeout: state => state.currentAxiosWireTimeout,

    // recovery
    lastRepoName: state => state.currentLastRepoName,

    // Algolia access information
    algoSearchIndex: state => state.currentAlgoSearchIndex,
    algoAppId: state => state.currentAlgoAppId,
    algoSearchKey: state => state.currentAlgoSearchKey,
    algoAdminKey: state => state.currentAlgoAdminKey, // null if not any, normal & correct
    algoIndexesList: state => {
      let list = []
      // console.log('initial: ' + state.currentAlgoIndexesList)
      try {
        list = JSON.parse(state.currentAlgoIndexesList)
      }
      catch (err) {
        list = 'Error: ' + err
        console.log('store.AlgoSearchIndexesList error: ' + err)
      }
      return list
    },
  }
})
