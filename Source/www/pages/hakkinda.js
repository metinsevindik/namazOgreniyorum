myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app.hakkinda', {
        url: '/hakkinda',
        views: {
            'menuContent': {
                templateUrl: 'pages/hakkinda.html',
                controller: 'hakkindaCtrl'
            }
        }
    })
})
.controller('hakkindaCtrl', function ($scope) {
 	$scope.vers=GetLocalVersion()?GetLocalVersion():""; 	
 });