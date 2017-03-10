/**
 * Created by tomson.ngassa on 3/8/2016.
 */
(function () {
    'use strict';

    angular.module('app')
        .constant("idleConfigParams", {"idle": 780, "timeout": 120, "keepalive": 240})
        .config(appConfig);


    /* @ngInject */
    function appConfig($urlRouterProvider, $locationProvider, $httpProvider, KeepaliveProvider, IdleProvider, idleConfigParams, brandProvider, $translateProvider, tmhDynamicLocaleProvider) {
		
        //Set Brand Name
        brandProvider.setBrandName("Consent2Share");
        brandProvider.setBrandInitial("C2S");
		
        // enable html5 mode
        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise("/fe/login");

        $httpProvider.interceptors.push('authInterceptorService');

        // Configure Idle settingss
        IdleProvider.idle(idleConfigParams.idle); // in seconds
        IdleProvider.timeout(idleConfigParams.timeout); // in seconds
        KeepaliveProvider.interval(idleConfigParams.keepalive); // in seconds

        // realize i18n for Admin Portal-UI : ADD BY Wentao
        //get dynamic local value
        var language = window.localStorage.lang || 'en';
        $translateProvider.preferredLanguage(language);
        tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_{{locale}}.js');

        $translateProvider.registerAvailableLanguageKeys(['en', 'zh', 'es'], {
            'en-*': 'en',
            'zh-*': 'zh',
            'es-*': 'es'
        });

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/languagesLib/',
            suffix: '.json'
        });
    }
})();