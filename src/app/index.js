/**
 * TCD Software
 * Created by Dmitrij Rysanow on 16.11.16.
 */
import '../index.html';

import 'angular';
import 'lodash';
import './css/custom.css';
import 'es5-shim';
import 'es5-sham';
import 'jquery';
import 'angular-ui-router';
import 'angular-material';
import 'angular-material/angular-material.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'angular-material-icons';
import 'angular-loading-bar';
import './auth';
import './player';
import './browse';

import SplashScreenController from './controllers/SplashScreenController';
import AppController from './controllers/AppController';
import APP_EVENTS from './controllers/AppController';

const app = angular.module('app', [
            'ui.router',
            'ngMaterial',
            'ngMdIcons',
            'angular-loading-bar',
            'ngAnimate',
            'app.common',
            'app.player',
            'app.browse',
            'app.auth'])
        .config(require('./Routing'))
        .run(function($location) {
            $location.url('/splash');
        });

app.controller('SplashScreenController', SplashScreenController);
app.controller('AppController', AppController);
app.constant('APP_EVENTS', APP_EVENTS);
export default app;