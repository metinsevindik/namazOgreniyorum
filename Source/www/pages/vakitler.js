//angular.module('vakitler', [])
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app.vakitler', {
        url: '/vakitler/:vakitId',
        views: {
            'menuContent': {
                templateUrl: 'pages/vakitler.html',
                controller: 'VakitlerCtrl'
            }
        }
    })
})
.controller('VakitlerCtrl', function ($scope, $stateParams, $state) {
    $scope.vakitId = parseInt($stateParams.vakitId);
    $scope.vakitName = "";
    $scope.sections = [];


    $scope.Start = function () {
        $state.go('app.playback', { sections: getCheckedSection(), vakitName: $scope.vakitName })
    }

    var getCheckedSection = function () {
        var selectedSections = [];
        angular.forEach($scope.sections, function (value, key) {
            if (value) {
                selectedSections.push(key.toString());
            }
        });
        return selectedSections;
    }

    $scope.Load = function () {
        for (var i = 1; i <= 5; i++) {
            if (i == $scope.vakitId) {
                for (var j = 1; j <= 5; j++) {
                    $scope.sections[i + "" + j] = true;
                }
            }
        }

        switch ($scope.vakitId) {
            case 1: $scope.vakitName = "SABAH"; break;
            case 2: $scope.vakitName = "ÖĞLE"; break;
            case 3: $scope.vakitName = "İKİNDİ"; break;
            case 4: $scope.vakitName = "AKŞAM"; break;
            case 5: $scope.vakitName = "YATSI"; break;
            default:
                break;
        }
    }
    $scope.Load();
});