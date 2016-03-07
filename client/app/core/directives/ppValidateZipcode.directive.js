
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('ppValidateZipcode', ppValidateZipcode);

            /* @ngInject */
            function ppValidateZipcode() {

                var ZIPCODE_REGEXP = /^\d{5}(?:[-\s]\d{4})?$/;

                var directive =  {
                    require: 'ngModel',
                    restrict: 'A',
                    scope: {},
                    link: linkFunc
                };
                return directive;

                /* @ngInject */
                function linkFunc(scope, elm, attrs, ctrl) {
                   ctrl.$validators.isValidZipcode = function(modelValue) {
                        if(angular.isDefined(modelValue)){
                            return ctrl.$isEmpty(modelValue) || ZIPCODE_REGEXP.test(modelValue);
                        }else{
                            return true;
                        }
                   };
                }
            }
})();