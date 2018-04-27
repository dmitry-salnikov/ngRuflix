/**
 * TCD Software
 * Created by Dmitrij Rysanow on 02.03.17.
 */
export default function ($stateProvider) {
    $stateProvider
        .state('app.browse', {
            url: '/browse',
            templateUrl: './tpl/browse.tpl.html',
            controller: 'BrowseController',
            controllerAs: 'vm'
        })
        .state('app.browse.category', {
            url: '/category/:id',
            templateUrl: './tpl/category.tpl.html',
            controller: 'CategoryTabController',
            controllerAs: 'vm',
            params: {
                subCategories: [],
                forums: []
            },
            cache: true
        })
        .state('app.browse.dashboard', {
            url: '/dashboard',
            templateUrl: './tpl/dashboard.tpl.html',
            controller: 'DashboardTabController',
            controllerAs: 'vm',
            cache: true
        })
        .state('app.browse.subforum', {
            url: '/subforum/:id',
            templateUrl: './tpl/subforum.tpl.html',
            controller: 'SubforumTabController',
            controllerAs: 'vm',
            cache: true
        })
        .state('app.browse.search', {
            url: '/search/:query',
            templateUrl: './tpl/search.tpl.html',
            controller: 'SearchTabController',
            controllerAs: 'vm',
            cache: true
        })
        .state('app.browse.liked', {
            url: '/liked',
            templateUrl: './tpl/liked.tpl.html',
            controller: 'LikedTabController',
            controllerAs: 'vm',
            cache: false
        })
};
