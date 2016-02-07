//angular.module('anasayfa', [])
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app.anasayfa', {
        url: '/anasayfa',
        views: {
            'menuContent': {
                templateUrl: 'pages/anasayfa.html',
                controller: 'AnsayfaCtrl'
            }
        }
    });
})
.controller('AnsayfaCtrl', function ($state, $scope, $stateParams,$ionicPlatform,$ionicPopup) {

    $scope.stop = function () {
        SoundPlayer.stop();
    }

     $ionicPlatform.registerBackButtonAction(function () {
        var curUrl= $state.current.url;
        if (curUrl=="/anasayfa" || curUrl=="/settings" || curUrl=="/dualar" || curUrl=="/namazvakitleri") {
            var confirmPopup = $ionicPopup.confirm({
             title: 'Uyarı',
             template: 'Çıkmak istediğinize emin misiniz?'
           });

           confirmPopup.then(function(res) {
             if(res) {
                SoundPlayer.Stop();
                navigator.app.exitApp();
             } else {
               return;
             }
           });
        }else{
            navigator.app.backHistory();
        };
    }, 100);

});