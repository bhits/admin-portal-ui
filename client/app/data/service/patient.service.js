
(function () {

    'use strict';

    angular
        .module("app.data")
        .factory('patientService', patientService);

    /* @ngInject */
    function patientService($resource, envService) {
        var registrationResource = $resource(envService.securedApis.registrationApiBaseUrl + "/signup");
        var basePhrURL= envService.securedApis.phrApiBaseUrl;
        var basePatientUserURL=envService.securedApis.patientUserApiBaseUrl;
        var patientListResource = $resource(basePhrURL + "/pageNumber/:pageNumber",{pageNumber: '@pageNumber'} );
        var patientProfileResource = $resource(basePhrURL + "/:patientId/profile",{patientId: '@patientId'} );
        var patientProfileUpdateResource = $resource(basePhrURL + "/:patientId",{patientId: '@patientId'},{'update': { method:'PUT' } } );
        var patientUserResource=$resource(basePatientUserURL + "/creations" );
        var getUserCreationResource = $resource(patientUserResource + "?patientId=:patientId",{patientId: '@patientId'} );


        var service = {};

        service.createPatient = createPatient;
        service.updatePatient = updatePatient;
        service.getPatients = getPatients;
        service.getPatient = getPatient;
        service.getVerifcationInfo= getVerificationInfo;
        service.sendVerificationEmail=sendVerificationEmail;
        return service;

        function createPatient (patient, success, error){
            registrationResource.save(patient, success, error);
        }
        function updatePatient (patient, success, error){
            patientProfileUpdateResource.update({patientId: patient.id},patient, success, error);
        }

        function getPatients (page,success, error){
            function adjustPageOnSuccessResponse(response) {
                if (angular.isDefined(response.currentPage) && angular.isNumber(response.currentPage)) {
                    response.currentPage += 1;
                }
                (success || angular.identity)(response);
            }
            return patientListResource.get({pageNumber: page-1},adjustPageOnSuccessResponse, error);
        }

        function getPatient (patientId,success, error){
            return patientProfileResource.get({patientId: patientId},success, error);
        }

        function getVerificationInfo (patientId,success, error){
            return patientUserResource.get({patientId: patientId},success, error);
        }

        function sendVerificationEmail (patientId,success, error){
            var patient = { "patientId": patientId };
            patientUserResource.save(patient, success, error);
        }

    }
})();