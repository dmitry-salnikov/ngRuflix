/**
 * Browser module. Displays UI for searching and browsing torrents
 *
 * TCD Software
 * Created by Dmitrij Rysanow on 02.03.17.
 */
import disappearance from './animations/disappearance';
import listIn from './animations/listIn';
import slideUp from './animations/slideUp';
import torrentInfo from './directives/torrentInfo/torrentInfo';
import torrentItemCard from './directives/torrentItems/torrentItemCard';
import MusicItem from './directives/torrentItems/musicItem/MusicItem';
import VideoItem from './directives/torrentItems/videoItem/VideoItem';
import torrentList from './directives/torrentList/torrentList';
import BrowseController from './controllers/BrowseController';
import CategoryTabController from './controllers/CategoryTabController';
import DashboardTabController from './controllers/DashboardTabController';
import LikedTabController from './controllers/LikedTabController';
import SearchTabController from './controllers/SearchTabController';
import SubforumTabController from './controllers/SubforumTabController';
import categoryView from './directives/categoriesView/categoryView';
import Routing from './Routing';
import 'gsap/CSSPlugin';

var angular = require('angular');

var app = angular.module('app.browse', [
        'ui.router',
        'ngMaterial',
        'ngMdIcons',
        'ngAnimate',
        'app.common']);
app.animation('.disappearance', disappearance);
app.animation('.listIn', listIn);
app.animation('.slideUp', slideUp);
app.directive('torrentInfo', torrentInfo);
/**
 * torrentItem is abstract directive for creating torrent cards. It's inherited by musicItem and videoItem,
 * reads type parameter and compiles musicItem or videoItem
 */
app.directive('torrentItemCard', torrentItemCard);
app.directive('musicitem', MusicItem);
app.directive('videoitem', VideoItem);
app.directive('torrentList', torrentList);
app.directive('categoryView', categoryView);

/**
 * BrowseController - Browser view - with searchbar and tabs system
 */
app.controller('BrowseController', BrowseController);
/**
 * CategoryTabController - controller for tab with categories view. Displays categories, forums, subforums.
 */
app.controller('CategoryTabController', CategoryTabController);
/**
 * DashboardTabController - tab that should be displayed first. Can contain various data,
 * for immediate access for user
 */
app.controller('DashboardTabController', DashboardTabController);
/**
 * SearchTabController - tab with search results
 */
app.controller('SearchTabController', SearchTabController);
app.controller('LikedTabController', LikedTabController);
/**
 * SubforumTabController - tab for subforum chosen from CategoryTab
 */
app.controller('SubforumTabController', SubforumTabController);
app.config(Routing);
export default app;
