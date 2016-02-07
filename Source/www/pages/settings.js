var pageName = 'settings';

//angular.module(pageName, [])
myApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('app.' + pageName, {
        url: '/' + pageName,
        views: {
            'menuContent': {
                templateUrl: 'pages/' + pageName + '.html',
                controller: 'settingsCtrl'
            }
        }
    })
})
.controller('settingsCtrl', function ($scope, $stateParams, $interval) {
    $scope.selectedSpeed = GetSoundSpeed() ? GetSoundSpeed() : "ORTA";
    $scope.genders = ['ERKEK', 'KADIN'];
    $scope.speeds = {};
    $scope.downloaded = 0;
    $scope.downloadLength = 0;
    $scope.loading = false;
    $scope.selectedGender = GetGender() ? GetGender() : "KADIN";
    $scope.oran = 0;
    $scope.selectedFontSize =  GetFontSize() ? parseInt(GetFontSize()) : 8;
    $scope.fontSizes = [6, 8, 10, 12, 14, 16];    
    $scope.speeds = ["YAVAŞ","ORTA","HIZLI"];
    $scope.updateControl = GetUpdateControl()=='true';
    
    $scope.selectGender = function (select) {
        SetGender(select);
    };

    $scope.updateControlSelect=function(select){
        SetUpdateControl(select);
    }

    var GetSpeed = function (val) {
        switch (val) {
            case "YAVAŞ": return -1; break;
            case "ORTA": return 0; break;
            case "HIZLI": return 1; break;
            default: return 0;
        }
    }
    var selectSpeed=0;
    $scope.download = function (val) {
        selectSpeed=val;
        var numberVal = GetSpeed(val);
        if (numberVal != 0) {
            window.resolveLocalFileSystemURL(getSoundPath(numberVal)+"zulkemalelhamdulillah.mp3", 
            function(){
                SetSoundSpeed(val);
                Toast("Ayarlarınız Kaydedildi.");
            }, 
            function(){
                if (window.confirm("Hız ayarınız bir defaya mahsus, internet üzerinden indirilecektir. Bu işlem yaklaşık olarak 15 Mb veri kullanılır. Devam etmek istiyor musunuz?")) {
                    var isOnline = IsConnected();
                    if (isOnline) {
                        Downloader.download(numberVal);
                        $scope.downloadLength = files.length;
                        $scope.loading = true;
                        SetDownloadedSpeed(val);
                        var downloadStartTime=new Date();
                        var timer = $interval(function () {
                            var downloadEndTime=new Date();
                            if ((downloadEndTime - downloadStartTime)/1000 > 15 && downloaded==0) {
                                //indirme tamamlanamadı.
                                    testLog("Timer Bitir");
                                    $scope.loading = false;
                                    $interval.cancel(timer);
                                    timer = undefined;
                                    Toast("İndirme işlemi tamamlanamadı. Eski ayarlarınız geçerli olacak.");
                                    window.location.reload();
                            }else if (endReadFiles) {
                                $scope.downloaded = downloaded;
                                testLog("$scope.downloaded :" + $scope.downloaded + "-" + downloaded);
                                var oran = parseInt(parseInt(downloaded) / parseInt(files.length) * 100);
                                $scope.oran = oran ? oran : 0;
                                if (files.length <= downloaded) {
                                    testLog("Timer Bitir");
                                    $scope.loading = false;
                                    $interval.cancel(timer);
                                    timer = undefined;
                                    SetSoundSpeed(selectSpeed);
                                    Toast("İndirme işlemi tamamlandı. Ayarlarınız kaydedildi.");
                                }
                            }
                        }, 500);
                    } else {
                        Toast("İnternet bağlantınız olmadığından indirme işlemi gerçekleştirilemiyor.");
                        window.location.reload();
                    }
                } else {
                    //Selecti eski seçilene döndürecek başka birşey bulamadım, mecbur sayfa refresh ediyoruz
                    window.location.reload();
                }
            });
        } else {
                    SetSoundSpeed(val);
                    Toast("Ayarlarınız Kaydedildi.");
                }
    }


    $scope.FontSizeChange = function (val) {
        SetFontSize(val);
    }
});