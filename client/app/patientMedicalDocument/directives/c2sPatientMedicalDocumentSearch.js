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
        function PatientMedicalDocumentSearchController(patientDocumentService, utilityService, notificationService) {
            var vm = this;

            vm.showResult = false;
            vm.checkDateField = checkDateField;
            vm.search = search;
            vm.canSearch = canSearch;

            function checkDateField(birthdate) {
                vm.fillOutDate = !birthdate.$valid;
            }

            function getSearchPatientInput(input) {
                input.birthDate = utilityService.formatDate(input.birthDate);
                return input;
            }

            function search() {
                var patientInput = getSearchPatientInput(vm.patient);
                patientDocumentService.getPatientFullDemographic(patientInput, searchSuccess, searchError);
            }

            function searchSuccess(response) {
                if (angular.equals(response.patientExist, true)) {
                    vm.firstname = response.patientDtos.firstName;
                    vm.lastname = response.patientDtos.lastName;
                    vm.mrn = response.patientDtos.medicalRecordNumber;
                } else {
                    notificationService.success('Sorry, no patient has been found.');
                }
                vm.showResult = true;
            }

            function searchError(response) {
                notificationService.error('Error in searching patient.');
                console.log(response);
            }

            function canSearch(searchPatientForm) {
                return (searchPatientForm.$dirty && searchPatientForm.$valid);
            }
        }
    }
})();