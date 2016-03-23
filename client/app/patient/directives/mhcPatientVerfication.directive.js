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
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patient/directives/patientVerification.html',
            //bindToController: true,
            //controller: 'PatientVerificationController',
            //controllerAs: 'patientVerificationVm'
        };

        return directive;
    }
})();