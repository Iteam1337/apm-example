# apm-example
A simple example of Elastic APM Server running on back- and front-end

# Run
```bash
docker-compose build
docker-compose up
```
Wait until Kibana seems to have woken up and goto http://localhost:5601

* Click on
  1. [ Add APM ]
  2. [ Check APM Server Status ]
  3. [ Check Agent Status ]
  4. [ Load Kibana Objects ]
  5. [ Launch APM ]
* Set `Auto-refresh` to `5 seconds`
* Visit http://localhost:3000 (...and click around a bit)
* Click on `Such amaze frontend` and enjoy the graphs

# Issues

I seem to have broken the api logging. Will add instructions as soon as it's up