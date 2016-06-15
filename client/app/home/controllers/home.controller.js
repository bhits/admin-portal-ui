/**
 * Created by Feruz.Abdella on 3/21/2016.
 */
(function () {

    'use strict';

    angular
        .module('app.home')
        .controller('HomeController', HomeController);

    /* @ngInject */
    function HomeController(loadedData, brand){
        var vm = this;
        vm.paginationdata = loadedData;
        vm.searchtext='';
        vm.brandName = brand.getBrandName();
    }
})();