/**
* TCD Software
* Created by Dmitrij Rysanow on 25.12.16.
*/
/**
 *
 * @param {PlayerService} PlayerService
 * @return {{restrict: string, scope: string, templateUrl: string, link: link}}
 * @ngInject
 */
export default function (PlayerService) {
    'use strict';
    return {
        restrict: 'A',
        scope: '&',
        templateUrl: 'src/app/browse/directives/torrentItems/musicItem/musicitem.html',
        link: function(scope, element, attr) {
            scope.DEFAULT_ICON = 'music_note';
            scope.PLAY_ICON = 'play_arrow';
            scope.INFO_ICON = 'info_outline';
            scope.PAUSE_ICON = 'pause';

            scope.currentIcon = scope.DEFAULT_ICON;

            scope.switchIcon = function(icon) {
                scope.currentIcon = icon;
            };

            scope.play = function($event) {
                $event.stopPropagation();
                PlayerService.startStream(scope.entry);
            };
        }
    };
};
