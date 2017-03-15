(function () {
    'use strict';

    angular.module('app')
        .constant("idleConfigParams", {"idle": 780, "timeout": 120, "keepalive": 240})
        .config(appConfig);


    /* @ngInject */
    function appConfig($urlRouterProvider, $locationProvider, $httpProvider, KeepaliveProvider, IdleProvider, idleConfigParams, $translateProvider, tmhDynamicLocaleProvider) {

		
        // enable html5 mode
        $locationProvider.html5Mode(true).hashPrefix('!');

        $urlRouterProvider.otherwise("/fe/login");

        $httpProvider.interceptors.push('authInterceptorService');

        // Configure Idle settingss
        IdleProvider.idle(idleConfigParams.idle); // in seconds
        IdleProvider.timeout(idleConfigParams.timeout); // in seconds
        KeepaliveProvider.interval(idleConfigParams.keepalive); // in seconds

        //get dynamic local value
        var language = window.localStorage.lang || 'en';
        $translateProvider.preferredLanguage(language);
        $translateProvider.useSanitizeValueStrategy('escape');
        tmhDynamicLocaleProvider.localeLocationPattern('node_modules/angular-i18n/angular-locale_{{locale}}.js');

        $translateProvider.registerAvailableLanguageKeys(['en', 'es'], {
            'en-*': 'en',
            'es-*': 'es'
        });

        $translateProvider.useStaticFilesLoader({
            prefix: 'app/languagesLib/',
            suffix: '.json'
        });
    }
})();