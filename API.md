
- [Add reading](#add-reading)
  - [Payload:](#payload)
  - [Response:](#response)
- [Add event](#add-event)
- [Import CSV](#import-csv)
- [Export CSV](#export-csv)
- [Get normalized data](#get-normalized-data)
- [Get aggregated data](#get-aggregated-data)
- [Create post](#create-post)
  - [Payload:](#payload-1)
  - [Response:](#response-1)
- [Create/Edit task](#createedit-task)
  

## Add reading
Use this one to add device readings manually.

```
POST /meters-data/reading HTTP/1.1
Host: integ.api.zira.us
Content-Type: application/json
X-API-Key: aa54d7a9-6dd0-5ab2-9834-21ccb953c060
Content-Length: 93

[{
	"meterId":"455",
	"timestamp": "2019-12-10T19:32:00",
	"values": [1, 2, 1, 2, 1.3, 3]
}]
```
### Payload:

| Property  | Required | Default | Type   | Options | Description                                                                                                                                                                                                                                  |
| --------- | -------- | ------- | ------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| meterId   | true     |         | String |         | <p>meterId represents an ID of the device in question.<br>To get an ID, navigate to "Data Sources" tab of the Site, select the wanted device.<br>Then, select Info tab, you'll see the ID on the right.</p>                                  |
| timestamp | true     |         | String |         | <p>Date and time of the reading. Please use ISO 8601 standard<br>Note there's no timezone, assuming it's the timezone of the site.</p>                                                                                                       |
| values    | true     |         | Array  |         | <p>Array of reading values. The order is according to the schema of device.<br>For example, if you have a power meter, configured with two metrics - Current(Amps) and Voltage(Volts), you'll have to pass [<AMPS_VALUE>, <VOLTS_VALUE>]</p> |

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
## Add event
## Import CSV
## Export CSV
## Get normalized data
## Get aggregated data
## Create post
```
POST /zira-client/post HTTP/1.1
Host: api.zira.us
X-API-Key: aa54d7a9-6dd0-5ab2-9834-21ccb953c060
Content-Type: application/json
Content-Length: 86

{
    "postTypeId": "1",
    "content": "Hello everyone!",
    "toChannelId": "5218"
}
```
### Payload:

| Property    | Required | Default | Type        | Description                     |
| ----------- | -------- | ------- | ----------- | ------------------------------- |
| toChannelId | true     |         |             |                                 |
| postTypeId  | true     |         | ["1", "15"] | "1": Ordinary post, "15": Alert |
| content     | true     |         |             |                                 |

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