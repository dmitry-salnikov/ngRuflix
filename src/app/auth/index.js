/**
 * For Authentication in RutrackerProvider.
 *
 * TCD Software
 * Created by Dmitrij Rysanow on 02.03.17.
 */

var angular = require('angular');
require('../common');
var app = angular.module('app.auth', [
    'ui.router',
    'ngMaterial',
    'ngMdIcons',
    'ngAnimate',
    'app.common'
    ]);
/**
 * LoginController - login form
 */
app.controller('LoginController', require('./controllers/LoginController'));
app.config(require('./Routing'));
export default app;
