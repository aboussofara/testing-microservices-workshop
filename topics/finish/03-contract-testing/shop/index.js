var express = require('express')
var app = express()

var shop = require('./shop');

app.get('/shop', function (req, res) {
  shop().then((products) => {
    res.send(products)
  })
})

app.listen(9083, function () {
  console.log('shop listening on 9083!')
})
