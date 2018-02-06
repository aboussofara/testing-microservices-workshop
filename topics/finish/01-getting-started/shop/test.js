let chai = require('chai');
let expect = chai.expect;
var nock = require('nock');

describe('shop', () => {
  it('returns products with reviews', () => {

    var scope = nock('http://localhost:9081')
      .get('/products')
      .reply(200, [{"sku":1,"title":"Flood Light with Cable and Plug LED","color":"red"}]);

    let shop = require('./shop');

    return shop().then((products) => { expect(products.length).to.equal(1); } );
  })
});
