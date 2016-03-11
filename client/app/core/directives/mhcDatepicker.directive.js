
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('mhcDatepicker', mhcDatepickerRange);

            /* @ngInject */
            function mhcDatepickerRange(utilityService) {
                var directive =  {
                    restrict: 'A',
                    link: linkFunc
                };
                return directive;

                /* @ngInject */
                function linkFunc(scope, element, attr, ngModel) {
                    element.datepicker({todayBtn: "linked", autoclose: true});
                }
            }
})();