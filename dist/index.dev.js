"use strict";

var express = require('express');

var app = express();

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

app.use(express.json());

var TAFFY = require('taffy');

var SCREET_TOKEN = '4de3d53ad45933d7269fb6c80fe75c2';
var todo_db = TAFFY([{
  title: 'lorem ipsum dolor',
  complete: false
}, {
  title: 'lorem ipsu m dolor',
  complete: false
}]);
app.set('view engine', 'ejs');
app.use(express["static"](__dirname + '/public'));
app.get('/', function (req, res) {
  res.render('index');
});
app.get('/all', function (req, res) {
  var data = todo_db().get();
  res.set({
    'Content-type': 'application/json'
  });
  res.send(data);
});
app.post('/add', function (req, res) {
  todo_db.insert(req.body);
  res.set({
    'Content-type': 'application/json'
  });
  res.send({
    "msg": "Insert Success"
  });
});
app["delete"]('/delete/:id', function (req, res) {
  todo_db({
    ___id: req.params.id
  }).remove();
  res.set({
    'Content-type': 'application/json'
  });
  res.send({
    "msg": "Delete Success"
  });
});
app.put('/update/:id', function (req, res) {
  todo_db({
    ___id: req.params.id
  }).update(req.body);
  res.send({
    "msg": "Update Success"
  });
});
var port = process.env.PORT || 3000;
var host = '0.0.0.0';
app.listen(port, host, function () {
  console.log("run in ".concat(host, ":").concat(port));
});