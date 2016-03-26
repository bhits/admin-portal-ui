
(function () {

    'use strict';

    angular
        .module("app.patient")
        .factory('patientService', patientService);

    /* @ngInject */
    function patientService($resource, envService) {
        var registrationResource = $resource(envService.securedApis.phrApiBaseUrl + "/patients");
        var stateResource = $resource(envService.securedApis.phrApiBaseUrl + "/statecodes");

        var service = {};
        service.createPatient = createPatient;
        service.getStates = getStates;

        return service;

        function createPatient (patient, success, error){
            registrationResource.save(patient, success, error);
        }

        function getStates (success, error){
            stateResource.query(success, error);
        }
    }
})();