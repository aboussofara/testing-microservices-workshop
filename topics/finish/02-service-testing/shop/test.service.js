const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const shop = require('./shop');

describe('shop', () => {
  before((done) => {
    // import the mountebank helper library
    const mb = require('mountebank-helper');

    // create the skeleton for the imposter (does not post to MB)
    const catalogueImposter = new mb.Imposter({ 'imposterPort': 9081 });
    const reviewImposter = new mb.Imposter({ 'imposterPort': 9082 });

    const catalogueResponse = {
      'uri': '/products',
      'verb': 'GET',
      'res': {
        'statusCode': 200,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify([{ sku: 1 }])
      }
    };

    const reviewResponse = {
      'uri': '/review',
      'verb': 'GET',
      'res': {
        'statusCode': 200,
        'responseHeaders': { 'Content-Type': 'application/json' },
        'responseBody': JSON.stringify({ 1: [{}] })
      }
    };

    catalogueImposter.addRoute(catalogueResponse);
    reviewImposter.addRoute(reviewResponse);

    mb.startMbServer(2525)
      .then(function () {
        Promise.all([
          catalogueImposter.postToMountebank(),
          reviewImposter.postToMountebank(),
        ])
          .then(() => {
            done();
          })
      })
  });

  it('returns products with reviews', () => {
    return expect(shop()).to.eventually.have.lengthOf(1);
  })
});
