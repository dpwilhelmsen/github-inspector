'use strict';

// Declare app level module which depends on views, and components
angular.module('githubInspector', [
  'ngRoute',
  'githubInspector.home',
  'githubInspector.view1',
  'githubInspector.view2',
  'githubInspector.version',
  'githubInspector.searchbox-directive',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}]);
