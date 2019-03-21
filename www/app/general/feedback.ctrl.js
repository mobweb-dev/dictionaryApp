(function () {
    'use strict';
    angular.module('app')
        .controller('feedbackCtrl', feedbackCtrl);

    function feedbackCtrl($scope, Storage, Backend, $http, $ionicLoading, $cordovaToast, C, $rootScope, $ionicSideMenuDelegate) {
        var data = {}, fn = {};
        $scope.data = data;
        $scope.fn = fn;

        $scope.toggleLeft = function () {
            console.log('toggle');
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.toggleLeftSideMenu = function () {
            $ionicSideMenuDelegate.toggleLeft();
        };


        fn.contactUs = function (data) {
            // Setup the loader
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            $scope.error = false;
            data.email = $rootScope.user.useremail;

            if (angular.isDefined($rootScope.user.name)) {
                data.name = $rootScope.user.name;
            } else {
                data.name = 'N/A';
            }

            if (angular.isDefined($rootScope.user.phone)) {
                data.phone = $rootScope.user.phone;
            } else {
                data.phone = 'N/A';
            }

            if (angular.isDefined($rootScope.user.address)) {
                data.address = $rootScope.user.address;
            } else {
                data.address = 'N/A';
            }


            // var data = {'data': card};
            $http.post(C.backendUrl + 'contactus', data)
                .then(function (res) {
                    $ionicLoading.hide();
                    console.log('contact ok');
                    console.log(res.data);
                    if (res.data.error == true) {
                        console.log(res.data.msg)
                        $scope.showToast('Sorry, we cant send message', 'short', 'center')
                    } else {
                        $scope.showToast('Your message has been sent', 'short', 'center')
                    }
                });
        };


        $scope.showToast = function (message, duration, location) {
            $cordovaToast.show(message, duration, location).then(function (success) {
                console.log("The toast was shown");
            }, function (error) {
                console.log("The toast was not shown due to " + error);
            });
        }
    }
})();
