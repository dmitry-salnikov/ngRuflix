/**
 * TCD Software
 * Created by Dmitrij Rysanow on 16.11.16.
 */

    /**
     * Login controller
     *
     * @param {!angular.scope} $scope
     * @param {$state} $state
     * @param {$mdToast} $mdToast
     * @param {AuthService} AuthService
     * @constructor
     * @ngInject
     * @export
     */
module.exports = function ($scope, $state, $mdToast, AuthService) {
    $scope.username = null;
    $scope.password = null;
    $scope.login = function () {
        AuthService.makeSession({
            username: $scope.username,
            password: $scope.password
        }).then(function () {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Welcome, ' + $scope.username)
                    .hideDelay(3000)
            );
            $state.go('app.browse');
        }, function () {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Cannot login')
                    .hideDelay(3000)
            );
        });
    }
};
