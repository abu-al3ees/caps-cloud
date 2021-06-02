'use strict';
const AWS = require('aws-sdk');

const sns = new AWS.SNS();
const topic = 'arn:aws:sns:us-east-1:506489556778:mohTobic';

setInterval(() => {
  const message = {
    storeName:storeName,
    orderId:faker.datatype.uuid(),
    customerName:faker.name.findName(),
    address:faker.address.cityName(),
    vendorId: 'arn:aws:sns:us-east-1:506489556778:mohTobic',
  };
  const payload = {
    Message: JSON.stringify(message),
    TopicArn: topic,
};
sns.publish(payload).promise()
.then(data => {
  console.log(data);
})
.catch(console.error);
}, 5000);

const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/506489556778/mohTobicQueue',
  handleMessage: handler,
});

function handler(message) {
  console.log(message.Body);
}

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();