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
        function AccessDocumentController($window, patientDocumentService) {
            var vm = this;
            var retrieveResponse = patientDocumentService.getRetrieveResponse();
            vm.documentList = retrieveResponse.documents;
            vm.viewDocument = viewDocument;

            function viewDocument() {
                if (angular.isDefined(retrieveResponse.documents)) {
                    angular.forEach(retrieveResponse.documents, function (retrieveDocuments) {
                        var encodedDocument = retrieveDocuments.document;
                        var decodedDocument = atob(encodedDocument);
                        var windowSpecs = 'toolbar=no, status=no, height = ' + screen.height + ', width = ' + screen.width;
                        var viewer = $window.open('', '_blank', windowSpecs);
                        viewer.document.open().write(decodedDocument);
                    });
                }
            }
        }
    }
})();