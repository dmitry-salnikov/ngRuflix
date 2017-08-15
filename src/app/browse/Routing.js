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
            url: '/category/:id',
            templateUrl: 'app/browse/tabs/CategoryTab/category.html',
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
            templateUrl: 'app/browse/tpl/dashboard.html',
            controller: 'DashboardTabController',
            controllerAs: 'vm',
            cache: true
        })
        .state('app.browse.subforum', {
            url: '/subforum/:id',
            templateUrl: 'app/browse/tabs/SubforumTab/subforum.html',
            controller: 'SubforumTabController',
            controllerAs: 'vm',
            cache: true
        })
        .state('app.browse.search', {
            url: '/search/:query',
            templateUrl: 'app/browse/tabs/SearchTab/search.html',
            controller: 'SearchTabController',
            controllerAs: 'vm',
            cache: true
        })
        .state('app.browse.liked', {
            url: '/liked',
            templateUrl: 'app/browse/tabs/LikedTab/liked.html',
            controller: 'LikedController',
            controllerAs: 'vm',
            cache: false
        })
};
