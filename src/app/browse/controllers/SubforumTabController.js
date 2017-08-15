/**
 * Created by tcd on 25.01.17.
 */
/**
 * @param {*} $stateParams
 * @param {RutrackerAPI} RutrackerAPI
 * @constructor
 * @export
 * @ngInject
 */
module.exports = function ($stateParams, RutrackerAPI) {
    var vm = this;
    /**
     * @type {Array<torrentItem>}
     */
    vm.torrentList = [];
    /**
     * @param  {Array<torrentItem>} result
     * @return {void}
     */
    function onResult(result) {
        vm.torrentList = vm.torrentList.concat(result);
    }
    vm.getMore = function() {
        RutrackerAPI.getTorrentsInSubforum($stateParams.id,
            vm.torrentList.length)
            .then(onResult);
    };
    vm.getMore();
}
