/**
 * Created by Feruz.Abdella on 3/17/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.home')
        .directive('mhcPatientList', mhcPatientList);

    /* @ngInject */
    function mhcPatientList() {
        var directive =  {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/home/directives/patientList.html',
            bindToController: {
                patientsdata: '='
            },
            controller: PatientListController,
            controllerAs: 'patientListVm'
        };

        return directive;

        /* @ngInject */
        function PatientListController(patientService, notificationService) {
            var vm = this;

            var oldPage = vm.patientsdata.currentPage;
            vm.patientList = vm.patientsdata.patientList;


            vm.pagination = {
                totalItems: vm.patientsdata.totalItems,
                currentPage: oldPage,
                itemsPerPage: vm.patientsdata.itemsPerPage,
                maxSize: 10
            };
            vm.loadPage = loadPage;

            function loadPage() {
                var newPage = vm.pagination.currentPage;
                vm.pagination.currentPage = oldPage;
                patientService.getPatients(newPage,success, error);
            }

            function success(response) {
                oldPage = response.currentPage;
                updatePagination(response);
                vm.patientList = response.patientList;
            }

            function error(response) {
               notificationService.error('Failed to get the patient list, please try again later...');
            }


            function updatePagination(response) {
                vm.pagination.totalItems = response.totalItems;
                vm.pagination.currentPage = response.currentPage;
                vm.pagination.itemsPerPage = response.itemsPerPage;
            }
        }
    }
})();


