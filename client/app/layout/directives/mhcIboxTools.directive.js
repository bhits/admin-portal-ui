(function () {
    'use strict';

    angular
        .module('app.layout')
            .directive('mhcIboxTools', mhcIboxTools);

            /* @ngInject */
            function mhcIboxTools() {
                var directive = {
                    restrict: 'A',
                    scope: {},
                    bindToController: {
                        total: '@',
                        ppCollapsed: '=?',
                        ppChevronPreventDefault: '=?'
                    },
                    templateUrl: 'app/layout/directives/iBoxTools.html',
                    controller: IboxToolController,
                    controllerAs: 'iboxToolVm'

                };

                return directive;
            }

            /* @ngInject */
            function IboxToolController($scope, $element, $timeout) {
                var iboxToolVm = this;
                iboxToolVm.ppChevronPreventDefault = !!iboxToolVm.ppChevronPreventDefault;
                var ibox = $element.closest('div.ibox');
                var icon = $element.find('i:first');
                var content = ibox.find('div.ibox-content');
                iboxToolVm.toggleCollapsed = toggleCollapsed;

                $scope.$watch('iboxToolVm.ppCollapsed',collapseWatchHandler);

                activate();

                function activate(){
                    if (iboxToolVm.ppCollapsed) {
                        content.slideUp(0);
                    }
                }

                function toggleCollapsed() {
                    if (!iboxToolVm.ppChevronPreventDefault) {
                        iboxToolVm.ppCollapsed = !iboxToolVm.ppCollapsed;
                    }
                }


                function collapseWatchHandler (newValue, oldValue) {
                    if (newValue !== oldValue) {
                        showhide();
                    }
                }

                function showhide() {
                    content.slideToggle(200);
                    // Toggle icon from up to down
                    icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                    resize();
                }

                function resize(){
                    $timeout(function () {
                        ibox.resize();
                        ibox.find('[id^=map-]').resize();
                    }, 50);
                }
            }
})();