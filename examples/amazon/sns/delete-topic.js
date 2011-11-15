var util = require('util');
var amazon = require('amazon/amazon');
var snsService = require('amazon/sns');

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var sns = new snsService.Sns(accessKeyId, secretAccessKey, awsAccountId, amazon.US_EAST_1);

console.log( 'Region :', sns.region() );
console.log( 'EndPoint :',  sns.host() );
console.log( 'AccessKeyId :', sns.accessKeyId() );
// console.log( 'SecretAccessKey :', sns.secretAccessKey() );
console.log( 'AwsAccountId :', sns.awsAccountId() );

sns.deleteTopic({ topicArn : 'fakeTopicArn' }, function(err, data) {
    console.log("\nDeleting this topicArn - expecting failure");
    console.log('Error :', err);
    console.log('Data  :', data);
});

sns.deleteTopic({}, function(err, data) {
    console.log("\nDeleting an undefined topicArn - expecting failure");
    console.log('Error :', err);
    console.log('Data  :', data);
});

// firstly, re-create this topic (it's idempotent) to get the topicArn
sns.createTopic({ topicName : 'my-topic' }, function(err, data) {
    console.log("\nCreating (my-topic) - expecting success");
    console.log('Error :', err);
    console.log('Data  :', data);

    // now delete it again
    if ( ! err ) {
        var topicArn = data.CreateTopicResponse.CreateTopicResult.TopicArn;
        sns.deleteTopic({ topicArn : topicArn }, function(err, data) {
            console.log("\ndeleting topic (my-topic) - expecting success");
            console.log('Error :', util.inspect(err, true, null));
            console.log('Data :', util.inspect(data, true, null));
        });
    }
});
