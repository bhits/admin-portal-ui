(function () {
    'use strict';

    angular.module('app.security')
        .factory('urlAuthorizationConfigurerService', urlAuthorizationConfigurerService);

    function urlAuthorizationConfigurerService() {
        var requestMatcherRegistry = ["/fe/index"];
        var service = {};

        service.isAllowAccess = isAllowAccess;

        return service;

        function isAllowAccess(currentPath) {
            return requestMatcherRegistry.indexOf(currentPath) !== -1;
        }
    }
})();