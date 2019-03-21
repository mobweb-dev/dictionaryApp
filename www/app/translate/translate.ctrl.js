(function () {
    'use strict';
    angular.module('app')
        .controller('TranslateCtrl', TranslateCtrl);

    function TranslateCtrl($scope, $stateParams, Storage, $ionicPopup, $http, C, $ionicLoading, $cordovaToast, $ionicPlatform, $location, $ionicSideMenuDelegate, $timeout, $rootScope, $ionicModal, localStorageService, AuthService, $state) {
        var data = {}, fn = {};
        $scope.data = data;
        $scope.fn = fn;
        $scope.SourceLang = "Auto detect";

        $scope.showMenuLanguages2 = false;
        $scope.showMenuLanguages1 = false;
        $scope.resPopup = true
        $scope.PastTranslations = [];
        $scope.debug = '';

        $scope.AvaliableEngine={text:'Linguee', engine:'lingue'};
        $scope.selectedEngine={text:'Google', engine:'google'};

        //           $scope.data.text = $rootScope.logprofile;
        $scope.data.text = '';
        var fromStorage = localStorageService.get('LanguageFrom');
        var toStorage = localStorageService.get('LanguageTo');
        console.log(fromStorage);
        if (fromStorage == null) {
            $scope.LanguageFrom = {code: 'Auto', image: 'images/country/automatic-loading.svg', text: 'Auto'};
        } else {
            $scope.LanguageFrom = fromStorage;
        }

        if (toStorage == null) {
            $scope.LanguageTo = {code: 'en', image: 'images/country/united-kingdom.svg', text: 'English'};
        } else {
            $scope.LanguageTo = toStorage;
        }


        $scope.avaliableLanguages = [
            {code: 'Auto', image: 'images/country/automatic-loading.svg', text: 'Auto'},
            {code: 'en', image: 'images/country/united-kingdom.svg', text: 'English'},
            {code: 'de', image: 'images/country/de.svg', text: 'German'},
            {code: 'fr', image: 'images/country/fr.svg', text: 'French'},
            {code: 'it', image: 'images/country/it.svg', text: 'Italian'},
            {code: 'es', image: 'images/country/es.svg', text: 'Spanish'},
            {code: 'ja', image: 'images/country/ja.svg', text: 'Japanese'},

            {code: 'af', image: 'images/country/za.svg', text: 'Afrikaans'},
            {code: 'sq', image: 'images/country/al.svg', text: 'Albanian'},
            {code: 'am', image: 'images/country/et.svg', text: 'Amharic'},
            {code: 'ar', image: 'images/country/Flag_of_the_Arab_League.svg', text: 'Arabic'},
            {code: 'hy', image: 'images/country/am.svg', text: 'Armenian'},
            {code: 'az', image: 'images/country/az.svg', text: 'Azeerbaijani'},
            {code: 'eu', image: 'images/country/Flag_of_the_Basque_Country.svg', text: 'Basque'},
            {code: 'be', image: 'images/country/by.svg', text: 'Belarusian'},
            {code: 'bn', image: 'images/country/Flag_of_Bangladesh.svg', text: 'Bengali'},
            {code: 'bs', image: 'images/country/Flag_of_Bosnia_and_Herzegovina.svg', text: 'Bosnian'},
            {code: 'bg', image: 'images/country/bg.svg', text: 'Bulgarian'},
            {code: 'ca', image: 'images/country/Flag_of_Catalonia.svg', text: 'Catalan'},
            {code: 'ceb', image: 'images/country/Flag_of_the_Philippines.svg', text: 'Cebuano'},
            {code: 'ny', image: 'images/country/zm.svg', text: 'Chichewa'},
            {code: 'zh-CN', image: 'images/country/cn.svg', text: 'Chinese (Simplified)'},
            {code: 'zh-TW', image: 'images/country/Flag_of_the_Republic_of_China.svg', text: 'Chinese (Traditional)'},
            {code: 'co', image: 'images/country/Flag_of_Corsica.svg', text: 'Corsican'},
            {code: 'hr', image: 'images/country/hr.svg', text: 'Croatian'},
            {code: 'cs', image: 'images/country/cz.svg', text: 'Czech'},
            {code: 'da', image: 'images/country/Flag_of_Denmark.svg', text: 'Danish'},
            {code: 'nl', image: 'images/country/nl.svg', text: 'Dutch'},
            {code: 'eo', image: 'images/country/eu.svg', text: 'Esperanto'},
            {code: 'et', image: 'images/country/ee.svg', text: 'Estonian'},
            {code: 'tl', image: 'images/country/Flag_of_the_Philippines.svg', text: 'Filipino'},
            {code: 'fi', image: 'images/country/fi.svg', text: 'Finnish'},
            {code: 'fy', image: 'images/country/Frisian_flag.svg', text: 'Frisian'},
            {code: 'gl', image: 'images/country/Flag_of_Galicia.svg', text: 'Galician'},
            {code: 'ka', image: 'images/country/ge.svg', text: 'Georgian'},
            {code: 'el', image: 'images/country/gr.svg', text: 'Greek'},
            {code: 'gu', image: 'images/country/in.svg', text: 'Gujarati'},
            {code: 'ht', image: 'images/country/ht.svg', text: 'Haitian Creole'},
            {code: 'ha', image: 'images/country/ng-rng.gif', text: 'Hausa'},
            {code: 'hav', image: 'images/country/Flag_of_Hawaii.svg', text: 'Hawaiian'},
            {code: 'iw', image: 'images/country/Flag_of_Israel.svg', text: 'Hebrew'},
            {code: 'hi', image: 'images/country/in.svg', text: 'Hindi'},
            {code: 'hmn', image: 'images/country/Hmong_flag.svg', text: 'Hmong'},
            {code: 'hu', image: 'images/country/hu.svg', text: 'Hungarian'},
            {code: 'is', image: 'images/country/is.svg', text: 'Icelandic'},
            {code: 'ig', image: 'images/country/Flag_of_Biafra.svg', text: 'Igbo'},
            {code: 'id', image: 'images/country/id.svg', text: 'Indonesian'},
            {code: 'ga', image: 'images/country/Flag_of_Ireland.svg', text: 'Irish'},
            {code: 'jm', image: 'images/country/Flag_of_Indonesia.svg', text: 'Javanese'},
            {code: 'kn', image: 'images/country/Flag_of_Karnataka.svg', text: 'Kannada'},
            {code: 'kk', image: 'images/country/kz.svg', text: 'Kazakh'},
            {code: 'km', image: 'images/country/Flag_of_Cambodia.svg', text: 'Khmer'},
            {code: 'ko', image: 'images/country/kr.svg', text: 'Korean'},
            {code: 'ku', image: 'images/country/Flag_of_Kurdistan.svg', text: 'Kurdish'},
            {code: 'ky', image: 'images/country/Flag_of_Kyrgyzstan.svg', text: 'Kyrgyz'},

            {code: 'lo', image: 'images/country/Flag_of_Laos.svg', text: 'Lao'},
            {code: 'la', image: '', text: 'Latin'},
            {code: 'lv', image: 'images/country/lv.svg', text: 'Latvian'},
            {code: 'lt', image: 'images/country/lt.svg', text: 'Lithuanian'},
            {code: 'lb', image: 'images/country/Flag_of_Luxembourg.svg', text: 'Luxembourgish'},
            {code: 'mk', image: 'images/country/mk.svg', text: 'Macedonian'},
            {code: 'mg', image: 'images/country/mg.svg', text: 'Malagasy'},
            {code: 'ms', image: 'images/country/Flag_of_Malaysia.svg', text: 'Malay'},
            {code: 'ml', image: 'images/country/in.svg', text: 'Malayalam'},
            {code: 'mt', image: 'images/country/mt.svg', text: 'Maltese'},
            {
                code: 'mi',
                image: 'images/country/Tino_Rangatiratanga_Maori_sovereignty_movement_flag.svg',
                text: 'Maori'
            },
            {code: 'mr', image: 'images/country/in.svg', text: 'Marathi'},
            {code: 'mn', image: 'images/country/mn.svg', text: 'Mongolian'},
            {code: 'my', image: 'images/country/Flag_of_Myanmar.svg', text: 'Burmese'},
            {code: 'ne', image: 'images/country/Flag_of_Nepal.svg', text: 'Nepali'},
            {code: 'no', image: 'images/country/no.svg', text: 'Norwegian'},
            {code: 'ps', image: 'images/country/Flag_of_Afghanistan.svg', text: 'Pashto'},
            {code: 'fa', image: 'images/country/Flag_of_Iran.svg', text: 'Persian'},
            {code: 'pl', image: 'images/country/pl.svg', text: 'Polish'},
            {code: 'pt', image: 'images/country/pt.svg', text: 'Portuguese'},
            {code: 'ma', image: 'images/country/in.svg', text: 'Punjabi'},
            {code: 'ro', image: 'images/country/ro.svg', text: 'Romanian'},
            {code: 'ru', image: 'images/country/ru.svg', text: 'Russian'},
            {code: 'sm', image: 'images/country/Flag_of_Samoa.svg', text: 'Samoan'},

            {code: 'gd', image: 'images/country/Flag_of_Scotland.svg', text: 'Scots Gaelic'},
            {code: 'sr', image: 'images/country/Flag_of_Serbia.svg', text: 'Serbian'},
            {code: 'st', image: 'images/country/Flag_of_Lesotho.svg', text: 'Sesotho'},
            {code: 'sn', image: 'images/country/Flag_of_Zimbabwe.svg', text: 'Shona'},
            {code: 'sd', image: 'images/country/Flag_of_Sindh.svg', text: 'Sindhi'},
            {code: 'si', image: 'images/country/Flag_of_Sri_Lanka.svg', text: 'Sinhala'},
            {code: 'sk', image: 'images/country/sk.svg', text: 'Slovak'},
            {code: 'sl', image: 'images/country/Flag_of_Slovenia.svg', text: 'Slovenian'},
            {code: 'so', image: 'images/country/so.svg', text: 'Somali'},
            {code: 'su', image: 'images/country/Flag_of_Sudan.svg', text: 'Sundanese'},
            {code: 'sw', image: 'images/country/Flag_of_Swahili.gif', text: 'Swahili'},
            {code: 'sv', image: 'images/country/Flag_of_Sweden.svg', text: 'Swedish'},
            {code: 'tg', image: 'images/country/Flag_of_Tajikistan.svg', text: 'Tajik'},
            {code: 'ta', image: 'images/country/ta.svg', text: 'Tamil'},
            {code: 'te', image: 'images/country/in.svg', text: 'Telugu'},
            {code: 'th', image: 'images/country/th.svg', text: 'Thai'},
            {code: 'tr', image: 'images/country/tr.svg', text: 'Turkish'},
            {code: 'uk', image: 'images/country/ua.svg', text: 'Ukrainian'},
            {code: 'ur', image: 'images/country/in.svg', text: 'Urdu'},
            {code: 'uz', image: 'images/country/uz.svg', text: 'Uzbek'},

            {code: 'vi', image: 'images/country/Flag_of_Vietnam.svg', text: 'Vietnamese'},
            {code: 'cy', image: 'images/country/Flag_of_Wales_2.svg', text: 'Welsh'},
            {code: 'xh', image: 'images/country/za.svg', text: 'Xhosa'},
            {code: 'yi', image: 'images/country/yi.svg', text: 'Yiddish'},
            {code: 'yo', image: 'images/country/Flag_of_Egbe_Omo_Yoruba.svg', text: 'Yoruba'},
            {code: 'zu', image: 'images/country/ICS_Zulu.svg', text: 'Zulu'},


        ];


        $ionicPlatform.registerBackButtonAction(function (event) {
            //     $scope.showToast($location.path() , 'short', 'center');
            //     event.preventDefault();
            if ($location.path() === "/app/translate") {
                $scope.translate();
            } else {
                $ionicHistory.goBack();
            }
        }, 100);
//}

        $rootScope.$ionicGoBack = function (backCount) {
            //       $scope.showToast('soft' +$location.path() , 'short', 'center');
            if ($location.path() === "/app/translate") {
                $scope.translate();
            }
        };

        $scope.showToast = function (message, duration, location) {
            $cordovaToast.show(message, duration, location).then(function (success) {
                console.log("The toast was shown");
            }, function (error) {
                console.log("The toast was not shown due to " + error);
            });
        };

        $scope.changeFrom = function (from) {
            console.log(from);
            console.log('in stogare');
            console.log(localStorageService.get('LanguageFrom'));
            $scope.LanguageFrom = from;
            $scope.showMenuLanguages1 = false;


            localStorageService.set('LanguageFrom', from);


        };

        $scope.changeTo = function (to) {
            console.log(to);
            $scope.LanguageTo = to;
            $scope.showMenuLanguages2 = false;
            localStorageService.set('LanguageTo', to);
        };

        $scope.showList2 = function () {
            if ($scope.showMenuLanguages2 == true) {
                $scope.showMenuLanguages2 = false
            } else {
                $scope.showMenuLanguages2 = true;
            }

            console.log('click');
        };

        $scope.showList1 = function () {
            if ($scope.showMenuLanguages1 == true) {
                $scope.showMenuLanguages1 = false;
            } else {
                $scope.showMenuLanguages1 = true;
            }

            console.log('click');
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
                //propagnation
                /*        $(window).click(function (e) {
                 $('.choose_color, .filter__menu').removeClass('visible');
                 });*/
                $('.cards__icons .ico_menu').click(function (e) {
                    console.log('stop2');
                    e.stopPropagation();
                });
                /*      $(".current_option").click(function (event) {
                 event.stopPropagation();
                 var customOptionsBlock = $(this).next();
                 console.log($(this));
                 console.log(customOptionsBlock);
                 $(".current_option").removeClass('active');
                 $(this).addClass('active');
                 $(".custom_options").removeClass('active');
                 //      $(".custom_options").addClass('active');
                 customOptionsBlock.addClass('active');
                 });*/


            });
        })();


        $scope.alert = function () {
            console.log(angular.element("#from"));
            console.log('alert');
        }

        $scope.switchLanguageFrom = function (LangCode) {
            $scope.LanguageFrom = {code: 'Auto', image: 'images/country/automatic-loading.svg', text: 'Auto'};
            angular.forEach($scope.avaliableLanguages, function (value, key) {
                //    console.log(value.code + '  '+  LangCode);
                if (value.code == LangCode) {
                    $scope.LanguageFrom = value;
                    localStorageService.set('LanguageFrom', value);
                    console.log(value);
                    //break;
                }
            })
        }


        var inputChangedPromise;
        $scope.inputChanged = function () {
            if ($scope.LanguageFrom.code != 'Auto') {
                return false;
            }
            if (inputChangedPromise) {
                $timeout.cancel(inputChangedPromise);
            }
            inputChangedPromise = $timeout($scope.detectlanguage, 3000);
        }


        /**
         Detect auto language
         */
        $scope.detectlanguage = function () {
            console.log('detect');
            if ($scope.data.text == '') {
                console.log('Empty string');
                return false;
            }
            $http.post(C.backendUrl + 'detect', {text: $scope.data.text}).then(function (res) {
                console.log(res);
                if (res.data.error == false) {
                    console.log(res);
                    if (res.data.language != '') {
                        $scope.switchLanguageFrom(res.data.language);
                    }
                }
            })
        };


        $scope.getPastTranslations = function () {
            if (!angular.isDefined($rootScope.user.useremail)) {
                $scope.PastTranslations = localStorageService.get('PastTranslation');
                console.log($scope.PastTranslations);
                if ($scope.PastTranslations == null) {
                    $scope.PastTranslations = [];
                }
                $rootScope.PastTranslations=$scope.PastTranslations;
            } else {
                $scope.debug = $scope.debug + '  get past';
                $http.get(C.backendUrl + 'getPast').then(function (res) {
                    console.log(res);
                    if (res.data.error == false) {
                        console.log(res);
                        $scope.debug = $scope.debug + ' error false';
                        //                alert('ok');
                        if (res.data.language != '') {
                            $scope.PastTranslations = res.data.past;

                            ////fix country images////
                            angular.forEach($scope.PastTranslations, function (valuePast, key) {
                                var keepGoing = true;
                                console.log(valuePast.translateFrom);
                                angular.forEach($scope.avaliableLanguages, function (valueAval, keyAval) {
                                    if (keepGoing) {
                                        //    console.log(valueAval);
                                        //    console.log(valuePast.translateFrom);
                                        if ((valueAval.code == valuePast.translateFrom) && (!angular.isDefined($scope.PastTranslations[key].FromImage) )) {
                                            $scope.PastTranslations[key].FromImage = valueAval.image;
                                        }
                                        if ((valueAval.code == valuePast.translateTo) && (!angular.isDefined($scope.PastTranslations[key].ToImage)   )) {
                                            $scope.PastTranslations[key].ToImage = valueAval.image;
                                        }
                                        if ((angular.isDefined($scope.PastTranslations[key].FromImage) ) && (angular.isDefined($scope.PastTranslations[key].ToImage) )) {
                                            keepGoing = false;
                                        }
                                    }
                                }, valuePast, key)

                            })
                            /////end fixes////
                        }
                    } else {
                        //            alert(JSON.stringify(res.data));
                        $scope.debug = $scope.debug + ' error true';
                        $scope.debug = $scope.debug + ' runtimeout=' + $scope.runTimeout;
                        $scope.runTimeout = true;
                        var LoginedUser = localStorageService.get('LoginedUser');
                        AuthService.RefreshServerSession(LoginedUser).then(
                            function () {
                                $scope.getPastTranslations();
                                $scope.runTimeout = false;
                            }
                        );
                    }
                });
            }
        };


        $scope.$on("$ionicView.enter", function (scopes, states) {
            $scope.runTimeout = false;
            $scope.debug = $scope.debug + 'Enter';
            $scope.getPastTranslations()
        });

        $scope.switchLang = function () {
            if ($scope.LanguageFrom.code == 'Auto') {
                $scope.showToast('Cant switch to target language "Auto"', 'short', 'top')
                return false;
            }
            var tmp = $scope.LanguageFrom;
            $scope.LanguageFrom = $scope.LanguageTo;
            $scope.LanguageTo = tmp;
            tmp = {};
        }


        $scope.translate = function (engine) {
            console.log('translate');
            if ($scope.data.text == '') {
                console.log('Empty string');
                return false;
            }
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            $scope.data.from = $scope.LanguageFrom.code;
            $scope.data.to = $scope.LanguageTo.code;
            $scope.data.engine =engine;
            console.log($scope.data);
            $http.post(C.backendUrl + 'translate', $scope.data).then(function (res) {
                console.log(res);
                $ionicLoading.hide();
                if (res.data.error == false) {

                    if ($scope.data.from == 'Auto') {

                        if (res.data.language != '') {
                            $scope.switchLanguageFrom(res.data.language);
                            //     $scope.SourceLang = res.data.language + ' detected';
                        } else {
                            //      $scope.SourceLang = res.data.language;
                        }
                    }
                    var alertPopup = $ionicPopup.alert({
                        title: 'Translate',
                        template: res.data.msg
                    });
                    if (angular.isDefined($rootScope.user.usercards)) {
                        $rootScope.user.usercards.total++;
                        localStorageService.set('LoginedUser', $rootScope.user);


                    } else {

                    }
                    //   $scope.resPopup=true;

                    if (angular.isDefined($scope.PastTranslations)) {
                        $scope.PastTranslations.unshift({
                            translateFrom: $scope.LanguageFrom.code,
                            FromImage: $scope.LanguageFrom.image,
                            ToImage: $scope.LanguageTo.image,
                            translateTo: $scope.LanguageTo.code,
                            enteredText: $scope.data.text,
                            translatedText: res.data.msg
                        });
                        if ($scope.PastTranslations.length > 5) {
                            $scope.PastTranslations.pop();
                        }

                    } else {
                        $scope.PastTranslations = [];
                        $scope.PastTranslations.push({
                            translateFrom: $scope.LanguageFrom.code,
                            translateTo: $scope.LanguageTo.code,
                            FromImage: $scope.LanguageFrom.image,
                            ToImage: $scope.LanguageTo.image,
                            enteredText: $scope.data.text,
                            translatedText: res.data.msg
                        });
                    }

                    localStorageService.set('PastTranslation', $scope.PastTranslations);
                    $rootScope.PastTranslations=$scope.PastTranslations;
                }

            }, function errorCallback(response) {
                console.log(response);
                $ionicLoading.hide();
                $scope.showToast('Error with your request', 'short', 'top')
                alert(response.statusText);
            });
            console.log('run translate');
        }


        $scope.ShowCard = function (card, index) {
            if (!angular.isDefined($rootScope.user.useremail)) {
                return false;
            }else {

                console.log("***", card);
                console.log(card.id.id);
                console.log(index);
                $rootScope.indexSlide = index;
                $state.go('app.cardsBig', {cardId: card.id.id, type: 'all'});
            }
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

        $scope.changeEngine=function(){

            console.log('change');
            if($scope.carretClass=='active'){
                $scope.carretClass=''
            }else{
                $scope.carretClass='active'
            }
            if($scope.lvl2=='active'){

                $scope.lvl2=''
            }else{
                $scope.lvl2='active'
            }
        };


        $scope.selectEngine = function(engine){
            $scope.AvaliableEngine=$scope.selectedEngine;
            $scope.selectedEngine = engine;
            $scope.changeEngine();
        }





    }
/*

    $(document).ready(function() {
        $('.button-yellow-carret').click(function() {
            console.log('clck');
            $('.button-yellow-carret').toggleClass('active');
            $('.button-yellow-lvl2').toggleClass('active');
        });
    })

*/

})();
