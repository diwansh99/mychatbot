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

<<<<<<< HEAD

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

   const getBucketReadKey = (convo) =>{
    convo.ask("What's your Bucket Readkey?" , (payload , convo) => {
      var Readkey = payload.message.text;
      convo.set('read_key' , Readkey);
      convo.say("Setting read_key as" + Readkey).then(() =>
    getBucketWriteKey(convo));
    })
  }

   const getBucketWriteKey = (convo) =>{
    convo.ask("What's your Bucket Writekey?" , (payload,convo) => {
      var Writekey = payload.message.text;
      convo.set('write_key' , Writekey);
      convo.say("Setting Write_key as" + Writekey).then(()=>
    finishing(convo));
    })
  }


 const finishing = (convo) => {
   var newConfigInfo = {
     slug : convo.get('slug'),
     read_key : convo.get('Readkey'),
     write_key : convo.get('Writekey')
   }

   config.bucket = newConfigInfo ;
   convo.say("All Set :) ");
   convo.end();
 }


chat.conversation((convo) => {
  getBucketSlug(convo)
})

})

bot.hear(['hello' , 'hey' , 'sup'] , (payload,chat) => {
  chat.getUserProfile().then((user) => {
    chat.say(`Hey ${user.first_name}, How are you today?`)
  })
})


bot.hear('create' , (payload,chat) => {
  chat.conversation((convo) => {
    convo.ask("What would you like your reminder to be? etc 'I have an appointment tommorow from 10am to 11 am' the information will bw added automatically" , (payload , convo) => {
      datatime = chrono.parseDate(payload.message.text);
      var params= {
        write_key : config.bucket.write_key,
        type_slug : 'reminders',
        title : payload.message.text,
        metafields : [
          {
            key : 'date',
            type : 'text',
            value : datatime
          }
        ]
      }

      
    })
  })
})
