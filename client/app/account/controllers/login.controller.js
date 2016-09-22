
'use strict';

(function () {

    angular
        .module("app.security")
            .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(envService, brand) {
        var vm = this;
        vm.version = envService.version;
        vm.brandName = brand.getBrandName();
        vm.altLogoText = brand.getBrandInitials() + " Logo";
    }
})();