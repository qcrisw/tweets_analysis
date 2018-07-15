
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
 
 //const port = process.env.PORT || '3000'
const databaseURL = process.env.DATABASE_URL
const { URL } = require('url')
const urlObject = (new URL(databaseURL))
const protocol = urlObject.protocol
var adapter = require('./adapter/mongo')

adapter.connect(urlObject)
  .then(function () {
    app.listen(5000);
    console.log('Listening on port 50000000')
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

app.get('/', (req,res)=>{
  adapter.totalCount()
    .then(function (result) {
      res.json({ tweets_count: result })
    })
    .catch(function (err) {
      console.log(err)
      res.status(500).json({ status: 'Error' })
    })
})

app.get('/latestTweets', (req,res)=>{
  adapter.latestTweets()
  .then(function (result) {
    res.json({ latest_tweets: result })
  })
  .catch(function (err) {
    console.log(err)
    res.status(500).json({ status: 'Error' })
  })
})

