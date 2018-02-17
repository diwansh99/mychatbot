const express  = require('express');
const bodyparser = require('body-parser');
const request = require('request');
const app = express();
var port = 5000 || process.env.PORT ;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));

app.get('/webhook' , function(req,res){
  if(req.query['hub.mode'] && req.query['hub.verify_token'] === 'diwansh'){
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});

app.post('/webhook', function(req,res){
  // console.log(req.body);

  if(req.body.object === 'page') {
    req.body.entry.forEach ((entry) => {
      entry.messaging.forEach((event) => {


        if(event.message && event.message.text) {



            console.log('in echo loop');
            console.log(event.message.text);

          sendMessage(event);

          }

         if(event.message.text === "yo"){
          console.log("in yo loop")
          sendQuickReply(event);

         }
      });
    });
    res.status(200).end();
  }
});

function sendMessage(event){
  let sender = event.sender.id;
  let text = event.message.text;

request({
  url : 'https://graph.facebook.com/v2.6/me/messages',
  qs : {access_token : 'EAAFcJ8XOwUMBAOM1cUBHZAshMZBx5DIANBHQV5id5rO71Q4aJbfr1OLXVvlGg2O67aNfFdxKmNktrT13uZAuBz0V4TN4Gw9aXaQLw1dqZBHBEpiaOsqOtFr5pQgpyZBZBpvaOyD2bxDEBNVEpDbYrknWXVjGZB00wxw0cYTSt65QN10lfzf7RLU'},
  method : 'POST',
  json : {
    recipient: {id : sender},
    message : {text : text}
  }
} , function(error,response){
  if(error){
    // console.log('Error sending message : ' , error);
  } else if(response.body.error){
    // console.log('Error : ' , response.body.error);
  }
});
}

 function sendQuickReply(event){

   let sender = event.sender.id;
   let text = event.message.text;

  request({
    url : 'https://graph.facebook.com/v2.6/me/messages?access_token=EAAFcJ8XOwUMBAOM1cUBHZAshMZBx5DIANBHQV5id5rO71Q4aJbfr1OLXVvlGg2O67aNfFdxKmNktrT13uZAuBz0V4TN4Gw9aXaQLw1dqZBHBEpiaOsqOtFr5pQgpyZBZBpvaOyD2bxDEBNVEpDbYrknWXVjGZB00wxw0cYTSt65QN10lfzf7RLU',
    method : 'POST',
    json : {
      "recipient":{
        "id":sender
      },
      "message":{
        "text": text,
        "quick_replies":[
          {
            "content_type":"text",
            "title":"Search",
            "payload":"RedQuickreplies",
            "image_url":"https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Red.svg/2000px-Red.svg.png"
          },
          {
            "content_type":"location"
          }
        ]
      }
    }


  } , function(error,response){
    if(error){
     console.log('Error sending message : ' , error);
    } else if(response.body.error){
      console.log('Error : ' , response.body.error);
    }
  });
  }







app.listen(port , function(){
  console.log("Server is running on " + port);
});
