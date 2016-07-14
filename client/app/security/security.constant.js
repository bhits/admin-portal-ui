/**
 * Created by jiahao.li on 6/8/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.security')
        .constant('oauthConfig',
            {
                adminHomePath: 'fe.index.home',
                providerHomePath: 'fe.patientMedicalDocument.search',
                accessScope: 'adminUI.access',
                adminScope: 'uaa.admin',
                providerScope: 'pep.patient_read'
            }
        );
})();
