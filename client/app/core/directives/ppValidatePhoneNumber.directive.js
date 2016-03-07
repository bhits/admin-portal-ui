
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('ppValidatePhoneNumber', ppValidatePhoneNumber);

            /* @ngInject */
            function ppValidatePhoneNumber() {
                //NANP
                var PHONE_NUMBER_REGEXP = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

                var directive =  {
                    require: 'ngModel',
                    restrict: 'A',
                    scope: {},
                    link: linkFunc
                };
                return directive;

                /* @ngInject */
                function linkFunc(scope, elm, attrs, ctrl) {
                   ctrl.$validators.isValidPhoneNumber = function(modelValue) {
                        if(angular.isDefined(modelValue)){
                            return ctrl.$isEmpty(modelValue) || PHONE_NUMBER_REGEXP.test(modelValue);
                        }else{
                            return true;
                        }
                   };
                }
            }
})();