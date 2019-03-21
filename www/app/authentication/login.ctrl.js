(function () {
    'use strict';
    angular.module('app')
        .controller('LoginCtrl', LoginCtrl);

    function LoginCtrl($scope, $state, Storage, AuthService, $cordovaToast, $ionicLoading,$cordovaDevice, $ionicPlatform) {
        var fn = {}, data = {};
        $scope.fn = fn;
        $scope.data = data;
        $scope.loginError = false;
        data.credentials = {
            login: '',
            password: ''
        };
        $scope.isReady=0;









        fn.login = function (credentials) {
            // Setup the loader
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            $scope.error = false;
            AuthService.login(credentials).then(function (user) {
                console.log('done login');
                $ionicLoading.hide();
                if (user.activated == false) {
                    $scope.showToast('Your email not verified yet', 'short', 'top')
                } else {
                    AuthService.profile();
                    $state.go('app.translate');
                }

            }, function (r) {
                $ionicLoading.hide();
                console.log('fail login');
                $scope.loginError = true;
                $scope.LoginErrorMsg = r;
                $scope.showToast(r, 'short', 'center')
                console.log(r);
            });
        };

        $scope.showToast = function (message, duration, location) {
            $cordovaToast.show(message, duration, location).then(function (success) {
                console.log("The toast was shown");
            }, function (error) {
                console.log("The toast was not shown due to " + error);
            });
        }
        $scope.GotoLink = function (url) {
            window.open(url, '_system');
        }
    }
})();
