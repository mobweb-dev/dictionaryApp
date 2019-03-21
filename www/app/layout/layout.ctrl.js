(function () {
    'use strict';
    angular.module('app')
        .controller('LayoutCtrl', LayoutCtrl);

    function LayoutCtrl( $scope, $rootScope, $ionicPopup) {
        var fn = {};
        $scope.fn = fn;

        $scope.toggleGroup = function (group) {
            if ($scope.isGroupShown(group)) {
                $scope.shownGroup = null;
            } else {
                $scope.shownGroup = group;
            }
        };
        $scope.isGroupShown = function (group) {
            return $scope.shownGroup === group;
        };
        (function () {
            $(function () {

                //single_card__body tap to view
                $('.single_card__body').click(function () {
                    $(this).next('.single_card__answer').addClass('visible');
                });
                $('.single_card__answer .ico_close').click(function () {
                    $(this).closest('.single_card__answer').removeClass('visible');
                });

                $('body').on('click','._with_submenu',function () {
                    $(this).next('.menu__submenu').toggleClass('active');
                    $(this).find('span').toggleClass('active');
                })

                //cards
                $('.cards__icons .ico_delete').click(function () {
                    $(this).closest('.cards__item').find('.cards__delete').addClass('active');
                });
                $('.cards__icons .ico_archive').click(function () {
                    $(this).closest('.cards__item').find('.cards__archive').addClass('active');
                });
                $('.cards__icons .ico_menu').click(function () {
                    $(this).find('.choose_color').addClass('visible');
                });
                $('.ico_star').click(function () {
                    $(this).find('img').attr('src', 'images/star.png');
                });


            });
        })();

        fn.logout = function () {
            $rootScope.user = {};
        };
        // An alert dialog
        $scope.showLoginAlert = function () {
            var alertPopup = $ionicPopup.alert({
                title: 'Authorization required',
                template: 'Login to unlock feature'
            });
            alertPopup.then(function (res) {
                console.log('alert closed');
            });
        };
    }
})();
