'use strict';

angular.module('githubInspector.user', ['ngRoute', 'userService'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/user/:username', {
    templateUrl: 'user/user.html',
    controller: 'UserCtrl',
    controllerAs: 'ctrl'
  });
}])

.controller('UserCtrl', ['$routeParams', 'UserInfo', function($routeParams, UserInfo) {
  var vm = this;
  vm.username = $routeParams.username;
  UserInfo.get(vm.username)
      .success(function(data){
        vm.userData = data;
      })
      .error(function(data) {
        vm.error = true;
      });

  UserInfo.all_repos(vm.username)
      .success(function(data){
        vm.repos = data;
      })
      .error(function(data) {
        vm.repos_error = true;
      });
}]);