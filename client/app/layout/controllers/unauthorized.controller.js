/**
 * Created by Jiahao.Li on 7/15/2016.
 */

(function () {

    'use strict';

    angular
        .module("app.layout")
        .controller('UnauthorizedController', UnauthorizedController);

    /* @ngInject */
    function UnauthorizedController() {
        var vm = this;
        vm.title = "Unauthorized Page Access";
    }
})();