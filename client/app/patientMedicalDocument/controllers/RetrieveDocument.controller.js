/**
 * Created by jiahao.li on 6/29/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.patientMedicalDocument')
        .controller('RetrieveDocumentController', RetrieveDocumentController);

    function RetrieveDocumentController() {
        var vm = this;
        vm.title = "Review Patient Documents";
    }
})();