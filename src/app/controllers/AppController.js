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
 * @param {!angular.scope} $rootScope
 * @param {$mdSidenav} $mdSidenav
 * @param {*} $mdToast
 * @constructor
 * @ngInject
 */
export default function (AuthService,
                           $mdToast,
                           $mdSidenav,
                           $rootScope) {
    'use strict';
    var vm = this;
    vm.player = true;
    vm.unlockLeftBar = false;

    function init() {
        vm.username = AuthService.getSession().username;
        if ($rootScope.offlineMode) {
            $mdToast.show($mdToast.simple().textContent('Offline mode').hideDelay(3000));
        }
    }

    function openLeftBar() {
        $mdSidenav('left').open();
    }

    function closeLeftBar() {
        $mdSidenav('left').close();
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

    init();
}
