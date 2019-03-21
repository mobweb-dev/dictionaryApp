(function () {
    'use strict';
    angular.module('app')
        .controller('RegisterCtrl', RegisterCtrl);

    function RegisterCtrl($scope, $state, Storage, AuthService, $cordovaToast, $ionicLoading, $timeout, $http, C, localStorageService ) {
        var fn = {}, data = {};
        $scope.fn = fn;
        $scope.data = data;
        $scope.LoginTaken = false;
        $scope.NeedCode = false;
        $scope.EmailError = false;
        $scope.EmailMsg = '';

        $scope.CodeError = false;
        $scope.CodeMsg = '';

        data.credentials = {
            login: '',
            password: '',
            email: '',
            phone: '',
            token: ''

        };

        fn.register = function (credentials) {
            // Setup the loader
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $scope.error = false;

            console.log($scope.NeedCode);
            if ($scope.NeedCode == false) {
                console.log('reg');
                AuthService.register(credentials).then(function (user) {
                    console.log(user);
                    $ionicLoading.hide();
                    if (user.error == true) {
                        $scope.showToast(user.msg, 'short', 'top')
                        console.log('error register');
                        if (user.msg == 'You must enter valid email') {
                            $scope.EmailError = true;
                            $scope.EmailMsg = 'You must enter valid email';
                        }else if(user.msg=='email already taken'){
                            $scope.EmailError = true;
                            $scope.EmailMsg = 'This email already taken';
                        }
                    } else {
                        $scope.showToast('A confirmation code was sent to your email', 'short', 'top')
                        console.log('done register');
                        $scope.NeedCode = true;
                    }
                    //         AuthService.profile();
                    //         $state.go('app.cards');
                }, function (r) {
                    console.log('fail login');
                    console.log(r);
                    $ionicLoading.hide();
                    $scope.showToast('Error during registration', 'short', 'top')
                });

            } else {
                $scope.checkEmailCode(credentials);

            }
        };

        $scope.checkEmailCode = function (data) {
            // Setup the loader
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            console.log('check');
            $scope.error = false;
            AuthService.checkEmailCode(data).then(function (user) {
                $ionicLoading.hide();
                $scope.showToast('Ok, we are good to go!', 'short', 'top')
                console.log('done register');
                //		$scope.NeedCode=true;
                AuthService.profile();
                //check if we have in local storage translatedcards - save them to server
                $scope.PastTranslations = localStorageService.get('PastTranslation');
                if ($scope.PastTranslations == null) {
                    $state.go('app.translate');


                }else{
                    AuthService.SaveTranslations($scope.PastTranslations).then(function(){
                        $state.go('app.translate');
                    });
                }

            }, function (r) {
                console.log('fail login');
                console.log(r);
                $ionicLoading.hide();
                $scope.showToast('Error while verification', 'short', 'top')
                $scope.CodeError = true;
                $scope.CodeMsg = 'Error while verification';
            });
        };


        $scope.showToast = function (message, duration, location) {
            $cordovaToast.show(message, duration, location).then(function (success) {
                console.log("The toast was shown");
            }, function (error) {
                console.log("The toast was not shown due to " + error);
            });
        };

        $scope.GotoLink = function (url) {
            window.open(url, '_system');
        };


        var inputChangedPromise;
        $scope.inputChanged = function () {
            if (inputChangedPromise) {
                $timeout.cancel(inputChangedPromise);
            }
            inputChangedPromise = $timeout($scope.checkUsername, 1000);
        };


        /**
         Check if username avaliable
         */
        $scope.checkUsername = function () {
            console.log('detect');
            if ($scope.data.credentials.login == '') {
                console.log('Empty string');
                return false;
            }
            $http.post(C.backendUrl + 'auth/register/username', {login: $scope.data.credentials.login}).then(function (res) {
                console.log(res);
                if (res.data.error == false) {
                    console.log(res);
                    if (res.data.user == true) {
                        $scope.LoginTaken = true;
                        $scope.showToast('Username already exists', 'short', 'top')
                    } else {
                        $scope.LoginTaken = false;
                    }
                }
            })
        };
    }
})();
