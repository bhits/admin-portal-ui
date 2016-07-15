/**
 * Created by tomson.ngassa on 12/14/2015.
 */

(function () {

    'use strict';

    angular
        .module('app.layout')
        .config(LayoutConfig);

    /* @ngInject */
    function LayoutConfig($stateProvider) {

        $stateProvider
            .state('fe.dataAccessFailure', {
                url: "/dataAccessFailure",
                data: {pageTitle: 'Unauthorized Page Access'},
                templateUrl: "app/layout/dataAccessFailure.html"
            });
    }
})();