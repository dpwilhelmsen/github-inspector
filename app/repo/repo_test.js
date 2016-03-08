'use strict';

describe('githubInspector.repo module', function() {
  var routeParams, _mockService, _mockRepoPromise = null, _mockContributorsPromise;

  beforeEach(module('githubInspector.repo'));
  beforeEach(module("repoService"));

  beforeEach(inject(function () {
    routeParams = {};

    _mockService = {
      get: function () {
        return _mockRepoPromise;
      },

      contributors: function () {
        return _mockContributorsPromise;
      }
    };
  }));

  beforeEach(function() {

    var githubRepoResponse = {
      "id": 2278524,
      "name": "hubot",
      "full_name": "github/hubot",
      "owner": {
        "login": "github",
        "id": 9919,
        "avatar_url": "https://avatars.githubusercontent.com/u/9919?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/github",
        "html_url": "https://github.com/github",
        "followers_url": "https://api.github.com/users/github/followers",
        "following_url": "https://api.github.com/users/github/following{/other_user}",
        "gists_url": "https://api.github.com/users/github/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/github/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/github/subscriptions",
        "organizations_url": "https://api.github.com/users/github/orgs",
        "repos_url": "https://api.github.com/users/github/repos",
        "events_url": "https://api.github.com/users/github/events{/privacy}",
        "received_events_url": "https://api.github.com/users/github/received_events",
        "type": "Organization",
        "site_admin": false
      }
    };

    var githubContributorResponse = [
      {
        "login": "technicalpickles",
        "id": 159,
        "avatar_url": "https://avatars.githubusercontent.com/u/159?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/technicalpickles",
        "html_url": "https://github.com/technicalpickles",
        "followers_url": "https://api.github.com/users/technicalpickles/followers",
        "following_url": "https://api.github.com/users/technicalpickles/following{/other_user}",
        "gists_url": "https://api.github.com/users/technicalpickles/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/technicalpickles/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/technicalpickles/subscriptions",
        "organizations_url": "https://api.github.com/users/technicalpickles/orgs",
        "repos_url": "https://api.github.com/users/technicalpickles/repos",
        "events_url": "https://api.github.com/users/technicalpickles/events{/privacy}",
        "received_events_url": "https://api.github.com/users/technicalpickles/received_events",
        "type": "User",
        "site_admin": true,
        "contributions": 449
      },
      {
        "login": "tombell",
        "id": 129327,
        "avatar_url": "https://avatars.githubusercontent.com/u/129327?v=3",
        "gravatar_id": "",
        "url": "https://api.github.com/users/tombell",
        "html_url": "https://github.com/tombell",
        "followers_url": "https://api.github.com/users/tombell/followers",
        "following_url": "https://api.github.com/users/tombell/following{/other_user}",
        "gists_url": "https://api.github.com/users/tombell/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/tombell/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/tombell/subscriptions",
        "organizations_url": "https://api.github.com/users/tombell/orgs",
        "repos_url": "https://api.github.com/users/tombell/repos",
        "events_url": "https://api.github.com/users/tombell/events{/privacy}",
        "received_events_url": "https://api.github.com/users/tombell/received_events",
        "type": "User",
        "site_admin": false,
        "contributions": 254
      }
    ];

    _mockRepoPromise = {
      then: function (successFn, errorFn) {
        successFn(githubRepoResponse);
      },
      success: function(fn) {
        fn(githubRepoResponse);
        return this;
      },
      error: function(fn) {
      }
    };

    _mockContributorsPromise = {
      then: function (successFn) {
        successFn(githubContributorResponse);
      },
      success: function(fn) {
        fn(githubContributorResponse);
        return this;
      },
      error: function(fn) {
      }
    };
  });

  describe('repo controller', function(){

    it('should recieve a repo owner and name and query repo data', inject(function($controller) {
      routeParams.owner = 'github';
      routeParams.repo = 'hubot';
      //spec body
      var repoCtrl = $controller('RepoCtrl', { RepoInfo: _mockService, $routeParams: routeParams });
      expect(repoCtrl).toBeDefined();
      expect(repoCtrl.repoOwner).toEqual(routeParams.owner);
      expect(repoCtrl.repoName).toEqual(routeParams.repo);
      expect(repoCtrl.repoData.full_name).toBe('github/hubot');
      expect(repoCtrl.repoData.owner.login).toBe('github');
      expect(repoCtrl.error).toBeFalsy();
    }));

    it('should query a list of a repo\'s repos.', inject(function($controller) {
      routeParams.owner = 'github';
      routeParams.repo = 'hubot';
      //spec body
      var repoCtrl = $controller('RepoCtrl', { RepoInfo: _mockService, $routeParams: routeParams });
      expect(repoCtrl).toBeDefined();
      expect(repoCtrl.contributors.length).toEqual(2);
      expect(repoCtrl.contributors[0].login).toBe('technicalpickles');
      expect(repoCtrl.contributors[0].site_admin).toBeTruthy();
      expect(repoCtrl.contributors[1].login).toBe('tombell');
      expect(repoCtrl.contributors[1].site_admin).toBeFalsy();
      expect(repoCtrl.contributors_error).toBeFalsy();
    }));

  });

  describe('repo controller errors', function() {
    beforeEach(function() {
      _mockRepoPromise = {
        then: function (successFn, errorFn) {
          errorFn();
        },
        error: function(fn) {
          fn()
        }
      };

      _mockContributorsPromise = {
        then: function (successFn, errorFn) {
          errorFn();
        },
        error: function(fn) {
          fn()
        }
      };

      it('should set repo error', inject(function($controller) {
        routeParams.owner = 'github';
        routeParams.repo = 'hubot';
        //spec body
        var repoCtrl = $controller('RepoCtrl', { RepoInfo: _mockService, $routeParams: routeParams });
        expect(repoCtrl.error).toBeTruthy();
      }));

      it('should set repos error', inject(function($controller) {
        routeParams.owner = 'github';
        routeParams.repo = 'hubot';
        //spec body
        var repoCtrl = $controller('RepoCtrl', { RepoInfo: _mockService, $routeParams: routeParams });
        expect(repoCtrl.contributors_error).toBeTruthy();
      }));
    });
  })
});