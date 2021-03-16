
![zira](zira-repo-image.png)
## Table of Contents
  - [Overview](#overview)
  - [Preparation](#preparation)
  - [Getting started](#getting-started)
  - [API reference](API.md)

## Overview
This simple repository will help you develop easy integration with our system. 

## Preparation
We're using an API key as a way of securing user applications. API key must be added in the request header called X-API-Key.
```
X-API-Key: aa54d7a9-6dd0-5ab2-9834-21ccb953c060
```

- To get an API key, log in to zira.com and go to Applications Tab:
![alt text](images/gen_app.png "Gen. App.")
- Click on the + and choose a name for the Application.
- After that you will be presented with an API key.
- Keep that key secure, and don't share it with 3rd party.

## Getting started 
Use your favorit http client to access our API functions. Below is plain HTTP request.

```
POST /zira-client/post HTTP/1.1
Host: api.zira.us
Content-Type: application/json
Content-Length: 86

{
    "postTypeId": "1",
    "content": "Hello everyone!",
    "toChannelId": "5218"
}
```
