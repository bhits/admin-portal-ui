/**
 * Created by Feruz.Abdella on 3/21/2016.
 */
(function () {

    'use strict';

    angular
        .module('app.patient')
        .controller('PatientCreateController', PatientCreateController);

    /* @ngInject */
    function PatientCreateController(){
        var vm = this;
        vm.patientdata = {};
        vm.title = "Create Patient";
    }
})();