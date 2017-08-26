/**
 * Created by tcd on 04.03.17.
 */

import PLAYER_GLOBAL_CONTROLS from '../services/PlayerService';
import APP_EVENTS from '../../controllers/AppController';

/**
 *
 * @ngInject
 * @export
 * @constructor
 */
export default function (PlayerService,
                                          $scope,
                                          PreviousState,
                                          $state,
                                          $rootScope) {
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
