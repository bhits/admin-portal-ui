
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('ppValidateZipcode', ppValidateZipcode);

            /* @ngInject */
            function ppValidateZipcode(constants) {

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