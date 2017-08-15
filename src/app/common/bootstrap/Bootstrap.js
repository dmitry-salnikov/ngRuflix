/**
* TCD Software
* Created by Dmitrij Rysanow on 29.12.16.
*/
/**
 * Helps app bootstrap, run returns the promise
 *
 * @todo validate fallbacks (onFailed)
 * @param {Loki} Loki
 * @param {LoadBackend} LoadBackend
 * @param {PreloadData} PreloadData
 * @constructor
 * @ngInject
 * @export
 */
module.exports = function (Loki, LoadBackend, PreloadData) {
    'use strict';
    return {
        run: function() {
            console.log('Bootstrap app');
            return Loki.init()
                .then(LoadBackend.run)
                .then(PreloadData.run);
        }
    };
}
