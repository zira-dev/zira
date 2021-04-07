
![zira](images/zira-repo-image.png)

## Overview

This repository contains documentation, examples and code snippets for using zira public APIs in order to create custom zira applications
or integrate zira data with BI tools or operational applications

### For additional zira documentation, please check out below references:
[App documentation](https://website.zira.us/docs/example/)

[Developers](https://website.zira.us/docs/example/)

[Postman API](https://apidocs.zira.us/)



### Possible Usage:

- Create custom post on zira feed
- Manage tasks on zira
- Create custom collector, in order to post your data to zira data-source
- Orchestrate business workflows that reflects on zira feed
- Fetch aggregated data from zira channel
- Fetch real-time, normalized data from zira data-source
- Export CSV file on specific time range/interval
- Import CSV file to specific data-source (for history upload or batch)
- Connect IOT data-sources in order to manage them on zira app, visualize data and automate processes

## Table of Contents

- [Getting started](#getting-started)
- [Add reading](#add-reading)
 - [Export CSV](#export-csv)
 - [Get data](#get-data)
 - [Get aggregated data](#get-aggregated-data)
 - [Create post](#create-post)
 - [Import CSV](#import-csv)
    - [1. Getting CSV template](#1-getting-csv-template)
    - [2. Getting signed URL for Upload](#2-getting-signed-url-for-upload)
    - [3. Upload](#3-upload)

## Getting started

1. In order to use zira APIs, you must have a zira account, if you doesn't have zira account yet, you can [sign up](my.zira.us/create-account) and use zira **For free** .
2. Once logged in to zira, you can generate API key using below steps:
	- Go to https://my.zira.us/applications
	- Click **Add new application**
	- Click **Generate API-key**
	- Copy the API key 

the header X-API-Key will be used to authenticate any api call to zira

```
X-API-Key: <YOUR_API_KEY>
```

## API reference

### Add reading

Use this one to add data-source readings manually.

```
POST /public/reading HTTP/1.1
Host: api.zira.us
Content-Type: application/json
X-API-Key: <API_KEY>
Content-Length: <CONTENT_LENGTH>

[{
	"meterId": <METER_ID>,
	"timestamp": <TIME_STAMP>,
	"values": <VALUES_ARRAY>
}]
```

<h3>Payload:</h3>

| Property     | Required | Default | Type             | Format                | Options | Description                                                                                                                                                                                                                                       |
| ------------ | -------- | ------- | ---------------- | --------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| METER_ID     | true     |         | String (numeric) | "1234"                |         | <p>meterId represents an ID of the data-source in question.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted data-source.<br>Then, select Info tab, you'll see the ID on the right.</p>                             |
| TIME_STAMP   | true     |         | String           | "2021-01-21T19:32:00" |         | <p>Date and time of the reading. Please use ISO 8601 standard<br>Note there's no timezone, assuming it's the timezone of the site.</p>                                                                                                            |
| VALUES_ARRAY | true     |         | Array            | [1.23, 110]           |         | <p>Array of reading values. The order is according to the schema of data-source.<br>For example, if you have a power meter, configured with two metrics - Current(Amps) and Voltage(Volts), you'll have to pass [<AMPS_VALUE>, <VOLTS_VALUE>]</p> |

<h3>Response:</h3>
<h4>Successful response:</h4>

```
HTTP/1.1 200 OK

{
    "data": "<RESULT>"
}
```

<h3>Response body</h3>

<h4>data:</h4>

| Parameter | Type   | Format | Options | Description                               |
| --------- | ------ | ------ | ------- | ----------------------------------------- |
| RESULT    | String |        |         | Text confirmation of successful operation |

<h4>Error response:</h4>

```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```



### Export CSV

```
GET /public/reading/export/?meterId=<METER_ID>&endTime=<END_TIME>&startTime=<START_TIME> HTTP/1.1
Host: api.zira.us
X-API-Key: <API_KEY>
```

<h3>Parameters:</h3>

| Parameter  | Required | Default | Type               | Format              | Options | Description                                                                                                                                                                                                           |
| ---------- | -------- | ------- | ------------------ | ------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| METER_ID   | true     |         | Integer            | 1234                |         | <p>meterId represents an ID of the data-source in question.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted data-source.<br>Then, select Info tab, you'll see the ID on the right.</p> |
| START_TIME | true     |         | String (timestamp) | 2020-10-15T00:00:00 |         |
| END_TIME   | true     |         | String (timestamp) | 2020-11-15T23:59:59 |         |

<h3>Response:</h3>
<h4>Successful response:</h4>

```
HTTP/1.1 200 OK
{
    "data": {
        "fileUrl": "<DOWNLOAD_URL>"
    }
}
```

<h3>Response body</h3>

<h4>data:</h4>

| Parameter    | Type         | Format | Options | Description                                       |
| ------------ | ------------ | ------ | ------- | ------------------------------------------------- |
| DOWNLOAD_URL | String (URL) |        |         | Temporary link to download the exported CSV file. |

<h4>Error response:</h4>

```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```

### Get data

This API allows to request readings data for multiple data-sources.
Data is presented as an Array of objects.

```
GET /public/reading?meterIds=<METER_ID>,<METER_ID>&endTime=<END_TIME>&startTime=<START_TIME> HTTP/1.1
Host: api.zira.us
X-API-Key: <API_KEY>
```

<h3>Parameters:</h3>

| Parameter  | Required                                                                                                | Default | Type                         | Format                                                  | Options                     | Description                                                                                                                                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------- | ------- | ---------------------------- | ------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| METER_ID   | true                                                                                                    |         | String (comma separated IDs) | 1234,5656 ...                                           |                             | <p>meterIds represent an array of IDs of data-sources. You can specify one or more IDs.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted data-source.<br>Then, select Info tab, you'll see the ID on the right.</p> |
| START_TIME | true                                                                                                    |         | String (timestamp)           | 2020-10-15T00:00:00                                     |                             |
| END_TIME   | true                                                                                                    |         | String (timestamp)           | 2020-11-15T23:59:59                                     |                             |
| SORT_DESC  | false                                                                                                   | true    | Boolean                      |                                                         | true / false                | Use it to sort out the response in ascending/descending order.                                                                                                                                                                                    |
| LIMIT      | false                                                                                                   | 100     | Integer                      |                                                         | Any value between 1 and 100 | Use it to limit the number of records in response.                                                                                                                                                                                                |
| LAST_VALUE | false (it's required when the number of records in result is greater than specified in LIMIT parameter) | NULL    | String                       | eyJldmVudF9kYXRlIjoiMjAyMC0xMC0yOFQxNDozMjowMi42NjZaIn0 |                             | When the number of records in the result is more than the number you specified in LIMIT paremeter, the API will return the encrypted value of the last record. Use it for the next request to get the remaining records.                          |

<h3>Response:</h3>
Each object(reading) contains timestamp, id and the metrics of data-source. <br>You can also checkout the metrics in the system, by going to the site page > data-sources > click on one of the data-sources

<h4>Successful response:</h4>

```
HTTP/1.1 200 OK
{
  "data": [
      {
          "eventDate": <TIME_STAMP>,
          "meterId": <METER_ID>,
          <METRIC_NAME_1>: <READING_1>,
          <METRIC_NAME_2>: <READING_2>
          ...
      }
  ]
}
```

<h3>Response body</h3>

<h4>data:</h4>

| Parameter            | Type               | Format              | Options | Description                                                                                                   |
| -------------------- | ------------------ | ------------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| TIME_STAMP           | String (timestamp) | 2020-10-15T00:00:00 |         | Reading timestamp                                                                                             |
| METER_ID             | Integer            |                     |         | data-source ID                                                                                                |
| METRIC_NAME: READING | Integer            |                     |         | Reading value. Metric names - METRIC_NAME_1, METRIC_NAME_2... etc. and their values - READING_1, READING_2... |

<h4>Error response:</h4>

```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```

### Get aggregated data

```
GET /public/system/analysis?systemId=<CHANNEL_ID>?interval=<INTERVAL>&fromTime=<START_TIME>&toTime=<END_TIME> HTTP/1.1
Host: api.zira.us
```

<h3>Parameters:</h3>

| Parameter  | Required | Default | Type               | Format              | Options                                | Description                                                                                                                                   |
| ---------- | -------- | ------- | ------------------ | ------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| CHANNEL_ID | true     |         | Integer            |                     |                                        | Checkout the site page in the system, select channels tab and choose one of the channels - then select the info. tab.                         |
| INTERVAL   | true     |         | String (interval)  | 1 hour              | 5 minutes, 15 minutes, 1 hours, 1 days | Checkout the site page in the system, select channels tab and click on one of the channels, you'll be able to see the intervals on your right |
| START_TIME | true     |         | String (timestamp) | 2020-10-15T00:00:00 |                                        |                                                                                                                                               |
| END_TIME   | true     |         | String (timestamp) | 2020-11-15T23:59:59 |                                        |                                                                                                                                               |

<h3>Response:</h3>
<h4>Successful response:</h4>

```
HTTP/1.1 200 OK
{
   "data": {
      "status": "No Reading",
      "lasts": null,
      "kpis": [
         {
            "name": "Volume",
            "unit": " L",
            "group": null,
            "value": 1618345,
            "toDate": "2021-03-22T00:00:00.000Z",
            "maxDate": "2021-03-16T02:00:00.000Z",
            "ordinal": "51",
            "fromDate": "2021-02-20T00:00:00.000Z",
            "interval": 1440,
            "description": null
         }
      ],
      "charts": [
         {
            "data": [
               [
                  1613779200000,
                  35010
               ],
               [
                  1613865600000,
                  6995
               ]
            ],
            "name": "Volume",
            "unit": " L",
            "group": null,
            "toDate": "2021-03-22T00:00:00.000Z",
            "maxDate": "2021-03-16T02:00:00.000Z",
            "ordinal": "51",
            "fromDate": "2021-02-20T00:00:00.000Z",
            "interval": 1440,
            "description": null
         }
      ],
      "targets": null,
      "version": "v3"
   }
}
```

<h3>Response body</h3>

<h3>data:</h3>

| Parameter | Type               | Format              | Options                             | Description                                                                                                                                                                                                                                                                |
| --------- | ------------------ | ------------------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status    | String (interval)  | No Reading          | Active, No Reading, Pending Devices | Current state of the system, where "Active" is positive, "No Reading" means that either there is no new readings/no data-source activity/data collection is no functioning properly. "Pending devices" is an initial state, meaning that the data is about to be received. |
| lasts     | String (timestamp) | 2020-10-15T00:00:00 |                                     |                                                                                                                                                                                                                                                                            |
| kpis      | Array<Kpi>         | 2020-11-15T23:59:59 |                                     | An array of KPIs objects values                                                                                                                                                                                                                                            |
| charts    | Array<Chart>       |                     |                                     | An array of chart objects                                                                                                                                                                                                                                                  |
| targets   |                    |                     |                                     |                                                                                                                                                                                                                                                                            |
| version   | String             | v3                  |                                     |                                                                                                                                                                                                                                                                            |

<h3>Kpi:</h3>

| Parameter   | Type               | Format              | Options | Description                                          |
| ----------- | ------------------ | ------------------- | ------- | ---------------------------------------------------- |
| name        | String             | Volume              |         | Name of the KPI                                      |
| unit        | String             | L (Liters)          |         | Units of measure                                     |
| group       | Array<object>      |                     |         |                                                      |
| value       | Integer            | 3500                |         | KPI value (3500 L in this example)                   |
| toDate      | String (timestamp) | 2020-10-15T00:00:00 |         | KPI active period end date.                          |
| maxDate     | String (timestamp) | 2020-11-15T23:59:59 |         | Represents the date of the max. value of KPI         |
| ordinal     | Integer            |                     |         | Number that represent an order of the KPIs           |
| fromDate    | String (timestamp) | 2020-10-15T00:00:00 |         | KPI active period start date.                        |
| interval    | String (interval)  | 1440                |         | KPI active period in minutes (1440 mins. = 24 hours) |
| description | String             |                     |         | KPI description text                                 |

<h3>Chart:</h3>

| Parameter   | Type               | Format                   | Options                                                   | Description                                                                                                                     |
| ----------- | ------------------ | ------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| data        | Array<Array<data>> | [[123, 1.5], [124, 1.6]] |                                                           | Two dimentsional Array of chart data. Columns represent the data-source and the . Each row is an array of data-source readings. |
| name        | String             | Name of the chart        |                                                           |                                                                                                                                 |
| unit        | String             | "L"                      |                                                           | Units of measure                                                                                                                |
| group       |                    |                          |                                                           |                                                                                                                                 |
| toDate      | String (timestamp) | 2020-10-15T00:00:00      | Readings active period end date.                          |                                                                                                                                 |
| maxDate     | String (timestamp) | 2020-11-15T23:59:59      | Represents the date of the max. value in the chart        |                                                                                                                                 |
| ordinal     | Integer            |                          |                                                           |                                                                                                                                 |
| fromDate    | String (timestamp) | 2020-10-15T00:00:00      | Readings active period start date.                        |                                                                                                                                 |
| interval    | integer            | 2020-10-15T00:00:00      | Readings active period in minutes (1440 mins. = 24 hours) |                                                                                                                                 |
| description | Array<object>      | 2020-11-15T23:59:59      | Chart description text                                    |                                                                                                                                 |

### Create post

```
POST /public/post HTTP/1.1
Host: api.zira.us
X-API-Key: <API_KEY>
Content-Type: application/json
Content-Length: <CONTENT_LENGTH>

{
    "postTypeId": <POST_TYPE_ID>,
    "content": <POST_CONTENT>,
    "toChannelId": <TARGET_CHANNEL_ID>
}
```

<h3>Payload:

| Property          | Required | Default | Type             | Format            | Options     | Description                                                                                                                                                                           |
| ----------------- | -------- | ------- | ---------------- | ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TARGET_CHANNEL_ID | true     |         | String (numeric) | "1234"            |             | <p>To get channel ID, go to the desired chanel in the system and checkout the URL, the number at the end of the Path is the channel ID.<br>Example: https://my.zira.us/channels/1</p> |
| POST_TYPE_ID      | true     |         | String (numeric) | "1"               | ["1", "15"] | "1": Ordinary post, "15": Alert post                                                                                                                                                  |
| POST_CONTENT      | true     |         | String           | "Hello everyone!" |             |                                                                                                                                                                                       |

<h3>Response:</h3>

<h4>Successful response:</h4>

```
HTTP/1.1 200 OK
{
    "data": "<NEW_POST_ID>"
}
```

<h3>Response body</h3>

<h4>data:</h4>

| Parameter   | Type    | Format | Options | Description           |
| ----------- | ------- | ------ | ------- | --------------------- |
| NEW_POST_ID | Integer |        |         | New post reference ID |

<h4>Error response:</h4>

```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```
### Import CSV

There are 3 steps to import CSV file with your readings.

#### 1. Getting CSV template

This will give you a list of column names of the CSV file.

```
GET /public/reading/template?meterId=<METER_ID> HTTP/1.1
Host: api.zira.us
X-API-Key: <API_KEY>
```

<h3>Parameters:</h3>

| Parameter | Required | Default | Type    | Format | Options | Description                                                                                                                                                                                                           |
| --------- | -------- | ------- | ------- | ------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| METER_ID  | true     |         | Integer | "1234" |         | <p>meterId represents an ID of the data-source in question.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted data-source.<br>Then, select Info tab, you'll see the ID on the right.</p> |

<h3>Response:</h3>

<h4>Successful response:</h4>

```
HTTP/1.1 200 OK
{
    "data": <COMMA_SEPARATED_STRING>
}
```

<h3>Response body</h3>

<h4>data:</h4>

| Parameter              | Type                     | Format | Options | Description                                                                                                                                       |
| ---------------------- | ------------------------ | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| COMMA_SEPARATED_STRING | String (comma separated) |        |         | CSV headers, separated by comma. These are the column names of csv file.<br><b>Important:</b> keep the original order and don't change the names. |

<h4>Error response:</h4>

```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```

#### 2. Getting signed URL for Upload

```
GET /public/reading/import?meterId=<METER_ID> HTTP/1.1
Host: api.zira.us
X-API-Key: <API_KEY>
```

<h3>Response:</h3>

<h4>Successful response:</h4>

```
HTTP/1.1 200 OK
{
    "data": {
        "fileUrl": "<SIGNED_URL>"
    }
}
```

<h3>Response body</h3>

<h4>data:</h4>

| Parameter  | Type         | Format | Options | Description                                   |
| ---------- | ------------ | ------ | ------- | --------------------------------------------- |
| SIGNED_URL | String (URL) |        |         | Temporary signed link to upload the CSV file. |

<h4>Error response:</h4>

```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```

#### 3. Upload

```
PUT /<SIGNED_URL_PATH> HTTP/1.1
Host: <SIGNED_URL_HOSTNAME>
Content-Type: text/csv
Content-Length: <CONTENT_LENGTH>

"<file contents here>"
```

<h4>Successful response:</h4>

```
HTTP/1.1 200 OK
```

<h4>Error response:</h4>

```
HTTP/1.1 <HTTP_ERROR_CODE>
```
