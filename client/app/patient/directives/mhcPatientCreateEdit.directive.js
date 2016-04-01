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
            bindToController: {
                patientdata: '='
            },
            controller: PatientCreateEditController
        };

        return directive;

        /* @ngInject */
        function PatientCreateEditController(patientService, $state, notificationService) {
            var vm = this;
            vm.save = save;
            vm.cancel=cancel;
            vm.canCreate = canCreate;
            vm.patient = vm.patientdata;
            vm.isEditMode = isEditMode;
            vm.saveButtonText = isEditMode()? 'Update Patient': 'Create Patient';


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

            function updatePatient() {
                patientService.updatePatient(vm.patient,
                    function success() {
                        notificationService.success('Success in updating patient.');
                        $state.go('fe.index.home');
                    }, function error() {
                        notificationService.error('Error in updating patient.');
                    });
            }

            function createPatient() {
                patientService.createPatient(vm.patient,
                    function success() {
                        notificationService.success('Success in creating patient.');
                        $state.go('fe.index.home');
                    }, function error() {
                        notificationService.error('Error in creating patient.');
                    });
            }
            function save()
            {
                if (isEditMode()) {
                    updatePatient();
                }
                else
                {
                   createPatient();
                }
            }

            function isEditMode()
            {
                return (angular.isDefined(vm.patient)) && (angular.isDefined(vm.patient.id));
            }

            function canCreate(createPatientForm){
                return (createPatientForm.$dirty && createPatientForm.$valid);
            }

            function cancel()
            {
                $state.go('fe.index.home');
            }
        }
    }
})();