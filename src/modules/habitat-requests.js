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

const errorsCheck = (result, attempting) => {
  // *todo* review this area; had been marked CRITICAL: never console.log anywhere here, as
  //  could disclose access codes, but I don't think that's true any more as Habitat
  // now is the only place those codes appear, and a similar guard is in effect. But
  // the range of possible errors, maybe a little wide, which keeps us anyway safe.
  // Do check that all necessary JSON.stringify in the line of logging, reporting if needed.
  // Primary GraphQL query error, and bad access keys have been checked, so the rest
  // is relatively unimportant, but for completeness of knowledge, and likely future
  // use, entire shakedown would be good.
  if (!result) {
    console.log(attempting + 'empty POST response')
    throw new Error ('empty POST response')
  } else if (typeof result.response !== 'object') { // got our benign hello world text instead...
    console.log(attempting + 'client isn\'t authorized')
    throw new Error ('client isn\'t authorized')
  } else if (result.errors) { // there can possibly be other errors
    console.log (attempting + 'result.errors: ' + JSON.stringify(result.errors))
    throw new Error (result.errors)
  } else if (result.response.fault) { // or Habitat can post fault
    console.log(attempting + 'result.response.fault: ' + result.response.fault)
    throw new Error(result.response.fault)
  } else if (result.response.errors) { // or Habitat can post fault
    console.log(attempting + 'result.response.errors: ' + result.response.fault)
    throw new Error(result.response.errors)
  } else if (result.fault) { // or we can post error
    // *todo* Not at all sure this one still has validity; result.response.fault definitely has,
    // *todo* and that is probably what this intended. Leaving in for release safety, but trace/discover
    console.log(attempting + 'result.fault: ' + result.fault)
    throw new Error(result.fault)
  }
}

const amplifyError = (e) => {
  return e + (e.message.includes('Network Error')
  || (e.message.includes('404'))
  || (e.message.includes('Cancel'))
    ? ' (check browser console for more information)'
    : '')
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
      errorsCheck(result, 'getting Algolia config: ')
      return result
    })
    .then (async result => {
      await store.dispatch('loadAlgoConfig', result) // always via dispatch
    })
    .catch(e => { // direct axios errors, or ours thrown from result
      store.dispatch ('setAlgoConfig', {
        ready: false,
        error: amplifyError(e)
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
      errorsCheck(result, 'retrieving Design info: ')
      return result
    })
    .then (async result => {
      store.dispatch('loadDesignRepo', {
        design: repoName,
        repo: result.response,
        errors: null
      })
      store.dispatch('setLastRepoName', repoName)
      store.dispatch('setRepoRequestReady', true)
    })
    .catch (e => { // direct axios errors, or ours thrown from result
      store.dispatch('setRepoRequestError', amplifyError(e))
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
