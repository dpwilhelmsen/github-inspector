'use strict';

describe('githubInspector.user module', function() {
  var routeParams, _mockService, _mockUserPromise = null, _mockRepoPromise;

  beforeEach(module('githubInspector.user'));
  beforeEach(module("userService"));

  beforeEach(inject(function () {
    routeParams = {};

    _mockService = {
      get: function () {
        return _mockUserPromise;
      },

      all_repos: function () {
        return _mockRepoPromise;
      }
    };
  }));

  beforeEach(function() {
    var userResponse = {
      "login":"dpwilhelmsen",
      "avatar_url":"https://avatars.githubusercontent.com/u/1758049?v=3",
      "html_url":"https://github.com/dpwilhelmsen",
      "name":"Daniel Wilhelmsen",
      "blog":"http://danielwilhelmsen.com",
      "location":"Boston, MA",
      "email":null,
      "followers":1,
    };
    var repoResponse =
        [
          {
            "name":"bc-timetracker",
            "full_name":"dpwilhelmsen/bc-timetracker",
            "owner":{
              "login":"dpwilhelmsen",
            },
            "private":false,
            "html_url":"https://github.com/dpwilhelmsen/bc-timetracker",
            "description":"",
            "fork":false,
            "url":"https://api.github.com/repos/dpwilhelmsen/bc-timetracker",
            "homepage":null,
            "size":5196,
            "stargazers_count":1,
            "watchers_count":1,
            "language":"PHP",
            "mirror_url":null,
            "open_issues_count":0,
            "forks":0,
            "open_issues":0,
            "watchers":1,
            "default_branch":"master"
          }];
    _mockUserPromise = {
      then: function (successFn, errorFn) {
        successFn(userResponse);
      },
      success: function(fn) {
        fn(userResponse);
        return this;
      },
      error: function(fn) {
      }
    };

    _mockRepoPromise = {
      then: function (successFn) {
        successFn(repoResponse);
      },
      success: function(fn) {
        fn(repoResponse);
        return this;
      },
      error: function(fn) {
      }
    };
  });

  describe('user controller', function(){

    it('should recieve a user name and query user data', inject(function($controller) {
      routeParams.username = 'dpwilhelmsen';
      //spec body
      var userCtrl = $controller('UserCtrl', { UserInfo: _mockService, $routeParams: routeParams });
      expect(userCtrl).toBeDefined();
      expect(userCtrl.username).toEqual(routeParams.username);
      expect(userCtrl.userData.login).toBe('dpwilhelmsen');
      expect(userCtrl.userData.name).toBe('Daniel Wilhelmsen');
      expect(userCtrl.error).toBeFalsy();
    }));

    it('should query a list of a user\'s repos.', inject(function($controller) {
      routeParams.username = 'dpwilhelmsen';
      //spec body
      var userCtrl = $controller('UserCtrl', { UserInfo: _mockService, $routeParams: routeParams });
      expect(userCtrl).toBeDefined();
      expect(userCtrl.repos[0].full_name).toBe('dpwilhelmsen/bc-timetracker');
      expect(userCtrl.repos[0].description).toBe('');
      expect(userCtrl.repos[0].homepage).toBeNull();
      expect(userCtrl.repos_error).toBeFalsy();
    }));

  });

  describe('user controller errors', function() {
    beforeEach(function() {
      _mockUserPromise = {
        then: function (successFn, errorFn) {
          errorFn();
        },
        error: function(fn) {
          fn()
        }
      };

      _mockRepoPromise = {
        then: function (successFn, errorFn) {
          errorFn();
        },
        error: function(fn) {
          fn()
        }
      };

      it('should set user error', inject(function($controller) {
        routeParams.username = 'dpwilhelmsen';
        //spec body
        var userCtrl = $controller('UserCtrl', { UserInfo: _mockService, $routeParams: routeParams });
        expect(userCtrl.error).toBeTruthy();
      }));

      it('should set repos error', inject(function($controller) {
        routeParams.username = 'dpwilhelmsen';
        //spec body
        var userCtrl = $controller('UserCtrl', { UserInfo: _mockService, $routeParams: routeParams });
        expect(userCtrl.repos_error).toBeTruthy();
      }));
    });
  })
});