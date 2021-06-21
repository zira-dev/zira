const requests = require('./src/requests')
const moment = require('moment')
const fetch = require('node-fetch')


// global variables
const apiKey =  '67ef95fe-717d-4028-bbe1-616999cc47b9'  // please put your api key here
const repeatInterval = 30 //  how often we want to run the loop
let myKeyMapping = {}
// 


// init all APIs with the API key
requests.init(apiKey)





/**
 * the following function retrieves the list of data-sources from Zira, then it retrieves them one by one to (detailed response) to receive the collectionInfo 
 * then it creates a mapping between one the collection info keys to device id. 
 * this application will use this mapping the post the data to the specific device
 */
async function init(){
    const dataSourceList = (await requests.getDataSources(textSearch='Weather_', limit=10)).data
    const ids = dataSourceList.map(dataSource=>dataSource.id)

    for(const id of ids){
        dataSource = (await requests.getDataSource(id)).data
        myKeyMapping[dataSource.collectionInfo.stationIdentifier] = dataSource.id
    }

} 



/**
 * the getData function is the event loop of this application, it is responsible of retrieving the data from the 3rd party (File, Webserver, DB, etc...) 
 * and to send this data to Zira. this application is responsible for transforming the data to the expected type. [{timestamp , meterId, values}].
 * in this example we are querying the data from:  https://www.weather.gov/documentation/services-web-api in a loop every <repeatInterval> minutes 
 */


async function getData(){
    const listOfReadings = []
    for(const stationId in myKeyMapping){
        url = `https://api.weather.gov/stations/${stationId}/observations/latest`
        
        fetchAns = await fetch(url, { method: 'GET'})
        reading = await fetchAns.json()
        
        const transformedReading = {values : {Temperature: reading.properties.temperature.value}, meterId:myKeyMapping[stationId] , timestamp: reading.properties.timestamp }
        listOfReadings.push(transformedReading)
        
    }
    await requests.addReadings(listOfReadings)
    if(repeatInterval){
        console.log('going to sleep for ' + repeatInterval + 'minutes' )
        setTimeout(getData,repeatInterval * 60000)
    }
} 



/// main
async function main(){
    await init()
    await getData()
} 

main()