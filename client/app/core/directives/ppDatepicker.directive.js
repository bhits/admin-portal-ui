
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('ppDatepicker', ppDatePickerRange);

            /* @ngInject */
            function ppDatePickerRange(utilityService) {
                var directive =  {
                    require: 'ngModel',
                    scope: {
                        otherModelValue: "="
                    },
                    link: linkFunc
                };
                return directive;

                /* @ngInject */
                function linkFunc(scope, element, attr, ngModel) {
                    element.datepicker({todayBtn: "linked", autoclose: true});

                    ngModel.$validators.isValidDate = function(modelValue) {
                        if(angular.isDefined(modelValue)){
                            return utilityService.isValidDate(modelValue);
                        }else{
                            return false;
                        }
                    };

                    scope.$watch("otherModelValue", function() {
                        ngModel.$validate();
                    });
                }
            }
})();