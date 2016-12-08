(function () {
    'use strict';

    angular
        .module('app.config')
        .factory('configService', configService);

    /* @ngInject */
    function configService(ConfigService) {
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
        var service = {};
        service.getBrandName = getBrandName;
        service.getBrandInitials = getBrandInitials;
        service.getBrandSmallLogo = getBrandSmallLogo;
        service.getBrandMediumLogo = getBrandMediumLogo;
        service.getBrandLargeLogo = getBrandLargeLogo;
        service.getOauthBasicKey = getOauthBasicKey;
        service.getPhrApiBaseUrl = getPhrApiBaseUrl;
        service.getRegistrationApiBaseUrl = getRegistrationApiBaseUrl;
        service.getUserInfo = getUserInfo;
        service.getPatientUserApiBaseUrl = getPatientUserApiBaseUrl;
        service.getPepApiBaseUrl = getPepApiBaseUrl;
        service.getTokenUrl = getTokenUrl;

        return service;

        function getConfigByPropertyKey(index) {
            if((ConfigService !== null) && angular.isDefined(ConfigService.getConfig())){
                var config = ConfigService.getConfig();
                return accessPropertyByStringKey(config, configPropertyList[index]);
            }else{
                return null;
            }
        }

        function getBrandName() {
            return getConfigByPropertyKey(0);
        }

        function getBrandInitials() {
            return getConfigByPropertyKey(1);
        }

        function getBrandSmallLogo() {
            return getConfigByPropertyKey(2);
        }

        function getBrandMediumLogo() {
            return getConfigByPropertyKey(3);
        }

        function getBrandLargeLogo() {
            return getConfigByPropertyKey(4);
        }

        function getOauthBasicKey() {
            return getConfigByPropertyKey(5);
        }

        function getPhrApiBaseUrl() {
            return getConfigByPropertyKey(6);
        }

        function getRegistrationApiBaseUrl() {
            return getConfigByPropertyKey(7);
        }

        function getUserInfo() {
            return getConfigByPropertyKey(8);
        }

        function getPatientUserApiBaseUrl() {
            return getConfigByPropertyKey(9);
        }

        function getPepApiBaseUrl() {
            return getConfigByPropertyKey(10);
        }

        function getTokenUrl() {
            return getConfigByPropertyKey(11);
        }

        function accessPropertyByStringKey(obj, stringKey) {
            if(obj !== null){
                var parts = stringKey.split('.');
                var newObj = obj[parts[0]];
                if (parts[1]) {
                    parts.splice(0, 1);
                    var newString = parts.join('.');
                    return accessPropertyByStringKey(newObj, newString);
                }
                return newObj;
            }else{
                return null;

            }

        }
    }
})();