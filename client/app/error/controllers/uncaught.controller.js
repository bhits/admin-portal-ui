(function () {
    'use strict';

    angular
        .module("app.error")
        .controller('UncaughtController', UncaughtController);

    function UncaughtController() {
        var vm = this;
        vm.title = "Uncaught Exception";
    }
})();