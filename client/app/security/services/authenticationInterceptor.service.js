(function () {
    'use strict';

    angular
        .module('app.security')
        .factory('authInterceptorService', authInterceptorService);

    /* @ngInject */
    function authInterceptorService($q, $location, utilityService, oauthTokenService, urlAuthorizationConfigurerService) {
        var service = {};
        service.request = request;
        service.responseError = responseError;

        return service;

        function request(config) {
            var currentPath = $location.path();
            config.headers = config.headers || {};
            config.headers['Cache-Control'] = 'no-cache';
            config.headers.Pragma = 'no-cache';

            var accessToken = oauthTokenService.getAccessToken();

            if (accessToken) {
                if (oauthTokenService.isExpiredToken()) {
                    oauthTokenService.removeToken();
                    utilityService.redirectTo("/fe/login");
                } else if (utilityService.isSecuredApi(config.url)) {
                    config.headers.Authorization = 'Bearer  ' + accessToken;
                }
            } else {
                if (urlAuthorizationConfigurerService.isAllowAccess(currentPath)) {
                    utilityService.redirectTo(currentPath);
                } else {
                    utilityService.redirectTo("/fe/login");
                }
            }
            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                var authData = oauthTokenService.getToken();

                if (authData) {
                    if (oauthTokenService.isExpiredToken()) {
                        //authenticationService.logout();
                    } else {
                        // Got to Error page
                    }
                    return $q.reject(rejection);
                } else {
                    //authenticationService.logout();
                }
            }
            return $q.reject(rejection);
        }
    }
})();