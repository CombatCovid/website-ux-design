// this is it's own module, importing rather than included in habitat-requests,
// so that we keep it entirely separate from normal app operational code.
// Instead, it goes into unique key protected admin tool Builder

import { postTo } from './habitat-protocol'
import { actualDevAccess } from './habitat-requests'

// *todo* this is borrowed straight from prototype; functionality and cleanliness steps apropos...
const requestFaunaInit = async (faunaDbName) => {
  console.log('posting initialize, boss')
  // const home = 'https://home.narrationsd.com/'
  const home = 'http://localhost:9000/.netlify/functions/home' // *todo* choosable for Builder
  const request = {
    target: 'initialize',
    name: faunaDbName,
    time: Date.now().toString(),
    devAccess: actualDevAccess() // which will normally be null, which Habitat knows
  }
  console.log('request time: ' + request.time)
  const headers = {'Content-Type': 'application/json'}

  await postTo(home, headers, request)
    .then((result) => {
      console.log('initialize: ' + JSON.stringify(result.response))
    })
    .catch(e => {
      console.log('initialize error: ' + e)
    })
}

export {requestFaunaInit}
