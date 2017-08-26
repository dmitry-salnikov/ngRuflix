/**
 * TCD Software
 * Created by Dmitrij Rysanow on 02.03.17.
 */
import angular from 'angular';
import '../../../node_modules/ng-popover/dist/angular-popover.css';
import '../../../node_modules/ng-popover/dist/angular-popover';
import PlayerService from './services/PlayerService';
import PlayingTimeIndicator from './filters/playingTimeIndicator';
import NowPlayingController from './controllers/NowPlayingController';
import VideoController from './controllers/VideoController';
import {PLAYER_GLOBAL_CONTROLS} from './services/PlayerService';
import IAbstractPlayerListener from './services/IAbstractPlayerListener';
import PlayerDirective from './directives/Player';
import Routing from './Routing';

let app = angular.module('app.player', [
        'ui.router',
        'ngMaterial',
        'ngMdIcons',
        'angular-popover',
        'ngAnimate',
        'app.common']);
app.filter('playingTimeIndicator', PlayingTimeIndicator);
app.controller('NowPlayingController', NowPlayingController);
app.controller('VideoController', VideoController);
app.service('IAbstractPlayerListener', IAbstractPlayerListener);
app.service('PlayerService', PlayerService);
app.directive('player', PlayerDirective);
app.constant(PLAYER_GLOBAL_CONTROLS);
app.config(Routing);
export default app;