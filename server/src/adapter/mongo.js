
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
 // Get total number of records in tweets collection
  totalCount: function () {
   
    return db.collection('tweets').count();
  } ,
  
  //get latest number of tweets order by date desc     //test the date 
  latestTweets : function(limitNo){ 
    var result =  db.collection('tweets').find({},{projection:{_id:1,full_tweet:1}}).sort({"createdAt" :-1}).limit(parseInt(limitNo));
    return result.toArray();
  },
  
   // Get tweets for specific period
  getRangeOfTweets : function(from,to){
    
return db.collection('tweets').find({createAt:{gte:from  ,lt: to}},{projection:{_id:1}}).count()
  },

  //get tweets for specific hashtag and has values in geo attribute
  geoHashtagedTweets: function(hashtag1){
    
    var result = db.collection('tweets').find({ $and: [{"geo":{$ne:null}},{'entities.hashtags':{$elemMatch:{'text':hashtag1}}}]}, {projection:{ _id : 1, full_tweet:1, geo:1}})  // get tweet text, geolocation attribute for all tweets that has geo not null
    result = result.toArray();
    return  Promise.resolve(result);
  }, 

   //get all tweets that have values in geo attribute
  geoTweets: function(){
    
    var result = db.collection('tweets').find({"geo":{$ne:null}}, {projection:{full_tweet:1,"user.name":1, geo:1}})  // get tweet text, geolocation attribute for all tweets that has geo not null
    result = result.toArray();
    return  Promise.resolve(result); 
  }, 

  //get tweets for 1 or 2 ,3, or 4 hashtags  
  hashtagsTweets: function(hashtag1,hashtag2,hashtag3,hashtag4){
 
   var result= db.collection('tweets').find({ $or : [
   {'entities.hashtags':{$elemMatch:{'text':hashtag1}}},
   {'entities.hashtags':{$elemMatch:{'text':hashtag2}}},
   {'entities.hashtags':{$elemMatch:{'text':hashtag3}}},
   {'entities.hashtags':{$elemMatch:{'text':hashtag4}}}
  ]},{projection:{'full_tweet':1,'entities.hashtags.text':1}} );
  return result.toArray();
 
   
  }
}


