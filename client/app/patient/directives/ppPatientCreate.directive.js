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
            vm.canCreate = canCreate;
            vm.removeConfirmPassword = removeConfirmPassword;

            function success(response){
                notificationService.success("Success in creating patient.");
                $state.go('fe.index.home');
            }

            function error(response){
                notificationService.error("Error in creating patient.");
            }

            function save(){
                var user = vm.removeConfirmPassword(vm.patient);
                patientService.createPatient(user, success, error);
            }

            function removeConfirmPassword(patientObject){
                var temp = {};
                angular.copy(patientObject, temp);
                delete temp.password2;
                return temp;
            }

            function canCreate(createPatientForm){
                return (createPatientForm.$dirty && createPatientForm.$valid);
            }
        }
    }
})();