
- [Add reading](#add-reading)
  - [Example](#example)
  - [meterId](#meterid)
  - [timestamp](#timestamp)
- [Add event](#add-event)
- [Import CSV](#import-csv)
- [Export CSV](#export-csv)
- [Get normalized data](#get-normalized-data)
- [Get aggregated data](#get-aggregated-data)
- [Create post](#create-post)
  - [Example](#example-1)
  - [postTypeId (String)](#posttypeid-string)
  - [content (String)](#content-string)
  - [toChannelId (String)](#tochannelid-string)
- [Create/Edit task](#createedit-task)
  

## Add reading
```
POST /zira-client/reading HTTP/1.1
```
Use this one to add device readings manually.

### Example
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
### meterId
meterId represents an ID of the device in question.
To get an ID, navigate to "Data Sources" tab of the Site, select the wanted device.
Then, select Info tab, you'll see the ID on the right.

### timestamp
Date and time of the reading. Please use ISO 8601 standard.
Note that there's a timezone also. Example of US, California timestamp: 
2021-01-21T19:32:00-07:00
The time zone have to be 

## Add event
## Import CSV
## Export CSV
## Get normalized data
## Get aggregated data
## Create post
```
POST /zira-client/post HTTP/1.1
```
Creates a new post on a chosen channel.
Keep the post type ID = 1 for an ordinary post.

### Example
```
POST /zira-client/post HTTP/1.1
Host: api.zira.us
Content-Type: application/json
X-API-Key: aa54d7a9-6dd0-5ab2-9834-21ccb953c060
Content-Length: 86

{
    "postTypeId": "1",
    "content": "Hello everyone!",
    "toChannelId": "5218"
}
```

### postTypeId (String)
Use one of the below IDs.
```
| Type          | ID   |
| :------------ | :--- |
| Ordinary Post | 1    |
| Alert         | 15   |
```

### content (String)
Body of the post.

### toChannelId (String)
Target channel. 
Checkout the channel number in the address section of the browser.



## Create/Edit task