/**
 * Created by jiahao.li on 6/29/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.patientData')
        .config(PatientDataConfig);

    /* @ngInject */
    function PatientDataConfig($stateProvider){

        $stateProvider
            .state('fe.patientData', {
                abstract: true,
                url: '/patientData',
                data: {pageTitle: 'Patient Data'},
                templateUrl: 'app/layout/content.html'
            })
            .state('fe.patientData.search', {
                url: '/search',
                data: {pageTitle: 'Patient Data Search'},
                templateUrl: 'app/patientData/controllers/patientDataSearch.html',
                controller: 'PatientDataController',
                controllerAs: 'patientDataVm'
            });
    }
})();