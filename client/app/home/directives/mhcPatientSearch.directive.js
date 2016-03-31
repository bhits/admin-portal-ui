/**
 * Created by Feruz.Abdella on 3/17/2016.
 */


(function () {
    'use strict';

    angular
        .module('app.home')
        .directive('mhcPatientSearch', mhcPatientSearch);

    /* @ngInject */
    function mhcPatientSearch() {
        var directive =  {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/home/directives/patientSearch.html',
            bindToController: {
                searchtext: '=?'//,
                //patientsdata: '='
            },
            controller: PatientSearchController,
            controllerAs: 'patientSearchVm'
        };

        return directive;

        /* @ngInject */
        function PatientSearchController($state,patientService, notificationService) {
            var vm = this;
            vm.search=search;
            vm.editPatient=editPatient;

            function search()
            {
                vm.searchtext=vm.searchtext;
                patientService.searchPatient(vm.searchtext,
                function success(response)
                {
                    vm.patients = response;

                },
                function error()
                {
                    notificationService.error('Failed to get the patient, please try again later...');
                });
            }

            function editPatient(patientId)
            {
                $state.go('fe.patient.edit',{patientId: patientId});
            }
        }
    }
})();

