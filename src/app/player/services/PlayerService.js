/**
 * TCD Software
 * Created by Dmitrij Rysanow on 08.02.17.
 */
/**
 *
 * @param {TorrentAPI} TorrentAPI
 * @param {!angular.interval} $interval
 * @param {IAbstractPlayerListener} IAbstractPlayerListener
 * @param {$state} $state
 * @return {angular.factory}
 * @export
 * @constructor
 */
module.exports = function (TorrentAPI,
                           $interval,
                           IAbstractPlayerListener,
                           $state,
    AuthService) {
        'use strict';
        /**
         * Interval for calling updateStatus event (See IAbstractPlayerListener)
         * @const
         * @type {number}
         */
        var UPDATE_INTERVAL = 500;
        /**
         *
         * @type {Array<IAbstractPlayerListener>}
         */
        var playerListeners = [];

        /**
         *
         * @type {Array}
         */
        var playlist = [];
        var currentTrack = 0;
        var media = new Audio();
        setPlayerEvents();
        var interval = null;

        var PlayingStatusEnum = {
            PLAYING: 1,
            PAUSED: 0,
            BUFFERING: -1
        };

        var playerStatus = {
            playingStatus: PlayingStatusEnum.PAUSED,
            track: null
        };

        /**
         * Filters file list to media files and ads to playlist
         *
         * @param {FileLink} files
         * @return {void}
         */
        function addToPlaylist(files) {
            var mediaFiles = _.reject(files, function(file) {
                if (file.mime.indexOf('mpegurl') === -1 &&
                    file.mime.indexOf('audio') > -1) {
                    //it's audio file
                    return false;
                } else if (file.mime.indexOf('video') > -1) {
                    //it's video file
                    return false;
                }
                return true;
            });
            console.log('added media files', mediaFiles);
            playlist = playlist.concat(mediaFiles);
        }

        function pause() {
            media.pause();
            playerStatus.playingStatus = PlayingStatusEnum.PAUSED;
        }

        function unpause() {
            media.play();
            playerStatus.playingStatus = PlayingStatusEnum.PLAYING;
        }

        function bindVideo(element) {
            media = element;
            play();
        }

        function play() {
            if ($state.current.name !== 'app.video' &&
                playlist[currentTrack].mime.indexOf('video') > -1) {
                //it's video file
                $state.go('app.video');
                return;
            }
            console.log('playlist', playlist);
            media.src = playlist[currentTrack].link;
            media.play();
            playerStatus.playingStatus = PlayingStatusEnum.PLAYING;
            setPlayerEvents();

            console.log('Playing', playlist[currentTrack].name);
        }

        function changeStream() {
            if (media && !media.paused) {
                media.pause();
            }
            media = new Audio();
            currentTrack = 0;
            playlist = [];
        }

        function getPlaylist() {
            return playlist;
        }

        function setPlayerEvents() {
            media.addEventListener('ended', ended);
        }

        function ended() {
            if (media.duration === media.currentTime) {
                nextTrack();
            }
        }

        function nextTrack() {
            if (playerStatus.playingStatus === PlayingStatusEnum.PLAYING && currentTrack < playlist.length - 1) {
                media.pause();
                currentTrack++;
                media.src = playlist[currentTrack].link;
                console.log('Playing', playlist[currentTrack].name);
                media.play();
            } else if (playerStatus.playingStatus === PlayingStatusEnum.PAUSED && currentTrack < playlist.length - 1) {
                currentTrack++;
            }
        }

        function prevTrack() {
            if (playerStatus.playingStatus === PlayingStatusEnum.PLAYING && currentTrack > 0) {
                media.pause();
                currentTrack--;
                media.src = playlist[currentTrack].link;
                console.log('Playing', playlist[currentTrack].name);
                media.play();
            } else if (playerStatus.playingStatus === PlayingStatusEnum.PAUSED &&
                currentTrack >= 1) {
                currentTrack--;
            }
        }

        /**
         *
         * @param {number} index
         */
        function jumpToTrackOnPlaylist(index) {
            currentTrack = index;
            media.src = playlist[currentTrack].link;
            console.log('Playing', playlist[currentTrack].name);
            media.play();
            playerStatus.playingStatus = PlayingStatusEnum.PLAYING;
        }

        function onTorrent(torrentResult) {
            console.log('onTorrent', torrentResult);
            var files = torrentResult.data.files,
                stream = torrentResult.data.stream;
            onStreamReady(files, stream);
        }

        /**
         *
         * @return {{playingStatus: number, track: *}}
         * @constructor
         */
        function StatusObj() {
            //determine playing status, track position
            if (playerStatus.playingStatus === PlayingStatusEnum.PLAYING) {
                if (playlist[currentTrack]) {
                    playerStatus.track = {
                        name: playlist[currentTrack].name,
                        length: media.duration,
                        position: media.currentTime,
                        trackIndex: currentTrack,
                        mime: playlist[currentTrack].mime
                    };
                } else {
                    playerStatus.playingStatus = PlayingStatusEnum.BUFFERING;
                }
            }
            return playerStatus;
        }

        function activate() {
            for (var i = 0; i < playerListeners.length; i++) {
                if ('activate' in playerListeners[i]) {
                    playerListeners[i].activate();
                }
            }
        }

        function setVolume(volume) {
            if (volume) {
                media.volume = Math.round(volume) / 100;
            }
        }

        function updateStatus() {
            for (var i = 0; i < playerListeners.length; i++) {
                if ('updateStatus' in playerListeners[i]) {
                    playerListeners[i].updateStatus(StatusObj.call(this));
                }
            }
        }

        function startStatusUpdater() {
            if (!interval) {
                interval = $interval(updateStatus, UPDATE_INTERVAL);
            }
        }
        function setPosition(pos) {
            if (pos) {
                media.currentTime = pos;
            }
        }

        function onStreamReady(files) {
            var fileObjs = files.map(function(file, index) {
                file.link = TorrentAPI.getMediaLink(index);
                return file;
            }.bind(this));
            console.log('Got files', fileObjs);
            changeStream();
            addToPlaylist(fileObjs);
            play();
        }
        return {
            /**
             * @param {IAbstractPlayerListener} listener
             */
            addListener: function(listener) {
                var event = Object.create(listener.prototype,
                    IAbstractPlayerListener);
                playerListeners.push(event);
            },
            startStream: function(item) {
                console.log('start stream');
                playerStatus.playingStatus = PlayingStatusEnum.BUFFERING;
                activate();
                startStatusUpdater();
                if (AuthService.getSession().username) {
                    TorrentAPI.addTorrentByRutrackerId(item.id)
                        .then(onTorrent);
                } else {
                    TorrentAPI.addTorrentByHash(item.info_hash)
                        .then(onTorrent);
                }
            },
            play: play,
            pause: pause,
            nextTrack: nextTrack,
            prevTrack: prevTrack,
            unpause: unpause,
            getPlaylist: getPlaylist,
            jumpToTrackOnPlaylist: jumpToTrackOnPlaylist,
            PlayingStatusEnum: PlayingStatusEnum,
            setPosition: setPosition,
            setVolume: setVolume,
            bindVideo: bindVideo
        };
    };
