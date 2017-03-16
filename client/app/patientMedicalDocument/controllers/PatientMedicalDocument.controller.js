(function () {
    'use strict';

    angular
        .module('app.patientMedicalDocument')
        .controller('PatientMedicalDocumentController', PatientMedicalDocumentController);

    function PatientMedicalDocumentController() {
        var vm = this;
        vm.title = "RETRIEVE_PATIENT_DOCUMENTS";
    }
})();