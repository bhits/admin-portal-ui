/**
 * Created by Feruz.Abdella on 3/17/2016.
 */


(function () {
    'use strict';

    angular
        .module('app.home')
        .directive('c2sPatientSearch', c2sPatientSearch);

    /* @ngInject */
    function c2sPatientSearch() {
        var directive =  {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/home/directives/patientSearch.html',
            bindToController: {
                searchtext: '=?'
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

            function search() {
                if(angular.isDefined(vm.searchtext)){
                    patientService.searchPatient(vm.searchtext,
                        function success(response) {
                            vm.patients = response;
                        },
                        function error() {
                            console.warn('No search results was return...');
                        });
                }
            }

            function editPatient()
            {
                patientService.searchPatient(vm.searchtext,
                    function success(response) {
                        var patient = response[0];
                        $state.go('fe.patient.edit',{patientId: patient.id});
                    },
                    function error() {
                        notificationService.error('Failed to get the patient, please try again later...');
                    });
            }
        }
    }
})();

