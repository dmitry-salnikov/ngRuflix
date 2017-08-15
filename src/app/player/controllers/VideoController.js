/**
 * Created by tcd on 04.03.17.
 */

'use strict';

/**
 *
 * @ngInject
 * @export
 * @constructor
 */
module.exports = function (PlayerService,
                                          $scope,
                                          APP_EVENTS,
                                          PreviousState,
                                          $state,
                                          $rootScope,
                                          PLAYER_GLOBAL_CONTROLS) {
    var vm = this;
    var element = document.getElementById('video');
    vm.playerStatus = {};
    vm.toggleSidenav = toggleSidenav;
    vm.back = back;
    vm.fullscreen = fullscreen;

    $scope.$emit(APP_EVENTS.REQUEST_MOBILE_LEFTBAR);
    $scope.$emit(APP_EVENTS.REQUEST_CLOSE_LEFTBAR);
    $rootScope.$on(PLAYER_GLOBAL_CONTROLS.CLOSE_NOW_PLAYING, back);
    $rootScope.$on(PLAYER_GLOBAL_CONTROLS.OPEN_FULLSCREEN, fullscreen);
    PlayerService.bindVideo(element);


    function back() {
        $scope.$emit(APP_EVENTS.REQUEST_DEFAULT_LEFTBAR);
        PlayerService.pause();
        $state.go(PreviousState.Name, PreviousState.Params);
    }

    function toggleSidenav() {
        $scope.$emit(APP_EVENTS.REQUEST_TOGGLE_LEFTBAR);
    }

    function fullscreen() {
        if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
};
