var express = require('express')
var app = express()

var hello = require('./hello');

app.get('/', function (req, res) {
  res.send(hello())
})

app.listen(9080, function () {
  console.log('Hello World listening on 9080!')
})
