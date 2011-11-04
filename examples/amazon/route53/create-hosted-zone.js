var util = require('util');
var amazon = require("amazon");
var route53 = require("route53");

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var r53 = new route53.Route53(accessKeyId, secretAccessKey, awsAccountId, amazon.US_EAST_1);

console.log( 'Region :', r53.region() );
console.log( 'EndPoint :',  r53.host() );
console.log( 'AccessKeyId :', r53.accessKeyId() );
// console.log( 'SecretAccessKey :', r53.secretAccessKey() );
console.log( 'AwsAccountId :', r53.awsAccountId() );

var args = {
    name : 'example.com',
    callerReference : 'id:46',
    comment : 'Created on 2011-11-01',
};

r53.createHostedZone(args, function(err, data) {
    console.log("\ncreating a hosted zone - expecting failure (probably need a new callerReference)");
    console.log('Error :', util.inspect(err, true, null));
    console.log('Data :', util.inspect(data, true, null));
});
