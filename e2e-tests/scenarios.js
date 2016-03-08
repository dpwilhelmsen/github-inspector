'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should have the search form on homepage', function() {
    browser.get('index.html');
    expect(element(by.css('div[searchbox]')).isPresent()).toBeTruthy();
  });

  it('should return visible error when incorrect repo is entered', function() {
    browser.get('index.html');
    element(by.css('div[searchbox] input')).sendKeys('fakerepo');
    element(by.css('button[type=submit]')).click();
    expect(element(by.css('.tooltip-inner')).isDisplayed()).toBeTruthy();
  });

  it('should return direct user to repo when valid repo entered', function() {
    browser.get('index.html');
    element(by.css('div[searchbox] input')).sendKeys('github/hubot');
    element(by.css('button[type=submit]')).click();
    expect(browser.getLocationAbsUrl()).toMatch("/repo/github/hubot");
  });


  describe('repo', function() {

    beforeEach(function() {
      browser.get('index.html#/repo/github/hubot');
    });


    it('should render repo when user navigates to /repo', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/github\/hubot/);
    });

  });


  describe('user', function() {

    beforeEach(function() {
      browser.get('index.html#/user/dpwilhelmsen');
    });


    it('should render user when navigating to /user', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
      toMatch(/dpwilhelmsen/);
    });

  });
});
