/**
 * Created by jiahao.li on 6/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.patientMedicalDocument')
        .directive('c2sRetrieveDocumentResult', c2sRetrieveDocumentResult);

    /* @ngInject */
    function c2sRetrieveDocumentResult() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patientMedicalDocument/directives/retrieveDocumentResult.html',
            controllerAs: 'accessDocumentVm',
            controller: AccessDocumentController
        };

        return directive;

        /* @ngInject */
        function AccessDocumentController($window, $state, patientDocumentService) {
            var vm = this;
            vm.viewDocument = viewDocument;
            loadData();

            function loadData() {
                var retrieveResponse = patientDocumentService.getRetrieveResponse();
                var patientDocuments = retrieveResponse.documents;
                if (angular.isDefined(patientDocuments)) {
                    vm.documentList = patientDocuments;
                } else {
                    $state.go('fe.patientMedicalDocument.search');
                }
            }

            function viewDocument() {
                if (angular.isDefined(vm.documentList)) {
                    angular.forEach(vm.documentList, function (retrieveDocuments) {
                        var encodedDocument = retrieveDocuments.document;
                        var decodedDocument = atob(encodedDocument);
                        var viewer = $window.open('', '_blank');
                        viewer.document.open().write(decodedDocument);
                    });
                }
            }
        }
    }
})();