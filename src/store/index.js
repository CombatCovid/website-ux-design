import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence, { MockStorage } from 'vuex-persist'
import { safeEnv } from '../modules/habitat-protocol' // temporary
import { retrieveDesign } from '../modules/habitat-requests' // temporary

Vue.use(Vuex)

// helpers and local objects -- have to be this way; Vuex is not like a Vue component

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
    currentSummaryMarkdown: 'retrieving...',

    // GitHub API config
    currentGithubPersonalAuthKey: safeEnv(process.env.GRIDSOME_CC_SINGLE_AUTH,'not-set'),

    // config of repos
    currentRepoAccount: safeEnv(process.env.GRIDSOME_REPO_ACCOUNT,'not-set'),
    currentLastRepoName: null,
    // *todo* don't preset develop, soon...
    currentLastRepoBranch: safeEnv(process.env.GRIDSOME_REPO_BRANCH, 'develop'),

    // Algolia values
    currentAlgoSearchIndex: safeEnv(process.env.GRIDSOME_ALGO_SEARCH_INDEX, 'not-set'),
    currentAlgoAppId: safeEnv(process.env.GRIDSOME_ALGO_APPLICATION_ID, 'not-set'),
    currentAlgoSearchKey: safeEnv(process.env.GRIDSOME_ALGO_SEARCH_KEY, 'not-set'),
    currentAlgoAdminKey: safeEnv(process.env.GRIDSOME_ALGO_ADMIN_KEY, 'not-set'),
    currentAlgoIndexesList: safeEnv(process.env.GRIDSOME_ALGO_INDEXES_LIST, '{ "uninited": "not-set" }'),

    // Axios config
    currentAxiosWireTimeout: safeEnv(process.env.GRIDSOME_AXIOS_WIRE_TIMEOUT, 5000),

    // Algolia status
    currentAlgoliaConfigReady: false,
    currentAlgoliaConfigError: null,

    // RepoRequest status
    currentRepoRequestError: null,
    currentRepoRequestReady: false,
  },
  plugins: [
    vuexLocal.plugin // don't lose me; persistence happens here
  ],
  // not a Vue component, so no created(), etc..
  mutations:{
    PAGE_PATH:(state, value) => {
      state.currentPage = value;
    },

    // Change the state of language, for example
    // *todo* revisions here coming of several things. Actually handle errored repo, equally
    // slice rather than push when present, assure persist is enough but no more to find a
    // bookmark on a new browser, having listed it with at least a thumbnail first.
    loadRepo (context, namedDesign = null) {
      // *todo* this will get interesting as we start multiple memory, really using it to advantage
      if (namedDesign && namedDesign.repo) {
        const currentIndex =
          this.state.currentRepos.findIndex(repo => repo.name === namedDesign.design)
        // console.log('loadRepo: namedDesign: ' + namedDesign.design)
        // console.log('loadRepo: currentIndex: ' + currentIndex)
        if (currentIndex >= 0) {
          this.state.currentRepos =
            this.state.currentRepos.map ((repo, index) => {
              return index === currentIndex
                ? namedDesign.repo
                : repo
            })
        } else {
          this.state.currentRepos.push(namedDesign.repo)
        }
        // *todo* TEMP FIXUP HERE -> looks actually like difference between github and fauna
        // *todo* also take this opportunity to look into what's going on with repos - push w/o
        //  *todo* delete needs atom replace; it's just that the detector takes first gets us through.
        //  *todo* Leftovers to take care of now
        this.state.currentSummaryMarkdown = typeof namedDesign.repo.readMe === 'object'
          ? namedDesign.repo.readMe.text
          : namedDesign.repo.readMe
        // ****
      } else if(namedDesign && namedDesign.errors) {
        console.log('store loadRepo: errors: ' + JSON.stringify(namedDesign.errors) +
          ', context: ' + JSON.stringify(context))
      } else {
        console.log('store loadRepo: Error: no namedDesign!: context: '
          + JSON.stringify(context))
      }
    },
    setLastRepoDesignName (context, design) {
      this.state.currentLastRepoName = design
    },
    setRepoReqReady (context, status = false) {
      this.state.currentRepoRequestReady = status
    },
    setRepoReqError (context, error = null) {
      this.state.currentRepoRequestError = error
    },
    setAlgoConfigReady(context, ready = null) {
      this.state.currentAlgoliaConfigReady = ready
    },
    setAlgoConfigError (context, error = null) {
      this.state.currentAlgoliaConfigError = error
    },
    // *todo* we're keeping these until clear no dev .env sets are needed
    setAlgoAppId (context, appId = null) {
      this.state.currentAlgoAppId = appId
    },
    setAlgoSearchIndex (context, indexName = null) {
      this.state.currentAlgoSearchIndex = indexName
    },
    setAlgoSearchKey (context, searchKey = null) {
      this.state.currentAlgoSearchKey = searchKey
    },
    setAlgoSearchConfig(context, result = null) {
      if (result.errors) {
        this.state.currentAlgoliaConfigError = result.errors
      } else if (!result.response) {
        this.state.currentAlgoliaConfigError = 'setAlgoSearchConfig: no config provided!'
      } else {
        this.state.currentAlgoAppId = result.response.app
        this.state.currentAlgoSearchIndex = result.response.index
        this.state.currentAlgoSearchKey = result.response.read
        this.state.currentAlgoliaConfigReady = true
      }
    },

    // *todo* these, possibly other presets needing careful feed until Vuex reducer is sorted out
    setAlgoSearchIndexesList (context, indexesList = null) {
      this.state.currentAlgoIndexesList = indexesList
    },
    setCheckerBuilderReposInfo (context, repoInfo = null) {
      this.state.currentLastRepoName = repoInfo
    },
    // *todo* end reducer temporary sortings from above
  },
  actions:{
    setPagePath ({commit, state}, pagePath) {
      commit("PAGE_PATH", pagePath)
    },
    setAlgoConfig ({commit, state}, settings) {
      commit('setAlgoConfigReady', settings.ready)
      commit('setAlgoConfigError', settings.error)
    },
    loadAlgoConfig ({ commit, state}, result) {
      commit('setAlgoSearchConfig', result)
    },
    setLastRepoName ({ commit, state}, design) {
      commit('setLastRepoDesignName', design)
    },
    setRepoRequestReady ({ commit, state}, status) {
      commit('setRepoReqReady', status)
    },
    setRepoRequestError ({ commit, state}, result) {
      commit('setRepoReqError', result)
    },
    loadDesignRepo ({ commit, state}, designRepo) {
      commit ('loadRepo', designRepo)
    },
    async loadDesign ({ commit, state }, design, branch = 'develop') {
      if (!design || design.length <= 0) {
        console.log ('loadDesign: no design given to load!')
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
      // *todo* decide if we really want to set this here, or now, if unerred in retrieveDesign
      // commit('setLastRepoName', design) // this is where we remember it for next time

      // now we'll ask Habitat to give us the repo
      await retrieveDesign(design, branch)
    }
  },
  getters:{ // Dispatch current state values
    // data for the Viewer
    githubPersonalAuthKey: state => state.currentGithubPersonalAuthKey,
    designRepos: state => state.currentRepos,
    summaryMarkdown: state => state.currentSummaryMarkdown,

    // central project repo information
    repoAccount: state => state.currentRepoAccount,
    lastRepoName: state => state.currentLastRepoName,
    lastRepoBranch: state => state.currentLastRepoBranch,
    repoRequestReady: state => state.currentRepoRequestReady,
    repoRequestError: state => state.currentRepoRequestError,

    // tuning
    axiosWireTimeout: state => state.currentAxiosWireTimeout,

    // Algolia access information
    algoConfigReady: state => state.currentAlgoliaConfigReady,
    algoConfigError: state => state.currentAlgoliaConfigError,
    algoSearchIndex: state => state.currentAlgoSearchIndex,
    algoAppId: state => state.currentAlgoAppId,
    algoSearchKey: state => state.currentAlgoSearchKey,
    algoAdminKey: state => state.currentAlgoAdminKey, // null if not any, normal & correct
    algoIndexesList: state => {
      let list = []
      // console.log('initial indexes list: ' + state.currentAlgoIndexesList)
      try {
        list = JSON.parse(state.currentAlgoIndexesList)
      }
      catch (err) {
        list = 'Error: ' + err
        console.log('store: AlgoSearchIndexesList error: ' + err)
      }
      return list
    },
  }
})
