(function () {

    'use strict';

    angular
        .module('app.core')
        .filter('hasString', hasString);

    /* @ngInject */
    function hasString(utilityService) {
        return hasStr;

        function hasStr(str) {
            return utilityService.hasString(str);
        }
    }
})();
