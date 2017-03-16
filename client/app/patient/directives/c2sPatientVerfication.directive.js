(function () {
    'use strict';

    angular
        .module('app.patient')
        .directive('c2sPatientVerification', c2sPatientVerification)
        .directive('chooseEmailLanguage', function () {
            var directive = {

            };
            return directive;
        });

    function c2sPatientVerification() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patient/directives/patientVerification.html',
            controllerAs: 'patientVerificationVm',
            bindToController: {
                verificationinfo: '=',
                patientdata: '=',
                lang: '='
            },
            controller: PatientVerificationController
            //controller: 'app/patient/controllers/patientVerification.controller.js'
        };
        return directive;

        /* @ngInject */
        function PatientVerificationController(notificationService, patientService, $modal) {
            var vm = this;
            vm.patient = vm.patientdata;
            vm.verificationEmail = setEmail();
            vm.show = showVerifcationBox();
            vm.sendEmail = sendEmail;
            vm.isAccountAlreadyVerified = isAccountVerified;

            verifyPatient();

            function verifyPatient() {
                if (angular.isDefined(vm.patientdata) && angular.isDefined(vm.patientdata.id)) {
                    patientService.getVerifcationInfo(vm.patient.id,
                        function success(response) {
                            vm.verification = response;
                            vm.accountStatus = getStatus();
                            vm.sendEmailButtonText = isVerificationCodeSent() ? "Resend Email" : "Send Email";
                            vm.accountStatus = getStatus();
                        }, function error() {
                            vm.accountStatus = getStatus();
                            vm.sendEmailButtonText = isVerificationCodeSent() ? "Resend Email" : "Send Email";
                            console.error("Patient is not verified, please verify patient...");
                        });
                } else {
                    vm.sendEmailButtonText = isVerificationCodeSent() ? "Resend Email" : "Send Email";
                    vm.accountStatus = getStatus();
                    console.warn("No patient id available to get verification info...");
                }
            }

            function sendEmail(language) {
                patientService.sendVerificationEmail(vm.patient.id, language,
                    function success() {
                        if (isEnglish()) {
                            notificationService.success('email sent successfully');
                        } else {
                            notificationService.success('el correo electrónico ha sido enviado');
                        }
                        verifyPatient();
                    }, function error() {
                        if (isEnglish()) {
                            notificationService.error('Failed to send email, please try again later...');
                        } else {
                            notificationService.error('El correo electrónico no pudo ser enviado, por favor inténtelo de nuevo...');
                        }
                    });
            }

            function setEmail() {
                if (!isPatientNotCreated()) {
                    return vm.patient.email;
                }
                return '';
            }

            function getStatus() {
                var status = 'ACCOUNT_STATUS.NOT_YET_ACTIVATED';
                if (angular.isDefined(vm.verification)) {
                    var verificationCodeSent = angular.isDefined(vm.verification.verificationCode);
                    if (isAccountVerified()) {
                        status = 'ACCOUNT_STATUS.ACCOUNT_CREATED';
                    }
                    else if (verificationCodeSent) {
                        status = 'ACCOUNT_STATUS.ACTIVATION_EMAIL_SENT';
                    }
                }
                return status;
            }

            // check whether the current locale is en
            function isEnglish() {
                var language = window.localStorage.lang || 'en';
                if (language.substring(0,2) === 'en') {
                    return true;
                }
                return false;
            }

            function isAccountVerified() {
                return (angular.isDefined(vm.verification) && vm.verification.verified);
            }

            function isVerificationCodeSent() {
                return (angular.isDefined(vm.verification)) && ( angular.isDefined(vm.verification.verificationCode));
            }

            function isPatientNotCreated() {
                return angular.isUndefined(vm.patient) || (angular.isUndefined(vm.patient.id));
            }

            function showVerifcationBox() {
                return !isPatientNotCreated();
            }
        }
    }
})();