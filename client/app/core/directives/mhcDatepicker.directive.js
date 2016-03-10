
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('mhcDatepicker', mhcDatepickerRange);

            /* @ngInject */
            function mhcDatepickerRange(utilityService) {
                var directive =  {
                    require: 'ngModel',
                    restrict: 'A',
                    scope: {},
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
                            return true;
                        }
                    };
                }
            }
})();