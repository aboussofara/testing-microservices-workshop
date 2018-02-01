var express = require('express')
var app = express()

var review = require('./review');

app.get('/review', function (req, res) {
  res.send(review())
})

app.listen(9082, function () {
  console.log('review listening on 9082!')
})
