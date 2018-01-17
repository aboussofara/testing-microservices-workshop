let chai = require('chai');
let expect = chai.expect;

describe('shop', () => {
  it('returns products with reviews', () => {
    let shop = require('./shop');

    return shop().then((products) => { expect(products.length).to.equal(3); } );
  })
});
