/**
 * TCD Software
 * Created by Dmitrij Rysanow on 18.11.16.
 */
export const APP_EVENTS = {
    REQUEST_CLOSE_LEFTBAR: 'REQUEST_CLOSE_LEFTBAR',
    REQUEST_OPEN_LEFTBAR: 'REQUEST_OPEN_LEFTBAR',
    REQUEST_TOGGLE_LEFTBAR: 'REQUEST_TOGGLE_LEFTBAR',
    REQUEST_MOBILE_LEFTBAR: 'REQUEST_MOBILE_LEFTBAR',
    REQUEST_DEFAULT_LEFTBAR: 'REQUEST_DEFAULT_LEFTBAR',
    REQUEST_CLOSE_INFOBAR: 'REQUEST_CLOSE_INFOBAR',
    REQUEST_OPEN_INFOBAR: 'REQUEST_OPEN_INFOBAR'
};
/**
 * AppController
 *
 * @param {AuthService} AuthService
 * @param {$mdSidenav} $mdSidenav
 * @param {*} $mdToast
 * @param {!angular.scope} $rootScope
 * @param {!angular.scope} $scope
 * @param {Loki} Loki
 * @param {angular.constant} APP_EVENTS
 * @constructor
 * @ngInject
 */
export default function (AuthService,
                         $mdToast,
                         $mdSidenav,
                         $rootScope,
                         $scope,
                         Loki) {
    'use strict';
    var vm = this;
    vm.player = true;
    vm.unlockLeftBar = false;
    vm.torrentInfoEntry = null;
    vm.likesRouteVisibile = false;
    function init() {
        vm.username = AuthService.getSession().username;
        if ($rootScope.offlineMode) {
            $mdToast.show($mdToast.simple().textContent('Offline mode').hideDelay(3000));
        }
        vm.likesRouteVisibile = !!Loki.getLikesDTO().data.length;
    }

    function toggleLeftBar() {
        $mdSidenav('left').toggle();
    }

    function mobileLeftBar() {
        vm.unlockLeftBar = true;
    }

    function defaultLeftBar() {
        vm.unlockLeftBar = false;
    }

    $rootScope.$on(APP_EVENTS.REQUEST_CLOSE_LEFTBAR,
        $mdSidenav('left').close);

    $rootScope.$on(APP_EVENTS.REQUEST_OPEN_LEFTBAR,
        $mdSidenav('left').open);

    $rootScope.$on(APP_EVENTS.REQUEST_TOGGLE_LEFTBAR,
        toggleLeftBar);

    $rootScope.$on(APP_EVENTS.REQUEST_MOBILE_LEFTBAR,
        mobileLeftBar);

    $rootScope.$on(APP_EVENTS.REQUEST_DEFAULT_LEFTBAR,
        defaultLeftBar);

    $rootScope.$on(APP_EVENTS.REQUEST_OPEN_INFOBAR, function (event, entry) {
        vm.torrentInfoEntry = entry;
        $mdSidenav('torrent-info-sidenav').open();
    });

    $rootScope.$on(APP_EVENTS.REQUEST_CLOSE_INFOBAR,
        $mdSidenav('torrent-info-sidenav').close);

    $scope.$watch(
        function() { return $mdSidenav('torrent-info-sidenav').isOpen(); },
        function(newValue, oldValue) {
            if (!newValue) {
                $rootScope.$broadcast('deselect');
            }
        }
    );

    init();

    $scope.$on('refresh', init);
}
