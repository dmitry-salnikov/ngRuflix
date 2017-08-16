/**
 * TCD Software
 * Created by Dmitrij Rysanow on 02.03.17.
 */
import '../../../node_modules/fzn-angular-popover/dist/css/ngpopover.css';
import '../../../node_modules/fzn-angular-popover/dist/js/ngPopover.min';
import PlayerService from './services/PlayerService';
import PLAYER_GLOBAL_CONTROLS from './services/PlayerService';
import IAbstractPlayerListener from './services/IAbstractPlayerListener';
let app = angular.module('app.player', [
        'ui.router',
        'ngMaterial',
        'ngMdIcons',
        'ngPopover',
        'ngAnimate',
        'app.common']);
app.filter('playingTimeIndicator', require('./filters/playingTimeIndicator'));
app.controller('NowPlayingController', require('./controllers/NowPlayingController'));
app.controller('VideoController', require('./controllers/VideoController'));
app.service('IAbstractPlayerListener', IAbstractPlayerListener);
app.service('PlayerService', PlayerService);
app.directive('player', require('./directives/Player'));
app.config(require('./Routing'));
app.constant(PLAYER_GLOBAL_CONTROLS);
export default app;