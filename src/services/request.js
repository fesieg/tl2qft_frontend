// Package imports
import axios from 'axios'
const baseurl = "http://IP-HERE:3110/tl2qft"

/**
 * Function that sends a GET request to the backend in order to create a testcase file
 * 
 * URI encodes includes libraries that contain slashes (replaced with %2F)
 * to keep request URL intact
 *
 * @param {string} testcaseID - ID of testcase to retrieve
 * @param {number} testcaseVersion - Version the testcase should be retrieved in
 * @param {Array} includes - List of libraries to be included in the finished file
 * @return {Promise} Backend response
 *
 */
 export const requestTestcaseCreation = (testcaseID, testcaseVersion, includes) => {
    let encodedIncludes = includes.map(library => encodeURIComponent(library))
    // we want to expect a blob response because we have to treat it as such to prompt a download
    const request = axios.get(`${baseurl}/testcase/${testcaseID}/${testcaseVersion}/${encodedIncludes}`
    , { responseType: 'blob'})
    return request.then(response => response)
}


/**
 * Function that sends a GET request to the backend for all available QFT Libraries
 *
 * @return {Promise} Backend response Promise containing available Libraries
 *
 */
export const requestIncludeLibraries = () => {
    const request = axios.get(`${baseurl}/library_names`)
    return request.then(response => response)
}
  
export default {requestTestcaseCreation, requestIncludeLibraries}