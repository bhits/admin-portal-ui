
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('ppCompareTo', ppCompareTo);

            /* @ngInject */
            function ppCompareTo() {
                var directive =  {
                    require: "ngModel",
                    scope: {
                        otherModelValue: "=ppCompareTo"
                    },
                    link: linkFunc
                };

                return directive;

                /* @ngInject */
                function linkFunc(scope, element, attributes, ngModel) {

                    ngModel.$validators.compareTo = function(modelValue) {
                        return modelValue === scope.otherModelValue;
                    };

                    scope.$watch("otherModelValue", function() {
                        ngModel.$validate();
                    });
                }

            }

})();