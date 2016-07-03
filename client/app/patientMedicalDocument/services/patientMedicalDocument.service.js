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

        service.getPatientFullDemographic = getPatientFullDemographic;
        service.getAccessDocument = getAccessDocument;
        service.setMrn = setMrn;
        service.getMrn = getMrn;
        service.getNpi = getNpi;

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
    }
})();