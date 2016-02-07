myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app.abdest', {
        url: '/abdest',
        views: {
            'menuContent': {
                templateUrl: 'pages/abdest.html'
            }
        }
    })
})