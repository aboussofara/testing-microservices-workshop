const verifier = require('pact').Verifier;
const path = require('path');

// Verify that the provider meets all consumer expectations
describe('Consumer contract tests for catalogue', () => {
  it('should validate the expectations from generated pact contracts',
    function () { // lexical binding required here for timeout
      this.timeout(60000);

      let opts = {
        provider: 'Catalogue',
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
