

(function () {

    'use strict';

    angular
        .module('app.home')
            .config(homeConfig);

            /* @ngInject */
            function homeConfig($stateProvider){

                $stateProvider
                    .state('fe', {
                        abstract: true,
                        data: { pageTitle: 'MHC Portal' },
                        url: '/fe',
                        template: '<ui-view/>'
                    })
                    .state('fe.index', {
                        abstract: true,
                        url: '/index',
                        data: { pageTitle: 'Home' },
                        templateUrl: 'app/layout/content.html'
                    })
                    .state('fe.index.home', {
                        url: '/home',
                        data: {
                            pageTitle: 'Home',
                            roles: ['ADMIN']
                        },
                        templateUrl: 'app/home/controllers/home.html',
                        controller: 'HomeController',
                        controllerAs: 'homeVm',
                        resolve: {
                            /* @ngInject */
                            loadedData: function ($q, patientService, notificationService) {
                                function success(response) {
                                    return response;
                                }

                                function error(response) {
                                    notificationService.error('Failed to get the patient list, please try again later...');
                                    return response;
                                }
                                var pageNumber = 1;
                                var deferred = $q.defer();
                                var listPatientPromise = patientService.getPatients(pageNumber, success, error).$promise;
                                listPatientPromise.then(
                                    function (onFulfilled) {
                                        deferred.resolve(onFulfilled);
                                    },
                                    function (onRejected) {
                                        deferred.resolve(onRejected);
                                    }
                                );

                                return deferred.promise;
                            }
                        }
                    });
            }

})();