var playbackName = 'playback';

//angular.module(playbackName, [])
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app.' + playbackName, {
        url: '/' + playbackName,
        params: { sections: null, vakitName: null },
        views: {
            'menuContent': {
                templateUrl: 'pages/' + playbackName + '.html',
                controller: playbackName + 'Ctrl'
            }
        }
    })
})
.controller(playbackName + 'Ctrl', function ($scope, $stateParams, $interval, $location) {
    $scope.vakitName = $stateParams.vakitName;
    $scope.isPlaying = false;
    $scope.viewMode = "playbackView2";
    $scope.imagePath = getPath() + "images/kiyam.png";
    var tempCurrentIndex = -1;
    var treeDivClassName = "played";
    var treeDivClassNamePlaying = "playing";

    //$rootScope.$on('$locationChangeSuccess', function () {    
    //    var loc = $location.path();
    //    if (loc.startsWith('/app/vakitler')) {
    //        onBackKeyDown()
    //    }
    //});

    $scope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
        if (newUrl.indexOf('#/app/vakitler') != -1 && oldUrl.indexOf('#/app/playback') != -1) {
            onBackKeyDown();
        }
    });

    $scope.Stop = function () {
        SoundPlayer.Stop();
        $scope.isPlaying = false;
    }
    $scope.PlayPause = function () {
        if (!$scope.isPlaying) {
            SoundPlayer.Play(true);
        } else {
            SoundPlayer.Pause();
        }
    }
    $scope.Next = function () {
        SoundPlayer.Next();
    }
    $scope.Back = function () {
        SoundPlayer.Back();
    }

    $scope.changeViewMode = function () {
        if ($scope.viewMode == "playbackView1")
            $scope.viewMode = "playbackView2";
        else
            $scope.viewMode = "playbackView1";
    }
    function onBackKeyDown() {
        SoundPlayer.Stop();
        if (typeof keepScreenOn != "undefined") keepScreenOn.CancelKeepScreenOn();
    }

    var init = function () {
        autoFontSize();
        if (typeof keepScreenOn != "undefined") keepScreenOn.KeepScreenOn();
        var test = "Yükleniyor...";
        $scope.turkce = test;
        $scope.meal = test;

        var sections = $stateParams.sections;
        Namaz.Basla(sections);
        var timer = $interval(function () {
            if (tempCurrentIndex != current.playIndex) {
                tempCurrentIndex = current.playIndex;
                var imagePath = "kiyam.png";
                if (Namaz.rekatList.length > 0) {
                    var currentSound = Namaz.rekatList[current.playIndex];
                    imagePath = (GetGender() == 'ERKEK' ? '' : '2') + currentSound.image;
                    $scope.turkce =currentSound.turkce;
                    $scope.meal =currentSound.meal;

                    if ($scope.viewMode == "playbackView2") {
                        //remove class of Alldivs
                        var allDivs = $(".treeMenu div");
                        allDivs.removeClass(treeDivClassName + " " + treeDivClassNamePlaying);
                        //Add class to playeditems
                        for (var i = 0; i <= current.playIndex; i++) {
                            var li = $(".treeMenu div[index='" + i + "']");
                            li.addClass(treeDivClassName);
                            //Parents div class
                            var parents = li.parents('li');
                            parents.each(function (a, b) {
                                b.firstChild.className = treeDivClassName;
                            });
                        }
                        var currentNode = $(".treeMenu div[index='" + current.playIndex + "']");
                        currentNode.removeClass(treeDivClassName).addClass(treeDivClassNamePlaying);
                    }
                }
                $scope.imagePath = getPath() + "images/" + imagePath;
            }
            if (current.status == 5 || current.status == Media.MEDIA_NONE || current.status == Media.MEDIA_PAUSED || current.status == Media.MEDIA_STOPPED) {
                $scope.isPlaying = false;
                //if (angular.isDefined(timer)) {
                //    $interval.cancel(timer);
                //    timer = undefined;
                //}
            } else {
                $scope.isPlaying = true;
            }
        }, 500);
    }
    init();

    function autoFontSize() {
        angular.forEach($('.autoFontSize'), function (v, i) {
            v.style.fontSize = GetFontSize() + "px";
        });
    }

});