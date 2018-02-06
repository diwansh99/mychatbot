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
