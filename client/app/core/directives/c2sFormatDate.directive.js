
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('c2sFormatDate', c2sFormatDate);

            /* @ngInject */
            function c2sFormatDate($filter) {
                return {
                    require: 'ngModel',
                    link: function(scope, element, attrs, ngModelController) {
                        ngModelController.$parsers.push(function(data) {
                            //convert data from view format to model format
                            if(angular.isDefined(data)){
                                return $filter('date')(data, 'MM/dd/yyyy');
                            }else {
                                return "";
                            }
                        });

                        ngModelController.$formatters.push(function(data) {
                            //convert data from model format to view format
                            if(angular.isDefined(data)){
                                return $filter('date')(data, 'MM/dd/yyyy');
                            }else {
                                return "";
                            }
                        });
                    }
                };
            }
})();