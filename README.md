
![zira](images/zira-repo-image.png)
## Overview
This repository contains documentation, examples and code snippets for using zira public APIs in order to create custom zira applications
or integrate zira data with BI tools or operational applications

possible Usage:
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
  - [Preparation](#preparation)
  - [Getting started](#getting-started)
  - [API reference](API.md)

## Prerequisite
1. In order to use zira public APIs, you must sign up to zira. 
2. Once logged in to zira, create new application and generate API key.
   Here's how:
      go to https://my.zira.us/applications > Add new application > enter application name > Generate api key
3. API key should be added to request header of each API call:

```
X-API-Key: <YOUR_API_KEY>
```

## Getting started 

This document contains plain HTTP examples, to allow developers choose their favorite code language. 


## create new post on zira channel

### Example:
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

| Property    | Required | Default | Type             | Options     | Description                                                                                                                                                                           |
| ----------- | -------- | ------- | ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| toChannelId | true     |         | String (numeric) |             | <p>To get channel ID, go to the desired chanel in the system and checkout the URL, the number at the end of the Path is the channel ID.<br>Example: https://my.zira.us/channels/1</p> |
| postTypeId  | true     |         | String (numeric) | ["1", "15"] | "1": Ordinary post, "15": Alert post                                                                                                                                                  |
| content     | true     |         | String           |             |                                                                                                                                                                                       |

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
