const express = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const app = express();

const Bootbot = require('bootbot');
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
var ACCESS_TOKEN ='EAAYdsMqggCIBANm1g903ZA9NoDnzBoMoZCInSdQdvzHqM3l5ltqRwJkVHcpbAcLt57i2zIb1fEjZAk7mAovB9cDWdZBrZACmLxeg7vbz0ZByZB3uMgEdQIjlFxK5oZAbmsVhE4ZBLI94q5Mpch7n0rZB8nNsB8SGC9QcwMumchyZAFivc3kJlbn8q5F';
var APP_SECRET = '489c1e26dd9c407b49b25f3529096682';



app.get('/' , function(req,res){
  res.send("hello there");
});

app.get('/webhook', function(req, res) {


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
  accessToken : ACCESS_TOKEN,
  verifyToken : VERIFY_TOKEN,
  appSecret : APP_SECRET
})

bot.setGreetingText("Hello , I am here to solve your problems")

bot.setGetStartedButton((payload , chat) => {
  if(config.bucket === undefined)
  {
    chat.say("Hello my name is Note Buddy and I am here to help you")


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
bot.hear('config', (payloadc, hat) => {
  if(JSON.stringify(config.bucket) === undefined){
    chat.say("No config found :/ Be sure to run 'setup' to add your bucket details")
  }
  chat.say("A config has been found :) "+ JSON.stringify(config.bucket))
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
Cosmic.addObject(config,params,function(err , response){
  if(!err){
    eventEmitter.emit('new' , response.object.slug, datatime)

    convo.say("reminder added correctly :)")
    convo.end()
  }
  else{
    convo.say("there seems to be a problem...");
    convo.end();
  }
})
    })
  })
})


bot.hear('help' , (payload,chat) => {
  chat.say("Here are the following commands for use");
  chat.say("'create' : add a new reminder");
  chat.say("'setup' : add your bucket info such as slug and writekey");
  chat.say("'config' : list your current bucket config")
})

bot.hear('active', (payload, chat) => {
  chat.say('finding all of your ongoing reminders.')
})

eventEmitter.on('new' , function(itemSlug,time){
  schedule.scheduleJob(time, function(){
    Cosmic.getObject(config, {slug : itemSlug} , function(err,response){
      if(response.metadata.date == new Data(time).toISOString()){
        bot.say(BotUserId , response.object.title)
        console.log('firing reminder')
      }
      else{
        eventEmitter.emit('new' , response.object.slug , response.object.metafield.date.value)
        console.log('times do not match checking again at' + response.object.metadata.date)
      }
    })
  })
})
bot.start()
