(function () {
    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController(loadedData, configService) {
        var vm = this;
        vm.paginationdata = loadedData;
        vm.searchtext = '';
        vm.brandName = configService.getBrandName();
    }
})();