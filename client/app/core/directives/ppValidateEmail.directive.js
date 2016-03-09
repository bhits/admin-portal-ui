
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('ppValidateEmail', ppValidateEmail);

            /* @ngInject */
            function ppValidateEmail(constants) {

                var EMAIL_REGEXP = constants.EMAIL_REGEXP;

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