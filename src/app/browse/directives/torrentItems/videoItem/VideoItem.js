/**
* TCD Software
* Created by Dmitrij Rysanow on 04.02.17.
*/

module.exports = function VideoItem(PlayerService) {
    'use strict';
    return {
        restrict: 'A',
        scope: '&',
        templateUrl: 'app/browse/directives/torrentItems/videoItem/videoitem.html',
        link: function(scope) {
            function play() {
                PlayerService.startStream(scope.entry);
            }
            scope.play = play;

        }
    };
}

