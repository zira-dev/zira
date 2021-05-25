
![zira](images/zira-repo-image.png)

## Overview

This repository contains documentation, examples and code snippets for using zira public APIs in order to create custom zira applications
or integrate zira data with BI tools or operational applications

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

## Add post Example

#### Description
Add Post API allows to create new post on specific channel

**POST** `https://api.zira.us/public/post`

#### Example payload

```json
{
    "title":"Hello world",
    "content": "This is my message",
    "toChannelId": "123"
}

```

#### Properties

| Property    | Required | Type   | Example                | Description                             |
| ----------- | -------- | ------ | ---------------------- | --------------------------------------- |
| title       | false    | String | `"Hello world"`        | post title                              |
| content     | true     | String | `"This is my message"` | post content                            |
| toChannelId | true     | String | `"456"`                | channel id (can be copied from zira UI) |


### For additional zira documentation, please check out below references:
[App documentation](https://website.zira.us/docs/getting-started/introduction/)

[Developers](https://website.zira.us/developers/getting-started/introduction/)

[Postman API](https://apidocs.zira.us/)
