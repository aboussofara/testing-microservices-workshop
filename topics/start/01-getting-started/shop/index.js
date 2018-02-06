var express = require('express')
var app = express()

var shop = require('./shop');

app.get('/shop', function (req, res) {
  shop().then((data) => {
    res.send(data)
  })
})

app.listen(9083, function () {
  console.log('shop listening on 9083!')
})
