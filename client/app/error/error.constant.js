/**
 * Created by jiahao.li on 6/8/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.error')
        .constant('errorConstants',
            {
                unauthorizedAccessErrorPath: 'fe/error/dataAccessFailure'
            }
        );
})();
