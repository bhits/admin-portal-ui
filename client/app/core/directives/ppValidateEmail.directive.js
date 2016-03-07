
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('ppValidateEmail', ppValidateEmail);

            /* @ngInject */
            function ppValidateEmail(utilityService) {

                var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

                var directive =  {
                    require: 'ngModel',
                    restrict: '',
                    link: linkFunc
                };
                return directive;

                /* @ngInject */
                function linkFunc(scope, elm, attrs, ctrl) {
                    // only apply the validator if ngModel is present and Angular has added the email validator
                    if (ctrl && ctrl.$validators.email) {

                        // this will overwrite the default Angular email validator
                        ctrl.$validators.email = function(modelValue) {
                            return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                        };
                    }
                }
            }
})();