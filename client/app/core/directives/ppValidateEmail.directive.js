
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('ppValidateEmail', ppValidateEmail);

            /* @ngInject */
            function ppValidateEmail(utilityService) {

                var EMAIL_REGEXP = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;

                var directive =  {
                    require: 'ngModel',
                    restrict: 'A',
                    scope: {},
                    link: linkFunc
                };
                return directive;

                /* @ngInject */
                function linkFunc(scope, elm, attrs, ctrl) {
                    // this will overwrite the default Angular email validator
                    ctrl.$validators.email = function(modelValue) {
                        if(angular.isDefined(modelValue)) {
                            return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                        }else{
                            return true;
                        }
                    };
                }
            }
})();