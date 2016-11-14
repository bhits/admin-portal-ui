(function () {
    'use strict';

    angular
        .module('app.config')
        .factory('configService', configService);

    /* @ngInject */
    function configService(configConstants, notificationService) {

        var service = {};
        service.getOauthBasicKey = getOauthBasicKey;
        service.getPhrApiBaseUrl = getPhrApiBaseUrl;
        service.getRegistrationApiBaseUrl = getRegistrationApiBaseUrl;
        service.getUserInfo = getUserInfo;
        service.getPatientUserApiBaseUrl = getPatientUserApiBaseUrl;
        service.getPepApiBaseUrl = getPepApiBaseUrl;
        service.getTokenUrl = getTokenUrl;

        return service;

        function getConfigByPropertyKey(key, errorMessage) {
            if (configConstants !== null) {
                if (checkKeyExistsInObject(configConstants, key)) {
                    return accessPropertyByStringKey(configConstants, key);
                } else {
                    notificationService.error('Failed to get configuration for ' + errorMessage);
                }
            }
        }

        function getOauthBasicKey() {
            return getConfigByPropertyKey('oauth2.client.base64BasicKey', 'Oauth Basic Key');
        }

        function getPhrApiBaseUrl() {
            return getConfigByPropertyKey('securedApis.phrApiBaseUrl', 'Phr Base URL');
        }

        function getRegistrationApiBaseUrl() {
            return getConfigByPropertyKey('securedApis.registrationApiBaseUrl', 'Registration Base URL');
        }

        function getUserInfo() {
            return getConfigByPropertyKey('securedApis.userInfo', 'UserInfo Base URL');
        }

        function getPatientUserApiBaseUrl() {
            return getConfigByPropertyKey('securedApis.patientUserApiBaseUrl', 'PatientUser Base URL');
        }

        function getPepApiBaseUrl() {
            return getConfigByPropertyKey('securedApis.pepApiBaseUrl', 'Pep Base URL');
        }

        function getTokenUrl() {
            return getConfigByPropertyKey('unsecuredApis.tokenUrl', 'Token URL');
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

        function accessPropertyByStringKey(obj, stringKey) {
            var parts = stringKey.split('.');
            var newObj = obj[parts[0]];
            if (parts[1]) {
                parts.splice(0, 1);
                var newString = parts.join('.');
                return accessPropertyByStringKey(newObj, newString);
            }
            return newObj;
        }
    }
})();