(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('c2sValidateName', c2sValidateName);

    /* @ngInject */
    function c2sValidateName(constants) {

        var FIRSTNAMELASTNAME_REGEXP = constants.FIRSTNAMELASTNAME_REGEXP;

        var directive = {
            require: 'ngModel',
            restrict: 'A',
            scope: {},
            link: linkFunc
        };
        return directive;

        /* @ngInject */
        function linkFunc(scope, elm, attrs, ctrl) {
            ctrl.$validators.isValidName = function (modelValue) {
                if (angular.isDefined(modelValue)) {
                    return ctrl.$isEmpty(modelValue) || FIRSTNAMELASTNAME_REGEXP.test(modelValue);
                } else {
                    return true;
                }
            };
        }
    }
})();