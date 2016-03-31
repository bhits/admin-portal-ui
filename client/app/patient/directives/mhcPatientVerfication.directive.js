/**
 * Created by Feruz.Abdella on 3/23/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.patient')
        .directive('mhcPatientVerification', mhcPatientVerification);

    /* @ngInject */
    function mhcPatientVerification() {
        var directive =  {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patient/directives/patientVerification.html',
            controllerAs: 'patientVerificationVm',
            bindToController: {verificationinfo: '=',patientdata: '='},
            controller: PatientVerificationController
        };

        return directive;

        /* @ngInject */
        function PatientVerificationController(notificationService,patientService) {
            var vm = this;
            vm.patient = vm.patientdata;
            vm.verification = vm.verificationinfo;
            vm.verificationEmail = setEmail();
            vm.show = showVerifcationBox();
            vm.accountStatus = getStatus();
            vm.sendEmail = sendEmail;
            vm.isAccountAlreadyVerified=isAccountVerified;
            vm.sendEmailButtonText= isVerificationCodeSent()? "Resend Email" : "Send Email";

            function sendEmail() {
                patientService.sendVerificationEmail(vm.patient.id,
                    function success() {
                        notificationService.success('email sent successfully');
                        reloadPage();
                    }, function error() {
                        notificationService.error('Failed to send email, please try again later...');
                    });
            }

            function reloadPage()
            {
                patientService.getVerifcationInfo(vm.patient.id,
                    function success(response) {
                        vm.verification=response;
                        vm.accountStatus = getStatus();
                    }, function error() {
                        notificationService.error('Failed to load verification, please try again later...');
                    });
            }
            function setEmail()
            {
                if (!isPatientNotCreated())
                {
                    return vm.patient.email;
                }
                return '';
            }

            function getStatus()
            {
                var status ='Account Not Yet Activated.';
                if (angular.isDefined(vm.verification)) {
                    var verificationCodeSent = angular.isDefined(vm.verification.verificationCode);
                    if (isAccountVerified()) {
                        status = 'Account Created.';
                    }
                    else if (verificationCodeSent) {
                        status = 'Activation Email Sent.';
                    }
                }
                return status;
            }

            function isAccountVerified()
            {
                var isAccountVerified =(angular.isDefined(vm.verification.verified)&& vm.verification.verified);
                return isAccountVerified;
            }

            function isVerificationCodeSent()
            {
                var verificationCodeSent = (angular.isDefined(vm.verification)) && ( angular.isDefined(vm.verification.verificationCode));
                return verificationCodeSent;
            }
            function isPatientNotCreated()
            {
                var patientNotCreated=angular.isUndefined(vm.patient)|| (angular.isUndefined(vm.patient.id));
                return patientNotCreated;
            }

            function showVerifcationBox()
            {
                return !isPatientNotCreated();
            }
        }
    }
})();









