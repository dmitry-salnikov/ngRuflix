/**
 * TCD Software
 * Created by Dmitrij Rysanow on 17.02.17.
 */

import {PLAYER_GLOBAL_CONTROLS} from '../services/PlayerService';
/**
 *
 * @param {PlayerService} PlayerService
 * @param {{Name: string, Params: Array, URL: string}} PreviousState
 * @param {$state} $state
 * @param {!angular.scope} $rootScope
 * @constructor
 * @ngInject
 */
module.exports = function (PlayerService,
                           PreviousState,
                           $state,
                           $rootScope) {
    var vm = this;
    'use strict';
    function init() {
        vm.list = PlayerService.getPlaylist();
        PlayerService.addListener(PlayerListener);
    }

    /**
     * @implements {IAbstractPlayer}
     * @constructor
     */
    function PlayerListener() {
    }

    PlayerListener.prototype.updateStatus = function (status) {
        vm.playerStatus = status;
    };
    PlayerListener.prototype.activate = function () {

    };

    vm.back = function () {
        $state.go(PreviousState.Name, PreviousState.Params);
    };
    $rootScope.$on(PLAYER_GLOBAL_CONTROLS.CLOSE_NOW_PLAYING, vm.back);

    vm.playTrack = PlayerService.jumpToTrackOnPlaylist;
    init();
};
