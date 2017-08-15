/**
 * TCD Software
 * Created by Dmitrij Rysanow on 08.02.17.
 */
/**
 * @ngInject
 * @param {PlayerService} PlayerService
 * @param {*} $state
 * @param {ngPopover} ngPopover
 * @param {!angular.scope} $rootScope
 * @param {!angular.timeout} $timeout
 * @param {angular.constant} PLAYER_GLOBAL_CONTROLS
 * @return {angular.directive}
 */
module.exports = function (PlayerService,
                    $state,
                    ngPopover,
                    $rootScope,
                    $timeout,
                    PLAYER_GLOBAL_CONTROLS) {
        return {
            restrict: 'E',
            templateUrl: 'app/player/templates/player.html',
            link: function(scope) {
                'use strict';
                scope.enabled = false;
                var lockSlider = false;
                scope.playingStatusEnum = PlayerService.PlayingStatusEnum;
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

                scope.openNowPlaying = function() {
                    if (scope.playerStatus.track.mime.indexOf('video') > -1) {
                        scope.currentState = 'app.video';
                        $state.go('app.video');
                    } else {
                        $state.go('app.nowplaying');
                    }
                };

                scope.closeNowPlaying = function() {
                    $rootScope.$broadcast(PLAYER_GLOBAL_CONTROLS.CLOSE_NOW_PLAYING);
                    $timeout(updateCurrentState);
                };

                scope.unlockPositionSlider = function() {
                    lockSlider = true;
                    PlayerService.setPosition(scope.position);
                    scope.$evalAsync(function() {
                        lockSlider = false;
                    }.bind(this));
                };

                scope.closeVolume = function() {
                    $timeout(ngPopover.close, 200);
                };

                scope.fullscreen = function() {
                    $rootScope.$broadcast(PLAYER_GLOBAL_CONTROLS.OPEN_FULLSCREEN);
                };

                scope.$watch('volume', function(newVal) {
                    PlayerService.setVolume(newVal);
                });

                /**
                 * @implements {IAbstractPlayer}
                 * @constructor
                 */
                function PlayerListener() {}
                PlayerListener.prototype.updateStatus = function(status) {
                    scope.playerStatus = status;
                    if (status.track && !lockSlider) {
                        scope.position = status.track.position;
                    }
                };
                PlayerListener.prototype.activate = function() {
                    scope.enabled = true;
                };
                function init() {
                    PlayerService.addListener(PlayerListener);
                }

                init();
            }
        };
    };
