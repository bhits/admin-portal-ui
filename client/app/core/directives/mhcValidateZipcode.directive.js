
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('mhcValidateZipcode', mhcValidateZipcode);

            /* @ngInject */
            function mhcValidateZipcode(constants, utilityService) {

                var ZIPCODE_REGEXP = constants.ZIPCODE_REGEXP;

                var directive =  {
                    require: 'ngModel',
                    restrict: 'A',
                    scope: {},
                    link: linkFunc
                };
                return directive;

                /* @ngInject */
                function linkFunc(scope, elm, attrs, ctrl) {
                   ctrl.$validators.isValidFiveDigitZipcode = function(modelValue) {
                        if(utilityService.isDefinedAndNotNull(modelValue) && modelValue.length <= 5  ){
                            return ctrl.$isEmpty(modelValue) || ZIPCODE_REGEXP.test(modelValue);
                        }else{
                            return true;
                        }
                   };

                    ctrl.$validators.isValidTenDigitZipcode = function(modelValue) {
                        if( utilityService.isDefinedAndNotNull(modelValue) && modelValue.length > 5 ){
                            return ctrl.$isEmpty(modelValue) || ZIPCODE_REGEXP.test(modelValue);
                        }else{
                            return true;
                        }
                    };
                }
            }
})();