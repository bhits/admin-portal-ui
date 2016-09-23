/**
 * Created by Jiahao.Li on 7/18/2016.
 */

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