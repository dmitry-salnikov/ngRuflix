/**
 * TCD Software
 * Created by Dmitrij Rysanow on 02.03.17.
 */
export default function ($stateProvider) {
    $stateProvider
        .state('app.browse', {
            url: '/browse',
            templateUrl: 'app/browse/tpl/browse.html',
            controller: 'BrowseController',
            controllerAs: 'vm'
        })
        .state('app.browse.category', {
            url: '/category/{groupId:int}',
            templateUrl: 'app/browse/tpl/category.html',
            controller: 'CategoryTabController',
            controllerAs: 'vm',
            params: {
                groupId: 0
            },
            cache: true
        })
        .state('app.browse.dashboard', {
            url: '/dashboard',
            templateUrl: 'app/browse/tpl/dashboard.html',
            controller: 'DashboardTabController',
            controllerAs: 'vm',
            cache: true
        })
        .state('app.browse.subforum', {
            url: '/subforum/{id:int}',
            templateUrl: 'app/browse/tpl/subforum.html',
            controller: 'SubforumTabController',
            controllerAs: 'vm',
            cache: true
        })
        .state('app.browse.search', {
            url: '/search/:query',
            templateUrl: 'app/browse/tpl/search.html',
            controller: 'SearchTabController',
            controllerAs: 'vm',
            cache: true
        })
        .state('app.browse.liked', {
            url: '/liked',
            templateUrl: 'app/browse/tpl/liked.html',
            controller: 'LikedTabController',
            controllerAs: 'vm',
            cache: false
        })
};
