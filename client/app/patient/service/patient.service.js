
(function () {

    'use strict';

    angular
        .module("app.patient")
        .factory('patientService', patientService);

    /* @ngInject */
    function patientService($resource, envService) {
        var registrationResource = $resource(envService.securedApis.patientRegistrationBaseUrl + "/patients");

        var service = {};
        service.createPatient = createPatient;

        return service;

        function createPatient (patient, success, error){
            registrationResource.save(patient, success, error);
        }
    }
})();