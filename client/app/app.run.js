/**
 * Created by tomson.ngassa on 3/8/2016.
 */
/**
 * Created by tomson.ngassa on 3/8/2016.
 */
(function () {

    'use strict';

    angular.module('app')
        .run(appRun);

        /* @ngInject */
        function appRun($rootScope, $state, $anchorScroll, oauthTokenService, oauthConfig) {
            $rootScope.$state = $state;
            $anchorScroll.yOffset = 135;

            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
                
                if(angular.isDefined(toState.data) && angular.isDefined(toState.data.roles)){
                    var roles = toState.data.roles;
                    if(oauthTokenService.canAccess(roles)){
                        console.log("Allow access");
                    }else{
                        console.log("Logging out");
                    }
                    
                }

            });
        }


})();