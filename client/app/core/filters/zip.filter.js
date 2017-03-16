(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('zip', zipFilter);

    /* @ngInject */
    function zipFilter(utilityService) {
        return zipcodeFilter;

        function zipcodeFilter(zipCode) {
            return utilityService.formatZipCode(zipCode);
        }
    }
})();