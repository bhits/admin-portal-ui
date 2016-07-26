/**
 * Created by Jiahao.Li on 7/18/2016.
 */

(function () {

    'use strict';

    angular
        .module("app.error")
        .controller('UncaughtController', UncaughtController);

    /* @ngInject */
    function UncaughtController() {
        var vm = this;
        vm.title = "Uncaught Exception";
    }
})();