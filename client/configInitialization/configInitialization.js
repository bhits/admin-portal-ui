(function () {
    'use strict';
    var configInitialization = angular.module('configInitialization', ['app']);

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

    // Load the initial configuration
    angular.element(document).ready(function () {
        getAppConfig().then(function () {
            console.log('Initial configuration successful.');
        }, function () {
            console.log('Initial configuration failed.');
        })
    });

    function getAppConfig() {
        var initInjector = angular.injector(['ng']);
        var ngHttp = initInjector.get('$http');
        var ngWindow = initInjector.get('$window');

        return ngHttp.get('/admin-ui/config').then(function (response) {
            if (checkPropertyExistsInConfiguration(response.data)) {
                configInitialization.constant('configProvider', response.data);
                configInitialization.constant('configPropertyList', configPropertyList);
            } else {
                ngWindow.location.href = '/admin-ui/configError';
            }
        }, function (errorResponse) {
            ngWindow.location.href = '/admin-ui/configError';
        });
    }

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