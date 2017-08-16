/**
 * TCD Software
 * Created by Dmitrij Rysanow on 08.02.17.
 */
import {PlayerStatus} from "../../common/models/PlayerStatus";
import * as _ from "lodash";
import {Track} from "../../common/models/Track";
import IAbstractPlayerListener from "../services/IAbstractPlayerListener";

/**
 *
 * @param TorrentAPI
 * @param $interval
 * @param $state
 * @param PLAYING_STATUS
 * @param AuthService
 * @returns {{addListener: addListener, startStream: startStream, play: play, pause: pause, nextTrack: nextTrack, prevTrack: prevTrack, unpause: unpause, getPlaylist: getPlaylist, jumpToTrackOnPlaylist: jumpToTrackOnPlaylist, setPosition: setPosition, setVolume: setVolume, bindVideo: bindVideo}}
 * @constructor
 */
export default function (TorrentAPI,
                           $interval,
                           $state,
                           PLAYING_STATUS,
                           AuthService) {
    'use strict';
    /**
     * Interval for calling updateStatus event (See IAbstractPlayerListener)
     * @const
     * @type {number}
     */
    const UPDATE_INTERVAL = 500;
    /**
     *
     * @type {Array<IAbstractPlayerListener>}
     */
    let playerListeners = [];

    let currentTorrent = {};
    let media = new Audio();
    let interval = null;
    let playerStatus = new PlayerStatus();
    setPlayerEvents();

    /**
     * Filters file list to media files and ads to playlist
     *
     * @param {FileLink} files
     * @return {void}
     */
    function addToPlaylist(files) {
        //TODO: convert to Tracks
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
        playerStatus.playlist = playerStatus.playlist.concat(mediaFiles);
    }

    function pause() {
        media.pause();
        playerStatus.statusText = PLAYING_STATUS.PAUSED;
    }

    function unpause() {
        media.play();
        playerStatus.statusText = PLAYING_STATUS.PLAYING;
    }

    function bindVideo(element) {
        media = element;
        play();
    }

    function play() {
        if ($state.current.name !== 'app.video' &&
            playerStatus.getCurrentTrack().mime.indexOf('video') > -1) {
            //it's video file
            requestVideo();
            return;
        }
        console.log('playlist', playerStatus.playlist);
        media.src = playerStatus.getCurrentTrack().link;
        media.currentTime = playerStatus.position;
        media.play();
        playerStatus.statusText = PLAYING_STATUS.PLAYING;
        setPlayerEvents();

        console.log('Playing', playerStatus.getCurrentTrack().name);
    }

    function prepareChangeStream() {
        if (media && !media.paused) {
            media.pause();
        }
        media = new Audio();
        playerStatus.playlist = [];
        playerStatus.position = 0;
    }

    function getPlaylist() {
        return playerStatus.playlist;
    }

    function setPlayerEvents() {
        media.addEventListener('ended', ended);
        media.addEventListener('playing', onPlaying);
        media.addEventListener('error', error);
    }

    function onPlaying() {
        //get ffmpeg metadata

        TorrentAPI.getMetadata(playerStatus.getCurrentTrack().id)
            .then(function(metadata) {
                playerStatus.getCurrentTrack().metadata = metadata.data;
            });
    }

    function ended() {
        if (media.duration === media.currentTime) {
            nextTrack();
        }
    }

    function nextTrack() {
        if (playerStatus.statusText === PLAYING_STATUS.PLAYING && playerStatus.currentTrackNumber < playerStatus.playlist.length - 1) {
            media.pause();
            playerStatus.currentTrackNumber++;
            media.src = playerStatus.getCurrentTrack().link;
            console.log('Playing', playerStatus.getCurrentTrack().name);
            media.play();
        } else if (playerStatus.statusText === PLAYING_STATUS.PAUSED && playerStatus.currentTrackNumber < playerStatus.playlist.length - 1) {
            playerStatus.currentTrackNumber++;
        }
    }

    function prevTrack() {
        if (playerStatus.statusText === PLAYING_STATUS.PLAYING && playerStatus.currentTrackNumber > 0) {
            media.pause();
            playerStatus.currentTrackNumber--;
            media.src = playerStatus.getCurrentTrack().link;
            console.log('Playing', playerStatus.getCurrentTrack().name);
            media.play();
        } else if (playerStatus.statusText === PLAYING_STATUS.PAUSED &&
            playerStatus.currentTrackNumber >= 1) {
            playerStatus.currentTrackNumber--;
        }
    }

    /**
     *
     * @param {number} index
     */
    function jumpToTrackOnPlaylist(index) {
        playerStatus.currentTrackNumber= index;
        media.src = playerStatus.getCurrentTrack().link;
        console.log('Playing', playerStatus.getCurrentTrack().name);
        media.play();
        playerStatus.statusText = PLAYING_STATUS.PLAYING;
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

    function activate() {
        for (var i = 0; i < playerListeners.length; i++) {
            if ('activate' in playerListeners[i]) {
                playerListeners[i].activate();
            }
        }
    }


    function deactivate() {
        for (var i = 0; i < playerListeners.length; i++) {
            if ('deactivate' in playerListeners[i]) {
                playerListeners[i].deactivate();
            }
        }
    }

    function error(message) {
        console.error(message);
        for (var i = 0; i < playerListeners.length; i++) {
            if ('error' in playerListeners[i]) {
                playerListeners[i].error(message);
            }
        }
        if (playerStatus.playlist.length - 1 > currentTrack) {
            nextTrack();
        } else {
            deactivate();
        }
    }

    function setVolume(volume) {
        if (volume) {
            media.volume = Math.round(volume) / 100;
        }
    }

    function updateStatus() {
        if (media) {
            playerStatus.position = media.currentTime;
            playerStatus.duration = media.duration;
        }
        for (var i = 0; i < playerListeners.length; i++) {
            if ('updateStatus' in playerListeners[i]) {
                playerListeners[i].updateStatus(playerStatus);
            }
        }
    }

    function requestVideo() {
        for (var i = 0; i < playerListeners.length; i++) {
            if ('requestVideo' in playerListeners[i]) {
                playerListeners[i].requestVideo();
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
        let tracks = files.map(function(file, index) {
            file.torrentId = currentTorrent.id;
            let track = new Track(file);
            track.id = index;
            track.link = TorrentAPI.getMediaLink(index);
            track.mime = file.mime;
            return track;
        }.bind(this));
        console.log('Got tracks', tracks);
        prepareChangeStream();
        addToPlaylist(tracks);
        play();
    }

    return {
        /**
         * @param {IAbstractPlayerListener} listener
         */
        addListener: function(listener) {
            let event = Object.create(listener.prototype,
                IAbstractPlayerListener);
            playerListeners.push(event);
        },
        startStream: function(item) {
            console.log('start stream');
            playerStatus.statusText = PLAYING_STATUS.BUFFERING;
            activate();
            playerStatus.torrentId = item.id;
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
        setPosition: setPosition,
        setVolume: setVolume,
        bindVideo: bindVideo
    };
}
