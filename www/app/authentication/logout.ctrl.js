(function () {
    'use strict';
    angular.module('app')
        .controller('LogoutCtrl', LogoutCtrl);

    function LogoutCtrl($scope, $state, $rootScope, $http, C, localStorageService) {
        var fn = {}, data = {};
        $scope.fn = fn;
        $scope.data = data;


        $scope.$on('$ionicView.beforeEnter', function () {
            //do stuff before enter
            console.log('we in logout');
            $scope.doLogout();
        });
        $scope.doLogout = function () {
            $http.get(C.backendUrl + 'auth/logout')
                .then(function (res) {
                    $rootScope.user = {};
                    localStorageService.clearAll();
                    console.log('go login');
                    $state.go('app.translate');

                });
        }

    }
})();
