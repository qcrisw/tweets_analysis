
// Mongo adapter
const mongo = require('mongodb')
const ObjectID = mongo.ObjectID
var db

module.exports = {
  connect: function (urlObject) {
    var host = urlObject.host
    console.log('Connecting to mongodb at', host)
    return mongo.MongoClient.connect(urlObject.href)
      .then(function (client) {
        console.log('Connected to mongodb at', host)
        db = client.db()
      })
  },

  totalCount: function () {
    // Get total number of records in tweets collection
    return db.collection('tweets').count();
  } ,

  latestTweets : function(){
    return db.collection('tweets').find({_id:1,text:1}).sort({"createdAt" :-1}).limit(5);
    
  }
}
 