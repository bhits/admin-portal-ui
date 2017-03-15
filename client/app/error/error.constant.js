(function () {
    'use strict';

    angular
        .module('app.error')
        .constant('errorConstants',
            {
                unauthorizedAccessErrorPath: 'fe/error/dataAccessFailure',
                uncaughtExceptionPath: 'fe/error/uncaughtException'
            }
        );
})();