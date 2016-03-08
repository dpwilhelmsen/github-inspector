'use strict';

describe('repoService module', function() {
    var RepoInfo, httpBackend, githubRepoResponse, githubContributorResponse, githubRepoError, githubContributorError;

    beforeEach(module("repoService"));

    beforeEach(inject(function (_RepoInfo_, $httpBackend) {
        RepoInfo = _RepoInfo_;
        httpBackend = $httpBackend;

        githubRepoResponse = {
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

        githubContributorResponse = [
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

        githubRepoError = {
            "message": "Repo Not Found",
            "documentation_url": "https://developer.github.com/v3"
        };
        githubContributorError = {
            "message": "Contributors Not Found",
            "documentation_url": "https://developer.github.com/v3"
        };
    }));


    it("should return a successful github repo response", function () {
        httpBackend.whenGET("https://api.github.com/repos/github/hubot").respond(githubRepoResponse);
        RepoInfo.get('github','hubot').success(function(apiResponse) {
            expect(apiResponse.full_name).toEqual("github/hubot");
            expect(apiResponse.owner.login).toEqual("github");
            expect(apiResponse.owner.type).toEqual("Organization");
        });
        httpBackend.flush();
    });

    it("should return a successful github contributors response", function () {
        httpBackend.whenGET("https://api.github.com/repos/github/hubot/contributors").respond(githubContributorResponse);
        RepoInfo.contributors('github','hubot').success(function(data) {
            var apiResponse = data;
            expect(apiResponse.length).toEqual(2);
            expect(apiResponse[0].login).toEqual("technicalpickles");
            expect(apiResponse[0].site_admin).toEqual(true);
            expect(apiResponse[1].login).toEqual("tombell");
        });
        httpBackend.flush();
    });

    it("should return an error response", function () {
        httpBackend.expectGET("https://api.github.com/repos/github/hubot").respond(404, githubRepoError);
        httpBackend.expectGET("https://api.github.com/repos/github/hubot/contributors").respond(404, githubContributorError);
        RepoInfo.get('github','hubot').error(function(data, status, headers, config) {
            expect(status).toEqual(404);
            expect(data.message).toEqual("Repo Not Found");
        });
        RepoInfo.contributors('github','hubot').error(function(data, status, headers, config) {
            expect(status).toEqual(404);
            expect(data.message).toEqual("Contributors Not Found");
        });
        httpBackend.flush();
    });
});