

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
                        templateUrl: 'app/patient/controllers/patientCreate.html',
                        data: { pageTitle: 'Patient Create' }
                    });
            }
})();