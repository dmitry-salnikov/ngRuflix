/**
* TCD Software
* Created by Dmitrij Rysanow on 25.12.16.
*/
/**
 *
 * @param {PlayerService} PlayerService
 * @return {{restrict: string, scope: string, templateUrl: string, link: link}}
 */
module.exports = function (PlayerService) {
    'use strict';
    return {
        restrict: 'A',
        scope: '&',
        templateUrl: 'app/browse/directives/torrentItems/musicItem/musicitem.html',
        link: function(scope) {
            scope.play = function() {
                console.log('Playing', scope.entry);
                PlayerService.startStream(scope.entry);
            };
        }
    };
}

