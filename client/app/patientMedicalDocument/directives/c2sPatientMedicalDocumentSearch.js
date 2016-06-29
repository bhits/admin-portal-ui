/**
 * Created by jiahao.li on 6/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.patientMedicalDocument')
        .directive('c2sPatientMedicalDocumentSearch', c2sPatientMedicalDocumentSearch);

    /* @ngInject */
    function c2sPatientMedicalDocumentSearch() {
        var directive =  {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patientMedicalDocument/directives/patientMedicalDocumentSearch.html',
            controllerAs: 'medicalDocumentSearchVm',
            controller: PatientMedicalDocumentSearchController
        };

        return directive;

        /* @ngInject */
        function PatientMedicalDocumentSearchController() {
            var vm = this;
        }
    }
})();