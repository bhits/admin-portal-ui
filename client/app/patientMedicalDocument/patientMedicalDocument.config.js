/**
 * Created by jiahao.li on 6/29/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.patientMedicalDocument')
        .config(PatientMedicalDocumentConfig);

    /* @ngInject */
    function PatientMedicalDocumentConfig($stateProvider){

        $stateProvider
            .state('fe.patientMedicalDocument', {
                abstract: true,
                url: '/patientMedicalDocument',
                data: {pageTitle: 'Patient Medical Document'},
                templateUrl: 'app/layout/content.html'
            })
            .state('fe.patientMedicalDocument.search', {
                url: '/search',
                data: {pageTitle: 'Patient Medical Document Search'},
                templateUrl: 'app/patientMedicalDocument/controllers/patientMedicalDocumentSearch.html',
                controller: 'PatientMedicalDocumentController',
                controllerAs: 'medicalDocumentVm'
            });
    }
})();