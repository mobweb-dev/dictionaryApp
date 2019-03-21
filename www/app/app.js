(function () {
    'use strict';
    angular.module('app', ['ionic', 'ngCordova', 'LocalStorageModule'])
        .config(configBlock)
        .run(runBlock);

    function configBlock($stateProvider, $urlRouterProvider, $provide, $httpProvider, $locationProvider, $ionicConfigProvider, localStorageServiceProvider) {


        $ionicConfigProvider.tabs.position('bottom'); // other values: top
        //       $ionicConfigProvider.views.maxCache(0);


        localStorageServiceProvider
            .setPrefix('leaKnows');


        $stateProvider
            .state('loading', {
                url: '/loading',
                template: '<ion-spinner style="text-align: center; margin-top: 50%;"></ion-spinner>',
                controller: 'LoadingCtrl',
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })

            .state('forgotPassword', {
                url: '/forgotPassword',
                templateUrl: 'app/authentication/forgotPassword.html',
                controller: 'forgotPasswordCtrl',
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })



            .state('logout', {
                url: '/logout',

                controller: 'LogoutCtrl',
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/layout/layout.html',
                controller: 'LayoutCtrl',
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                },
                resolve: {
            /*        user: function ($stateParams, AuthService) {
                        console.log('try to resolve');

                        //              alert ('try resolve');
                        return AuthService.profile();
                    }*/
                }
            })



            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'app/authentication/login.html',
                        controller: 'LoginCtrl'
                    }
                },
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })

            .state('app.register', {
                url: '/register',
                views: {
                    'menuContent': {
                        templateUrl: 'app/authentication/register.html',
                        controller: 'RegisterCtrl'
                    }
                },


                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })




            .state('app.twitts', {
                url: '/twitts',
                views: {
                    'menuContent': {
                        templateUrl: 'app/twitts/twitts.html',
                        controller: 'TwittsCtrl'
                    }
                },
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })
            .state('app.twitt', {
                url: '/twitts/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'app/twitts/twitt.html',
                        controller: 'TwittCtrl'
                    }
                },
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })
            .state('app.translate', {
                url: '/translate',
                views: {
                    'menuContent': {
                        templateUrl: 'app/translate/translate.html',
                        controller: 'TranslateCtrl'
                    }
                },
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })

            .state('app.cards', {
                url: '/cards/:type',
                views: {
                    'menuContent': {
                        templateUrl: 'app/cards/cards.html',
                        controller: 'CardsCtrl'
                    }
                },
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })
            .state('app.cardsBig', {
                url: '/cardsbig/:cardId/:type',
                views: {
                    'menuContent': {
                        templateUrl: 'app/cards/cardsBig.html',
                        controller: 'CardsBigCtrl'
                    }
                },
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })

            .state('app.AboutUs', {
                url: '/aboutus',
                views: {
                    'menuContent': {
                        templateUrl: 'app/general/aboutus.html',
                        controller: 'AboutUsCtrl'
                    }
                },
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })
            .state('app.ContactUs', {
                url: '/contactus',
                views: {
                    'menuContent': {
                        templateUrl: 'app/general/contactus.html',
                        controller: 'ContactUsCtrl'
                    }
                },
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })
            .state('app.feedback', {
                url: '/feedback',
                views: {
                    'menuContent': {
                        templateUrl: 'app/general/feedback.html',
                        controller: 'feedbackCtrl'
                    }
                },
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            })
            .state('app.settings', {
                url: '/settings',
                views: {
                    'menuContent': {
                        templateUrl: 'app/settings/settings.html',
                        controller: 'SettingsCtrl',
                        resolve: {
                            resolvedSettings: function (Storage) {
                                return Storage.getUserSettings();
                            }
                        }
                    }
                },
                data: {
                    authorizedRoles: ['users', 'admin', 'all']
                }
            });

        $urlRouterProvider.otherwise('/app/translate');

        // catch Angular errors
        $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
            return function (exception, cause) {
                $delegate(exception, cause);
                var data = {};
                if (cause) {
                    data.cause = cause;
                }
                if (exception) {
                    if (exception.message) {
                        data.message = exception.message;
                    }
                    if (exception.name) {
                        data.name = exception.name;
                    }
                    if (exception.stack) {
                        data.stack = exception.stack;
                    }
                }
                Logger.error('Angular error: ' + data.message, {cause: data.cause, stack: data.stack});
            };
        }]);


        $httpProvider.defaults.withCredentials = true;

        /*      $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
         });
         */

    }

    // catch JavaScript errors
    window.onerror = function (message, url, line, col, error) {


        alert('Error: ' + message + ' Script: ' + url + ' Line: ' + line);


        /*    var stopPropagation = false;
         var data = {};
         if (message) {
         data.message = message;
         }
         if (url) {
         data.fileName = url;
         }
         if (line) {
         data.lineNumber = line;
         }
         if (col) {
         data.columnNumber = col;
         }
         if (error) {
         if (error.name) {
         data.name = error.name;
         }
         if (error.stack) {
         data.stack = error.stack;
         }
         }
         if (navigator) {
         if (navigator.userAgent) {
         data['navigator.userAgent'] = navigator.userAgent;
         }
         if (navigator.platform) {
         data['navigator.platform'] = navigator.platform;
         }
         if (navigator.vendor) {
         data['navigator.vendor'] = navigator.vendor;
         }
         if (navigator.appCodeName) {
         data['navigator.appCodeName'] = navigator.appCodeName;
         }
         if (navigator.appName) {
         data['navigator.appName'] = navigator.appName;
         }
         if (navigator.appVersion) {
         data['navigator.appVersion'] = navigator.appVersion;
         }
         if (navigator.product) {
         data['navigator.product'] = navigator.product;
         }
         }
         Logger.error('JavaScript error: ' + data.message, {cause: data.cause, stack: data.stack});
         return stopPropagation;*/
    };
