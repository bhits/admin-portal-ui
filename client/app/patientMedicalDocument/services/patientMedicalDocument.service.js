/**
 * Created by Jiahao.Li on 7/1/2016.
 */

(function () {
    'use strict';

    angular.module('app.patientMedicalDocument')
        .factory('patientDocumentService', patientDocumentService);

    /* @ngInject */
    function patientDocumentService($resource, envService) {
        var patientDemographicResource = $resource(envService.securedApis.phrApiBaseUrl + "/patients/patientDemographic");
        //TODO: Only for mock
        var retrieveDocumentResource = $resource(envService.securedApis.phrApiBaseUrl + "/patients/accessDocument");
        var service = {};
        var mrn = {};
        var accessResponse = {};

        service.getPatientFullDemographic = getPatientFullDemographic;
        service.getAccessDocument = getAccessDocument;
        service.setMrn = setMrn;
        service.getMrn = getMrn;
        service.getNpi = getNpi;
        service.getPurposeOfUse = getPurposeOfUse;
        //TODO: will remove
        service.setRetrieveResponse = setRetrieveResponse;
        service.getRetrieveResponse = getRetrieveResponse;

        return service;

        function getPatientFullDemographic(patient, success, error) {
            return patientDemographicResource.save(patient, success, error);
        }

        function getAccessDocument(accessRequest, success, error) {
            return retrieveDocumentResource.save(accessRequest, success, error);
        }

        function setMrn(mrnResponse) {
            mrn = mrnResponse;
        }

        function getMrn() {
            return mrn;
        }

        function getNpi() {
            return envService.primaryNPI;
        }

        //TODO: Need getting data from API
        function getPurposeOfUse() {
            var purposeOfUseResource = [
                {
                    "code": "TREATMENT",
                    "displayName": "Healthcare Treatment",
                    "description": "To perform one or more operations on information for the provision of health care."
                },
                {
                    "code": "PAYMENT",
                    "displayName": "Payment",
                    "description": "To perform one or more operations on information for conducting financial or contractual activities related to payment for the provision of health care."
                },
                {
                    "code": "RESEARCH",
                    "displayName": "Research",
                    "description": "To perform one or more operations on information for conducting scientific investigations to obtain health care knowledge."
                }
            ];
            return purposeOfUseResource;
        }

        function setRetrieveResponse(response) {
            accessResponse = response;
        }

        function getRetrieveResponse() {
            return accessResponse;
        }
    }
})();