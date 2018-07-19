
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('./lib/moment')
const app = express()
 
var path = require('path');

 //const port = process.env.PORT || '3000'
const databaseURL = process.env.DATABASE_URL
const { URL } = require('url')
const urlObject = (new URL(databaseURL))
const protocol = urlObject.protocol
var adapter = require('./adapter/mongo')

adapter.connect(urlObject)
  .then(function () {
    app.listen(5000);
    console.log('Listening on port 5000')
     // app.listen(port, () => console.log('Tweets analysis tool is working on port ', port))
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })

app.use(bodyParser.json({limit: '5mb'}))
/*
app.get('/ping', (req, res) => {
  res.send('OK')
})

 */
/*
   totalCount API: return total count of tweets
   param: none
   return {tweets_count:integer}
*/ 
app.get('/totalCount', (req,res)=>{
  adapter.totalCount()
    .then(function (result) {
      res.json({ tweets_count: result })
    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    })
})
 
/*
   latestTweets API: return last specifc number of tweets count of tweets
   param: number of tweets to return
   return {latest_tweets:array of tweets [id,text]}
*/ 
app.get('/latest/:number',  (req,res)=>{
 // console.log('heeere'+req.params.number)
 
  adapter.latestTweets(req.params.number)
    .then(function (result) {
      res.json({ latest_tweets: result })
    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    }) 
})
 
 /*  
 getRangeOfTweets API return range of tweets between 2 dates
 */
app.get('/getRangeOfTweets',  (req,res)=>{
  from = 'Mon Jul 1 10:51:32 +0000 2018'// Get this string from the Twitter API
//from = datetime.strptime(from, '%a %b %d %H:%M:%S +0000 %Y')
moment(from, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
console.log(from);
to = 'Mon Jul 16 10:51:32 +0000 2018'// Get this string from the Twitter API
//to = datetime.strptime(from, '%a %b %d %H:%M:%S +0000 %Y')
moment(to, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en');
console.log(to);
/*  adapter.getRangeOfTweets(from,to)
    .then(function (result) {
      res.json({ latest_tweets: result })
    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    })*/
})
 
/**
 geolocationTweets API:return all tweets that have geo value and talked about specifc topic
 */
app.get('/geoHashtagedTweets/:keyword1',  (req,res)=>{
  adapter.geoHashtagedTweets(req.params.keyword1)
    .then(function (result) {
      res.json({ tweets: result })
    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    })
})


/**
 geolocationTweets API:return all tweets that have geo  
 */
app.get('/geoTweets/',  (req,res)=>{
  adapter.geoTweets(req.params.keyword1)
    .then(function (result) {
      //var getData = formatJson(result);
      res.json({ tweets: result })
    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    })
})

/**
 hashtagsTweeets API: return tweets regarding hashtag
 param: keyword which is passed through request , :keyword2? second parameter is optional
 result: tweets > array of jsons (id, text)
 */
app.get('/hashtagsTweets/:keyword1/:keyword2?/:keyword3?/:keyword4?',  (req,res)=>{
   var result =adapter.hashtagsTweets(req.params.keyword1,req.params.keyword2,req.params.keyword3,req.params.keyword4) 
  .then(function (result) {
    
      res.json({ tweets: result })
    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    }) 
})