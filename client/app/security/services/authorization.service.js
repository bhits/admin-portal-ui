(function () {
    'use strict';

    angular.module('app.security')
        .factory('authorizationService', authorizationService);

    /* @ngInject */
    function authorizationService(oauthTokenService, securityConstants) {

        var service = {};

        service.canAccess = canAccess;

        return service;

        function canAccess(roles) {
            return ((oauthTokenService.hasScope(securityConstants.adminScope) && roles.indexOf('ADMIN') !== -1) ||
            (oauthTokenService.hasScope(securityConstants.providerScope) && roles.indexOf('PROVIDER') !== -1));
        }
    }
})();