/**
 * Created by jiahao.li on 7/15/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.core')
        .filter('trimBeforeCharacter', trimBeforeCharacter);

    /* @ngInject */
    function trimBeforeCharacter() {
        return trim;

        function trim(name, regex) {
            return name.split(regex).pop();
        }
    }
})();