/*
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
       alert(device.uuid );

    }

*/

    function runBlock($rootScope, $http, AuthService, $state, $ionicPlatform) {

        $ionicPlatform.ready(function () {

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            /*
             ionic.Platform.fullScreen();
             if (window.StatusBar) {
             StatusBar.overlaysWebView(true);
             return StatusBar.hide();
             }*/

            //hide the status bar using the StatusBar plugin
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.overlaysWebView(true)
                StatusBar.hide();
                ionic.Platform.fullScreen();
            }


            /*       if(window.StatusBar) {
             // Set the statusbar to use the default style, tweak this to
             // remove the status bar on iOS or change it to use white instead of dark colors.
             //       StatusBar.styleDefault();

             StatusBar.hide();
             }
             */

        });


        $rootScope.user = {};
        AuthService.profile().then(function (user, $state) {
            console.log('promise ok first. User logined');
            //       $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginSuccess);
            //   $scope.setCurrentUser(user);
        }, function (r) {
           	console.log('user not logined');
            //	console.log(r);
            //	$scope.error = r;
            console.log($state.is('RegisterFail'));
            if ($state.is('app.register')) {
            } else {
                $state.go('app.translate');
            }
            //         $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginFailed);
        });


//////////////////////////////////
        $rootScope.$watch(function () {
            return $state.$current.name
        }, function (newVal, oldVal) {
            console.log(oldVal + ' => ' + newVal);
        })

        $rootScope.$on('$stateChangeStart', function (event, next) {

            if (!angular.isDefined($rootScope.user.userId)) {
                if (next.name == 'logout' ) {
                    console.log('state is logout');
                    return next;
                }
                console.log(next);
                AuthService.profile().then(function () {
                    console.log('promise ok check');
                    var authorizedRoles = next.data.authorizedRoles;
                    console.log(authorizedRoles);
                    console.log(next);
                    if (!AuthService.isAuthorized(authorizedRoles)) {
                        event.preventDefault();
                        if (AuthService.isAuthenticated()) {
                            console.log('user is not allowed');
                            $state.go('app.translate');
                        } else {
                            console.log('user is not logged in');
                            $state.go('app.translate');
                        }
                    } else {
                        console.log(next.name);
                    }
                }, function (reason) {
                    //              $state.go('login');
                    console.log(reason);
                });

            } else {
                var authorizedRoles = next.data.authorizedRoles;
                console.log(authorizedRoles);
                console.log(next);
                if (next.name == 'logout') {
                    console.log('state is logout');
                    //           console.log(next);
                    return next;

                }
                if (!AuthService.isAuthorized(authorizedRoles)) {
                    event.preventDefault();
                    if (AuthService.isAuthenticated()) {
                        console.log('user is not allowed');
                        $state.go('app.translate');
                        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.notAuthorized);
                    } else {
                        console.log('user is not logged in');
                        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.notAuthenticated);
                        $state.go('app.Login');
                    }
                }
            }
        });

//////////////////////////////////
        $rootScope.safeApply = function (fn) {
            var phase = this.$root ? this.$root.$$phase : this.$$phase;
            if (phase === '$apply' || phase === '$digest') {
                if (fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
    }
})();
