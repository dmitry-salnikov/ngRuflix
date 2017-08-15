/**
 * TCD Software
 * Created by Dmitrij Rysanow on 02.03.17.
 */
var angular = require('angular');

var app = angular.module('app.common', []);

app.constant('ENVIRONMENTS', {
    'NWJS': 'NWJS',
    'Browser': 'Browser'
});
app.factory('RutrackerAPI', require('./services/RutrackerAPI'));
app.factory('AuthService', require('./services/AuthService'));
app.factory('Bootstrap', require('./bootstrap/Bootstrap'));
app.factory('LoadBackend', require('./bootstrap/commands/LoadBackend'));
app.factory('PreloadData', require('./bootstrap/commands/PreloadData'));
app.factory('ConfigStore', require('./services/ConfigStore'));
app.factory('TorrentAPI', require('./services/TorrentAPI'));
app.factory('Loki', require('./services/Loki'));
app.factory('Utils', require('./Utils'));

