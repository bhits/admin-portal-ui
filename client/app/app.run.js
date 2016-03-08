/**
 * Created by tomson.ngassa on 3/8/2016.
 */
/**
 * Created by tomson.ngassa on 3/8/2016.
 */
(function () {

    'use strict';

    angular.module('app')
        .run(appRun);

        /* @ngInject */
        function appRun($rootScope, $state, $anchorScroll) {
            $rootScope.$state = $state;
            $anchorScroll.yOffset = 135;
        }
})();