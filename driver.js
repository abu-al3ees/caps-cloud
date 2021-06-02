const { Consumer } = require('sqs-consumer');



const uuid = require('uuid');
const { Producer } = require('sqs-producer');

const producer = Producer.create({
  queueUrl: `https://sqs.us-east-1.amazonaws.com/506489556778/mohTobicQueue`,
  region: `us-east-1`,
});



 
const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-1.amazonaws.com/506489556778/mohTobicQueue',
  handleMessage: async (msg) => {
    
    let parsedBody = JSON.parse(msg.Body);
    let myOrder = JSON.parse(parsedBody.Message);
    console.log(myOrder);

    await ack();
  }
});
 

app.on('error', (err) => {
  console.error(err.message);
});
 
app.on('processing_error', (err) => {
  console.error(err.message);
});
 
app.start();


function ack() {
  setTimeout(async () => {
  
    try {
        const message = {
          id:faker.datatype.uuid(),
          body:'hello iam driver ',
         
        };
    
  
        const response = await producer.send(message);
        console.log(response);
      } catch (e) {
        console.error(e);
      }
    },  5000);
  }