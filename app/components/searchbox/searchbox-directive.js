'use strict';

angular.module('githubInspector.searchbox-directive', ['ui.bootstrap'])
    .directive('searchbox', function($window) {
        var gh = $window.parseGithub;
        return {
            controller: function () {
                this.repo = '';
                this.error = "Couldn't find the repo. Please check your query and try again.";
                this.open= false;
                this.toggleTooltip = function(action) {
                    this.open = !this.open;
                }
                this.submit = function() {
                    var query = gh(this.repo);
                    if(!query.repository)
                        return this.toggleTooltip();

                    //Query Github
                }
            },
            controllerAs: 'search',
            bindToController: true,
            templateUrl: 'components/searchbox/searchbox-directive.html'
        };
    });
