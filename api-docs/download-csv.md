# Description
Return download URL for CSV file contain readings of specific data-source, 
this API can be used in order to integrate to other BI tools, or in order to manipulate data using spreadsheet

#### Query Params

| parameter | Required | Type   | Example                 | Description                               |
| --------- | -------- | ------ | ----------------------- | ----------------------------------------- |
| meterId   | true     | String | `"Hello world"`         | Data-source id can be copied from zira UI |
| startTime | false    | String | `"2021-05-24T03:43:00"` | First entry time                          |
| endTime   | false    | String | `"2021-05-28T03:43:00"` | Last entry time                           |
| limit     | false    | String | `"100"`                 | Number of entries to fetch                |
                                                        
#### Example response

```json
{
    "data": {
        "fileUrl": "DOWNLOAD_URL"
    }
}

```