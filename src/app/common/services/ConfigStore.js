/**
* TCD Software
* Created by Dmitrij Rysanow on 15.03.17.
*/
/**
 *
 * @constructor
 * @export
 */
module.exports = function () {
    var _config;
    return {
        get: function() {
            return _config;
        },
        set: function(config) {
            _config = config;
        }
    };
}

