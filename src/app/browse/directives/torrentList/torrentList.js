/**
 * Created by tcd on 15.08.17.
 */
/**
 *
 * @param $rootScope
 * @returns {{restrict: string, scope: {items: string}, templateUrl: string, link: link}}
 * @ngInject
 */
export default function ($rootScope) {
    return {
        restrict: 'E',
        scope: {
            items: '='
        },
        templateUrl: 'app/browse/directives/torrentList/torrentList.html',
        link: function(scope) {
            /**
             * Sidebar for displaying torrent info
             * @type {string}
             * @const
             */

            var OPEN_SIDENAV_EVENT = 'REQUEST_OPEN_INFOBAR';
            var CLOSE_SIDENAV_EVENT = 'REQUEST_CLOSE_INFOBAR';

            scope.infoSidenav = null;
            scope.selectedItem = null;

            scope.openInfo = function(entry) {
                scope.selectedItem = entry;
                $rootScope.$broadcast(OPEN_SIDENAV_EVENT, entry);
            };

            scope.$on('deselect', function () {
                scope.selectedItem = null;
            });

            scope.isOpenRight = function(){
                return $mdSidenav(TORRENT_INFO_SIDEBAR_ID).isOpen()
            };
        }
    }
};
