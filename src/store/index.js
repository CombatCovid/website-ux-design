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

    // GitHub API config
    currentGithubPersonalAuthKey: process.env.GRIDSOME_CC_SINGLE_AUTH,

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
    loadRepo (context, namedDesign = null) {
    // console.log ('loadRepo: namedDesign is ' + JSON.stringify(namedDesign))
    // console.log ('loadRepo: context is ' + JSON.stringify(context))

    // *todo* this will get interesting as we start multiple memory, really using it to advantage
      this.state.currentRepos.push(namedDesign.repo)
    }
  },
  actions:{
    // initiate asynchronous repo/s load, for example
    loadDesign ({ commit, state }, design) {

      if (!design || design.length <= 0) {
        console.log ('loadDesign: no design given to load')
        return;
      }

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

      let timeoutID = setTimeout(() => {
        source.cancel()
      }, this.getters.axiosWireTimeout)

      const summaryDocUrl = 'https://raw.githubusercontent.com/CombatCovid/' +
        design + '/' + this.getters.repoBranch + '/README.md'
      // *todo* see about modules for this sort of thing, but also better to do it earlier in chain
      // we do it for now back where the repoBranch is asked for
      // Vue.htmlSanitize(design) + '/' + this.getters.repoBranch + '/README.md'

      let config = {
        timeout: this.getters.axiosWireTimeout + 1000,
        cancelToken: source.token
      }

      // console.log ('fetching summary doc from: ' + summaryDocUrl
      // + ', with timeout: ' + store.getters.axiosWireTimeout + 'ms.'

      axios.get(summaryDocUrl, config)
        .then(response => {
            // console.log('retrieved summaryMarkdown: ' + response.data)
            this.state.currentSummaryMarkdown = response.data
          },
          error => {
            console.log('summaryMarkdown retrieval error: ' + JSON.stringify(error))
            this.currentSummaryMarkdown = 'summaryMarkdown retrieval error: ' + JSON.stringify(error)
          })
        .finally(function () {
          clearTimeout(timeoutID)
        })

      // and now let's do that for the full repo query

      const repoName = design
      const branch = 'develop' // *todo* don't forget to parameteretize as menu comes in

      // const repoQuery = `query { hello }`
      // const repoQuery = `query { repository(name: "${repoName}", owner: "CombatCovid") { name }}`
      const repoQuery =
        `query repoQuery { 
  repository(name: "${repoName}", owner: "CombatCovid") {
    name
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

      console.log('headers: ' + JSON.stringify(headers))
      config = {
        method: 'post',
        url: gitApiQueryUrl,
        data: { query: repoQuery },
        headers: headers,
        timeout: this.getters.axiosWireTimeout + 1000,
        cancelToken: source.token
      }
      // console.log('config: ' + JSON.stringify(config))

      timeoutID = setTimeout(() => {
        source.cancel()
      }, this.getters.axiosWireTimeout)

      axios(config)
        .then(response => {
            commit('loadRepo', {
              design: design,
              repo: response.data.data,
              error: null
            })
          },
          error => {
            const nsg = 'repo[' + design+ '] retrieval error: ' + JSON.stringify(error)
            console.log(msg)
            commit('loadRepo', {
              design: design,
              repo: null,
              error: msg
            })
          })
        .finally(function () {
          clearTimeout(timeoutID)
        })
      // console.log ('loadDesign: currentRepos: ' + JSON.stringify(state.currentRepos))
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
