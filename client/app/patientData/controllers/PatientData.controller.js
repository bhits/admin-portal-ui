/**
 * Created by jiahao.li on 6/29/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.patientData')
        .controller('PatientDataController', PatientDataController);

    /* @ngInject */
    function PatientDataController(){
        var vm = this;
        vm.title = "Search Patient";
    }
})();
