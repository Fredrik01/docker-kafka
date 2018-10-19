const Kafka = require('node-rdkafka');

let consumer = new Kafka.KafkaConsumer({
  'group.id': 'kafka',
  'metadata.broker.list': 'kafka:9092',
  'offset_commit_cb': function(err, topicPartitions) {

    if (err) {
      console.error(err);
    } else {
      console.log(topicPartitions);
    }
  }
})

consumer.connect();

consumer
  .on('ready', function() {
    consumer.subscribe(['test']);
    consumer.consume();
  })
  .on('data', function(data) {
    console.log(data.value.toString()); // Message
  });
