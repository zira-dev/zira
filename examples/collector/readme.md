## Collector Example

### Description 
this example demonstrates how Zira API's can be used in order to populate Zira with data from any external source.

in this example the data is collected from "*US National Weather Service (https://www.weather.gov/)*" 

In addition it also contains all exposed API's as an easy to use functions that can be used to create any application to integrate with Zira.  


### Before Running the application
Before running  your program there are 2 prerequisites, creation of data-source(s) and API key 
#### Creation of data sources
the external data that is collected can be distributed between multiple data sources according to the business logic.

in our example each data source represents a different weather station.

the tutorial for creation of new data-source can be found [here](https://website.zira.us/docs/data-sources/introduction/).

We advice using "Manual" data-source type. Manual data-source has an additional field called "collectionInfo" this is a json field that can hold any data. 

In our example it is used to map the external station id to our internal device id. it can hold any type of data needed for the collection. 

#### Creation of API Key
Tutorials can be found [here](https://website.zira.us/developers/examples/rss-to-zira-feed/#generation-of-a-new-application)

 
### Flow
the following flow describes  

1. put the api key to the global variable "apiKey".
2. call the requests.init with the api key to initialize the module.

### the below steps are implementation dependent and not mandatory

1.  call the get datasources with textual search to get the specific devices we want to query, for example all weather devices we configure can have a "weather_" prefix and whe calling "get datasources" filter with that prefix. 

2. after retrieving the list of data source we are calling them one by one to retrieve the full metadata (schema and collection info)
3. then we are creating a mapping between external identifier and the data-source id.
4. retrieve the data from the external data-source
5. transform it to match the expected format (meterId, timestamp, values) while the key of each value is "metricName"
6. create an array of those readings
7. call add readings with the array
8. call set timeout with "repeat interval"


### additional features
src/requests.js implements all external api, and can be used to develop a variety of applications.