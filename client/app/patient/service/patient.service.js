
(function () {

    'use strict';

    angular
        .module("app.patient")
        .factory('patientService', patientService);

    /* @ngInject */
    function patientService($resource, envService, notificationService) {
        var registrationResource = $resource(envService.securedApis.registrationApiBaseUrl + "/signup");

        var service = {};
        service.createPatient = createPatient;

        return service;

        function createPatient (patient, success, error){
            registrationResource.save(patient, success, error);
        }
    }
})();