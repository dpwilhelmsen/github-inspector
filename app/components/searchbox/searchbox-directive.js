'use strict';

angular.module('githubInspector.searchbox-directive', ['ui.bootstrap','repoService'])
    .directive('searchbox', function($window, RepoInfo, $location) {
        var gh = $window.parseGithub;
        return {
            controller: function () {
                var vm = this;

                vm.repo = '';
                vm.error = "Couldn't find the repo. Please check your query and try again.";
                vm.open= false;
                vm.toggleTooltip = function(action) {
                    vm.open = !vm.open;
                }
                vm.submit = function() {
                    var query = gh(vm.repo);
                    if(!query.repository)
                        return vm.toggleTooltip();

                    //Query Github
                    RepoInfo.get(query.owner, query.name)
                        .success(function(data) {
                            $location.path('/repo/' + query.owner + '/' + query.name);
                        })
                        .error(function(data) {
                            vm.toggleTooltip();
                        });
                }
            },
            controllerAs: 'search',
            bindToController: true,
            templateUrl: 'components/searchbox/searchbox-directive.html'
        };
    });
