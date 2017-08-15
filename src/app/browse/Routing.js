/**
 * TCD Software
 * Created by Dmitrij Rysanow on 02.03.17.
 */
module.exports = function($stateProvider) {
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
            controller: 'CategoryController',
            controllerAs: 'vm',
            params: {
                subCategories: [],
                forums: []
            },
            cache: true
        })
        .state('app.browse.dashboard', {
            url: '/dashboard',
            templateUrl: 'app/browse/tabs/DashboardTab/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm',
            cache: true
        })
        .state('app.browse.subforum', {
            url: '/subforum/:id',
            templateUrl: 'app/browse/tabs/SubforumTab/subforum.html',
            controller: 'SubforumController',
            controllerAs: 'vm',
            cache: true
        })
        .state('app.browse.search', {
            url: '/search/:query',
            templateUrl: 'app/browse/tabs/SearchTab/search.html',
            controller: 'SearchTabController',
            controllerAs: 'vm',
            cache: true
        });
}
