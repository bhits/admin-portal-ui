(function () {
    'use strict';

    angular
        .module('app.core')
        .directive("c2sBackToPrevious", c2sBackToPrevious);

    /* @ngInject */
    function c2sBackToPrevious($window) {

        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        /* @ngInject */
        function linkFunc(scope, element, attrs) {
            element.on('click', function() {
                $window.history.go(-2);
            });
        }
    }
})();