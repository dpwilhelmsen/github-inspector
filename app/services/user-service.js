angular.module('userService', [])

    .factory('UserInfo', function($http) {
        "use strict";
        var userFactory = {};

        userFactory.baseUrl = 'https://api.github.com/';

        //get user information
        userFactory.get = function(user) {
            return $http.get(userFactory.baseUrl + 'users/' + user, { cache: true });
        };

        //get a user's repos
        userFactory.all_repos = function(user) {
            return $http.get(userFactory.baseUrl + 'users/' + user + '/repos', { cache: true });
        };

        return userFactory;
    });