# kafka-playground

Super easy way to setup and run a Kafka consumer/producer

```bash
docker-compose up -d kafka
docker-compose run --rm consumer npm install
docker-compose run --rm consumer
# Open a new tab and run:
docker-compose run --rm producer
```
