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
            bindToController: {
                brand: "="
            },
            controller: OauthLoginController,
            controllerAs: 'oauthLoginVm'
        };

        return directive;

        /* @ngInject */
        function OauthLoginController(authenticationService, $state, profileService, oauthTokenService, securityConstants) {
            var vm = this;
            vm.login = login;
            vm.canSubmit = canSubmit;

            function prepareLoginInfo() {
                return {
                    username: vm.user.email,
                    password: vm.user.password
                };
            }

            function loginSuccess(response) {
                oauthTokenService.setToken(response);
                profileService.loadProfile()
                    .then(
                        function (data) {
                            profileService.setProfile(data);
                            isAllowAccess();
                        },
                        function (error) {
                            vm.profileError = true;
                        }
                    );
            }

            function loginError(error) {
                oauthTokenService.removeToken();
                vm.loginError = true;
            }

            function login() {
                authenticationService.login(prepareLoginInfo(), loginSuccess, loginError);
            }

            function canSubmit(loginForm) {
                return loginForm.$dirty && loginForm.$valid;
            }

            function isAllowAccess() {
                if (oauthTokenService.hasScope(securityConstants.accessScope)) {
                    if (oauthTokenService.hasScope(securityConstants.adminScope)) {
                        $state.go(securityConstants.adminHomePath);
                    } else if (oauthTokenService.hasScope(securityConstants.providerScope)) {
                        $state.go(securityConstants.providerHomePath);
                    }
                } else {
                    oauthTokenService.removeToken();
                    vm.scopeError = true;
                }
            }
        }
    }
})();