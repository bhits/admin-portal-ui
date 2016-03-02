(function () {
    'use strict';

    angular
        .module('app.patient')
        .directive('ppPatientCreate', ppPatientCreate);

    /* @ngInject */
    function ppPatientCreate() {
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

            function success(response){
                $state.go('fe.patient.success');
            }

            function error(response){
                notificationService.error("Error in creating patient.");
            }

            function save(){
                patientService.createPatient(vm.patient, success, error);
            }
        }
    }
})();