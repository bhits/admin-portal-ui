(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('c2sDatepicker', c2sDatepickerRange);

    /* @ngInject */
    function c2sDatepickerRange(utilityService) {
        var directive = {
            restrict: 'A',
            //language: 'zh-CN',
            link: linkFunc
        };
        return directive;

        /* @ngInject */
        function linkFunc(scope, element, attr, ngModel) {
            var language = window.localStorage.lang || 'en';
            element.datepicker({
                todayBtn: "linked",
                autoclose: true,
                todayHighlight: true,
                format: 'mm/dd/yyyy',
                language: language
            });
        }
    }
})();