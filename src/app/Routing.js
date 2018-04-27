/**
 * TCD Software
 * Created by Dmitrij Rysanow on 05.11.16.
 */
/**
 *
 * @param $stateProvider
 * @param $urlRouterProvider
 * @param RutrackerAPIProvider
 * @param $httpProvider
 * @ngInject
 */
module.exports = function ($stateProvider,
                     $urlRouterProvider,
                     RutrackerAPIProvider,
                     $httpProvider) {
    'use strict';
    $stateProvider
        .state('splash', {
            url: '/splash',
            templateUrl: './tpl/splash.tpl.html',
            controller: 'SplashScreenController'
        })
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: './tpl/app.tpl.html',
            controller: 'AppController',
            controllerAs: 'vm'
        });

    $httpProvider.defaults.cache = true;

    $urlRouterProvider.otherwise('/splash');
};
