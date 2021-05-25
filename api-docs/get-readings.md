# Description
Return readings of specific data-source, 
this API can be used in order to integrate to other BI tools, or in order to manipulate data using other software

#### Query Params

| parameter | Required | Type   | Example                                  | Description                                  |
| --------- | -------- | ------ | ---------------------------------------- | -------------------------------------------- |
| meterId   | true     | String | `"Hello world"`                          | Data-source id can be copied from zira UI    |
| startTime | false    | String | `"2021-05-24T03:43:00"`                  | First entry time                             |
| endTime   | false    | String | `"2021-05-28T03:43:00"`                  | Last entry time                              |
| limit     | false    | String | `"100"`                                  | Number of entries to fetch                   |
| lastValue | false    | String | `"7a3c402b-8728-4f89-9e15-b5f6c13828c4"` | Key of last API call ( used for pagination ) |
                                                        
#### Example response

```json
{
    "data":[
    {"6":0.955,"meter_id":906,"event_date":"2021-05-24T06:45:00.000000Z"},
    {"6":0.947,"meter_id":906,"event_date":"2021-05-24T06:30:00.000000Z"},
    {"6":0.959,"meter_id":906,"event_date":"2021-05-24T06:15:00.000000Z"}
    ...
    ],
    "lastValue":"eyJldmVudF9kYXRlIjoiMjAyMS0wNS0yNFQwMzo0NTowMC4wMDAwMDBaIn0="
}

```