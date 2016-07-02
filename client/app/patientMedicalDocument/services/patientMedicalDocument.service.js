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
        var service = {};
        var mrn = {};

        service.getPatientFullDemographic = getPatientFullDemographic;
        service.setMrn = setMrn;
        service.getMrn = getMrn;

        return service;

        function getPatientFullDemographic(patient, success, error) {
            return patientDemographicResource.save(patient, success, error);
        }

        function setMrn(mrnResponse) {
            mrn = mrnResponse;
        }

        function getMrn() {
            return mrn;
        }
    }
})();