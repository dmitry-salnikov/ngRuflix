/**
 * Created by tcd-primaris on 20.08.17.
 */
export default function ($stateProvider) {
    $stateProvider
        .state(
            'app.settings', {
                url: '/settings',
                templateUrl: './tpl/settings.tpl.html',
                controller: 'SettingsController',
                controllerAs: 'vm'
            }
        )
};