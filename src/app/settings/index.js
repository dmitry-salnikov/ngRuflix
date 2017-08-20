/**
 * Created by tcd-primaris on 20.08.17.
 */
import angular from 'angular';
import routing from './Routing';
import SettingsController from './controller/SettingsController';

let app = angular.module('app.settings', ['ngMaterial','ui.router']);
app.controller('SettingsController', SettingsController);
app.config(routing);
export default app;