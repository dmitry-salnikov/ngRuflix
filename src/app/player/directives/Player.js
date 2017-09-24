/**
 * TCD Software
 * Created by Dmitrij Rysanow on 08.02.17.
 */
import {PLAYER_GLOBAL_CONTROLS} from "../services/PlayerService";

/**
 * @ngInject
 * @param {PlayerService} PlayerService
 * @param {*} $state
 * @param {!angular.scope} $rootScope
 * @param {!angular.timeout} $timeout
 * @return {angular.directive}
 */
export default function (PlayerService,
                         $state,
                         $rootScope,
                         $timeout,
                         PLAYING_STATUS,
                         $mdToast) {
    return {
        restrict: 'E',
        templateUrl: 'app/player/templates/player.html',
        link: function (scope) {
            'use strict';
            scope.enabled = false;
            /**
             * watcher for time slider
             * @type {null}
             */
            let watcher = null;
            scope.playingStatusEnum = PLAYING_STATUS;
            scope.playerStatus = {
                track: {
                    name: '',
                    length: 0
                }
            };

            scope.play = PlayerService.unpause;
            scope.pause = PlayerService.pause;
            scope.next = PlayerService.nextTrack;
            scope.prev = PlayerService.prevTrack;
            scope.volume = 100;
            scope.position = 0;
            scope.video = null;
            updateCurrentState();

            function updateCurrentState() {
                scope.currentState = $state.current.name;
            }

            scope.openNowPlaying = function () {
                if (scope.playerStatus.getCurrentTrack().mime.indexOf('video') > -1) {
                    $state.go('app.video');
                    scope.currentState = 'app.video';
                } else {
                    $state.go('app.nowplaying');
                    scope.currentState = 'app.nowplaying';
                }
            };

            scope.closeNowPlaying = function () {
                $rootScope.$broadcast(PLAYER_GLOBAL_CONTROLS.CLOSE_NOW_PLAYING);
                $timeout(updateCurrentState);
            };

            scope.volumeSliderController = function ($scope) {
                $scope.$watch('volume', (newVal) => PlayerService.setVolume(newVal))
            };

            scope.fullscreen = function () {
                $rootScope.$broadcast(PLAYER_GLOBAL_CONTROLS.OPEN_FULLSCREEN);
            };

            function setPosWatcher() {
                watcher = scope.$watch('position', (newVal, oldVal) => {
                    if (newVal && oldVal) {
                        PlayerService.setPosition(newVal)
                    }
                });
            }

            function unsetPosWatcher() {
                if (angular.isFunction(watcher)) watcher();
            }

            /**
             * @implements {IAbstractPlayer}
             * @constructor
             */
            function PlayerListener() {
            }

            PlayerListener.prototype.updateStatus = function (status) {
                unsetPosWatcher();
                if (status.getCurrentTrack()) {
                    scope.position = status.position;
                    setPosWatcher();
                }
            };
            PlayerListener.prototype.activate = function () {
                scope.enabled = true;
            };
            PlayerListener.prototype.deactivate = function () {
                scope.enabled = false;
            };
            PlayerListener.prototype.requestVideo = function () {
                $state.go('app.video');
                scope.currentState = 'app.video';
            };
            PlayerListener.prototype.requestAudio = function () {
                updateCurrentState();
            };
            PlayerListener.prototype.error = function (message) {
                console.log("error ", message);
                $mdToast.show($mdToast.simple().textContent("Could not play this file"));
            };
            function init() {
                PlayerService.addListener(PlayerListener);
            }

            init();
        }
    };

}
