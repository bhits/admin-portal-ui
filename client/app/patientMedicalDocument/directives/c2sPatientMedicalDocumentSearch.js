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
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patientMedicalDocument/directives/patientMedicalDocumentSearch.html',
            controllerAs: 'documentSearchVm',
            controller: PatientMedicalDocumentSearchController
        };

        return directive;

        /* @ngInject */
        function PatientMedicalDocumentSearchController(patientDocumentService, notificationService) {
            var vm = this;

            vm.showResult = false;
            vm.search = search;
            vm.canSearch = canSearch;

            function search() {
                patientDocumentService.getPatientFullDemographic(vm.patient, searchSuccess, searchError);
            }

            function searchSuccess(response) {
                vm.hasResult = response.patientExist;
                if (angular.equals(response.patientExist, true)) {
                    var patientDtos = response.patientDtos;
                    vm.patientList = patientDtos;
                    angular.forEach(patientDtos, function (patientDto) {
                        patientDocumentService.setMrn(patientDto.medicalRecordNumber);
                    });
                }
                vm.showResult = true;
            }

            function searchError(response) {
                notificationService.error('Error in searching patient.');
            }

            function canSearch(searchPatientForm) {
                return (searchPatientForm.$dirty && searchPatientForm.$valid);
            }
        }
    }
})();