(function () {
    'use strict';

    angular
        .module('app.patient')
        .config(patientConfig);

    /* @ngInject */
    function patientConfig($stateProvider) {
        $stateProvider
            .state('fe.patient', {
                abstract: true,
                url: '/patient',
                data: {pageTitle: 'Patient'},
                templateUrl: 'app/layout/content.html'
            })
            .state('fe.patient.create', {
                url: '/create',
                templateUrl: 'app/patient/controllers/patientCreateEdit.html',
                data: {
                    pageTitle: 'Create Patient',
                    roles: ['ADMIN']
                },
                controller: 'PatientCreateController',
                controllerAs: 'patientVm'
            })
            .state('fe.patient.edit', {
                url: '/Edit',
                templateUrl: 'app/patient/controllers/patientCreateEdit.html',
                data: {
                    pageTitle: 'Edit Patient',
                    roles: ['ADMIN']
                },
                controller: 'PatientEditController',
                controllerAs: 'patientVm',
                params: {
                    patientId: ''
                },
                resolve: {
                    /* @ngInject */
                    patientData: function ($q, $stateParams, patientService, notificationService) {
                        function success(response) {
                            return response;
                        }

                        function error(response) {
                            notificationService.error('Failed to get the patient, please try again later...');
                            return response;
                        }

                        var deferred = $q.defer();
                        var patientId = $stateParams.patientId;
                        var patientPromise = patientService.getPatient(patientId, success, error).$promise;

                        $q.all([patientPromise]).then(function (response) {
                            deferred.resolve(response);
                        });
                        return deferred.promise;
                    }
                }
            });
    }
})();