/**
 * TCD Software
 * Created by Dmitrij Rysanow on 02.03.17.
 */
var app = angular.module('app.player', [
        'ui.router',
        'ngMaterial',
        'ngMdIcons',
        'angular-loading-bar',
        'ngPopover',
        'ngAnimate',
        'app.common']);
app.directive('player', require('./directives/Player'));
app.filter('playingTimeIndicator', require('./filters/playingTimeIndicator'));
app.controller('NowPlayingController', require('./controllers/NowPlayingController'));
app.controller('VideoController', require('./controllers/VideoController'));
app.service('IAbstractPlayerListener', require('./services/IAbstractPlayerListener'));
app.service('PlayerService', require('./services/PlayerService'));
app.config(require('./Routing'));