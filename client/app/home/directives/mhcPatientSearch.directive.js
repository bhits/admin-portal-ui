/**
 * Created by Feruz.Abdella on 3/17/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.home')
        .directive('mhcPatientSearch', mhcPatientSearch);

    /* @ngInject */
    function mhcPatientSearch() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/home/directives/patientSearch.html',
            controllerAs: 'patientSearchVm',
            bindToController: true,
            controller: 'PatientSearchController'
        };

        return directive;
    }
})();