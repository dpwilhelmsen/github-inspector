# github-inspector — Checkout Github Info

This project is an angular application which uses Github's API to provide the user with simple
information about github repos and contributors.

## Getting Started

To get you started you can simply clone the repository and install the dependencies:

### Clone github-inspector

Clone the angular-seed repository using [git][git]:

```
git clone git@bitbucket.org:dpwilhelmsen/github-inspector.git
cd github-inspector
```

### Install Dependencies

This repo has preconfigured `npm` to automatically run `bower` so simply do:

```
npm install
```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/bower_components` - contains the angular framework files

*Note that the `bower_components` folder would normally be installed in the root folder but
angular-seed changes this location through the `.bowerrc` file.  Putting it in the app folder makes
it easier to serve the files by a webserver.*

### Run the Application

This repo has been preconfigured with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now browse to the app at `http://localhost:8000/index.html`.

## Testing

There are two kinds of tests in the github-inspector application: Unit tests and End to End tests.

### Running Unit Tests

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

### End to end testing

The github app comes with some end-to-end tests, written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner.

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor
can interact with it.

```
npm start
```

In addition, since Protractor is built upon WebDriver we need to install this.  The angular-seed
project comes with a predefined script to do this:

```
npm run update-webdriver
```

This will download and install the latest version of the stand-alone WebDriver tool.

Once you have ensured that the development web server hosting our application is up and running
and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.


[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
