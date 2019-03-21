(function () {
    'use strict';
    angular.module('app')
        .controller('AboutUsCtrl', AboutUsCtrl);

    function AboutUsCtrl($scope, Storage, Backend, $ionicSideMenuDelegate) {
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



    }
})();
