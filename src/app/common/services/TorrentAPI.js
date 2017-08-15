/**
 * TCD Software
 * Created by Dmitrij Rysanow on 08.02.17.
 */
/**
 * Provide access to node's TorrentManagment interface
 *
 * @param {!angular.$http} $http
 * @param {RutrackerAPI} RutrackerAPI
 * @param {ConfigStore} ConfigStore
 * @constructor
 * @ngInject
 * @export
 */
module.exports = function ($http, RutrackerAPI, ConfigStore) {
    var _APIendpoint = RutrackerAPI.getEndpoint() + '/torrentapi';
    var _mediaEndpoint = 'http://' + ConfigStore.get().hostname + ':9999';

    /**
     * Generates random whole number to avoid any caching
     * @param {number} min
     * @param {number} max
     * @return {number} {int}
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return {
        addTorrentByHash: function (torrent) {
            return $http.get(_APIendpoint + '/add/' +
                torrent + '?r=' + getRandomInt(0, 65000));
        },
        addTorrentByRutrackerId: function (id) {
            return $http.get(_APIendpoint + '/addFile/' + id +
                '?r=' + getRandomInt(0, 65000));
        },
        getMediaLink: function (index) {
            return _mediaEndpoint + '/' + index +
                '?r=' + getRandomInt(0, 65000);
        },
        getMetadata: function (index) {
            return $http.get(_APIendpoint + '/getMetadata/' + index +
                '?r=' + getRandomInt(0, 65000));
        }
    };
};
