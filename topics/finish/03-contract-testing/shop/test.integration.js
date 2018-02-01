const { before, it, describe, after } = global;

const chai = require('chai');
const path = require('path');
const chaiAsPromised = require('chai-as-promised');
const pact = require('pact');
const { somethingLike: like, eachLike } = pact.Matchers;
const expect = chai.expect;
const shop = require('./shop');
chai.use(chaiAsPromised);

// Configure and import consumer API
// Note that we update the API endpoint to point at the Mock Service
const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN';

const cataglogueMock = pact({
  consumer: 'shop',
  provider: 'catalogue',
  port: 9081,
  log: path.resolve(process.cwd(), 'logs', 'catalogue.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: LOG_LEVEL,
  spec: 2
});

const reviewMock = pact({
  consumer: 'shop',
  provider: 'review',
  port: 9082,
  log: path.resolve(process.cwd(), 'logs', 'review.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: LOG_LEVEL,
  spec: 2
});

const expectedBodyForCatalogue = eachLike(
  {
    sku: like(1),
    title: like('Flood Light with Cable and Plug LED'),
    color: like('red')
  },
  { min: 1 }
);

const expectedBodyForReview = {
  1: eachLike({
    sku: like(1),
    user: like('Chris Smith'),
    description: like('First off, the S5620 provides a very good shave, the triple shaving heads allow for getting a clean shave around places like your chin and under your nose.'),
    rating: like(3)
  }, { min: 1 })
};

describe('Pact with catalogue', () => {
  describe('when a call to the Provider is made', () => {
    before(() => {
      return Promise.all([
        cataglogueMock.setup()
          .then(() => {
            cataglogueMock.addInteraction({
              uponReceiving: 'a request for JSON data',
              withRequest: {
                method: 'GET',
                path: '/products'
              },
              willRespondWith: {
                status: 200,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                },
                body: expectedBodyForCatalogue
              }
            })
          }),
        reviewMock.setup()
          .then(() => {
            reviewMock.addInteraction({
              uponReceiving: 'a request for JSON data',
              withRequest: {
                method: 'GET',
                path: '/review'
              },
              willRespondWith: {
                status: 200,
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                },
                body: expectedBodyForReview
              }
            })
          })
      ]);
    });

    it('can process the JSON payload from the provider', () => {
      const response = shop();

      return expect(response).to.eventually.have.deep.property('[0].sku', 1);
    });

    it('should validate the interactions and create a contract', () => {
      return Promise.all([cataglogueMock.verify(), reviewMock.verify()]);
    })
  });

  // Write pact files to file
  after(() => {
    return Promise.all([cataglogueMock.finalize(), reviewMock.finalize()]);
  })
});
