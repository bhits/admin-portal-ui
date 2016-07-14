/**
 * Created by jiahao.li on 6/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.patientMedicalDocument')
        .directive('c2sRetrieveDocument', c2sRetrieveDocument);

    /* @ngInject */
    function c2sRetrieveDocument() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patientMedicalDocument/directives/retrieveDocument.html',
            controllerAs: 'retrieveDocumentVm',
            controller: RetrieveDocumentController
        };

        return directive;

        /* @ngInject */
        function RetrieveDocumentController($state, patientDocumentService, notificationService) {
            var vm = this;

            vm.purposeOfUseItems = patientDocumentService.getPurposeOfUse();
            vm.retrieveDocument = retrieveDocument;
            vm.canRetrieve = canRetrieve;
            vm.cancel = cancel;

            function retrieveDocument() {
                patientDocumentService.retrieveDocument(createRequest(), retrieveSuccess, retrieveError);
            }

            function retrieveSuccess(response) {
                patientDocumentService.setRetrieveResponse(response);
                $state.go('fe.patientMedicalDocument.retrieveList');
            }

            function retrieveError(response) {
                var retrieveDocumentException = response.data.exception;
                if (retrieveDocumentException.indexOf('DocumentNotFoundException') !== -1) {
                    vm.isDocumentExist = true;
                } else {
                    notificationService.error('Error in retrieving document.');
                }
            }

            function canRetrieve(retrieveDocumentForm) {
                return (retrieveDocumentForm.$dirty && retrieveDocumentForm.$valid);
            }

            function cancel() {
                $state.go($state.current, {}, {reload: true});
            }

            function createRequest() {
                return {
                    mrn: patientDocumentService.getMrn(),
                    purposeOfUse: vm.patient.purposeOfUse,
                    domain: patientDocumentService.getDomainId()
                };
            }
        }
    }
})();