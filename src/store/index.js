import Vue from 'vue'
import Vuex from 'vuex'

// import { gql } from 'apollo-boost'

// Import client to vuex to pass data to actions
// import { defaultClient as apolloClient } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    loading:false,
    language:"EN",
    repoList:[],
    selectedRepo:null,
    repoDocs:[],
    repoImages:[],
  },
  mutations:{
    // Change the state of language
  },
  actions:{
    // Change the

  },
  getters:{
    // Dispatch from carousel
  }
})
