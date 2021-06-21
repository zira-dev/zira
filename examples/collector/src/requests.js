
const fetch = require('node-fetch');
const staticConfig = require('../config/staticConfig')

let apiKey = ''

const init = (_apiKey)=> {
    apiKey = _apiKey
}

/**
 * 
 * @param {string} content - the content of the post 
 * @param {string} toChannelId - target channel Id
 * @returns 
 */
const createNewPost = async (content, toChannelId)=>{

    options = {
        headers: {
            'X-API-Key' : apiKey,
            'Content-Type': 'application/json' 
        },
        method: 'POST',
        
        body: JSON.stringify({content, toChannelId : String(toChannelId)})
    }
    // console.log(options)
   const ans  = await fetch(staticConfig.urls.newPost,options)
   return await ans.json()
}

/**
 * 
 * @param {Object[]} readings
 * @param {Object} readings[[0]
 * @param {string} readings[[0].meterId - data-source id.
 * @param {string} readings[[0].timestamp - timestamp in ISO 8601 format.
 * @param {Object} readings[[0].values - a key value of the metric name and the corresponding value example :  {"key1":"value1","key2":2,"key3":true}
 * @returns 
 */



const addReadings = async (readings)=>{

    options = {
        headers: {
            'X-API-Key' : apiKey,
            'Content-Type': 'application/json' 
        },
        method: 'POST',
        body: JSON.stringify(readings)
    }
   console.log(`about too send the following readings: ${JSON.stringify(readings)}`)
   const ans  = await fetch(staticConfig.urls.addReading, options)
   return await ans.json()
}

const generateCsv = async (dataSourceId, startTime,endTime)=>{
    let url = staticConfig.urls.downloadCsv
    let questionMark = false
    if(dataSourceId){
        url = `${url}${!questionMark?'?':'&'}meterId=${dataSourceId}`
        questionMark = true
    }
    if(startTime){
        url = `${url}${!questionMark?'?':'&'}startTime=${startTime}`
        questionMark = true
    }
    if(endTime){
        url = `${url}${!questionMark?'?':'&'}endTime=${endTime}`
        questionMark = true
    }
    console.log(url)
    options = {
        headers: {
            'X-API-Key' : apiKey,
            'Content-Type': 'application/json' 
        },
        method: 'GET'
    }
   const ans  = await fetch(url, options)
   return await ans.json()
}

const getReadings = async (dataSourceId, startTime,endTime, limit,lastValue)=>{
    let url = staticConfig.urls.readings
    let questionMark = false
    if(dataSourceId){
        url = `${url}${!questionMark?'?':'&'}meterId=${dataSourceId}`
        questionMark = true
    }
    if(startTime){
        url = `${url}${!questionMark?'?':'&'}startTime=${startTime}`
        questionMark = true
    }
    if(endTime){
        url = `${url}${!questionMark?'?':'&'}endTime=${endTime}`
        questionMark = true
    }
    if(limit){
        url = `${url}${!questionMark?'?':'&'}limit=${limit}`
        questionMark = true
    }
    if(lastValue){
        url = `${url}${!questionMark?'?':'&'}lastValue=${lastValue}`
        questionMark = true
    }
    options = {
        headers: {
            'X-API-Key' : apiKey,
            'Content-Type': 'application/json' 
        },
        method: 'GET'
    }
   const ans  = await fetch(url, options)
   return await ans.json()
}

const getChannelAnalysis = async (channelId, interval, fromTime, toTime, limit)=>{
    let url = staticConfig.urls.channelAnalysis
    let questionMark = false
    if(channelId){
        url = `${url}${!questionMark?'?':'&'}systemId=${channelId}`
        questionMark = true
    }
    if(interval){
        url = `${url}${!questionMark?'?':'&'}interval=${interval}`
        questionMark = true
    }
    if(fromTime){
        url = `${url}${!questionMark?'?':'&'}fromTime=${fromTime}`
        questionMark = true
    }
    if(toTime){
        url = `${url}${!questionMark?'?':'&'}toTime=${toTime}`
        questionMark = true
    }
    if(limit){
        url = `${url}${!questionMark?'?':'&'}limit=${limit}`
        questionMark = true
    }
    options = {
        headers: {
            'X-API-Key' : apiKey,
            'Content-Type': 'application/json' 
        },
        method: 'GET'
    }
   const ans  = await fetch(url, options)
   return await ans.json()
}

const getDataSource = async (dataSourceId)=>{
    const url = `${staticConfig.urls.dataSources}/${dataSourceId}`
    console.log('URL', url)
    options = {
        headers: {
            'X-API-Key' : apiKey,
            'Content-Type': 'application/json' 
        },
        method: 'GET',
    }
   const ans  = await fetch(url, options)
   return await ans.json()
}

/**
 * 
 * @param {string} textSearch - free text to search for specific data-sources (name of site)
 * @param {number} limit - number of entries per page 
 * @param {string} lastValue -  the "lastValue" that was received at the previews response (in order the get the next page) 
 * @returns 
 */

const getDataSources = async ( textSearch=null,limit=null, lastValue=null )=>{
    let url = staticConfig.urls.dataSources
    let questionMark = false
    if(textSearch){
        url = `${url}${!questionMark?'?':'&'}textSearch=${textSearch}`
        questionMark = true
    }
    if(limit){
        url = `${url}${!questionMark?'?':'&'}limit=${limit}`
        questionMark = true
    }
    if(lastValue){
        url = `${url}${!questionMark?'?':'&'}lastValue=${lastValue}`
        questionMark = true
    }
    options = {
        headers: {
            'X-API-Key' : apiKey,
            'Content-Type': 'application/json' 
        },
        method: 'GET',
    }
   console.log(url)
   const ans  = await fetch(url, options)
   return await ans.json()
}


const getPosts = async ( textSearch=null, channelIds=null, limit=null, lastValue=null )=>{
    let url = staticConfig.urls.posts
    let questionMark = false
    if(textSearch){
        url = `${url}${!questionMark?'?':'&'}textSearch=${textSearch}`
        questionMark = true
    }
    if(limit){
        url = `${url}${!questionMark?'?':'&'}limit=${limit}`
        questionMark = true
    }
    if(lastValue){
        url = `${url}${!questionMark?'?':'&'}lastValue=${lastValue}`
        questionMark = true
    }
    if(channelIds){
        url = `${url}${!questionMark?'?':'&'}channelIds=${channelIds}`
        questionMark = true
    }
    options = {
        headers: {
            'X-API-Key' : apiKey,
            'Content-Type': 'application/json' 
        },
        method: 'GET',
    }
   console.log(url)
   const ans  = await fetch(url, options)
   return await ans.json()
}


exports.init = init
exports.createNewPost = createNewPost
exports.generateCsv = generateCsv
exports.addReadings = addReadings
exports.getReadings = getReadings
exports.getChannelAnalysis = getChannelAnalysis
exports.getDataSource = getDataSource
exports.getDataSources = getDataSources

exports.getPosts = getPosts