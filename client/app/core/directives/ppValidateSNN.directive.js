
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('ppValidateSsn', ppValidateSsn);

            /* @ngInject */
            function ppValidateSsn() {

                var SSN_REGEXP = /^(\d{3}-?\d{2}-?\d{4}|XXX-XX-XXXX)$/;

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