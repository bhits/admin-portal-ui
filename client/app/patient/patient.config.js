

(function () {

    'use strict';

    angular
        .module('app.patient')
            .config(homeConfig);

            /* @ngInject */
            function homeConfig($stateProvider){

                $stateProvider
                    .state('fe.patient', {
                        abstract: true,
                        url: '/patient',
                        data: { pageTitle: 'Patient' },
                        templateUrl: 'app/layout/content.html'
                    })
                    .state('fe.patient.create', {
                        url: '/create',
                        templateUrl: 'app/patient/controllers/patientCreateEdit.html',
                        data: { pageTitle: 'Patient Create' },
                        Controller: 'PatientCreateEditController',
                        controllerAs: 'patientCreateEditVm'
                    })
                    .state('fe.patient.edit', {
                            url: '/Edit',
                            templateUrl: 'app/patient/controllers/patientCreateEdit.html',
                            data: { pageTitle: 'Edit Patient'},
                            Controller: 'PatientCreateEditController',
                            controllerAs: 'patientCreateEditVm',
                            //resolve:{
                            //    contenttitle: 'Edit Account'
                            //}
                    });
            }
})();