(function () {

    'use strict';

    angular.module('app')
        .run(appRun);

    /* @ngInject */
    function appRun($rootScope, $state, $anchorScroll, authorizationService, errorService) {
        $rootScope.$state = $state;
        $anchorScroll.yOffset = 135;

        $rootScope.$on('$stateChangeStart', function (e, toState) {

            if (angular.isDefined(toState.data) && angular.isDefined(toState.data.roles)) {
                var roles = toState.data.roles;
                if (!authorizationService.canAccess(roles)) {
                    errorService.unauthorizedAccess();
                }
            }
        });
    }
})();