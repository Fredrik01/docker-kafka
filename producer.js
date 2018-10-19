const Kafka = require('node-rdkafka');

let producer = new Kafka.Producer({
  // 'debug' : 'all',
  'metadata.broker.list': 'kafka:9092',
  'dr_cb': true  // Delivery report
});

let topicName = 'test';

// Log debug messages
producer.on('event.log', function(log) {
  console.log(log);
});

// Log error
producer.on('event.error', function(err) {
  console.error('Error from producer');
  console.error(err);
});

let counter = 0;
let maxMessages = 10;

producer.on('delivery-report', function(err, report) {
  console.log('delivery-report: ' + JSON.stringify(report));
  counter++;
});

producer.on('ready', function(arg) {
  console.log('Producer ready. ' + JSON.stringify(arg));

  for (let i = 0; i < maxMessages; i++) {
    let value = Buffer.from('value-' +i);
    let key = "key-"+i;
    let partition = -1;
    producer.produce(topicName, partition, value, key);
  }

  // Need to keep polling for a while to ensure the delivery reports are received
  let pollLoop = setInterval(function() {
    producer.poll();
    if (counter === maxMessages) {
      clearInterval(pollLoop);
      producer.disconnect();
    }
  }, 1000);
});

producer.on('disconnected', function(arg) {
  console.log('Producer disconnected');
});

producer.connect();
