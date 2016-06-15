/**
 * Created by tomson.ngassa on 3/8/2016.
 */
(function () {

    'use strict';

    angular.module('app')
        .constant("idleConfigParams", {"idle": 780, "timeout": 120, "keepalive": 240})
        .config(appConfig);


    /* @ngInject */
    function appConfig($urlRouterProvider, $locationProvider, $httpProvider, KeepaliveProvider, IdleProvider, idleConfigParams, brandProvider) {
        //Set Brand Name
        brandProvider.setBrandName("Consent2Share");
        brandProvider.setAppName("Consent to Share");

        // enable html5 mode
        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise("/fe/login");

        $httpProvider.interceptors.push('authInterceptorService');

        // Configure Idle settingss
        IdleProvider.idle(idleConfigParams.idle); // in seconds
        IdleProvider.timeout(idleConfigParams.timeout); // in seconds
        KeepaliveProvider.interval(idleConfigParams.keepalive); // in seconds
    }
})();