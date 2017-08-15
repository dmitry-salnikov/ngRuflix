/**
 * TCD Software
 * Created by Dmitrij Rysanow on 16.11.16.
 */

import 'angular';
import 'lodash';
import '../forked_modules/angular-popover/dist/js/ngPopover.min';
import '../forked_modules/angular-popover/dist/css/ngpopover.css';
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
import './auth/index';
import './player/index';
import './browse/index';

import SplashScreenController from './controllers/SplashScreenController';

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
