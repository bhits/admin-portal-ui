/**
 * Created by jiahao.li on 6/8/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.security')
        .constant('securityConstants',
            {
                adminHomePath: 'fe.index.home',
                providerHomePath: 'fe.patientMedicalDocument.search',
                accessScope: 'adminUI.access',
                adminScope: 'uaa.admin',
                providerScope: 'pep.patient_read',
                /**
                 * The message that is from uaa is used for distinguishing between account locked and authentication error
                 * Note: This value need to be updated if uaa changes the error message
                 */
                accountLockedErrorMessage: "Your account has been locked because of too many failed attempts to login."
            }
        );
})();
