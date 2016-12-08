/**
 * Created by tomson.ngassa on 3/8/2016.
 */
(function () {
    'use strict';

    angular.module('app')
        .constant("idleConfigParams", {"idle": 780, "timeout": 120, "keepalive": 240})
        .config(appConfig)
        .provider("ConfigService", function () {

            var initInjector = angular.injector(['ng']);
            var _http = initInjector.get('$http');
            var _window = initInjector.get('$window');
            var configConstants = null;
            var configUrl = null;
            var errorUrl = null;

            var configPropertyList = [
                'branding.name',
                'branding.initials',
                'branding.smallLogo',
                'branding.mediumLogo',
                'branding.largeLogo',
                'oauth2.client.base64BasicKey',
                'securedApis.phrApiBaseUrl',
                'securedApis.registrationApiBaseUrl',
                'securedApis.userInfo',
                'securedApis.patientUserApiBaseUrl',
                'securedApis.pepApiBaseUrl',
                'unsecuredApis.tokenUrl'
            ];

            function checkPropertyExistsInConfiguration(configObj) {
                for (var i = 0; i < configPropertyList.length; i++) {
                    if (!checkKeyExistsInObject(configObj, configPropertyList[i])) {
                        return false;
                    }
                }
                return true;
            }

            function checkKeyExistsInObject(obj, key) {
                var components = key.split(".");
                for (var i = 0; i < components.length; i++) {
                    if ((typeof obj !== "object") || (!obj.hasOwnProperty(components[i]))) {
                        return false;
                    }
                    obj = obj[components[i]];
                }
                return true;
            }

            return {
                setConfigUrls: function (pConfigUrl, errorPageUrl) {
                    configUrl = pConfigUrl;
                    errorUrl = errorPageUrl;
                },
                $get: function () {
                    return {
                        loadConfig: function(){
                            return _http.get(configUrl).then(function (response) {
                                if (checkPropertyExistsInConfiguration(response.data)) {
                                    configConstants = response.data ;
                                } else {
                                    _window.location.href = errorUrl;
                                }
                            }, function (errorResponse) {
                                _window.location.href = errorUrl;
                            });
                        },
                        getConfig: function(){
                            return configConstants;

                        },
                        getConfigPropertyList: function(){
                            if( configPropertyList!== null){
                                return configPropertyList;
                            }else{
                                return null;
                            }
                        }
                    };
                }
            };
        });

    /* @ngInject */
    function appConfig($urlRouterProvider, $locationProvider, $httpProvider, KeepaliveProvider, IdleProvider, idleConfigParams, ConfigServiceProvider) {

        // enable html5 mode
        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise("/fe/login");

        $httpProvider.interceptors.push('authInterceptorService');

        // Configure Idle settingss
        IdleProvider.idle(idleConfigParams.idle); // in seconds
        IdleProvider.timeout(idleConfigParams.timeout); // in seconds
        KeepaliveProvider.interval(idleConfigParams.keepalive); // in seconds

        ConfigServiceProvider.setConfigUrls('/admin-ui/config', '/admin-ui/configError');
    }
})();