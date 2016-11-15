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
        vm.brandLargeLogo = specifyImageType(configService.getBrandLargeLogo());

        function specifyImageType(base64Image) {
            return "data:image/png;base64," + base64Image;
        }
    }
})();