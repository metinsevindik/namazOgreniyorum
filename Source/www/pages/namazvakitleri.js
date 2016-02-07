myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app.namazvakitleri', {
        url: '/namazvakitleri',
        views: {
            'menuContent': {
                templateUrl: 'pages/namazvakitleri.html',
                controller: 'namazvakitleriCtrl'
            }
        }
    })
})
.controller('namazvakitleriCtrl', function ($scope, $stateParams, $state) {
    $scope.images=[];

    $scope.showimage=function(path){
        var url=path.replace('/android_asset/www/','');
        FullScreenImage.showImageURL(url);
    }

    $scope.Load=function(){
        $scope.images.push("/android_asset/www/resources/images/vakitler/sabah.png");
        $scope.images.push("/android_asset/www/resources/images/vakitler/ogle.png");
        $scope.images.push("/android_asset/www/resources/images/vakitler/ikindi.png");
        $scope.images.push("/android_asset/www/resources/images/vakitler/aksam.png");
        $scope.images.push("/android_asset/www/resources/images/vakitler/yatsi.png");
        $scope.images.push("/android_asset/www/resources/images/vakitler/vitir.png");
    }

    $scope.Load();
});