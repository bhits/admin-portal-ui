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

