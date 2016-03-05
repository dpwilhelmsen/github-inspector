angular.module('repoService', [])

    .factory('Repo', function($http) {
        "use strict";
        var repoFactory = {};

        repoFactory.baseUrl = 'https://api.github.com/'

        //get a single repo
        repoFactory.get = function(owner, repo) {
            return $http.get(repoFactory.baseUrl + 'repos/' + owner + '/' + repo);
        }

        //get a user's repos
        repoFactory.all = function(owner) {
            return $http.get(repoFactory.baseUrl + 'users/' + owner + '/repos');
        }

        //get repo's contributors
        repoFactory.contributors = function(owner, repo) {
            return $http.get(repoFactory.baseUrl + 'repos/' + owner + '/' + repo + '/contributors');
        }

        return repoFactory;
    })