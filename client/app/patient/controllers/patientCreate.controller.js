(function () {
    'use strict';

    angular
        .module('app.patient')
        .controller('PatientCreateController', PatientCreateController);

    function PatientCreateController() {
        var vm = this;
        vm.patientdata = {};
        vm.title = "CREATE_PATIENT";
    }
})();