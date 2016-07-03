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
            vm.retrieveDocument = retrieveDocument;
            vm.canSearch = canSearch;
            vm.canRetrieve = canRetrieve;

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

            function createAccessRequest() {
                return {
                    mrn: patientDocumentService.getMrn(),
                    npi: patientDocumentService.getNpi(),
                    purposeOfUse: vm.patient.purposeOfUse
                };
            }

            function retrieveDocument() {
                var accessRequest = createAccessRequest();
                patientDocumentService.getAccessDocument(accessRequest, retrieveSuccess, retrieveError);
            }

            function retrieveSuccess(response) {
                notificationService.success('Success in retrieving document.');
                console.log(response);
            }

            function retrieveError(response) {
                notificationService.error('Error in retrieving document.');
            }

            function canRetrieve(retrieveDocumentForm) {
                return (retrieveDocumentForm.$dirty && retrieveDocumentForm.$valid);
            }
        }
    }
})();