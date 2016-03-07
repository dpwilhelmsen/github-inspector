'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /repo when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/repo");
  });


  describe('repo', function() {

    beforeEach(function() {
      browser.get('index.html#/repo');
    });


    it('should render repo when user navigates to /repo', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('user', function() {

    beforeEach(function() {
      browser.get('index.html#/user');
    });


    it('should render user when user navigates to /user', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
