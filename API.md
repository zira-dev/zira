
- [Add reading](#add-reading)
  - [Payload:](#payload)
  - [Response:](#response)
- [Add event*](#add-event)
  - [Payload:](#payload-1)
  - [Response:](#response-1)
- [Import CSV](#import-csv)
  - [1. Getting CSV template](#1-getting-csv-template)
  - [Parameters:](#parameters)
  - [Response:](#response-2)
  - [2. Getting signed URL for Upload](#2-getting-signed-url-for-upload)
  - [Response:](#response-3)
  - [3. Upload](#3-upload)
- [Export CSV](#export-csv)
  - [Parameters:](#parameters-1)
  - [Response:](#response-4)
- [Get normalized data](#get-normalized-data)
- [Get aggregated data](#get-aggregated-data)
- [Create post](#create-post)
  - [Payload:](#payload-2)
  - [Response:](#response-5)
- [Create/Edit task](#createedit-task)
  

## Add reading
Use this one to add device readings manually.

```
POST /meters-data/reading HTTP/1.1
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
POST /zira-client/event HTTP/1.1
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
GET /zira-client/reading/template?meterId=<METER_ID> HTTP/1.1
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
GET /zira-client/reading/import?meterId=<METER_ID> HTTP/1.1
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
GET /meters-data/export/?meterId=<METER_ID>&endTime=<END_TIME>&startTime=<START_TIME> HTTP/1.1
Host: integ.api.zira.us
X-API-Key: <API_KEY>
```
### Parameters:
| Property  | Required | Default | Type               | Format              | Options | Description                                                                                                                                                                                                 |
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
## Get normalized data
## Get aggregated data
## Create post
```
POST /zira-client/post HTTP/1.1
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