let chai = require('chai');
let expect = chai.expect;
var nock = require('nock');

describe('shop', () => {
  it('returns sorted products alphabetically', () => {
    var scope = nock('http://localhost:9081')
      .get('/products')
      .reply(200, [
        { 'sku': 1, 'title': 'Flood Light with Cable and Plug LED', 'color': 'red' },
        { 'sku': 2, 'title': 'Crock-Pot SCVT650PS-CN 6.5 Quart', 'color': 'silver' }
      ]);

    let shop = require('./shop');

    return shop()
      .then((products) => {
        expect(products).to.deep.equal([
          { 'sku': 2, 'title': 'Crock-Pot SCVT650PS-CN 6.5 Quart', 'color': 'silver' },
          { 'sku': 1, 'title': 'Flood Light with Cable and Plug LED', 'color': 'red' }
        ]);
      });
  })
});
