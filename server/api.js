var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/todo';

var bodyParser = require('body-parser');
app.use(bodyParser.json());

MongoClient.connect(url, function(conn_err, db) {
  if (conn_err) {
    console.error(conn_err);
    collection.exit(0);
  }
  console.log('DB ok');

  var err = function(resp) {
    return function(err) {
      resp.status(500).send(err);
    };
  };

  app.get('/_/:coll', function(req, res) {
    db.collection(req.params.coll)
      .find({})
      .toArray()
      .then(function(resp) {
        res.send(resp);
      }, err(res));
  });

  app.get('/_/:coll/:id', function(req, res) {
    db.collection(req.params.coll)
      .findOne({
        _id: new mongodb.ObjectId(req.params.id)
      })
      .then(function(resp) {
        res.send(resp);
      }, err(res));
  });


  app.post('/_/:coll', function(req, res) {
    db.collection(req.params.coll)
      .insertOne(req.body)
      .then(function(resp) {
        res.send(resp);
      }, err(res));
  });

  app.put('/_/:coll/:id', function(req, res) {
    db.collection(req.params.coll)
      .updateOne({
        _id: new mongodb.ObjectId(req.params.id)
      })
      .then(function(resp) {
        res.send(resp);
      }, err(res));
  });

  app.delete('/_/:coll/:id', function(req, res) {
    db.collection(req.params.coll)
      .remove({
        _id: new mongodb.ObjectId(req.params.id)
      })
      .then(function(resp) {
        res.send(resp);
      }, err(res));
  });

  app.use(express.static('../web'));
});


var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});