/**
 * TCD Software
 * Created by Dmitrij Rysanow on 16.11.16.
 */
import '../index.html';

import angular from 'angular';
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
import 'angular-animate';
import 'angular-loading-bar';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import './auth';
import './player';
import './browse';
import './settings';
import toLowerCaseFilter from './filters/toLowerCase';
import animatedLogo from './directives/animatedLogo';
import SplashScreenController from './controllers/SplashScreenController';
import AppController from './controllers/AppController';
import APP_EVENTS from './controllers/AppController';

let app = angular.module('app', [
    'ui.router',
    'ngMaterial',
    'ngMdIcons',
    'angular-loading-bar',
    'ngAnimate',
    'pascalprecht.translate',
    'app.common',
    'app.player',
    'app.browse',
    'app.settings',
    'app.auth'])
    .config(require('./Routing'))
    .config(($mdThemingProvider) => {
        $mdThemingProvider.theme('default')
            .primaryPalette('grey')
            .accentPalette('pink');
    })
    .config(($translateProvider) => {
        $translateProvider
            .registerAvailableLanguageKeys(['en_US', 'pl_PL'])
            .preferredLanguage('pl_PL')
            .useStaticFilesLoader({
                prefix: 'app/i18n/locale-',
                suffix: '.json'
            })
            .forceAsyncReload(true)
            .fallbackLanguage('en_US');
    })
    .run(($location) => $location.url('/splash'));
app.directive('animatedLogo', animatedLogo);
app.filter('toLowerCase', toLowerCaseFilter);
app.controller('SplashScreenController', SplashScreenController);
app.controller('AppController', AppController);
app.constant('APP_EVENTS', APP_EVENTS);
export default app;