(function () {
    'use strict';

    angular.module('app.security')
        .factory('authenticationService', authenticationService);

    /* @ngInject */
    function authenticationService($resource, envService, oauthTokenService, $state) {
        var loginResource = function () {
            return $resource(envService.unsecuredApis.tokenUrl, {},
                {
                    save: {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + envService.base64BasicKey,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        transformRequest: function (data) {
                            var str = [];
                            for (var d in data) {
                                str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                            }
                            return str.join("&");
                        }
                    }
                });
        };

        var service = {};
        service.login = login;
        service.logout = logout;

        return service;

        function login(loginInfo, success, error) {
            var requiredParameters = {
                grant_type: 'password',
                response_type: 'token'
            };
            var oauthParameters = angular.extend(requiredParameters, loginInfo);
            return loginResource().save(oauthParameters, success, error);
        }

        function logout() {
            oauthTokenService.removeToken();
            $state.go("fe.login");
        }
    }
})();