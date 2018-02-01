Testing Microservices
=====================

Version: 17 - Jan 2018

Requirements
------------
You need to have Vagrant and VirtualBox installed on your machine. There is a box
file in `/vmbox` folder that you need to copy over. We are going to
use Vagrant to control the virtual machine.

* VirtualBox 5.1.14
* Vagrant 1.9.1

You can find the installers in `/installers` folder. Please the the
notes below for Mac/Windows/Linux.

After installing, please follow the section (00-bring-up-the-vm) and make sure you can do a successful ssh session.

### Mac
On Mac with good internet connection you can also install these with
Cask and brew. You can also find the installers in /installer folder.

### Windows
You can download these if you have a good internet connection or copy and install from `/installers` folder.
You should also get `Git-2.11.1-32-bit`. We will use the Git Bash window for ssh during this session.
Some versions of Windows don't play nice with VirtualBox if you are running Windows on Parallels.

### Linux
Please follow Vagrant and VirtualBox documentation about how to install
them. I have NOT included Linux versions in /installers.

Slides & Topics
---------------
* [Visit here for slides](https://goo.gl/pJSFKz)

00-bring-up-the-vm
------------------

* `cd [location that you copied the contents of this workshop]`
* `cd vmbox/`
* `vagrant box add ubuntu/trusty64`
* `vagrant plugin install vagrant-docker-compose`
* `vagrant up`
* `vagrant ssh`
* Now you in an ssh session with the vmbox
* `ls topics`
* You should be able to see the list of topics under topics folder:
  finish and start


01-getting-started
==================

This module tests if your workshop VM is configured properly. Also tells
you how to start a node app and how to run tests using npm.

* `cd ~/topics/start/01-getting-started`
* `cd helloworld`
* `npm install`
* `npm start`
* Access the app from http://localhost:9080
* You should see the "Hello World!" message in your browser.
* Try to run the tests by `npm test`
* Notice that the test is failing.
* Open up `topics/start/01-getting-started` in your text editor and take
  a look at the test.
* Try to make the unit test pass.

02-service-testing
==================

In this module, we run our three interacting services using Docker. Then
we try to write service test against running services. Then we write a
better test using mb as service virtualizer.

Start
-----

* On an active ssh session open the second module:
* `cd ~/topics/start/02-service-testing`
* Take a look at folder layout and notice our three services.
* Take a look at our docker-compose file and see how we are linking
  services for shop.
* Since the internet connection might be bad, let's load up the base
  image that we need from a local back up.
* `ls docker-images` and notice the node-6 back up file. Now let's load it:
* `docker load < ./docker-images/node-6`
* Bring up all services: `docker-compose up`
* Above command will build all three services and and load them up. You
  should see something like:

```
...
catalogue_1  | catalogue listening on 9081!
review_1     | review listening on 9082!
shop_1       | shop listening on 9083!
```

* Go to http://192.168.33.10:9081 and see the catalogue
* Go to http://192.168.33.10:9082 and see the review
* Go to http://192.168.33.10:9083 and see the shop
* Take a look at the shop.js file.
* Notice how `shop` is orchestrating downstream calls to get catalogue and reviews.


Exercise
--------
* Stop the running docker-compose by `ctrl + c`. Make sure the services
  are not running by navigating to: `http://192.168.33.10:9083` and see
it does not load in browser.
* Run the integration tests: `npm run integration`
* See it fail because it can not connect to `...connect ECONNREFUSED 127.0.0.1:9082`
* Take a look at the `test.integration.js` file. Notice how we are
  making a mock for the catalogue on 9081 but we have not created a mock
for review. Try to do the same thing for review and make the integration
test pass without any dependent service running.


03-contract-testing
===================

In this module, we run our three interacting services using Docker. Then
we try to write a contract test between shop and catalogue. We will
simulate a breaking change from the catalogue team and see how it
affects the contract test.

Start
-----
* On an active ssh session bring up the three services using docker-compose:
* `cd ~/topics/start/03-service-testing`
* `docker-compose up`
* Open a second ssh session, on a terminal/Git bash:
* Go to `/vmbox` and do a `vagrant up` and `vagrant ssh`.
* `cd ~/topics/start/03-contract-testing/shop`
* In your text editor, take a look at `test.integration.js` and familiarize yourself with how we are using pact to mock our providers.

Exercise
--------
* On the ssh session try to run the service tests by `npm run integration`
* Try to make the test pass with proper mocks in place.
* Restart the apps:
* Stop the docker-compose by `ctrl - c` on the session window that is running it
* Then bring it up again: `docker-compose up`
* Run the catalogue consumer contract tests and see them fail
* What do you need to add or change to get the consumer contract tests to pass?
