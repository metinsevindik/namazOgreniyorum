var Namaz = function () {

};
Namaz.rekatList = [];
Namaz.Basla = function (sections) {
    Namaz.rekatList = [];
    if (typeof cordova != 'undefined') {
        var settingFilePath = cordova.file.applicationDirectory + "www/resources/settings.xml";
        window.resolveLocalFileSystemURL(settingFilePath, function (fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (evt) {
                    var xml = evt.target.result;
                    fileObject = xml;
                    ParseXml(xml);
                };
                reader.readAsText(file);
            });
        }, fail);
        function ParseXml(xml) {
            var tempSectIndex = -1;
            var sureIndex = -1;
            var sureler = [];
            $(xml).find("sure").each(function () {
                var sure = new Object();
                sure.path = $(this).attr("path");
                sure.image = $(this).attr("image");
                sure.meal = $(this).attr("meal");
                sure.turkce = $(this).attr("turkce");
                sure.duaAdi = $(this).attr("duaAdi");
                sure.sira = $(this).attr("sira");
                sureler.push(sure);
            });
            sureler = _.sortBy(sureler, 'sira');
            var vakitler=$(xml).find("vakit");
            var sesler=$(xml).find("ses");
            var dualar=$(xml).find("dua");
            angular.forEach(sections, function (section, sectIndex) {
                var vakitNo = section[0];
                var section = section[1];

                vakitler.each(function () {
                    var rekat = new Object();
                    rekat.no = $(this).attr("no");
                    rekat.section = $(this).attr("section");
                    rekat.rekat = $(this).attr("rekat");
                    rekat.path = $(this).attr("path");
                    rekat.image = $(this).attr("image");
                    rekat.meal = $(this).attr("meal");
                    rekat.turkce = $(this).attr("turkce");
                    rekat.duaAdi = $(this).attr("duaAdi");
                    rekat.dua = $(this).attr("dua");
                    rekat.sure = $(this).attr("sure");
                    rekat.ses = $(this).attr("ses");
                    
                    if (vakitNo == rekat.no && section == rekat.section) {
                        if (rekat.dua) {
                            dualar.each(function () {
                                if ($(this).attr("name").toLowerCase() == rekat.dua.toLowerCase()) {
                                    rekat.path = $(this).attr("path");
                                    rekat.image = $(this).attr("image");
                                    rekat.meal = $(this).attr("meal");
                                    rekat.turkce = $(this).attr("turkce");
                                    rekat.duaAdi = $(this).attr("duaAdi");
                                }
                            });
                        } else if (rekat.sure) {
                            sureIndex++;
                            if (tempSectIndex != sectIndex) {
                                tempSectIndex = sectIndex;
                                sureIndex = _.random(0, sureler.length - 5);
                            }
                            rekat.path = sureler[sureIndex].path;
                            rekat.image = sureler[sureIndex].image;
                            rekat.meal = sureler[sureIndex].meal;
                            rekat.turkce = sureler[sureIndex].turkce;
                            rekat.duaAdi = sureler[sureIndex].duaAdi;
                            rekat.sira = sureler[sureIndex].sira;
                        } else if (rekat.ses) {
                            sesler.each(function () {
                                if ($(this).attr("name").toLowerCase() == rekat.ses.toLowerCase()) {
                                    rekat.path = $(this).attr("path");
                                    rekat.meal = $(this).attr("meal");
                                    rekat.turkce = $(this).attr("turkce");
                                    rekat.duaAdi = $(this).attr("duaAdi");
                                }
                            });
                        }
                        if (!rekat.turkce) {
                            rekat.turkce = "                                                                                                            ";
                        }
                        Namaz.rekatList.push(rekat);
                    }
                });
            });
            var playlist = Namaz.rekatList.map(function (r) { return r.path; });
            current.playIndex = 0;
            SoundPlayer.Playlist = playlist;
            fillPlaylist(Namaz.rekatList);
        }
    }
}