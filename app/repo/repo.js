'use strict';

angular.module('githubInspector.repo', ['ngRoute', 'repoService'])

.config(['$routeProvider', function($routeProvider, RepoInfo) {
  $routeProvider.when('/repo/:owner/:repo', {
    templateUrl: 'repo/repo.html',
    controller: 'RepoCtrl',
    controllerAs: 'ctrl'
  });
}])

.controller('RepoCtrl', ['$routeParams', 'RepoInfo', function($routeParams, RepoInfo) {
  var vm = this;
  vm.repoOwner = $routeParams.owner;
  vm.repoName = $routeParams.repo;
  RepoInfo.get(vm.repoOwner, vm.repoName)
    .success(function(data){
      console.log(data);
      vm.repoData = data;
    })
    .error(function(data) {
      vm.error = true;
      console.log(data);
    });
  RepoInfo.contributors(vm.repoOwner, vm.repoName)
      .success(function(data){
        console.log(data);
        vm.contributors = data;
      })
      .error(function(data) {
        vm.contributors_error = true;
        console.log(data);
      });
}]);