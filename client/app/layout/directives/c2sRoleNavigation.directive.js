(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('c2sRoleNavigation', c2sRoleNavigation);

    /* @ngInject */
    function c2sRoleNavigation() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/layout/directives/roleNavigation.html',
            controllerAs: 'roleNavigationVm',
            controller: RoleNavigationController
        };
        return directive;

        /* @ngInject */
        function RoleNavigationController(oauthTokenService, securityConstants) {
            var vm = this;
            vm.isAdmin = oauthTokenService.hasScope(securityConstants.adminScope);
            vm.isProvider = oauthTokenService.hasScope(securityConstants.providerScope);
            //vm.isProvider = true;
        }
    }
})();