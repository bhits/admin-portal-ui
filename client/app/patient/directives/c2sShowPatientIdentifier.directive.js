/**
 * Created by jiahao.li on 7/20/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.patient')
        .directive('c2sShowPatientIdentifier', c2sShowPatientIdentifier);

    function c2sShowPatientIdentifier() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/patient/directives/patientIdentifier.html',
            bindToController: {
                patientdata: '='
            },
            controllerAs: 'patientIdentifierVm',
            controller: PatientIdentifierController
        };
        return directive;

        /* @ngInject */
        function PatientIdentifierController(patientService, notificationService) {
            var vm = this;
            getPatientIdentifier();

            function getPatientIdentifier() {
                var patientId = vm.patientdata.id;
                if (angular.isDefined(patientId)) {
                    patientService.getPatientIdentifier(patientId, success, error);
                }
            }

            function success(response) {
                vm.patientIdentifier = response.patientIdentifier;
            }

            function error(response) {
                notificationService.error("Error in getting patient identifier.");
            }
        }
    }
})();