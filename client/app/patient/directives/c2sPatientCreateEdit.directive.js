(function () {
    'use strict';

    angular
        .module('app.patient')
        .directive('c2sPatientCreateEdit', c2sPatientCreateEdit);

    /* @ngInject */
    function c2sPatientCreateEdit() {
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
        function PatientCreateEditController(patientService, $state, notificationService,utilityService) {
            var vm = this;
            var original = vm.verifyInfo;

            vm.createPatient = createPatient;
            vm.updatePatient = updatePatient;
            vm.cancel=cancel;
            vm.canCreate = canCreate;
            vm.patient = vm.patientdata;
            vm.isEditMode = isEditMode;
            vm.checkDateField = checkDateField;
            activate();

            function activate(){
                patientService.getStates(
                    function(response){
                        vm.states = response;
                    },
                    function(error){
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
                        if(angular.isUndefined(response.data)|| angular.isUndefined(response.data.message) || response.data.message === null){
                            notificationService.error('Error in creating patient.');
                        } else{
                            notificationService.error(response.data.message);
                        }
                    });
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

            function checkDateField(birthdate) {
                vm.fillOutDate = !birthdate.$valid;
            }

            function clearField(patientCreateEditorm) {
                patientCreateEditorm.$setPristine();
                patientCreateEditorm.$setUntouched();
                vm.verifyInfo = angular.copy(original);
                vm.verifyError = false;
            }

            function formatBirthday(dateObj) {
                var year = dateObj.getFullYear();
                var month = utilityService.digitFormat((dateObj.getMonth() + 1), 2);
                var day = utilityService.digitFormat(dateObj.getDate(), 2);
                return year + '/' + month + '/' + day;
            }
        }
    }
})();