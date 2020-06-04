// here we gain the data that the Vuex store will distribbute

import store from '../store'
import { safeEnv, postTo } from './habitat-protocol'

const habitatUrl = safeEnv(process.env.GRIDSOME_HABITAT_ACCESS, 'no-access')
const configAccessIdentity = safeEnv(process.env.GRIDSOME_CONTENT_ACCESS_IDENTITY, 'content-team')
const localConfig = safeEnv(process.env.GRIDSOME_DEV_ONLY_ALGO_CONFIG, null)

const developmentAlgoliaConfig = async () => {

  if (!localConfig) {
    return false
  } else {
    console.log('Algolia: using local development config')
    try {
      const algoliaConfig = JSON.parse (localConfig)
      await store.dispatch('loadAlgoConfig', { response: algoliaConfig }) // always via dispatch
    } catch (e) {
      const msg = 'local config error: ' + e
      store.dispatch ('setAlgoConfig', {
        ready: false,
        error: msg
      })
      console.log(msg)
    }
    return true
  }
}

// see important notes. where this is used, in Finder
const setAlgoliaConfig = async () => {

  if (await developmentAlgoliaConfig()) {
    return
  }

  store.dispatch('setAlgoConfig', {
    ready: false,
    error: null
  })
  const headers = {
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify({ target: "finder", for: configAccessIdentity })

  await postTo (habitatUrl, headers, body)
    .then (async result => {
      if (!result.response) {
        throw result.errors // this looks a little tricky, but it is most correct...
      } else if (typeof result.response !== 'object') { // got our benign hello world text instead...
        throw new Error ('client isn\'t authorized')
      }
      await store.dispatch('loadAlgoConfig', result) // always via dispatch
    })
    .catch(e => {
      store.dispatch ('setAlgoConfig', {
        ready: false,
        error: e + (e.message.includes('Network Error')
          ? ' (check browser console for more information)'
          : '')
      })
    })
}

const retrieveDesign = async (repoName, branch) => {

  // console.log('retrieving repoView design')
  const headers = {
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify(
    {
            target: "viewer",
            name: repoName,
            branch: branch,
            date: (new Date()).getTime().toString(), // this is bogus; later from Vuex marking our data
            for: "content-team"
          })
  store.dispatch('setRepoRequestError', null) // clear before we attempt

  const repoResult = await postTo (habitatUrl, headers, body)
    .then (result => {
      // console.log('retrieveDesign: result: ' + JSON.stringify(result))
      if (!result.response) {
        throw result.errors // this may look tricky, but it is again, most correct...
      // true/false || here can force conveniently to see error for test
      } else if (typeof result.response !== 'object') { // got our benign hello world text instead...
        throw new Error ('client isn\'t authorized')
      }
      store.dispatch('loadDesignRepo', {
        design: repoName,
        repo: result.response,
        errors: null
      })
      store.dispatch('setLastRepoName', repoName)
      store.dispatch('setRepoRequestReady', true)
    })
    .catch (e => {
      console.log ('retrieveDesign: error: '+ e.message)
      store.dispatch('setRepoRequestError', e.message)
    })
}

export { setAlgoliaConfig, retrieveDesign }
