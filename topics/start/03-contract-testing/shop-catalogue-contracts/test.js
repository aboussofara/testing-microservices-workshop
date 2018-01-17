let chai = require('chai');
let expect = chai.expect;
let request = require('request-promise-native');

describe('catalogue', () => {
  it('matches the contract', () => {
    return products = request({
      uri: 'http://catalogue:9081/products',
      json: true
    }).then((products) => {
      expect(products).to.be.a('boolean');
    });
  });
});
