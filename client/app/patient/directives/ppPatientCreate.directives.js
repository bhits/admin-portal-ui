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

            vm.emailPattern = /^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
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