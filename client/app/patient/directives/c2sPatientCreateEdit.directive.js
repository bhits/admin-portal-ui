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
                        if (isEnglish()) {
                            notificationService.error("Error in getting states.");
                        } else {
                            notificationService.error("Se encontraron errores al obtener los estados.");
                        }

                    }
                );
            }

            function updatePatient() {
                patientService.updatePatient(vm.patient,
                    function success() {
                        if (isEnglish()) {
                            notificationService.success('Success in updating patient.');
                        } else {
                            notificationService.success('El paciente ha sido modificado.');
                        }

                        $state.go('fe.index.home');
                    }, function error() {
                        if (isEnglish()) {
                            notificationService.error('Error in updating patient.');
                        } else {
                            notificationService.error('El paciente no pudo ser modificado.');
                        }

                    });
            }

            function createPatient() {
                patientService.createPatient(vm.patient,
                    function success(response) {
                        if (isEnglish()) {
                            notificationService.success('Success in creating patient.');
                        } else {
                            notificationService.success('El paciente ha sido creado.');
                        }

                        $state.go('fe.index.home');
                    }, function error(response) {
                        var emailExistsException = response.data.exception;
                        if (emailExistsException.indexOf('EmailExistsException') !== -1) {
                            if (isEnglish()) {
                                notificationService.error('Sorry, the email address provided is already in use.');
                            } else {
                                notificationService.error('Lo sentimos, la dirección de correo electrónico dada esta en uso.');
                            }

                        } else {
                            if (isEnglish()) {
                                notificationService.error('Error in creating patient.');
                            } else {
                                notificationService.error('El paciente no pudo ser creado.');
                            }

                        }
                    });
            }

            // check the language of locale - Wentao
            function isEnglish() {
                var language = window.localStorage.lang || 'en';
                if (language.substring(0,2) === 'en') {
                    return true;
                } else {
                    return false;
                }
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