/**
 * Created by jiahao.li on 6/8/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.security')
        .constant('oauthConfig',
            {
                loginSuccessPath: 'fe.index.home',
                accessScope: 'adminUI.access'
            }
        );
})();
