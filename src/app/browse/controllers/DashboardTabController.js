
/**
 * @param {Loki} Loki
 * @constructor
 * @export
 */
module.exports = function ($scope, Loki, $state) {
    var vm = this;
    'use strict';
    var MAX_DATA_AT_ONCE = 100;

        /**
         * @define {Array.<torrentItem>} displayed list of torrents
         */
        vm.torrentList = [];
        vm.likes = [];
        vm.selectedTorrent = null;
        vm.getMore = getMore;

        function LokiQueries() {
            return {
                getFeed: function() {
                    return Loki.getFeedDTO()
                        .chain()
                        .simplesort('seeders', true)
                        .data();
                },
                getLikes: function() {
                    return Loki.getLikesDTO()
                        .chain()
                        .simplesort('seeders', true)
                        .limit(MAX_DATA_AT_ONCE)
                        .data();
                }
            };
        }
        function init() {
            vm.torrentItems = new LokiQueries().getFeed();
            vm.likes = new LokiQueries().getLikes();
        }

        function getMore() {
            $state.go('app.browse.liked');
        }

        init();
        $scope.$on('refresh', init);
    };


