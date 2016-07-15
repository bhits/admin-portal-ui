(function () {
    'use strict';

    angular.module('app.security')
        .factory('authorizationService', authorizationService);

    /* @ngInject */
    function authorizationService(oauthTokenService, oauthConfig) {

        var service = {};

        service.canAccess = canAccess;

        return service;

        function canAccess(roles) {
            return ((oauthTokenService.hasScope(oauthConfig.adminScope) && roles.indexOf('ADMIN') !== -1) ||
            (oauthTokenService.hasScope(oauthConfig.providerScope) && roles.indexOf('PROVIDER') !== -1));
        }
    }
})();