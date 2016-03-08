'use strict';

// Declare app level module which depends on views, and components
angular.module('githubInspector', [
  'ngRoute',
  'githubInspector.home',
  'githubInspector.repo',
  'githubInspector.user',
  'githubInspector.searchbox-directive',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}]);
