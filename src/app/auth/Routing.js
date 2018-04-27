module.exports = function ($stateProvider) {
            $stateProvider
                .state('auth', {
                    url: '/auth',
                    abstract: true,
                    templateUrl: './tpl/auth.tpl.html'
                })
                .state('auth.login', {
                    url: '/login',
                    templateUrl: './tpl/login.tpl.html',
                    controller: 'LoginController'
                });
        };
