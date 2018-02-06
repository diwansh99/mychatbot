const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const app = express();

const bootbot = require('Bootbot');
const Cosmic = require('cosmicjs');
require('dotenv').config();
const chrono = require('chrono-node');
var schedule = require('node-schedule');
const EventEmitter = require('events').EventEmitter;

var config = { };
const reminder = [ ];
const eventEmitter = new EventEmitter();
var port = 5000 || process.env.PORT;
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
var VERIFY_TOKEN = '1234';
var ACCESS_TOKEN ='EAAYdsMqggCIBAFxlHR52UmYMQfb3fuUMUK0GZB5Na8HZBrksRbVPyW5t3mQJouARtvfOcUavsKBMpB5lsI5peXgUEbsUhvL7S8u8lNGOOPD02uTgb1vxnvPQ9szgstPrqplvqkH8KtpxuFYQ0stlEmA01pf0N8ToiwmhqRmGBRwaZC5R0NV';
var APP_SECRET = 'some secret string of numbers and letters';



app.get('/' , function(req,res){
  res.send("hello there");
});

app.get('/webhook/', function(req, res) {


  if (req.query['hub.verify_token'] === VERIFY_TOKEN){
    return res.send(req.query['hub.challenge'])
    res.send(VERIFY_TOKEN);
    res.send['hub.verify_token'];

  }
  res.send('wrong token')
})



app.listen(port , function(){
  console.log("Server is running on" + port);
});


const bot = new Bootbot({
  accessToken = ACCESS_TOKEN;
  verifyToken = VERIFY_TOKEN;
  appSecret = APP_SECRET;
})

bot.setGreetingText("Hello , I am here to solve your problems")

bot.setGetStartedButton((payload , chat) => {
  if(config.bucket === undefined)
  {
    chat.say("Hello my name is Note Buddy and I am here to help you")

  }
  BotUserId = payload.sender.id
}
);

bot.hear('setup' , (payload,chat) => {
  const getBucketSlug = (convo) => {
    convo.ask("what's your Bucket slug?" , (payload , convo) =>{
      var slug = payload.message.text;
      convo.set('slug' , slug);
      convo.say("Setting Slug as" + slug).then(() =>
      getBucketReadKey(convo));
    })
  }

  getBucketReadKey = (convo) =>{
    convo.ask("What's your Bucket Readkey?" , (payload , convo) => {
      var Readkey = payload.message.text;
      convo.set('read_key' , Readkey);
      convo.say("Setting Read_key as" + Readkey).then(() =>
    getBucketWriteKey(convo));
    })
  }

  getBucketWriteKey = (convo) =>{
    convo.ask("What's your Bucket Writekey?" , (payload,convo) => {
      var Writekey = payload.message.text;
      convo.set('write_key' , Writekey);
      convo.say("Setting Write_key as" + Writekey).then(()=>
    finishing(convo));
    })
  }
  
})
