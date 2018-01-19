const verifier = require('pact').Verifier;
const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// Verify that the provider meets all consumer expectations
describe('Consumer contract tests for cataglogue', () => {
  it('should validate the expectations from generated pact contracts', function () { // lexical binding required here for timeout
    this.timeout(10000);

    let opts = {
      provider: 'Our Provider',
      providerBaseUrl: 'http://localhost:9081',
      pactUrls: [path.resolve(process.cwd(), '../shop/pacts/shop-catalogue.json')]
    };

    return verifier.verifyProvider(opts)
      .then(output => {
        console.log('Pact Verification Complete!');
        console.log(output);
      });
  })
});
