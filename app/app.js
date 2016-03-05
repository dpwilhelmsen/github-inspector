'use strict';

// Declare app level module which depends on views, and components
angular.module('githubInspector', [
  'ngRoute',
  'githubInspector.view1',
  'githubInspector.view2',
  'githubInspector.version',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
