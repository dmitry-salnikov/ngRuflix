module.exports = function ($stateProvider) {
            $stateProvider
                .state('auth', {
                    url: '/auth',
                    abstract: true,
                    templateUrl: 'app/auth/tpl/auth.html'
                })
                .state('auth.login', {
                    url: '/login',
                    templateUrl: 'app/auth/tpl/login.html',
                    controller: 'LoginController'
                });
        };
