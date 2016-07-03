/**
 * Created by jiahao.li on 6/29/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.patientMedicalDocument')
        .controller('RetrieveDocumentController', RetrieveDocumentController);

    /* @ngInject */
    function RetrieveDocumentController(){
        var vm = this;
        vm.title = "Review Patient Documents";
    }
})();
