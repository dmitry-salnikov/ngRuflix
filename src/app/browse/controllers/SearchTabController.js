/**
 * TCD Software
 * Created by Dmitrij Rysanow on 04.03.17.
 */
/**
 * @param {$stateParams} $stateParams
 * @param {RutrackerAPI} RutrackerAPI
 * @constructor
 * @export
 */
module.exports = function ($stateParams, RutrackerAPI) {
    var vm = this;
    vm.query = $stateParams.query;
    vm.torrentItems = [];
    vm.getMore = getMore;
    function init() {
        vm.locked = true;
        RutrackerAPI.search(vm.query, {
            start: vm.torrentItems.length
        }).then(populateList);
    }

        /**
         * Puts torrents into visible list
         * @param {Array<torrentItem>} response
         */
        function populateList(response) {
            vm.torrentItems = vm.torrentItems.concat(response);
            vm.locked = false;
        }

        function getMore() {
            init();
        }

    init();
};
