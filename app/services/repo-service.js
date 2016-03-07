angular.module('repoService', [])

    .factory('RepoInfo', function($http) {
        "use strict";
        var repoFactory = {};

        repoFactory.baseUrl = 'https://api.github.com/';

        //get a single repo
        repoFactory.get = function(owner, repo) {
            return $http.get(repoFactory.baseUrl + 'repos/' + owner + '/' + repo, { cache: true});
        };

        //get repo's contributors
        repoFactory.contributors = function(owner, repo) {
            return $http.get(repoFactory.baseUrl + 'repos/' + owner + '/' + repo + '/contributors', { cache: true});
        };

        return repoFactory;
    });