
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('c2sValidateSsn', c2sValidateSsn);

            /* @ngInject */
            function c2sValidateSsn(constants) {

                var SSN_REGEXP = constants.SSN_REGEXP;

                var directive =  {
                    require: 'ngModel',
                    restrict: 'A',
                    scope: {},
                    link: linkFunc
                };
                return directive;

                /* @ngInject */
                function linkFunc(scope, elm, attrs, ctrl) {
                   ctrl.$validators.isValidSSN = function(modelValue) {
                        if(angular.isDefined(modelValue)){
                            return ctrl.$isEmpty(modelValue) || SSN_REGEXP.test(modelValue);
                        }else{
                            return true;
                        }
                   };
                }
            }
})();