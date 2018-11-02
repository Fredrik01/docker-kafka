# kafka-playground

Super easy way to setup and run Kafka consumers and producers

```bash
docker-compose up -d kafka
docker-compose run --rm consumer-1
# Open a new tab and run:
docker-compose run --rm producer
```

GOALS
* Run multiple consumers simultaneously - Check
* Add a new consumer that starts from the beginning - In progress
* Where to store the events?

LEARNED
* Kafka (or the consumer) can store consumer offsets
