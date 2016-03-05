'use strict';

angular.module('githubInspector.version', [
  'githubInspector.version.interpolate-filter',
  'githubInspector.version.version-directive'
])

.value('version', '0.1');
