(function () {
    'use strict';
    angular.module('app')
        .factory('AuthService', AuthService);

    function AuthService($http, $q, $rootScope, C, localStorageService, $cordovaToast) {
        return {
            login: login,
            register: register,
            Recover: Recover,
            profile: profile,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            checkEmailCode: checkEmailCode,
            RefreshServerSession: RefreshServerSession,
            SaveTranslations:SaveTranslations
        };


        function login(credentials) {
            return $http
                .post(C.backendUrl + 'auth/login', credentials)
                .then(function (res) {
                    console.log('auth ok');
                    if (res.data.error == true) {
                        return $q.reject(res.data.msg);
                    } else {
                        return res.data.user;

                    }
                }, function errorCallback(response) {
                    console.log('auth err');
                    console.log(response);
                    return $q.reject('Error  response code:' + response.status + response.statusText);

                });
        };

        function register(credentials) {
            return $http
                .post(C.backendUrl + 'auth/register', credentials)
                .then(function (res) {
                    console.log('reg ok');
                    return res.data;
                }, function errorCallback(response) {
                    console.log('reg err');
                    console.log(response);
                    return $q.reject('Error  response code:' + response.status + response.statusText);
                });
        };

        function checkEmailCode(credentials) {
            return $http
                .post(C.backendUrl + 'auth/register/code', credentials)
                .then(function (res) {
                    console.log('reg ok');
                    if (res.data.error == true) {
                        return $q.reject(res.data.msg);
                    } else {
                        return res.data.url;
                    }
                }, function errorCallback(response) {
                    console.log('reg err');
                    console.log(response);
                    return $q.reject('Error  response code:' + response.status + response.statusText);
                });
        };


        function Recover(email) {
            var data = {'email': email};
            return $http
                .post(C.backendUrl + 'auth/password/email', data)
                .then(function (res) {
                    console.log('reg ok');
                    console.log(res);
                    if (res.data.error == true) {
                        return $q.reject(res.data.msg);
                    } else {
                        return res.data;
                    }
                }, function errorCallback(response) {
                    console.log('reg err');
                    console.log(response);
                    return $q.reject('Error  response code:' + response.status + response.statusText);

                });
        };


        function profile() {
            $rootScope.logprofile = $rootScope.logprofile + ' get profile';
            var deferred = $q.defer();
            var LoginedUser = localStorageService.get('LoginedUser');
            console.log(LoginedUser);
            //      alert('Auth'+JSON.stringify(LoginedUser))
            if (LoginedUser == null) {
                $rootScope.logprofile = $rootScope.logprofile + '  from live';
                return $http
                    .get(C.backendUrl + 'profile')
                    .then(function (res) {
                        console.log('first ok');
                        if (res.data.user == undefined) {
                            console.log('not logined1')
                            return $q.reject('not logined');
                        }
                        if (res.data.user.userId == 0 || res.data.user.userId == undefined) {
                            console.log('not logined2');
                            return $q.reject('not logined');
                        } else {
                            console.log(res.data.user.userId);
                            /*      Session.create(res.data.userId, res.data.user.userId,
                             res.data.user.role);*/
                            $rootScope.user = res.data.user;
                            localStorageService.set('LoginedUser', res.data.user);
                            return res.data.user;
                        }

                    }, function errorCallback(response) {
                        return $q.reject('fail');
                    });

            } else {

                $rootScope.logprofile = $rootScope.logprofile + ' from cache ';
                $rootScope.user = LoginedUser;
                deferred.resolve(LoginedUser);
                console.log('111');
                var promise = RefreshServerSession(LoginedUser);
                return deferred.promise;
            }

        };


        function RefreshServerSession(LoginedUser) {
            $rootScope.logprofile = $rootScope.logprofile + '  make refresh request';

            //   var deferred = $q.defer();
            return $http
                .post(C.backendUrl + 'profileRefresh', {user: LoginedUser})
                .then(function (res) {
                    console.log('refresh ok');
                    $rootScope.logprofile = $rootScope.logprofile + '  request finished';
                    $rootScope.logprofile = $rootScope.logprofile + JSON.stringify(res);
                    return $q.resolve();
                }, function errorCallback(response) {
                    $rootScope.logprofile = $rootScope.logprofile + '  requst failed';
                    return $q.reject('fail');
                });
        };

        function isAuthenticated() {
            return !!$rootScope.user.userId;
        };

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return ((this.isAuthenticated() &&
            authorizedRoles.indexOf($rootScope.user.userRole) !== -1) || authorizedRoles.indexOf('all') !== -1);
        };


        function SaveTranslations(PastTranslations) {
            var data = {'PastTranslations': PastTranslations};
            return $http
                .post(C.backendUrl + 'auth/PastTranslations', data)
                .then(function (res) {
                     console.log(res);
                    if (res.data.error == true) {
                        return $q.reject(res.data.msg);
                    } else {
                        return res.data;
                    }
                }, function errorCallback(response) {
                    console.log('reg err');
                    console.log(response);
                    return $q.reject('Error  response code:' + response.status + response.statusText);
                });
        };
    }
})();

