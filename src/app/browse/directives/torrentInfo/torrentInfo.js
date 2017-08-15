/**
 * Created by tcd on 15.08.17.
 */
/**
 *
 * @param RutrackerAPI
 * @param PlayerService
 * @param Loki
 * @param $mdToast
 * @param $rootScope
 * @returns {{restrict: string, scope: {entry: string}, templateUrl: string, link: link}}
 * @ngInject
 */
export default function (RutrackerAPI, PlayerService, Loki, $mdToast, $rootScope) {
    'use strict';
    return {
        restrict: 'E',
        scope: {
            entry: '='
        },
        templateUrl: 'app/browse/directives/torrentInfo/torrentInfo.html',
        link: function (scope) {
            function init() {
                scope.files = [];
            }

            var LokiQueries  = {
                ifLiked: function (id) {
                    return Loki.getLikesDTO().find({id: id}).length > 0;
                },
                toggleLike: function (torrentObj) {
                    if (this.ifLiked(torrentObj.id)) {
                        Loki.getLikesDTO().remove(torrentObj);
                    } else {
                        if (torrentObj.$loki) {
                            delete torrentObj.$loki;
                        }
                        Loki.getLikesDTO().insert(torrentObj);
                    }
                    $rootScope.$broadcast('refresh');
                    Loki.saveChanges();
                }
            };

            scope.likeToast = function() {
                if (scope.liked) {
                    $mdToast.showSimple('Liked ' + scope.entry.topic_title);
                } else {
                    $mdToast.showSimple('Disliked ' + scope.entry.topic_title);
                }
            };

            scope.play = function () {
                PlayerService.startStream(scope.entry);
            };

            scope.toggleLike = function () {
                LokiQueries.toggleLike(scope.entry);
                scope.liked = LokiQueries.ifLiked(scope.entry.id);
                scope.likeToast();
            };

            scope.$watch('entry', function (newVal, oldVal) {
                if (newVal || newVal && oldVal && newVal.id !== oldVal.id) {
                    RutrackerAPI.getFiles(newVal.id)
                        .then(function (data) {
                            scope.files = data.data.files;
                            scope.liked = LokiQueries.ifLiked(scope.entry.id);
                            console.log('files', scope.files);
                        })
                }
            }, true);

            init();
        }
    }
}