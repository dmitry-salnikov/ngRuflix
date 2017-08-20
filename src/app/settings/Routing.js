/**
 * Created by tcd-primaris on 20.08.17.
 */
export default function ($stateProvider) {
    $stateProvider
        .state(
            'app.settings', {
                url: '/settings',
                templateUrl: 'app/settings/tpl/settings.html',
                controller: 'SettingsController',
                controllerAs: 'vm'
            }
        )


};