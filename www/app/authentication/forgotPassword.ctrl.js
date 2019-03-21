(function () {
    'use strict';
    angular.module('app')
        .controller('forgotPasswordCtrl', forgotPasswordCtrl);

    function forgotPasswordCtrl($scope, $state, Storage, AuthService, $cordovaToast, $ionicLoading, $http, C, $timeout) {
        var fn = {}, data = {};
        $scope.fn = fn;
        $scope.data = data;


        $scope.recoveryEmailSend = false;
        $scope.recoveryCode = '';

        $scope.NewPassword = '';
        $scope.email = '';
        data.credentials = {
            login: '',
            password: ''
        };

        fn.recovery = function () {
            // Setup the loader
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            $scope.error = false;

            if ($scope.recoveryEmailSend == true) {
                console.log($scope.recoveryCode);
                if ($scope.recoveryCode == '') {
                    $scope.showToast('Please enter recovery code', 'short', 'top')
                    $ionicLoading.hide();
                    return false;
                }

                if ($scope.NewPassword == '') {
                    $scope.showToast('Please enter new password', 'short', 'top')
                    $ionicLoading.hide();
                    return false;
                }


                var data = {email: $scope.email, token: $scope.recoveryCode, password: $scope.NewPassword};
                $scope.changePassword(data);
                $ionicLoading.hide();
            } else {

                AuthService.Recover($scope.email).then(function (data) {
                    $ionicLoading.hide();
                    $scope.showToast('A recovery link was sent to your email', 'short', 'top')
                    console.log(data);
                    if (data.error == true) {
                        $scope.showToast(data.msg, 'short', 'top')
                        $scope.recoveryEmailSend = false;
                    } else {
                        $scope.recoveryEmailSend = true;
                    }
                    //         AuthService.profile();
                    //           $state.go('app.cards');
                }, function (r) {
                    console.log('fail login');
                    console.log(r);
                    $ionicLoading.hide();
                    $scope.showToast(r, 'short', 'top')
                });
            }
        };


        $scope.changePassword = function (data) {
            $http.post(C.backendUrl + 'auth/password/change', data)
                .then(function (res) {
                    console.log('cards ok');
                    $ionicLoading.hide();
                    if (res.data.error == true) {
                        console.log(res.data.msg)
                        $scope.showToast(res.data.msg, 'short', 'center')
                    } else {
                        $scope.showToast('Password updated', 'short', 'center')
                        $state.go('app.login');
                    }
                });
        }


        $scope.showToast = function (message, duration, location) {

            $timeout(function () {

                $cordovaToast.show(message, duration, location).then(function (success) {
                    console.log("The toast was shown");
                }, function (error) {
                    console.log("The toast was not shown due to " + error);
                });

            }, 1000);





        }
    }
})();
