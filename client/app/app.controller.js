/**
 * Created by tomson.ngassa on 3/8/2016.
 */
(function () {

    'use strict';

    angular.module('app')
        .controller('AppController', AppController);

        /* @ngInject */
        function AppController($rootScope , utilityService, notificationService, authenticationService, envService, idleConfigParams, $state,  $modal, $modalStack, Idle) {

            var appVm = this;
            appVm.oauth = envService.oauth;
            appVm.oauth.state = authenticationService.getState();

            $rootScope.$on('$stateChangeSuccess',stateChangeSuccess);
            $rootScope.$on('oauth:login',oauthLogin);
            $rootScope.$on('oauth:loggedOut',oauthLoggedOut );
            $rootScope.$on('oauth:expired',oauthExpired);

            appVm.currentDate = utilityService.getYear();
            appVm.closeModals = closeModals;

            /**
             * the user appears to have gone idle
             */
            $rootScope.$on('IdleStart',idleStart);

            /**
             * follows after the IdleStart event, but includes a countdown until the user is considered timed out
             * the countdown arg is the number of seconds remaining until then.
             * you can change the title or display a warning dialog from here.
             * you can let them resume their session by calling Idle.watch()
             */
            $rootScope.$on('IdleWarn', idleWarn );
            /**
             * the user has timed out (meaning idleDuration + timeout has passed without any activity)
             * this is where you'd log them
             */
            $rootScope.$on('IdleTimeout', idleTimeout);
            /**
             * the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
             */
            $rootScope.$on('IdleEnd', idleEnd);
            /**
             * do something to keep the user's session alive
             */
            $rootScope.$on('Keepalive', keepalive);

            appVm.scrollToAndExpand = scrollToAndExpand;
            appVm.togglebar = true;
            appVm.toggleSideBar = toggleSideBar;


            function stateChangeSuccess (event, data) {
                $modalStack.dismissAll('cancel');
            }

            function oauthLogin(event, token) {
                if (authenticationService.isValidState(token.state)) {
                    Idle.watch();
                    $state.go('fe.index.home');
                } else {
                    notificationService.error('Invalid UAA token.');
                    $rootScope.$broadcast('oauth:expired');
                }
            }

            function oauthLoggedOut(event) {
                handleLoggedOutAndExpiredSession(event);
            }

            function oauthExpired (event) {
                handleLoggedOutAndExpiredSession(event);
            }

            function handleLoggedOutAndExpiredSession(event) {
                Idle.unwatch();
                $state.go('fe.login');
            }

            function closeModals() {
                if (appVm.warning) {
                    appVm.warning.close();
                    appVm.warning = null;
                }
            }

            function idleStart() {
                appVm.closeModals();
                appVm.warning = $modal.open({
                    templateUrl: 'app/warning-dialog.html'
                });
            }

            function idleWarn (e, countdown) {
                console.log("IdleWarn...");
            }

            function idleTimeout() {
                console.log("IdleTimeout...");
                console.log("-------> Session expired at: " + new Date());
                appVm.closeModals();
            }

            function idleEnd() {
                //console.log("IdleEnd...");
                appVm.closeModals();
            }

            function keepalive() {

                console.log("Keepalive...");
                var today = new Date();
                var now = today.getTime();

                //console.log("Now: " + now + ", last activity: " + Idle.getlastActiveTime());
                var offset = now - Idle.getlastActiveTime();

                //console.log("Offset: " + offset + ", KeepAlive Time: " +(idleConfigParams.keepalive * 1000) );

                console.log("-------> Current Time:" + today.getHours() + " : " + today.getMinutes() + " : " + today.getSeconds());

                if (!Number.isNaN(offset) && (offset <= (idleConfigParams.keepalive * 1000))) {

                    // Get Refresh token
                    console.log("Refreshing token... ");

                    ////Slide session
                    Idle.slideSession();

                    var dialogTime = (now + (idleConfigParams.idle * 1000));

                    console.log("-------> Time dialog will show at: " + new Date(dialogTime));

                    console.log("-------> Session will Expires at: " + new Date(now + (idleConfigParams.idle * 1000) + (idleConfigParams.timeout * 1000)));
                } else {
                    console.log("The was no activity.");
                }
            }


            function scrollToAndExpand(target, expand) {
                $rootScope.$broadcast('ScrollTo', {to: target});
            }

            function toggleSideBar() {
                appVm.togglebar = !appVm.togglebar;
            }
        }
})();