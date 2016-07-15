/**
 * Created by Jiahao.Li on 6/8/2016.
 */

(function () {
    'use strict';

    angular.module('app.security')
        .factory('urlAuthorizationConfigurerService', urlAuthorizationConfigurerService);

    /* @ngInject */
    function urlAuthorizationConfigurerService() {
        var requestMatcherRegistry = [
            '/fe/index',
            '/fe/dataAccessFailure'
        ];
        var service = {};

        service.isAllowAccess = isAllowAccess;

        return service;

        function isAllowAccess(currentPath) {
            return requestMatcherRegistry.indexOf(currentPath) !== -1;
        }
    }
})();