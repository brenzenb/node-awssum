var util = require("util");
var amazon = require("amazon");
var simpledb = require("simpledb");

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var sdb = new simpledb.SimpleDB(accessKeyId, secretAccessKey, awsAccountId, amazon.US_WEST_1);

console.log( 'Region :', sdb.region() );
console.log( 'EndPoint :',  sdb.host() );
console.log( 'AccessKeyId :', sdb.accessKeyId() );
console.log( 'SecretAccessKey :', sdb.secretAccessKey() );
console.log( 'AwsAccountId :', sdb.awsAccountId() );

sdb.getAttributes({ domainName : 'test', itemName : 'chilts' }, function(err, data) {
    console.log("\ngetting chilts - expecting success");
    console.log('Error :', util.inspect(err, true, null));
    console.log('Data :', util.inspect(data, true, null));
});

sdb.getAttributes({ domainName : 'test', itemName : 'andychilton', consistentRead : true }, function(err, data) {
    console.log("\ngetting andychilton - expecting success");
    console.log('Error :', util.inspect(err, true, null));
    console.log('Data :', util.inspect(data, true, null));
});

sdb.getAttributes({ domainName : 'test', itemName : 'replace', consistentRead : true }, function(err, data) {
    console.log("\ngetting replace - expecting success");
    console.log('Error :', util.inspect(err, true, null));
    console.log('Data :', util.inspect(data, true, null));
});

var expected = { domainName : 'test', itemName : 'expected', attributeName : 'username', consistentRead : false };
sdb.getAttributes(expected, function(err, data) {
    console.log("\ngetting expected - expecting success");
    console.log('Error :', util.inspect(err, true, null));
    console.log('Data :', util.inspect(data, true, null));
});
