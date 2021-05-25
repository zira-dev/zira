# Description
Returns aggregated data (Charts, KPIs and Benchmarks) as appear on the channel, this API can be used in order to integrate with other BI tools 


#### Query Params

| parameter | Required | Type   | Example                                               | Description                          |
| --------- | -------- | ------ | ----------------------------------------------------- | ------------------------------------ |
| systemId  | true     | String | `"123"`                                               | System id can be copied from zira UI |
| interval  | false    | String | `"5 minutes" ; "15 minutes" ; "1 hours" ; "1 days"` | Data aggregation interval            |
| fromTime  | false    | String | `"2021-05-01T00:00:00"`                               | from time                            |
| toTime    | false    | String | `"2021-05-30T00:00:00"`                               | to time                              |


