var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assert = require('assert');
var mongodb = require('mongodb');
var mongo = require('mongodb').MongoClient;
var db_url = 'mongodb://localhost:27017/test';

var index = require('./routes/index');
var users = require('./routes/users');

var cors = require('cors')

var app = express();

var http = require('http');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/
app.use(cors());

app.get('/',function(req,res){
  res.send("hello,world");
})

app.get('/hi',function(req,res){
  res.send('hello world');
})

app.post('/',function(req,res){
	console.log(req.body.mobile);
  var userInfo = {
    name: req.body.user,
    company: req.body.company,
    email: req.body.email,
    mobile: req.body.mobile
  };

  mongo.connect(db_url,function(err,db){
    assert.equal(null,err);
    db.collection('userInfo').insert(userInfo,function(err,result){
      assert.equal(null,err);
      console.log('data inserted');
      db.close();
      res.json(req.body.email);
    });
  });
});

app.get('/getRecord',function(req,res){
  var record = [];
  mongo.connect(db_url,function(err,db){
    assert.equal(null,err);
    db.collection('userInfo').find().toArray(function(err,docs){
      if (err) throw err;
      record = docs;
      db.close();
      res.json(record);
    });
  });
});

app.post('/deleteRecord',function(req,res){
  var id = req.body.id;
  mongo.connect(db_url,function(err,db){
    assert.equal(null,err);
    db.collection('userInfo').deleteOne({_id: new mongodb.ObjectID(id)});
    if (err) throw err;
    db.close();
    res.json({});
  })
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
