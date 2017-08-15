/**
* TCD Software
* Created by Dmitrij Rysanow on 12.03.17.
*/
/**
 * Detects which environment is running
 *
 * @param {ENVIRONMENTS} ENVIRONMENTS
 * @return {angular.factory}
 * @ngInject
 * @constructor
 */
module.exports = function (ENVIRONMENTS) {
    var current = '';
    function init() {
        var isNode = (typeof process !== 'undefined' && typeof require !== 'undefined');
        var isNodeWebkit = false;
        current = ENVIRONMENTS.Browser;
    }
    function getCurrent() {
        return current;
    }
    init();
    return {
        getCurrent: getCurrent,
        $get: function() {
            return {
                getCurrent: function() {
                    return current;
                }
            };
        }
    };
};
