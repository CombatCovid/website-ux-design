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

  const axiosWireTimeout = Number(safeEnv (process.env.AXIOS_WIRE_TIMEOUT, 5000))

  // n.b. the cancel token is _essential_ logic to cause an actual timeout from
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
  }, axiosWireTimeout)

  // console.log('headers: ' + JSON.stringify(headers))
  const config = {
    method: 'post',
    url: url,
    data: body,
    headers: headers,
    timeout: axiosWireTimeout + 1000,
    cancelToken: source.token
  }

  let result = null

  await axios(config)
    .then(response => {
      result = {
        response: response.data,
        errors: response.errors // GraphQl always can have some, making this non-null
      }
    })
    // no .catch here, as in other places where we want the simple error to propate to lower handler
    .finally(() => {
      clearTimeout(timeoutID) // always
    })
  return result
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
