/**
 * Created by tcd on 15.08.17.
 */

const MAX_DATA_AT_ONCE = 100;

/**
 * @param $scope
 * @param Loki
 * @constructor
 * @ngInject
 */
export default function ($scope, Loki) {
    var vm = this;

    var LokiQueries = {
        getMore: function () {
            return Loki.getLikesDTO()
                .chain()
                .simplesort('seeders', true)
                .offset(vm.torrentList.length)
                .limit(MAX_DATA_AT_ONCE)
                .data();
        }
    };
    function init() {
        vm.torrentList = [];
        vm.torrentList = LokiQueries.getMore();
    }

    vm.getMore = function () {
        vm.torrentList.push(LokiQueries.getMore());
    };

    init();

    $scope.$on('refresh', init);
};
