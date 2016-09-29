(function () {
    'use strict';

    angular
        .module('app.patient')
        .directive('c2sPatientCreateEdit', c2sPatientCreateEdit);

    /* @ngInject */
    function c2sPatientCreateEdit() {
        var directive = {
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
            vm.createPatient = createPatient;
            vm.updatePatient = updatePatient;
            vm.cancel = cancel;
            vm.canCreate = canCreate;
            vm.patient = vm.patientdata;
            vm.isEditMode = isEditMode;
            vm.checkDateField = checkDateField;
            activate();

            function activate() {
                patientService.getStates(
                    function (response) {
                        vm.states = response;
                    },
                    function (error) {
                        notificationService.error("Error in getting states.");
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
                    function success(response) {
                        notificationService.success('Success in creating patient.');
                        $state.go('fe.index.home');
                    }, function error(response) {
                        var emailExistsException = response.data.exception;
                        if (emailExistsException.indexOf('EmailExistsException') !== -1) {
                            notificationService.error('Sorry, the email address provided is already in use.');
                        } else {
                            notificationService.error('Error in creating patient.');
                        }
                    });
            }

            function isEditMode() {
                return (angular.isDefined(vm.patient)) && (angular.isDefined(vm.patient.id));
            }

            function canCreate(createPatientForm) {
                return (createPatientForm.$dirty && createPatientForm.$valid);
            }

            function cancel() {
                $state.go('fe.index.home');
            }

            function checkDateField(birthdate) {
                vm.fillOutDate = !birthdate.$valid;
            }
        }
    }
})();