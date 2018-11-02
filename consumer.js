const Kafka = require('node-rdkafka');

let consumer = new Kafka.KafkaConsumer({
  'group.id': process.env.GROUP_ID,
  'client.id': process.env.CLIENT_ID,
  'metadata.broker.list': 'kafka:9092',
  'auto.offset.reset': 'earliest',
  // 'offset.store.method': 'file',
  // 'offset.store.path': process.env.STORAGE_PATH,
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
    console.log(`${process.env.CLIENT_ID} started successfully`);
    consumer.subscribe(['test']);
    consumer.consume();
  })
  .on('data', function(data) {
    console.log(data.value.toString()); // Message
  });
