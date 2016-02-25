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
        function PatientCreateController ($scope, utilityService) {
            var vm = this;

        }
    }
})();