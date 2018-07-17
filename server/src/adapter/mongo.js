
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
//not working properly
  latestTweets : function(limitNo){
    console.log('bbb '+limitNo);
    var result =  db.collection('tweets').find({},{_id:1,text:1}).sort({"createdAt" :-1}).limit(parseInt(limitNo));
    return result.toArray();
  },
  
  getRangeOfTweets : function(from,to){
    
return db.collection('tweets').find({createAt:{gte:from  ,lt: to}},{text:1}).count()
  },

  geolocationTweets: function(from,to){
    
    return db.collection('tweets').find({createAt:{gte:from  ,lt: to}},{text:1}).count()
  }, 
  hashtagsTweets: function(hashtag1,hashtag2){
    //return hashtagString;
  //  var tweetsWithHashtag =[] ;
   var cursor= db.collection('tweets').find({ $or : [{'entities.hashtags':{$elemMatch:{'text':hashtag1}}},
   {'entities.hashtags':{$elemMatch:{'text':hashtag2}}},{'full_tweet':1,'entities.hashtags.text':1}]},{'full_tweet':1,'entities.hashtags.text':1} );
/*   cursor.forEach(function(doc,err){
     tweetsWithHashtag.push(doc);

   });*/
   return cursor.toArray();
   
  
  }
}
 /*

function parseTwitterDate(tdate) {
  var system_date = new Date(Date.parse(tdate));
  var user_date = new Date();
  if (K.ie) {
      system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
  }
}

// from http://widgets.twimg.com/j/1/widget.js
var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    }
}();*/