/**
 * Created by jiahao.li on 6/29/2016.
 */

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