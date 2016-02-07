angular.module('Dualar', []).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app.dualar', {
        url: '/dualar',
        views: {
            'menuContent': {
                templateUrl: 'pages/dualar.html',
                controller: 'dualarCtrl'
            }
        }
    })
})
.controller('dualarCtrl', function ($scope, $stateParams, $state, $interval,$ionicPlatform,$ionicPopup) {
    $scope.dualar = dualar;
    $scope.selectedDua = $scope.dualar[5];
    $scope.isPlaying = false;
    $scope.tekrar = false;
    current.playIndex = 0;
    var tempIndex = -1;

    if (typeof keepScreenOn != "undefined") keepScreenOn.KeepScreenOn();

    SoundPlayer.Playlist = dualar.map(function (r) { return r.path; });

    $scope.Next = function () {
        SoundPlayer.Next();
    }
    $scope.Stop = function () {
        SoundPlayer.Stop();
        $scope.isPlaying = false;
    }
    $scope.PlayPause = function () {
        if (!$scope.isPlaying) {
            $scope.isPlaying = true;
            SoundPlayer.Play(true);
        } else {
            $scope.isPlaying = false;
            SoundPlayer.Pause();
        }
    }
    $scope.Back = function () {
        SoundPlayer.Back();
    }

    $scope.ChangeDua = function (dua) {
       angular.forEach(dualar, function (v, i) {
            if (dua.duaAdi == v.duaAdi) {
                current.playIndex = i;
                if ($scope.isPlaying) {
                    SoundPlayer.Stop();
                    SoundPlayer.Play(true);
                };
                return;
            }
        });
    }

    $scope.tekrarChange=function(val){
        SoundPlayer.tekrar=val;
    }

    var dualarTimer = $interval(function () {
        if (current.playIndex != tempIndex) {
            $scope.selectedDua = $scope.dualar[current.playIndex]; 
            tempIndex = current.playIndex;
        }
    }, 500);

    $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
        if (oldUrl.indexOf('#/app/dualar') != -1) {
            SoundPlayer.Stop();
        }
    });

});