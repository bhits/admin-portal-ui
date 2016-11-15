/**
 * Created by Jiahao.Li on 11/12/2016.
 */
(function () {
    'use strict';
    var bootstrapApp = angular.module('bootstrapApp', ['app']);

    function getAppConfig() {
        var initInjector = angular.injector(['ng']);
        var _http = initInjector.get('$http');

        return _http.get('/admin-ui/config').then(function (response) {
            bootstrapApp.constant('configConstants', response.data);
        }, function (errorResponse) {
            bootstrapApp.constant('configConstants', null);
            angular.element(document.body).addClass('load-config-error');
        });
    }

    getAppConfig().then(function () {
        // manually initializing Angular
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['bootstrapApp']);
        });
    });
})();