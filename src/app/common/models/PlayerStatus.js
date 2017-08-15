/**
 * Created by tcd on 15.08.17.
 */
export const PLAYING_STATUS = {
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    BUFFERING: 'BUFFERING',
    STOPPED: 'STOPPED'
};

export class PlayerStatus {
    constructor(args) {
        this.position = 0;
        this.torrentId = null;
        this.currentTrackNumber = 0;
        this.duration = 0;
        this.playlist = [];
        this.statusText = PLAYING_STATUS.STOPPED;
        this.item = null;

        if (args) {
            var fields = Object.keys(this);
            for (var i in fields) {
                if (args.hasOwnProperty(fields[i])) {
                    this[fields[i]] = args[fields[i]];
                }
            }
        }
    }

    getCurrentTrack() {
        if (this.currentTrackNumber > this.playlist.length) {
            this.currentTrackNumber = 0;
        }
        return this.playlist[this.currentTrackNumber];
    }
}