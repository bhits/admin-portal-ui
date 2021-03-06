﻿(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('c2sValidatePhoneNumber', c2sValidatePhoneNumber);

    /* @ngInject */
    function c2sValidatePhoneNumber(constants) {
        //NANP
        var PHONE_NUMBER_REGEXP = constants.PHONE_NUMBER_REGEXP;

        var directive = {
            require: 'ngModel',
            restrict: 'A',
            scope: {},
            link: linkFunc
        };
        return directive;

        /* @ngInject */
        function linkFunc(scope, elm, attrs, ctrl) {
            ctrl.$validators.isValidPhoneNumber = function (modelValue) {
                if (angular.isDefined(modelValue)) {
                    return ctrl.$isEmpty(modelValue) || PHONE_NUMBER_REGEXP.test(modelValue);
                } else {
                    return true;
                }
            };
        }
    }
})();