// here we gain the data that the Vuex store will distribute

import store from '../store'
import { safeEnv, postTo } from './habitat-protocol'

// this is the config identity Habitat should use, from those it has.
// Set locally for dev, normally on Netlify for each app instance
const configAccessIdentity = safeEnv(process.env.GRIDSOME_CONTENT_ACCESS_IDENTITY, 'content-team')

// this is the Habitaat this app client will use, for Algolia access, and for querying repos
// again, it may be set locally for dev, but normally on Netlify for each app instance
const habitatUrl = safeEnv(process.env.GRIDSOME_HABITAT_ACCESS, 'no-access')

// this is a quality that can be set in .env ONLY for local (localhost) development use, only with
// having also set habitatUrl to a _development_ Habitat. It will have been prepared, and you will know because

// When this is possible, \you'll have been told the development Habitat to use,
// and the developOnlyCode for it together.

// This will never the regular live Habitat, which in any case will never.
// allow your development environment to connect.
const developOnlyCode = // the null default is important here
  safeEnv(process.env.GRIDSOME_NEVER_ON_PRODUCTION_ONLY_DEV_NETLIFY_OR_SERVER_ACCESS, null)

const actualDevAccess = () => {
  // we consider the code valid if it's null -- as that's the signal that a normal, it will not be used
  let validCode = !developOnlyCode || developOnlyCode.length >= 31
  if (!validCode) {
    // keep the logics entirely separate; this is just to inform, and we are about safety
    // also, there can be more checks in future
    console.log ('improper developOnlyCode')
  }
  return validCode
    ? developOnlyCode
    : null
}

// Our purpose here: to gain Algolia config, for where this is used, to enable Finder
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
  const body = JSON.stringify({
    target: "finder",
    for: configAccessIdentity,
    devAccess: actualDevAccess() // which will normally be null, as Habitat knows
  })

  await postTo (habitatUrl, headers, body)
    .then (async result => {
      // CRITICAL: never console.log anywhere here, as could disclose access codes
      if (!result) {
        throw new Error ('empty POST response')
      } else if (typeof result.response !== 'object') { // got our benign hello world text instead...
        throw new Error ('client isn\'t authorized')
      } else if (result.errors) { // there can possibly be other errors
        throw new Error (result.errors)
      } else if (result.response.fault) { // or we can post error
        throw new Error (result.response.fault)
      } else {
        await store.dispatch('loadAlgoConfig', result) // always via dispatch
      }
    })
    .catch(e => { // direct axios errors, or ours thrown from result
      store.dispatch ('setAlgoConfig', {
        ready: false,
        error: e + (e.message.includes('Network Error')
          ? ' (check browser console for more information)'
          : '')
      })
    })
}

const retrieveDesign = async (repoName, branch) => {

  const headers = {
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify(
    {
            target: "viewer",
            name: repoName,
            branch: branch,
            date: (new Date()).getTime().toString(), // this is bogus; later from Vuex marking our data
            for: "content-team",
            devAccess: actualDevAccess() // which will normally be null, which Habitat knows
          })
  store.dispatch('setRepoRequestError', null) // clear before we attempt

  const repoResult = await postTo (habitatUrl, headers, body)
    .then (result => {
      if (!result) { // actual GraphQL errors -- and with GitHub, they can be there even with response
        throw new Error ('empty POST response')
      } else if (typeof result.response !== 'object') { // got our benign hello world text instead...
        throw new Error ('client isn\'t authorized')
      } else if (result.errors) { // there can possibly be other errors
        throw new Error (result.errors)
      }  else if (result.response.fault) { // internal operations faults
        throw new Error (result.response.fault)
      } else {
        store.dispatch('loadDesignRepo', {
          design: repoName,
          repo: result.response,
          errors: null
        })
        store.dispatch('setLastRepoName', repoName)
        store.dispatch('setRepoRequestReady', true)
      }
    })
    .catch (e => { // direct axios errors, or ours thrown from result
      console.log ('retrieveDesign: error: '+ e.message)
      store.dispatch('setRepoRequestError', e.message)
    })
}

// n.b. this is used only in certain special development cases where we want
// to avoid Habitat entirely, and .env-configure for Algolia. There probably
// aren't many circumstances in future for this, now that we have capability
// for a special local Habitat. *todo* So this code and its env may soon go away.

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

export { setAlgoliaConfig, retrieveDesign, actualDevAccess }
