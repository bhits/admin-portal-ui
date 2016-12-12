/**
 * Created by Jiahao.Li on 11/12/2016.
 */
(function () {
    'use strict';
    var bootstrapApp = angular.module('bootstrapApp', ['app']);

    // Define all expected configuration object properties
    // Note: Below array must keep in the same order as configuration object
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

    function getAppConfig() {
        var initInjector = angular.injector(['ng']);
        var _http = initInjector.get('$http');
        var _window = initInjector.get('$window');

        return _http.get('/admin-ui/config').then(function (response) {
            if (checkPropertyExistsInConfiguration(response.data)) {
                bootstrapApp.constant('configConstants', response.data);
                bootstrapApp.constant('configPropertyList', configPropertyList);
            } else {
                _window.location.href = '/admin-ui/configError';
            }
        }, function (errorResponse) {
            _window.location.href = '/admin-ui/configError';
        });
    }

    // Load configurations
    angular.element(document).ready(function () {
        getAppConfig().then(function () {
        });
    });

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
})();