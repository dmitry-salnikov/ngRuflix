/**
 * Created by kinia on 22.04.17.
 */
export default function ($translate, $scope, $mdSidenav) {
    'use strict';
    var vm = this;
    vm.languages = [{
        'langkey': 'pl_PL',
        'langname': 'Polski'
    },
        {
            'langkey': 'en_US',
            'langname': 'English'
        }
    ];
    vm.currentLanguage = vm.languages[0].langkey;
    $scope.$watch('vm.currentLanguage', function (newVal) {
        $translate.use(newVal);
    });

    vm.toggleSidenav = function() {
        $mdSidenav('left')
            .toggle();
    };

}
