import Vue from 'vue'
import Vuex from 'vuex'
import store from '~/store'

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
    repoList:[],
    selectedRepo:null,
    repoDocs:[],
    repoImages:[],

    // config of repos
    currentRepoAccount: process.env.GRIDSOME_REPO_ACCOUNT,
    currentRepoKey: process.env.GRIDSOME_REPO_KEY,
    currentRepoBranch: safeEnv(process.env.GRIDSOME_REPO_BRANCH, 'master'),

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
      console.log('ready for admin')
    }
  },
  mutations:{
    // Change the state of language
  },
  actions:{
    // Change the

  },
  getters:{ // Dispatch current state values

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
