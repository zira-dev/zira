
- [Add reading](#add-reading)
- [Add event](#add-event)
- [Import CSV](#import-csv)
  - [1. Getting CSV template](#1-getting-csv-template)
  - [2. Getting signed URL for Upload](#2-getting-signed-url-for-upload)
  - [3. Upload](#3-upload)
- [Export CSV](#export-csv)
- [Get raw data](#get-data)
- [Get aggregated data](#get-aggregated-data)
- [Create post](#create-post)
- [Create/Edit task](#createedit-task)
  

## Add reading
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
### Payload:

| Property  | Required | Default | Type             | Format                | Options | Description                                                                                                                                                                                                                                  |
| --------- | -------- | ------- | ---------------- | --------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| meterId   | true     |         | String (numeric) | "1234"                |         | <p>meterId represents an ID of the device in question.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted device.<br>Then, select Info tab, you'll see the ID on the right.</p>                                  |
| timestamp | true     |         | String           | "2021-01-21T19:32:00" |         | <p>Date and time of the reading. Please use ISO 8601 standard<br>Note there's no timezone, assuming it's the timezone of the site.</p>                                                                                                       |
| values    | true     |         | Array            | [1.23, 110]           |         | <p>Array of reading values. The order is according to the schema of device.<br>For example, if you have a power meter, configured with two metrics - Current(Amps) and Voltage(Volts), you'll have to pass [<AMPS_VALUE>, <VOLTS_VALUE>]</p> |

### Response:

**Successful response:**

```
{
    "data": "<RESULT>"
}
```
**Error response:**
```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```
## Add event*
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
### Payload:

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

### Response:

**Succssfull response:**

```
{
    "data": "<NEW_POST_ID>"
}
```
**Error response:**
```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```
## Import CSV
There are 3 steps to import CSV file with your readings.

### 1. Getting CSV template
This will give you a list of column names of the CSV file. 

```
GET /zira-public/reading/template?meterId=<METER_ID> HTTP/1.1
Host: api.zira.us
X-API-Key: <API_KEY>
```
### Parameters:
| Property | Required | Default | Type    | Format | Options | Description                                                                                                                                                                                                 |
| -------- | -------- | ------- | ------- | ------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| meterId  | true     |         | Integer | "1234" |         | <p>meterId represents an ID of the device in question.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted device.<br>Then, select Info tab, you'll see the ID on the right.</p> |

### Response:

**Succssfull response:**
```
{
    "data": <COMMA_SEPARATED_STRING>
}
```
**Error response:**
```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```

### 2. Getting signed URL for Upload
```
GET /zira-public/reading/import?meterId=<METER_ID> HTTP/1.1
Host: api.zira.us
X-API-Key: <API_KEY>
```

### Response:

**Succssfull response:**
```
{
    "data": {
        "fileUrl": "<SIGNED_URL>"
    }
}
```
**Error response:**
```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```

### 3. Upload
```
PUT /<SIGNED_URL_PATH> HTTP/1.1
Host: <SIGNED_URL_HOSTNAME>
Content-Type: text/csv
Content-Length: <CONTENT_LENGTH>

"<file contents here>"
```
**Succssfull response:**
```
HTTP/1.1 200 OK
```

**Error response:**
```
HTTP/1.1 <HTTP_ERROR_CODE>
```
## Export CSV
```
GET /zira-public/reading/export/?meterId=<METER_ID>&endTime=<END_TIME>&startTime=<START_TIME> HTTP/1.1
Host: integ.api.zira.us
X-API-Key: <API_KEY>
```
### Parameters:
| Parameter | Required | Default | Type               | Format              | Options | Description                                                                                                                                                                                                 |
| --------- | -------- | ------- | ------------------ | ------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| meterId   | true     |         | Integer            | 1234                |         | <p>meterId represents an ID of the device in question.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted device.<br>Then, select Info tab, you'll see the ID on the right.</p> |
| startTime | true     |         | String (timestamp) | 2020-10-15T00:00:00 |         |
| endTime   | true     |         | String (timestamp) | 2020-11-15T23:59:59 |         |

### Response:
**Succssfull response:**
```
{
    "data": {
        "fileUrl": "<DOWNLOAD_URL>"
    }
}
```
**Error response:**
```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```
## Get data
This API allows to request readings data for multiple devices.
Data is presented as an Array of objects. 
```
GET /zira-public/reading?meterIds=<METER_ID>,<METER_ID>&endTime=<END_TIME>&startTime=<START_TIME> HTTP/1.1
Host: integ.api.zira.us
X-API-Key: <API_KEY>
```
### Parameters:
| Parameter | Required | Default | Type                     | Format              | Options | Description                                                                                                                                                                                                                             |
| --------- | -------- | ------- | ------------------------ | ------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| meterIds  | true     |         | String (comma separated) | 1234,5656 ...       |         | <p>meterIds represent an array of IDs of devices. You can specify one or more IDs.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted device.<br>Then, select Info tab, you'll see the ID on the right.</p> |
| startTime | true     |         | String (timestamp)       | 2020-10-15T00:00:00 |         |
| endTime   | true     |         | String (timestamp)       | 2020-11-15T23:59:59 |         |

### Response:
Each object(reading) contains timestamp, id and the metrics of device. <br>You can also checkout the metrics in the system, by going to the site page > devices > click on one of the devices
**Succssfull response:**
```
{
  "data": [
      {
          "eventDate": <TIME_STAMP>,
          "meterId": <METER_ID>,
          <METRIC_NAME_1>: <READING>,
          <METRIC_NAME_2>: <READING>
          ...
      }
  ]
}
```
**Error response:**
```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```

## Get aggregated data
```
GET /zira-public/system/analysis/<SYSTEM_ID>?interval=<INTERVAL>&fromTime=<FROM_TIME>&toTime=<TO_TIME> HTTP/1.1
Host: integ.api.zira.us
```

### Parameters:
| Parameter | Placeholder | Required | Default | Type               | Format              | Options                                | Description                                                                                                                  |
| --------- | ----------- | -------- | ------- | ------------------ | ------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| interval  | <INTERVAL>  | true     |         | String (interval)  | 1 hour              | 5 minutes, 15 minutes, 1 hours, 1 days | Checkout the channels page in the system and click on one of the channels, you'll be able to see the intervals on your right |
| fromTime  | <FROM_TIME> | true     |         | String (timestamp) | 2020-10-15T00:00:00 |                                        |                                                                                                                              |
| toTime    | <TO_TIME>   | true     |         | String (timestamp) | 2020-11-15T23:59:59 |                                        |                                                                                                                              |

## Create post
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
### Payload:

| Property    | Required | Default | Type             | Format            | Options     | Description                                                                                                                                                                           |
| ----------- | -------- | ------- | ---------------- | ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| toChannelId | true     |         | String (numeric) | "1234"            |             | <p>To get channel ID, go to the desired chanel in the system and checkout the URL, the number at the end of the Path is the channel ID.<br>Example: https://my.zira.us/channels/1</p> |
| postTypeId  | true     |         | String (numeric) | "1"               | ["1", "15"] | "1": Ordinary post, "15": Alert post                                                                                                                                                  |
| content     | true     |         | String           | "Hello everyone!" |             |                                                                                                                                                                                       |

### Response:

**Succssfull response:**

```
{
    "data": "<NEW_POST_ID>"
}
```
**Error response:**
```
{
    "message": "<ERROR MESSAGE>",
    "details": "<ERROR DETAILS>"
}
```


## Create/Edit task
