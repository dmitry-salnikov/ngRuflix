/**
* TCD Software
* Created by Dmitrij Rysanow on 29.12.16.
*/
/**
 *
 * @param {Bootstrap} Bootstrap
 * @param {*} $state
 * @param {*} AuthService
 * @param {*} $rootScope
 * @constructor
 * @ngInject
 */
export default function (Bootstrap,
                                $state,
                                AuthService,
                                $rootScope) {
    'use strict';
    var vm = this;
    /**
     * Contains successfulness status
     * @type {boolean}
     */
    vm.error = false;
    /**
     *
     * @type {boolean}
     */
    $rootScope.offlineMode = false;
    function init() {
        Bootstrap.run().then(next, onError);
    }

    function onError(e) {
        console.error('Error', e.message);
        console.error(e.stack);
        $state.go('app.browse');
    }

    /**
     * Should run after successful Bootstrap,
     * decides where to go - login or dashboard
     */
    function next() {
        console.log('Bootstrap ended');
        if (AuthService.getEnabled()) {
            AuthService.checkoutSession().then(function(session) {
                if (!session.logged) {
                    console.log('Not logged, move to login');
                    $state.go('auth.login');
                } else {
                    console.log('Logged as ' + session.username);
                    $state.go('app.browse');
                }
            }, onError);
        } else {
            console.log('Auth Disabled');
            $state.go('app.browse');
        }
    }
    init();
};
