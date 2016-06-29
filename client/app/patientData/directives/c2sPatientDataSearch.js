/**
 * Created by jiahao.li on 6/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.patientData')
        .directive('c2sPatientDataSearch', c2sPatientDataSearch);

    /* @ngInject */
    function c2sPatientDataSearch() {
        var directive =  {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patientData/directives/patientDataSearch.html',
            controllerAs: 'patientDataSearchVm',
            controller: PatientDataSearchController
        };

        return directive;

        /* @ngInject */
        function PatientDataSearchController() {
            var vm = this;
        }
    }
})();