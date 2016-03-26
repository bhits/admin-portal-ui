(function () {
    'use strict';

    angular
        .module('app.patient')
        .directive('mhcPatientCreate', mhcPatientCreate);

    /* @ngInject */
    function mhcPatientCreate() {
        var directive =  {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patient/directives/patientCreate.html',
            controllerAs: 'patientCreateVm',
            bindToController: true,
            controller: PatientCreateController
        };

        return directive;

        /* @ngInject */
        function PatientCreateController(patientService, $state, notificationService) {
            var vm = this;
            vm.save = save;
            vm.canCreate = canCreate;

            activate();

            function activate(){
                patientService.getStates(
                    function(response){
                        vm.states = response;
                    },
                    function(error){
                        notificationService.success("Error in getting states.");
                    }
                );
            }
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