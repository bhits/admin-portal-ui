/**
 * Created by Jiahao.Li on 7/1/2016.
 */

(function () {
    'use strict';

    angular.module('app.patientMedicalDocument')
        .factory('patientDocumentService', patientDocumentService);

    /* @ngInject */
    function patientDocumentService($resource, configService) {
        var patientDemographicResource = $resource(configService.getPhrApiBaseUrl() + "/patients/patientDemographic", {},
            {
                'query': {
                    method: 'GET',
                    params: {
                        firstName: '@firstName',
                        lastName: '@lastName',
                        birthDate: '@birthDate',
                        genderCode: '@genderCode'
                    }
                }
            }
        );
        var retrieveDocumentResource = $resource(configService.getPepApiBaseUrl() + "/documents", {},
            {
                'query': {
                    method: 'GET',
                    params: {
                        firstName: '@mrn',
                        lastName: '@purposeOfUse',
                        birthDate: '@domain'
                    }
                }
            }
        );

        var service = {};
        var mrn = {};
        var domainId = {};
        var retrieveResponse = {};

        service.getPatientFullDemographic = getPatientFullDemographic;
        service.retrieveDocument = retrieveDocument;
        service.setMrn = setMrn;
        service.getMrn = getMrn;
        service.setDomainId = setDomainId;
        service.getDomainId = getDomainId;
        service.getPurposeOfUse = getPurposeOfUse;
        service.setRetrieveResponse = setRetrieveResponse;
        service.getRetrieveResponse = getRetrieveResponse;

        return service;

        function getPatientFullDemographic(patient, success, error) {
            return patientDemographicResource.query(patient, success, error);
        }

        function retrieveDocument(request, success, error) {
            return retrieveDocumentResource.query(request, success, error);
        }

        function setMrn(mrnResponse) {
            mrn = mrnResponse;
        }

        function getMrn() {
            return mrn;
        }

        function setDomainId(domainIdResponse) {
            domainId = domainIdResponse;
        }

        function getDomainId() {
            return domainId;
        }

        //TODO: Need getting data from API
        function getPurposeOfUse() {
            var purposeOfUseResource = [
                {
                    "code": "HEALTHCARE_TREATMENT",
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
            retrieveResponse = response;
        }

        function getRetrieveResponse() {
            return retrieveResponse;
        }
    }
})();