var express = require('express')
var app = express()

var catalogue = require('./catalogue');

app.get('/products', function (req, res) {
  res.send(catalogue())
})

app.listen(9081, function () {
  console.log('catalogue listening on 9081!')
})
