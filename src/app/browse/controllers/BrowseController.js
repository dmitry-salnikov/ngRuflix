/**
* TCD Software
* Created by Dmitrij Rysanow on 18.11.16.
*/
/**
 * Browse controller
 *
 * @param {!angular.Scope} $scope
 * @param {*} $mdSidenav
 * @param {RutrackerAPI} RutrackerAPI
 * @param {state} $state
 * @param {!angular.Scope} $rootScope
 * @constructor
 * @ngInject
 */
module.exports = function ($scope,
                          $mdSidenav,
                          RutrackerAPI,
                          $state,
                          $rootScope) {
    'use strict';
    var vm = this;
    /**
     * Setting that indicates if openCategory should open in new tab
     * @type {boolean}
     */
    var sameTab = false;

    /**
     * Category with videos
     * @type {number}
     * @const
     */
    var VIDEO_CAT = 2;

    /**
     * Documents and comedy category ID
     * @type {number}
     * @const
     */
    var DOCUMENTAL_AND_COMEDY = 20;

    /**
     * Sports category ID
     * @type {number}
     * @const
     */
    var SPORT = 28;

    /**
     * Series category ID
     * @type {number}
     * @const
     */
    var SERIES = 18;

    var NON_RUSSIAN_MOVIES = 7;
    var RUSSIAN_MOVIES = 22;
    var ART_HOUSE = 124;
    var THEATRE = 511;
    var DVD_VIDEO = 93;
    var HD_VIDEO = 2198;
    var THREEDIMENSIONALMOVIES = 352;
    var CARTOONS = 4;
    var CARTOON_SERIES = 921;
    var ANIME = 33;

    /**
     * Music category ID
     * @type {number}
     * @const
     */
    var MUSIC_CAT = 8;
    /**
     * Pop music category ID
     * @type {number}
     * @const
     */
    var POP_MUSIC_CAT = 35;

    /**
     * Jazz music category ID
     * @type {number}
     */
    var JAZZBLUES_MUSIC_CAT = 31;

    /**
     * Rock music category ID
     * @type {number}
     * @const
     */
    var ROCK_MUSIC_CAT = 22;

    /**
     * Electronic music category ID
     * @type {number}
     * @const
     */
    var ELECTRONIC_MUSIC_CAT = 23;

    /**
     * Classical music forum ID
     * @type {number}
     * @const
     */
    var CLASSIC_MUSIC_FORUM = 409;
    var FOLK_MUSIC_FORUM = 1125;
    var NEWAGE_MUSIC_FORUM = 1849;
    var HIPHOP_MUSIC_FORUM = 408;
    var REGGAE_MUSIC_FORUM = 1760;
    var SOUNDTRACK_MUSIC_FORUM = 416;
    var CHANSON_MUSIC_FORUM = 1215;
    var OTHER_MUSIC_FORUM = 413;

    /**
     * Array with tab views
     * @type {Array}
     */
    vm.tabs = [
        {
            name: 'Dashboard',
            route: 'app.browse.dashboard',
            params: {}
        },
        {
            name: 'Music',
            route: 'app.browse.category',
            params: {
                'id': MUSIC_CAT,
                'subCategories': [
                    POP_MUSIC_CAT,
                    ROCK_MUSIC_CAT,
                    JAZZBLUES_MUSIC_CAT,
                    ELECTRONIC_MUSIC_CAT
                ],
                'forums': [
                    CLASSIC_MUSIC_FORUM,
                    FOLK_MUSIC_FORUM,
                    NEWAGE_MUSIC_FORUM,
                    HIPHOP_MUSIC_FORUM,
                    REGGAE_MUSIC_FORUM,
                    SOUNDTRACK_MUSIC_FORUM,
                    CHANSON_MUSIC_FORUM,
                    OTHER_MUSIC_FORUM
                ]
            }
        },
        {
            name: 'Movies',
            route: 'app.browse.category',
            params: {
                'id': VIDEO_CAT,
                'subCategories': [
                    DOCUMENTAL_AND_COMEDY,
                    SPORT,
                    SERIES
                ],
                'forums': [
                    NON_RUSSIAN_MOVIES,
                    RUSSIAN_MOVIES,
                    ART_HOUSE,
                    THEATRE,
                    DVD_VIDEO,
                    HD_VIDEO,
                    THREEDIMENSIONALMOVIES,
                    CARTOONS,
                    CARTOON_SERIES,
                    ANIME
                ]
            }
        }
    ];
    /**
     * @return {void}
     */
    function init() {
        if ($rootScope.tabs) {
            vm.tabs = $rootScope.tabs;
        }
        var tab = vm.tabs.indexOf(_.where(vm.tabs, {"route":$state.current.name})[0]);
        if (tab > 0) {
            vm.selectedTab = tab;
        } else {

            vm.selectedTab = 0;
        }
        $state.go(vm.tabs[vm.selectedTab].route);
    }

    /**
     * Loads tab for search
     * @param {string} query
     * @return {{name: string, id: number, closable: boolean}}
     */
    function getSearchTab(query) {
        return {
            name: 'Search: ' + query.substr(0, 9),
            route: 'app.browse.search',
            params: {query: query},
            id: vm.tabs.length + 1,
            closable: true
        };
    }
    /**
     * Gets view for subforum
     * @param  {Object} subforum
     * @return {Object}
     */
    function getSubforumTab(subforum) {
        return {
            name: subforum.name,
            route: 'app.browse.subforum',
            params: {id: subforum.id},
            closable: true
        };
    }

    /**
     * Apply tab config and saves current state of tabs in $rootScope
     * @todo: use factory to save data and $watch to apply state
     */
    function applyTabState() {
        $state.go(vm.tabs[vm.selectedTab].route,
            vm.tabs[vm.selectedTab].params);
        $rootScope.tabs = vm.tabs;
    }

    /**
     * Go to next tab
     */
    vm.nextTab = function() {
        if (vm.selectedTab !== vm.tabs.length - 1) {
            vm.selectedTab++;
            $state.go(vm.tabs[vm.selectedTab].route);
        }
    };
    /**
     * Go to previous tab
     */
    vm.prevTab = function() {
        if (vm.selectedTab !== 0) {
            vm.selectedTab--;
            $state.go(vm.tabs[vm.selectedTab].route);

        }
    };

    /**
     * Closes tab at the index
     * @param {Number} selectedTab
     */
    vm.closeTab = function(selectedTab) {
        vm.tabs.splice(selectedTab, 1);
    };
    /**
     * Opens SearchTab and pass the query to it
     */
    vm.search = function() {
        vm.showSearch = false;
        vm.tabs.push(getSearchTab(vm.query));
        vm.selectedTab = vm.tabs.length - 1;
        applyTabState();
    };
    /**
     * Sidenav toggle
     * @todo it should be app's part
     */
    vm.toggleSidenav = function() {
        $mdSidenav('left')
            .toggle();
    };
    /**
     * Switch tab at index
     * @param {Number} index
     */
    vm.selectTab = function(index) {
        console.log(index);
        vm.selectedTab = index;
        applyTabState();
    };
    /**
     * Closes the tab at the index and loses it's state
     * @param {Number} index
     */
    vm.closeTab = function(index) {
        vm.tabs.splice(index, 1);
        vm.selectedTab--;
        applyTabState();
    };

    $scope.$on('openSubforum', function(event, subforum) {
        var tab = getSubforumTab(subforum);
        if (sameTab) {
            vm.tabs[vm.selectedTab] = tab;
        } else {
            vm.tabs.push(tab);
            vm.selectedTab = $scope.tabs.length - 1;
            applyTabState();
        }
    });

    init();
};
