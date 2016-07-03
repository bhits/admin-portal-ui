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
        function AccessDocumentController(patientDocumentService) {
            var vm = this;
            var retrieveResponse = patientDocumentService.getRetrieveResponse();
            vm.mrn = retrieveResponse.responseMrn;
            vm.npi = retrieveResponse.responseNpi;
            vm.pou = retrieveResponse.responsePOU;
        }
    }
})();