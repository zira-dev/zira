
![zira](images/zira-repo-image.png)
## Overview
This repository contains documentation, examples and code snippets for using zira public APIs in order to create custom zira applications
or integrate zira data with BI tools or operational applications

Possible Usage:
 - Create custom post on zira feed
 - Manage tasks on zira
 - Create custom collector, in order to post your data to zira data-source
 - Orchestrate business workflows that reflects on zira feed
 - Fetch aggregated data from zira channel
 - Fetch real-time, normalized data from zira data-source
 - Export CSV file on specific time range/interval
 - Import CSV file to specific data-source (for history upload or batch)
 - Connect IOT devices in order to manage them on zira app, visualize data and automate processes

## Table of Contents
- [Overview](#overview)
- [Table of Contents](#table-of-contents)
- [Getting started](#getting-started)
- [API reference](#api-reference)
  - [Add reading](#add-reading)
  - [Add event](#add-event)
  - [Import CSV](#import-csv)
    - [1. Getting CSV template](#1-getting-csv-template)
    - [2. Getting signed URL for Upload](#2-getting-signed-url-for-upload)
    - [3. Upload](#3-upload)
  - [Export CSV](#export-csv)
  - [Get data](#get-data)
  - [Get aggregated data](#get-aggregated-data)
  - [Create post](#create-post)
  - [Create/Edit task](#createedit-task)

## Getting started
1. In order to use zira public APIs, you must sign up to zira. 
2. Once logged in to zira, create new application and generate API key.
   Here's how:
      go to https://my.zira.us/applications > Add new application > enter application name > Generate api key
3. API key should be added to request header of each API call:

```
X-API-Key: <YOUR_API_KEY>
```

## API reference

### Add reading
Use this one to add device readings manually.

```
POST /zira-public/reading HTTP/1.1
Host: integ.api.zira.us
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

| Property     | Required | Default | Type             | Format                | Options | Description                                                                                                                                                                                                                                  |
| ------------ | -------- | ------- | ---------------- | --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| METER_ID     | true     |         | String (numeric) | "1234"                |         | <p>meterId represents an ID of the device in question.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted device.<br>Then, select Info tab, you'll see the ID on the right.</p>                                  |
| TIME_STAMP   | true     |         | String           | "2021-01-21T19:32:00" |         | <p>Date and time of the reading. Please use ISO 8601 standard<br>Note there's no timezone, assuming it's the timezone of the site.</p>                                                                                                       |
| VALUES_ARRAY | true     |         | Array            | [1.23, 110]           |         | <p>Array of reading values. The order is according to the schema of device.<br>For example, if you have a power meter, configured with two metrics - Current(Amps) and Voltage(Volts), you'll have to pass [<AMPS_VALUE>, <VOLTS_VALUE>]</p> |

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

### Add event

```
POST /zira-public/event HTTP/1.1
Host: api.zira.us
X-API-Key: <API_KEY>
Content-Type: application/json
Content-Length: <CONTENT_LENGTH>

{
    "eventGroupId": "5",
    "eventName" : "My Manual Event 11",
    "startTime": "2020-04-28T00:00:00",
    "endTime" : "2020-04-29T00:00:00",
    "customerCode1" : "11",
    "customerCode2" : "aa",
    "userComments": "",
    "additionalInfo": "{\"please9\" : \"work9\"}"
}
```
<h3>Payload:</h3>

| Property       | Required | Default | Type               | Options | Description |
| -------------- | -------- | ------- | ------------------ | ------- | ----------- |
| eventGroupId   | true     |         | String (numeric)   |         |             |
| eventName      | true     |         | String             |         |             |
| startTime      | true     |         | String (timestamp) |         |             |
| endTime        | true     |         | String (timestamp) |         |             |
| customerCode1  | true     |         | String             |         |             |
| customerCode2  | true     |         | String             |         |             |
| userComments   | true     |         | String             |         |             |
| additionalInfo | true     |         | String             |         |             |

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
GET /zira-public/reading/template?meterId=<METER_ID> HTTP/1.1
Host: api.zira.us
X-API-Key: <API_KEY>
```

<h3>Parameters:</h3>

| Parameter | Required | Default | Type    | Format | Options | Description                                                                                                                                                                                                 |
| --------- | -------- | ------- | ------- | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| METER_ID  | true     |         | Integer | "1234" |         | <p>meterId represents an ID of the device in question.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted device.<br>Then, select Info tab, you'll see the ID on the right.</p> |

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
GET /zira-public/reading/import?meterId=<METER_ID> HTTP/1.1
Host: api.zira.us
X-API-Key: <API_KEY>
```

<h3>Response:</h3>

<h4>Successful response:</h4>

```
HTTP/1.1 200 OK
{
    "data": {
        "fileUrl": "<UPLOAD_URL>"
    }
}
```

<h3>Response body</h3>

<h4>data:</h4>

| Parameter  | Type         | Format | Options | Description                                   |
| ---------- | ------------ | ------ | ------- | --------------------------------------------- |
| UPLOAD_URL | String (URL) |        |         | Temporary signed link to upload the CSV file. |


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

### Export CSV

```
GET /zira-public/reading/export/?meterId=<METER_ID>&endTime=<END_TIME>&startTime=<START_TIME> HTTP/1.1
Host: integ.api.zira.us
X-API-Key: <API_KEY>
```

<h3>Parameters:</h3>

| Parameter  | Required | Default | Type               | Format              | Options | Description                                                                                                                                                                                                 |
| ---------- | -------- | ------- | ------------------ | ------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| METER_ID   | true     |         | Integer            | 1234                |         | <p>meterId represents an ID of the device in question.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted device.<br>Then, select Info tab, you'll see the ID on the right.</p> |
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
This API allows to request readings data for multiple devices.
Data is presented as an Array of objects. 

```
GET /zira-public/reading?meterIds=<METER_ID>,<METER_ID>&endTime=<END_TIME>&startTime=<START_TIME> HTTP/1.1
Host: integ.api.zira.us
X-API-Key: <API_KEY>
```

<h3>Parameters:</h3>

| Parameter  | Required | Default | Type                         | Format              | Options | Description                                                                                                                                                                                                                             |
| ---------- | -------- | ------- | ---------------------------- | ------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| METER_ID   | true     |         | String (comma separated IDs) | 1234,5656 ...       |         | <p>meterIds represent an array of IDs of devices. You can specify one or more IDs.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted device.<br>Then, select Info tab, you'll see the ID on the right.</p> |
| START_TIME | true     |         | String (timestamp)           | 2020-10-15T00:00:00 |         |
| END_TIME   | true     |         | String (timestamp)           | 2020-11-15T23:59:59 |         |

<h3>Response:</h3>
Each object(reading) contains timestamp, id and the metrics of device. <br>You can also checkout the metrics in the system, by going to the site page > devices > click on one of the devices

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
| METER_ID             | Integer            |                     |         | Device ID                                                                                                     |
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
GET /zira-public/system/analysis/<SYSTEM_ID>?interval=<INTERVAL>&fromTime=<FROM_TIME>&toTime=<TO_TIME> HTTP/1.1
Host: integ.api.zira.us
```

<h3>Parameters:</h3>

| Parameter | Required | Default | Type               | Format              | Options                                | Description                                                                                                                  |
| --------- | -------- | ------- | ------------------ | ------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| SYSTEM_ID | true     |         | Integer            |                     |                                        | desc.                                                                                                                        |
| INTERVAL  | true     |         | String (interval)  | 1 hour              | 5 minutes, 15 minutes, 1 hours, 1 days | Checkout the channels page in the system and click on one of the channels, you'll be able to see the intervals on your right |
| FROM_TIME | true     |         | String (timestamp) | 2020-10-15T00:00:00 |                                        |                                                                                                                              |
| TO_TIME   | true     |         | String (timestamp) | 2020-11-15T23:59:59 |                                        |                                                                                                                              |

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

| Parameter | Type               | Format              | Options                             | Description |
| --------- | ------------------ | ------------------- | ----------------------------------- | ----------- |
| status    | String (interval)  | No Reading          | Active, No Reading, Pending Devices |             |
| lasts     | String (timestamp) | 2020-10-15T00:00:00 |                                     |             |
| kpis      | Array<Kpi>         | 2020-11-15T23:59:59 |                                     |             |
| charts    | Array<Chart>       |                     |                                     |             |
| targets   |                    |                     |                                     |             |
| version   | String             | v3                  |                                     |             |

<h3>Kpi:</h3>

| Parameter   | Type               | Format              | Options     | Description |
| ----------- | ------------------ | ------------------- | ----------- | ----------- |
| name        | String             | No Reading          | No Reading, |             |
| unit        | String (timestamp) | 2020-10-15T00:00:00 |             |             |
| group       | Array<object>      | 2020-11-15T23:59:59 |             |             |
| value       | String (interval)  | No Reading          | No Reading, |             |
| toDate      | String (timestamp) | 2020-10-15T00:00:00 |             |             |
| maxDate     | Array<object>      | 2020-11-15T23:59:59 |             |             |
| ordinal     | String             | No Reading          | No Reading, |             |
| fromDate    | String (timestamp) | 2020-10-15T00:00:00 |             |             |
| interval    | String (interval)  | 1440                |             |             |
| description | Array<object>      | 2020-11-15T23:59:59 |             |             |

<h3>Chart:</h3>

| Parameter   | Type               | Format                   | Options | Description |
| ----------- | ------------------ | ------------------------ | ------- | ----------- |
| data        | Array<Array<data>> | [[123, 1.5], [124, 1.6]] |         |             |
| name        | String             | No Reading               |         |             |
| unit        | String             | "L"                      |         |             |
| group       | Array<object>      | 2020-11-15T23:59:59      |         |             |
| value       | integer            | No Reading               |         |             |
| toDate      | String (timestamp) | 2020-10-15T00:00:00      |         |             |
| maxDate     | String (timestamp) | 2020-11-15T23:59:59      |         |             |
| ordinal     | String (interval)  | No Reading               |         |             |
| fromDate    | String (timestamp) | 2020-10-15T00:00:00      |         |             |
| interval    | integer            | 2020-10-15T00:00:00      |         |             |
| description | Array<object>      | 2020-11-15T23:59:59      |         |             |

### Create post

```
POST /zira-public/post HTTP/1.1
Host: api.zira.us
X-API-Key: <API_KEY>
Content-Type: application/json
Content-Length: <CONTENT_LENGTH>

{
    "postTypeId": <POST_TYPE_ID>,
    "content": <CONTENT>,
    "toChannelId": <CHANNEL_ID>
}
```

<h3>Payload:

| Property     | Required | Default | Type             | Format            | Options     | Description                                                                                                                                                                           |
| ------------ | -------- | ------- | ---------------- | ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CHANNEL_ID   | true     |         | String (numeric) | "1234"            |             | <p>To get channel ID, go to the desired chanel in the system and checkout the URL, the number at the end of the Path is the channel ID.<br>Example: https://my.zira.us/channels/1</p> |
| POST_TYPE_ID | true     |         | String (numeric) | "1"               | ["1", "15"] | "1": Ordinary post, "15": Alert post                                                                                                                                                  |
| CONTENT      | true     |         | String           | "Hello everyone!" |             |                                                                                                                                                                                       |

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

| Parameter   | Type    | Format | Options | Description |
| ----------- | ------- | ------ | ------- | ----------- |
| NEW_POST_ID | Integer |        |         |             | New post reference ID |


<h4>Error response:</h4>

```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```

### Create/Edit task
