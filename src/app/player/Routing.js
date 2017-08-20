/**
 * TCD Software
 * Created by Dmitrij Rysanow on 02.03.17.
 */
export default function($stateProvider) {
            function passPreviousState($state) {
                return {
                    Name: $state.current.name,
                    Params: $state.params,
                    URL: $state.href($state.current.name, $state.params)
                };
            }
            $stateProvider
                .state('app.nowplaying', {
                    url: '/nowplaying',
                    templateUrl: 'app/player/templates/nowplaying.html',
                    controller: 'NowPlayingController',
                    controllerAs: 'vm',
                    resolve: {
                        PreviousState: ['$state', passPreviousState]
                    },
                    cache: true
                })
                .state('app.video', {
                    url: '/video',
                    templateUrl: 'app/player/templates/video.html',
                    controller: 'VideoController',
                    controllerAs: 'vm',
                    cache: false,
                    resolve: {
                        PreviousState: ['$state', passPreviousState]
                    }
                });
        };
