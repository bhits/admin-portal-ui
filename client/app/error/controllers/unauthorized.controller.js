(function () {
    'use strict';

    angular
        .module("app.error")
        .controller('UnauthorizedController', UnauthorizedController);

    function UnauthorizedController() {
        var vm = this;
        vm.title = "Unauthorized Page Access";
    }
})();