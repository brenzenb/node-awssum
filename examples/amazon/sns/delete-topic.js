var inspect = require('eyes').inspector();
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');
var snsService = awssum.load('amazon/sns');

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var sns = new snsService(accessKeyId, secretAccessKey, awsAccountId, amazon.US_EAST_1);

console.log( 'Region :', sns.region() );
console.log( 'EndPoint :',  sns.host() );
console.log( 'AccessKeyId :', sns.accessKeyId() );
// console.log( 'SecretAccessKey :', sns.secretAccessKey() );
console.log( 'AwsAccountId :', sns.awsAccountId() );

sns.DeleteTopic({ TopicArn : 'fakeTopicArn' }, function(err, data) {
    console.log('\nDeleting this topicArn - expecting failure since it doesn\'t exist');
    inspect(err, 'Error');
    inspect(data, 'Data');
});

sns.DeleteTopic({}, function(err, data) {
    console.log('\nDeleting an undefined topicArn - expecting failure since we didn\'t provide a TopicArn');
    inspect(err, 'Error');
    inspect(data, 'Data');
);

// firstly, re-create this topic (it's idempotent) to get the topicArn
sns.CreateTopic({ Name : 'my-topic' }, function(err, data) {
    console.log('\nCreating (my-topic) - expecting success');
    inspect(err, 'Error');
    inspect(data, 'Data');

    // now delete it again
    if ( ! err ) {
        var topicArn = data.CreateTopicResponse.CreateTopicResult.TopicArn;
        sns.DeleteTopic({ TopicArn : topicArn }, function(err, data) {
            console.log('\ndeleting topic (my-topic) - expecting success');
            inspect(err, 'Error');
            inspect(data, 'Data');
        });
    }
});
