/**
* TCD Software
* Created by Dmitrij Rysanow on 04.02.17.
*/
/**
 *
 * @param {PlayerService} PlayerService
 * @return {{restrict: string, scope: string, templateUrl: string, link: link}}
 */
export default function (PlayerService) {
    'use strict';
    return {
        restrict: 'A',
        scope: '&',
        templateUrl: 'videoitem.tpl.html',
        link: function(scope, element, attr) {
            scope.DEFAULT_ICON = 'local_movies';
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
