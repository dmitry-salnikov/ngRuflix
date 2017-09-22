/**
 * TCD Software
 * Created by Dmitrij Rysanow on 07.01.17.
 */

/**
 *
 * @param {Loki} Loki
 * @constructor
 * @ngInject
 * @export
 * @return {angular.Directive} Directive definition object
 */
export default function (Loki) {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            categoryViewObject: '='
        },
        templateUrl: 'app/browse/directives/categoriesView/categoriesView.html',
        link: function ($scope) {

            /**
             * @type {number} currently selected subforum
             */
            $scope.selectedForumId = 0;


            $scope.openSubforum = function (child) {
                console.log('subforum open ', child.id);
                $scope.$emit('openSubforum', child);
            };
            $scope.toggleSelect = function (index) {
                var forum = $scope.categoryViewObject.children[index];
                //if subforum go to it now
                if (forum.type === 'subforum') {
                    $scope.openSubforum(forum.id);
                }
                if (!forum.subforums) {
                    forum.subforums = new LokiQueries()
                        .getSubforumsByForumId(forum.id);
                }
                if ($scope.selectedForumId === forum.id) {
                    //collapse
                    $scope.selectedForumId = 0;
                } else {
                    $scope.selectedForumId = forum.id;
                }

            };
        }
    };
}

