'use strict';

describe('userService module', function() {
    var UserInfo, httpBackend, githubUserResponse, githubUserReposResponse, githubRepoError, githubContributorError;

    beforeEach(module("userService"));

    beforeEach(inject(function (_UserInfo_, $httpBackend) {
        UserInfo = _UserInfo_;
        httpBackend = $httpBackend;

        githubUserResponse = {
            "login":"technicalpickles",
            "id":159,
            "avatar_url":"https://avatars.githubusercontent.com/u/159?v=3",
            "gravatar_id":"",
            "url":"https://api.github.com/users/technicalpickles",
            "html_url":"https://github.com/technicalpickles",
            "type":"User",
            "site_admin":true,
            "name":"Josh Nichols",
            "company":null,
            "blog":"http://technicalpickles.com",
            "location":"Savannah, GA",
            "email":"josh@technicalpickles.com",
            "hireable":null,
            "bio":null,
            "public_repos":193,
            "public_gists":291,
            "followers":554,
            "following":62,
            "created_at":"2008-02-07T05:38:06Z",
            "updated_at":"2016-02-26T22:34:28Z"
        };

        githubUserReposResponse = [
            {
                "id":1331696,
                "name":"4tehlulz.biz",
                "full_name":"technicalpickles/4tehlulz.biz",
                "owner":{
                    "login":"technicalpickles",
                    "id":159,
                    "avatar_url":"https://avatars.githubusercontent.com/u/159?v=3",
                    "gravatar_id":"",
                    "url":"https://api.github.com/users/technicalpickles",
                    "html_url":"https://github.com/technicalpickles",
                    "followers_url":"https://api.github.com/users/technicalpickles/followers",
                    "following_url":"https://api.github.com/users/technicalpickles/following{/other_user}",
                    "gists_url":"https://api.github.com/users/technicalpickles/gists{/gist_id}",
                    "starred_url":"https://api.github.com/users/technicalpickles/starred{/owner}{/repo}",
                    "subscriptions_url":"https://api.github.com/users/technicalpickles/subscriptions",
                    "organizations_url":"https://api.github.com/users/technicalpickles/orgs",
                    "repos_url":"https://api.github.com/users/technicalpickles/repos",
                    "events_url":"https://api.github.com/users/technicalpickles/events{/privacy}",
                    "received_events_url":"https://api.github.com/users/technicalpickles/received_events",
                    "type":"User",
                    "site_admin":true
                },
                "private":false,
                "html_url":"https://github.com/technicalpickles/4tehlulz.biz",
                "description":"",
                "fork":false,
                "url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz",
                "forks_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/forks",
                "keys_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/keys{/key_id}",
                "collaborators_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/collaborators{/collaborator}",
                "teams_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/teams",
                "hooks_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/hooks",
                "issue_events_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/issues/events{/number}",
                "events_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/events",
                "assignees_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/assignees{/user}",
                "branches_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/branches{/branch}",
                "tags_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/tags",
                "blobs_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/git/blobs{/sha}",
                "git_tags_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/git/tags{/sha}",
                "git_refs_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/git/refs{/sha}",
                "trees_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/git/trees{/sha}",
                "statuses_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/statuses/{sha}",
                "languages_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/languages",
                "stargazers_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/stargazers",
                "contributors_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/contributors",
                "subscribers_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/subscribers",
                "subscription_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/subscription",
                "commits_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/commits{/sha}",
                "git_commits_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/git/commits{/sha}",
                "comments_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/comments{/number}",
                "issue_comment_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/issues/comments{/number}",
                "contents_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/contents/{+path}",
                "compare_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/compare/{base}...{head}",
                "merges_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/merges",
                "archive_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/{archive_format}{/ref}",
                "downloads_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/downloads",
                "issues_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/issues{/number}",
                "pulls_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/pulls{/number}",
                "milestones_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/milestones{/number}",
                "notifications_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/notifications{?since,all,participating}",
                "labels_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/labels{/name}",
                "releases_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/releases{/id}",
                "deployments_url":"https://api.github.com/repos/technicalpickles/4tehlulz.biz/deployments",
                "created_at":"2011-02-05T15:25:35Z",
                "updated_at":"2014-03-24T01:21:15Z",
                "pushed_at":"2011-02-05T15:26:52Z",
                "git_url":"git://github.com/technicalpickles/4tehlulz.biz.git",
                "ssh_url":"git@github.com:technicalpickles/4tehlulz.biz.git",
                "clone_url":"https://github.com/technicalpickles/4tehlulz.biz.git",
                "svn_url":"https://github.com/technicalpickles/4tehlulz.biz",
                "homepage":"",
                "size":304,
                "stargazers_count":1,
                "watchers_count":1,
                "language":"Ruby",
                "has_issues":true,
                "has_downloads":true,
                "has_wiki":true,
                "has_pages":false,
                "forks_count":0,
                "mirror_url":null,
                "open_issues_count":0,
                "forks":0,
                "open_issues":0,
                "watchers":1,
                "default_branch":"master"
            },
            {
                "id":142273,
                "name":"ack.vim",
                "full_name":"technicalpickles/ack.vim",
                "owner":{
                    "login":"technicalpickles",
                    "id":159,
                    "avatar_url":"https://avatars.githubusercontent.com/u/159?v=3",
                    "gravatar_id":"",
                    "url":"https://api.github.com/users/technicalpickles",
                    "html_url":"https://github.com/technicalpickles",
                    "followers_url":"https://api.github.com/users/technicalpickles/followers",
                    "following_url":"https://api.github.com/users/technicalpickles/following{/other_user}",
                    "gists_url":"https://api.github.com/users/technicalpickles/gists{/gist_id}",
                    "starred_url":"https://api.github.com/users/technicalpickles/starred{/owner}{/repo}",
                    "subscriptions_url":"https://api.github.com/users/technicalpickles/subscriptions",
                    "organizations_url":"https://api.github.com/users/technicalpickles/orgs",
                    "repos_url":"https://api.github.com/users/technicalpickles/repos",
                    "events_url":"https://api.github.com/users/technicalpickles/events{/privacy}",
                    "received_events_url":"https://api.github.com/users/technicalpickles/received_events",
                    "type":"User",
                    "site_admin":true
                },
                "private":false,
                "html_url":"https://github.com/technicalpickles/ack.vim",
                "description":"Vim plugin for the Perl module / CLI script 'ack'",
                "fork":true,
                "url":"https://api.github.com/repos/technicalpickles/ack.vim",
                "forks_url":"https://api.github.com/repos/technicalpickles/ack.vim/forks",
                "keys_url":"https://api.github.com/repos/technicalpickles/ack.vim/keys{/key_id}",
                "collaborators_url":"https://api.github.com/repos/technicalpickles/ack.vim/collaborators{/collaborator}",
                "teams_url":"https://api.github.com/repos/technicalpickles/ack.vim/teams",
                "hooks_url":"https://api.github.com/repos/technicalpickles/ack.vim/hooks",
                "issue_events_url":"https://api.github.com/repos/technicalpickles/ack.vim/issues/events{/number}",
                "events_url":"https://api.github.com/repos/technicalpickles/ack.vim/events",
                "assignees_url":"https://api.github.com/repos/technicalpickles/ack.vim/assignees{/user}",
                "branches_url":"https://api.github.com/repos/technicalpickles/ack.vim/branches{/branch}",
                "tags_url":"https://api.github.com/repos/technicalpickles/ack.vim/tags",
                "blobs_url":"https://api.github.com/repos/technicalpickles/ack.vim/git/blobs{/sha}",
                "git_tags_url":"https://api.github.com/repos/technicalpickles/ack.vim/git/tags{/sha}",
                "git_refs_url":"https://api.github.com/repos/technicalpickles/ack.vim/git/refs{/sha}",
                "trees_url":"https://api.github.com/repos/technicalpickles/ack.vim/git/trees{/sha}",
                "statuses_url":"https://api.github.com/repos/technicalpickles/ack.vim/statuses/{sha}",
                "languages_url":"https://api.github.com/repos/technicalpickles/ack.vim/languages",
                "stargazers_url":"https://api.github.com/repos/technicalpickles/ack.vim/stargazers",
                "contributors_url":"https://api.github.com/repos/technicalpickles/ack.vim/contributors",
                "subscribers_url":"https://api.github.com/repos/technicalpickles/ack.vim/subscribers",
                "subscription_url":"https://api.github.com/repos/technicalpickles/ack.vim/subscription",
                "commits_url":"https://api.github.com/repos/technicalpickles/ack.vim/commits{/sha}",
                "git_commits_url":"https://api.github.com/repos/technicalpickles/ack.vim/git/commits{/sha}",
                "comments_url":"https://api.github.com/repos/technicalpickles/ack.vim/comments{/number}",
                "issue_comment_url":"https://api.github.com/repos/technicalpickles/ack.vim/issues/comments{/number}",
                "contents_url":"https://api.github.com/repos/technicalpickles/ack.vim/contents/{+path}",
                "compare_url":"https://api.github.com/repos/technicalpickles/ack.vim/compare/{base}...{head}",
                "merges_url":"https://api.github.com/repos/technicalpickles/ack.vim/merges",
                "archive_url":"https://api.github.com/repos/technicalpickles/ack.vim/{archive_format}{/ref}",
                "downloads_url":"https://api.github.com/repos/technicalpickles/ack.vim/downloads",
                "issues_url":"https://api.github.com/repos/technicalpickles/ack.vim/issues{/number}",
                "pulls_url":"https://api.github.com/repos/technicalpickles/ack.vim/pulls{/number}",
                "milestones_url":"https://api.github.com/repos/technicalpickles/ack.vim/milestones{/number}",
                "notifications_url":"https://api.github.com/repos/technicalpickles/ack.vim/notifications{?since,all,participating}",
                "labels_url":"https://api.github.com/repos/technicalpickles/ack.vim/labels{/name}",
                "releases_url":"https://api.github.com/repos/technicalpickles/ack.vim/releases{/id}",
                "deployments_url":"https://api.github.com/repos/technicalpickles/ack.vim/deployments",
                "created_at":"2009-03-03T20:32:16Z",
                "updated_at":"2012-12-12T20:26:04Z",
                "pushed_at":"2009-03-03T20:47:29Z",
                "git_url":"git://github.com/technicalpickles/ack.vim.git",
                "ssh_url":"git@github.com:technicalpickles/ack.vim.git",
                "clone_url":"https://github.com/technicalpickles/ack.vim.git",
                "svn_url":"https://github.com/technicalpickles/ack.vim",
                "homepage":"",
                "size":89,
                "stargazers_count":1,
                "watchers_count":1,
                "language":"VimL",
                "has_issues":true,
                "has_downloads":true,
                "has_wiki":true,
                "has_pages":false,
                "forks_count":0,
                "mirror_url":null,
                "open_issues_count":0,
                "forks":0,
                "open_issues":0,
                "watchers":1,
                "default_branch":"master"
            },
            {
                "id":130613,
                "name":"amazon_associate",
                "full_name":"technicalpickles/amazon_associate",
                "owner":{
                    "login":"technicalpickles",
                    "id":159,
                    "avatar_url":"https://avatars.githubusercontent.com/u/159?v=3",
                    "gravatar_id":"",
                    "url":"https://api.github.com/users/technicalpickles",
                    "html_url":"https://github.com/technicalpickles",
                    "followers_url":"https://api.github.com/users/technicalpickles/followers",
                    "following_url":"https://api.github.com/users/technicalpickles/following{/other_user}",
                    "gists_url":"https://api.github.com/users/technicalpickles/gists{/gist_id}",
                    "starred_url":"https://api.github.com/users/technicalpickles/starred{/owner}{/repo}",
                    "subscriptions_url":"https://api.github.com/users/technicalpickles/subscriptions",
                    "organizations_url":"https://api.github.com/users/technicalpickles/orgs",
                    "repos_url":"https://api.github.com/users/technicalpickles/repos",
                    "events_url":"https://api.github.com/users/technicalpickles/events{/privacy}",
                    "received_events_url":"https://api.github.com/users/technicalpickles/received_events",
                    "type":"User",
                    "site_admin":true
                },
                "private":false,
                "html_url":"https://github.com/technicalpickles/amazon_associate",
                "description":"Amazon Associates API Interface using hpricot",
                "fork":true,
                "url":"https://api.github.com/repos/technicalpickles/amazon_associate",
                "forks_url":"https://api.github.com/repos/technicalpickles/amazon_associate/forks",
                "keys_url":"https://api.github.com/repos/technicalpickles/amazon_associate/keys{/key_id}",
                "collaborators_url":"https://api.github.com/repos/technicalpickles/amazon_associate/collaborators{/collaborator}",
                "teams_url":"https://api.github.com/repos/technicalpickles/amazon_associate/teams",
                "hooks_url":"https://api.github.com/repos/technicalpickles/amazon_associate/hooks",
                "issue_events_url":"https://api.github.com/repos/technicalpickles/amazon_associate/issues/events{/number}",
                "events_url":"https://api.github.com/repos/technicalpickles/amazon_associate/events",
                "assignees_url":"https://api.github.com/repos/technicalpickles/amazon_associate/assignees{/user}",
                "branches_url":"https://api.github.com/repos/technicalpickles/amazon_associate/branches{/branch}",
                "tags_url":"https://api.github.com/repos/technicalpickles/amazon_associate/tags",
                "blobs_url":"https://api.github.com/repos/technicalpickles/amazon_associate/git/blobs{/sha}",
                "git_tags_url":"https://api.github.com/repos/technicalpickles/amazon_associate/git/tags{/sha}",
                "git_refs_url":"https://api.github.com/repos/technicalpickles/amazon_associate/git/refs{/sha}",
                "trees_url":"https://api.github.com/repos/technicalpickles/amazon_associate/git/trees{/sha}",
                "statuses_url":"https://api.github.com/repos/technicalpickles/amazon_associate/statuses/{sha}",
                "languages_url":"https://api.github.com/repos/technicalpickles/amazon_associate/languages",
                "stargazers_url":"https://api.github.com/repos/technicalpickles/amazon_associate/stargazers",
                "contributors_url":"https://api.github.com/repos/technicalpickles/amazon_associate/contributors",
                "subscribers_url":"https://api.github.com/repos/technicalpickles/amazon_associate/subscribers",
                "subscription_url":"https://api.github.com/repos/technicalpickles/amazon_associate/subscription",
                "commits_url":"https://api.github.com/repos/technicalpickles/amazon_associate/commits{/sha}",
                "git_commits_url":"https://api.github.com/repos/technicalpickles/amazon_associate/git/commits{/sha}",
                "comments_url":"https://api.github.com/repos/technicalpickles/amazon_associate/comments{/number}",
                "issue_comment_url":"https://api.github.com/repos/technicalpickles/amazon_associate/issues/comments{/number}",
                "contents_url":"https://api.github.com/repos/technicalpickles/amazon_associate/contents/{+path}",
                "compare_url":"https://api.github.com/repos/technicalpickles/amazon_associate/compare/{base}...{head}",
                "merges_url":"https://api.github.com/repos/technicalpickles/amazon_associate/merges",
                "archive_url":"https://api.github.com/repos/technicalpickles/amazon_associate/{archive_format}{/ref}",
                "downloads_url":"https://api.github.com/repos/technicalpickles/amazon_associate/downloads",
                "issues_url":"https://api.github.com/repos/technicalpickles/amazon_associate/issues{/number}",
                "pulls_url":"https://api.github.com/repos/technicalpickles/amazon_associate/pulls{/number}",
                "milestones_url":"https://api.github.com/repos/technicalpickles/amazon_associate/milestones{/number}",
                "notifications_url":"https://api.github.com/repos/technicalpickles/amazon_associate/notifications{?since,all,participating}",
                "labels_url":"https://api.github.com/repos/technicalpickles/amazon_associate/labels{/name}",
                "releases_url":"https://api.github.com/repos/technicalpickles/amazon_associate/releases{/id}",
                "deployments_url":"https://api.github.com/repos/technicalpickles/amazon_associate/deployments",
                "created_at":"2009-02-17T05:11:50Z",
                "updated_at":"2012-12-12T20:07:44Z",
                "pushed_at":"2009-02-01T21:53:05Z",
                "git_url":"git://github.com/technicalpickles/amazon_associate.git",
                "ssh_url":"git@github.com:technicalpickles/amazon_associate.git",
                "clone_url":"https://github.com/technicalpickles/amazon_associate.git",
                "svn_url":"https://github.com/technicalpickles/amazon_associate",
                "homepage":"",
                "size":128,
                "stargazers_count":2,
                "watchers_count":2,
                "language":"Ruby",
                "has_issues":true,
                "has_downloads":true,
                "has_wiki":true,
                "has_pages":false,
                "forks_count":0,
                "mirror_url":null,
                "open_issues_count":0,
                "forks":0,
                "open_issues":0,
                "watchers":2,
                "default_branch":"master"
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


    it("should return a successful github user response", function () {
        httpBackend.whenGET("https://api.github.com/users/technicalpickles").respond(githubUserResponse);
        UserInfo.get('technicalpickles').success(function(apiResponse) {
            expect(apiResponse.login).toEqual("technicalpickles");
            expect(apiResponse.type).toEqual("User");
        });
        httpBackend.flush();
    });

    it("should return a successful response with list of a user's repos", function () {
        httpBackend.whenGET("https://api.github.com/users/technicalpickles/repos").respond(githubUserReposResponse);
        UserInfo.all_repos('technicalpickles').success(function(data) {
            var apiResponse = data;
            expect(apiResponse.length).toEqual(3);
            expect(apiResponse[0].owner.login).toEqual('technicalpickles');
            expect(apiResponse[2].full_name).toEqual("technicalpickles/amazon_associate");
        });
        httpBackend.flush();
    });

    it("should return an error response", function () {
        httpBackend.expectGET("https://api.github.com/users/technicalpickles").respond(404, githubRepoError);
        httpBackend.expectGET("https://api.github.com/users/technicalpickles/repos").respond(404, githubContributorError);
        UserInfo.get('technicalpickles').error(function(data, status, headers, config) {
            expect(status).toEqual(404);
            expect(data.message).toEqual("Repo Not Found");
        });
        UserInfo.all_repos('technicalpickles').error(function(data, status, headers, config) {
            expect(status).toEqual(404);
            expect(data.message).toEqual("Contributors Not Found");
        });
        httpBackend.flush();
    });
});