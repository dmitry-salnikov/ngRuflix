
/**
 * @param {Loki} Loki
 * @constructor
 * @export
 */
module.exports = function (Loki) {
    var vm = this;
    'use strict';
    var MAX_DATA_AT_ONCE = 100;

    /**
     * @define {Array.<torrentItem>} displayed list of torrents
     */
    vm.torrentList = [];

    function LokiQueries() {
        return {
            getFeed: function() {
                return Loki.getFeedDTO()
                    .chain()
                    .simplesort('seeders', true)
                    .limit(MAX_DATA_AT_ONCE)
                    .data();
            }
        };
    }
    function init() {
        vm.torrentItems = new LokiQueries().getFeed();
    }
    init();
}

