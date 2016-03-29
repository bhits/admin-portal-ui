/**
 * Created by sagar.gandhi on 3/18/2016.
 */
(function () {
    'use strict';

    angular
        .module('app.security')
        .directive('mhcOauthLogin', mhcOauthLogin);

    function mhcOauthLogin() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/account/directives/oauthLogin.html',
            scope: {},
            bindToController: {},
            controller: OauthLoginController,
            controllerAs: 'oauthLoginVm'
        };

        return directive;

        /* @ngInject */
        function OauthLoginController(utilityService, authenticationService, $state, profileService, oauthTokenService) {
            var vm = this;
            vm.login = login;
            vm.canSubmit = canSubmit;

            function login() {
                authenticationService.login(vm.user.email, vm.user.password)
                    .then(
                        function (response) {
                            oauthTokenService.setToken(response);
                            profileService.loadProfile()
                                .then(
                                    function (data) {
                                        profileService.setProfile(data);
                                        $state.go("fe.index.home");
                                    },
                                    function (error) {
                                        vm.profileError = true;
                                    }
                                );
                        }, function (error) {
                            oauthTokenService.removeToken();
                            vm.loginError = true;
                        }
                    );
            }

            function canSubmit(loginForm) {
                return loginForm.$dirty && loginForm.$valid;
            }
        }
    }
})();