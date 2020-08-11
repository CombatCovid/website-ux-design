// habitat-protocol lets us contact any of our sources, details taken care of
// n.b. Must always keep this file content the same, for both app and Habitat
import axios from 'axios';

const safeEnv = (value, preset) => { // don't use words like default...

  return typeof value !== 'undefined' && value
    ? value
    : preset
}

// postTo provides a promise with a _synchronous result_ from POST data; thus you must await it
// Note that there can be two kinds of errors.
//   - axios errors, such as 404, 500, can't resolve, reported as error in result object
//   - endpoint errors, as with GraphQL, which will report as data.errors in the result object
// Both of these are collapsed into a single errors element in the structure
// returned when you properly await postTo()

const postTo = async (url, headers, body) => {

  // normally this will never get hit -- would mean some kind of Netlify/Habitat hang
  // plain web didn't connect on bad url looks like handled by Algolia stream DNS result
  const axiosWireTimeout = Number(safeEnv (process.env.AXIOS_WIRE_TIMEOUT, 20000))

  const config = {
    method: 'post',
    url: url,
    data: body,
    headers: headers,
    timeout: axiosWireTimeout,
    validateStatus: status => true
  }

  let result = null

  return await axios(config)
    .then(response => {

      // because server HTTP responses show up here, not as error
      const connFault = response.status === 200
        ? response.fault // this is where we let Habitat say its own condition
        : response.status

      result = {
        response: response.data,
        fault: connFault,
        errors: response.errors // GraphQl always can have some, making this non-null
      }
      return result
    })
    // actually axios does need a catch here, for network errors like bad url
    .catch(err => {
      const msg = JSON.stringify(err.toString())
      result = { // this time it's due to axios report
        response: {}, // so we're treated as if no POST response in handling
        errors: null,
        fault: msg
      }
      return result
    })
}

//  the intent is that you will always check for result.error before using result
const handleResponseData = (responseData) => {
  let responseObj = { 'error': null }
  try {
    responseObj = Object.assign(responseObj, responseData)
  } catch (e) {
    // assure response is always opaque to aid security
    responseObj = Object.assign(responseObj, {
      error: 'protocol error: expected not returned.' // always no details, opaque
    })
  }
  return responseObj
}

export { safeEnv, postTo, handleResponseData }
