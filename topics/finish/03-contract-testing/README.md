Getting Started module
======================

This module tests if your workshop VM is configured properly.

Start
-----

Configure the environment:

  * `cd ~/topics/start/02-service-testing`
  * Bring up all services: `docker-compose up`
  * On a separate ssh window `cd ~/topics/start/03-contract-testing`
  * `npm test`

Excersice
---------
  * Write a passing contract test against running apps
  * Simiulate breaking change on the app
  * See the failing contract tests

References
----------

* [What are Consumer Driven Contracts?](http://martinfowler.com/articles/consumerDrivenContracts.html)
* [Why use Consumer Driven Contracts?](http://www.slideshare.net/ThoughtWorks/sam-newman-deployingandtestingmicroservices)
* [Who is using CDCs?](http://www.slideshare.net/bethesque/pact-39214472)
* [Interested in using or extending Pact?](https://github.com/realestate-com-au/pact)
