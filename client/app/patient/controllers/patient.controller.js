/**
 * Created by Feruz.Abdella on 3/21/2016.
 */
(function () {

    'use strict';

    angular
        .module('app.patient')
        .controller('PatientController', PatientController);

    /* @ngInject */
    function PatientController(patientData,verificationInfo){
        var vm = this;
        vm.patientdata = patientData;
        vm.verificationinfo = verificationInfo;
    }
})();