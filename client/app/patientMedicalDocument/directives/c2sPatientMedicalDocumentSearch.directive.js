/**
 * Created by jiahao.li on 6/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.patientMedicalDocument')
        .directive('c2sPatientMedicalDocumentSearch', c2sPatientMedicalDocumentSearch);

    function c2sPatientMedicalDocumentSearch() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patientMedicalDocument/directives/patientMedicalDocumentSearch.html',
            controllerAs: 'patientSearchVm',
            controller: PatientMedicalDocumentSearchController
        };
        return directive;

        /* @ngInject */
        function PatientMedicalDocumentSearchController(patientDocumentService, errorService) {
            var vm = this;

            vm.showResult = false;
            vm.search = search;
            vm.canSearch = canSearch;

            function search() {
                patientDocumentService.getPatientFullDemographic(prepareRequestData(), searchSuccess, searchError);
            }

            function searchSuccess(response) {
                patientDocumentService.setDomainId(response.domainId);
                var patientDtos = response.patientDtos;
                vm.isPatientExist = hasPatient(patientDtos);
                if (hasPatient(patientDtos)) {
                    vm.patientList = patientDtos;
                    angular.forEach(patientDtos, function (patientDto) {
                        patientDocumentService.setMrn(patientDto.medicalRecordNumber);
                    });
                }
                vm.showResult = true;
            }

            function searchError(response) {
                errorService.uncaughtException();
            }

            function canSearch(searchPatientForm) {
                return (searchPatientForm.$dirty && searchPatientForm.$valid);
            }

            function hasPatient(searchResult) {
                return searchResult.length > 0;
            }

            function prepareRequestData() {
                return {
                    firstName: vm.patient.firstName,
                    lastName: vm.patient.lastName,
                    birthDate: vm.patient.birthDate,
                    genderCode: vm.patient.genderCode
                };
            }
        }
    }
})();