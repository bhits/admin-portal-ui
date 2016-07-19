/**
 * Created by jiahao.li on 7/18/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.error')
        .config(ErrorConfig);

    /* @ngInject */
    function ErrorConfig($stateProvider) {

        $stateProvider
            .state('fe.error', {
                abstract: true,
                url: '/error',
                data: {pageTitle: 'Admin Portal Error'},
                templateUrl: 'app/layout/content.html'
            })
            .state('fe.error.dataAccessFailure', {
                url: "/dataAccessFailure",
                data: {pageTitle: 'Unauthorized Page Access'},
                templateUrl: "app/error/controllers/dataAccessFailure.html",
                controller: 'UnauthorizedController',
                controllerAs: 'unauthorizedVm'
            });
    }
})();