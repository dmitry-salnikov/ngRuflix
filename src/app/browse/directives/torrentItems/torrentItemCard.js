/**
* TCD Software
* Created by Dmitrij Rysanow on 25.12.16.
*/

/**
 *
 * @param {angular.compile} $compile
 * @return {angular.directive}
 * @export
 * @ngInject
 */
export default function ($compile) {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            type: '=',
            entry: '='
        },
        link: function(scope, $element) {
            var type = scope.type || scope.entry.type;
            var el = $compile('<md-card class="torrentItem hoverEffect scale" ' + type + 'item></md-card>')(scope);
            $element.append(el);
        }
    };
};
