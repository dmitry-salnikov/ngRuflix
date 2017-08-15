/**
 * Browser module. Displays UI for searching and browsing torrents
 *
 * TCD Software
 * Created by Dmitrij Rysanow on 02.03.17.
 */

var angular = require('angular');

var app = angular.module('app.browse', [
        'ui.router',
        'ngMaterial',
        'ngMdIcons',
        'ngAnimate',
        'app.common']);
/**
 * torrentItem is abstract directive for creating torrent cards. It's inherited by musicItem and videoItem,
 * reads type parameter and compiles musicItem or videoItem
 */
app.directive('torrentItem', require('./directives/torrentItems/torrentItem'));
/**
 * musicItem - directive with card for music torrent
 */
app.directive('musicItem', require('./directives/torrentItems/musicItem/MusicItem'));
/**
 * videoItem - directive with card for video torrent
 */
app.directive('videoItem', require('./directives/torrentItems/videoItem/VideoItem'));
/**
 * BrowseController - Browser view - with searchbar and tabs system
 */
app.controller('BrowseController', require('./controllers/BrowseController'));
/**
 * CategoryTabController - controller for tab with categories view. Displays categories, forums, subforums.
 */
app.controller('CategoryTabController', require('./controllers/CategoryTabController'));
/**
 * DashboardTabController - tab that should be displayed first. Can contain various data,
 * for immediate access for user
 */
app.controller('DashboardTabController', require('./controllers/DashboardTabController'));
/**
 * SearchTabController - tab with search results
 */
app.controller('SearchTabController', require('./controllers/SearchTabController'));
/**
 * SubforumTabController - tab for subforum chosen from CategoryTab
 */
app.controller('SubforumTabController', require('./controllers/SubforumTabController'));
app.config(require('./Routing'));
export default app;
