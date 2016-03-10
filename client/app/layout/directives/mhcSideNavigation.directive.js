(function () {
    'use strict';

    angular
        .module('app.layout')
            .directive('mhcSideNavigation', mhcSideNavigation);

            /* @ngInject */
            function mhcSideNavigation($timeout) {

                var directive = {
                    restrict: 'A',
                    link: linkFunc
                };
                return directive;

                /* @ngInject */
                function linkFunc (scope, element) {
                    $timeout(function () {
                        element.metisMenu();

                    });
                }
            }


})();