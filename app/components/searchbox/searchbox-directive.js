'use strict';

angular.module('githubInspector.searchbox-directive', [])
    .directive('searchbox', function() {
        return {
            controller: function () {
                this.name = '';
                this.submit = function() {
                    alert(this.name);
                }
            },
            controllerAs: 'search',
            bindToController: true,
            templateUrl: 'components/searchbox/searchbox-directive.html'
        };
    });
