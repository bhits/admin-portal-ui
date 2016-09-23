(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('c2sDatepicker', c2sDatepickerRange);

    /* @ngInject */
    function c2sDatepickerRange(utilityService) {
        var directive = {
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