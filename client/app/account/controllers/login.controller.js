'use strict';

(function () {

    angular
        .module("app.security")
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(envService, configService) {
        var vm = this;
        vm.version = envService.version;
        vm.brandName = configService.getBrandName();
        vm.altLogoText = configService.getBrandInitials() + " Logo";
    }
})();