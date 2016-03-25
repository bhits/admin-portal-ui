(function () {
    'use strict';

    angular
        .module('app.patient')
        .directive('mhcPatientCreateEdit', mhcPatientCreateEdit);

    /* @ngInject */
    function mhcPatientCreateEdit() {
        var directive =  {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patient/directives/patientCreateEdit.html',
            controllerAs: 'patientCreateEditVm',
            bindToController: {patientdata: '='},
            controller: PatientCreateEditController
        };

        return directive;

        /* @ngInject */
        function PatientCreateEditController(patientService, $state, notificationService) {
            var vm = this;
            vm.save = save;
            vm.canCreate = canCreate;
            vm.patient=vm.patientdata;

            function success(response){
                notificationService.success("Success in creating patient.");
                $state.go('fe.index.home');
            }

            function error(response){
                notificationService.error("Error in creating patient.");
            }

            function save(){
                patientService.createPatient(vm.patient,success,error);
            }

            function canCreate(createPatientForm){
                return (createPatientForm.$dirty && createPatientForm.$valid);
            }
        }
    }
})();