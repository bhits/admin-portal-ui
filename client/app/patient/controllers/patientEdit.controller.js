(function () {
    'use strict';

    angular
        .module('app.patient')
        .controller('PatientEditController', PatientEditController);

    /* @ngInject */
    function PatientEditController(patientData, $state) {
        var vm = this;
        vm.patientdata = patientData[0];
        vm.title = $state.current.data.pageTitle;
    }
})();