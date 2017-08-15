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
    function init() {
        if (vm.torrentItems.length === 0) {
            RutrackerAPI.search(vm.query).then(populateList);
        }
    }

    /**
     * Puts torrents into visible list
     * @param {Array<torrentItem>} response
     */
    function populateList(response) {
        vm.torrentItems = response;
    }
    init();
}

