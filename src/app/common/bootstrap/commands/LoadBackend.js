import provisional from '../../provisional';
/**
* TCD Software
* Created by Dmitrij Rysanow on 12.03.17.
*/
/**
 *
 * @param {Environment} Environment
 * @param {ENVIRONMENTS} ENVIRONMENTS
 * @param {angular.q} $q
 * @param {ConfigStore} ConfigStore
 * @ngInject
 * @constructor
 * @export
 */
module.exports = function ($q, ConfigStore) {
    /**
     * in NWJS env we have direct access to node
     * so we can run backend from here
     * @param {q.defer} defer
     */
    function configureAsNWJS(defer) {
        //var backend = require('backend-rustreamer');
        // backend.run({
        //     hostFront: false,
        //     frontDir: null,
        //     development: false
        // }).then(function(config) {
        //     ConfigStore.set(config);
        //     defer.resolve();
        // });
        ConfigStore.set(provisional);
        defer.resolve();
    }


    function configureAsBrowser(defer) {
        //in browser we are shure that backend
        // already works and hosted this client
        ConfigStore.set(provisional);
        defer.resolve();
    }

    function run() {
        var defer = $q.defer();
        configureAsNWJS(defer);
        return defer.promise;
    }

    return {
        run: run
    };
};
