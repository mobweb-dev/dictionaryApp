(function () {
    'use strict';
    angular.module('app')
        .controller('LoadingCtrl', LoadingCtrl);

    function LoadingCtrl($state, $ionicHistory, Storage) {
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        Storage.getUser().then(function (user) {
            console.log(user);
            $state.go('app.translate');
         /*   if (user) {
                $state.go('app.translate');
            } else {
                $state.go('app.login');
            }*/
        });
    }
})();
