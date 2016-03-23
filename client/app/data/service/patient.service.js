
(function () {

    'use strict';

    angular
        .module("app.data")
        .factory('patientService', patientService);

    /* @ngInject */
    function patientService($resource, envService) {
        var registrationResource = $resource(envService.securedApis.registrationApiBaseUrl + "/signup");
        var basePhrURL= envService.securedApis.phrApiBaseUrl;
        var patientListResource = $resource(basePhrURL + "/pageNumber/:pageNumber",{pageNumber: '@pageNumber'} );
        var patientResource = $resource(basePhrURL + "/:patientId/profile",{patientId: '@patientId'} );

        var service = {};

        service.createPatient = createPatient;
        service.getPatients = getPatients;

        return service;

        function createPatient (patient, success, error){
            registrationResource.save(patient, success, error);
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
            return patientResource.get({patientId: patientId},success, error);
        }
    }
})();