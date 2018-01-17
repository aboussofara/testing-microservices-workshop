const chai = require('chai')
const path = require('path')
const chaiAsPromised = require('chai-as-promised')
const pact = require('pact')
const expect = chai.expect
const API_PORT = process.env.API_PORT || 9081
const {
  shop
} = require('../shop')
chai.use(chaiAsPromised)

// Configure and import consumer API
// Note that we update the API endpoint to point at the Mock Service
const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN'

const provider = pact({
  consumer: 'shop',
  provider: 'catalogue',
  port: API_PORT,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: LOG_LEVEL,
  spec: 2
})
const expectedBody = {
  sku: 1
}

describe('Pact with catalogue', () => {
  //describe('given data count > 0', () => {
    describe('when a call to the Provider is made', () => {
      before(() => {
        return provider.setup()
          .then(() => {
            provider.addInteraction({
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
                body: expectedBody
              }
            })
          })
      })

      it('can process the JSON payload from the provider', () => {
        const response = shop()

        return expect(response).to.eventually.have.property('sku', 0.1)
      })

      it('should validate the interactions and create a contract', () => {
        return provider.verify()
      })
    })

    // Write pact files to file
    after(() => {
      return provider.finalize()
    })
//  })
})
