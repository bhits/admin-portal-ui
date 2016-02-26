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
        function PatientCreateController(patientService) {
            var vm = this;

            vm.save = save;

            function success(response){
                console.log("Success");
            }

            function error(response){
                console.log("Error");
            }

            function save(){
                patientService.createPatient(vm.patient, success, error);
            }
        }
    }
})();