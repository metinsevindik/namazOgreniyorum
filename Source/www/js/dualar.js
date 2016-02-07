var dualar = [];
var DualarYukle = function () {
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
        $(xml).find("dua").each(function () {
            var dua = new Object();
            dua.path = $(this).attr("path");
            dua.image = $(this).attr("image");
            dua.meal = $(this).attr("meal");
            dua.turkce = $(this).attr("turkce");
            dua.duaAdi = $(this).attr("duaAdi");
            dua.visible = $(this).attr("visible");
            if (!dua.visible) {
                dualar.push(dua);
            };
            
        });
        $(xml).find("sure").each(function () {
            var dua = new Object();
            dua.path = $(this).attr("path");
            dua.image = $(this).attr("image");
            dua.meal = $(this).attr("meal");
            dua.turkce = $(this).attr("turkce");
            dua.duaAdi = $(this).attr("duaAdi");
            dua.visible = $(this).attr("visible");
            if (!dua.visible) {
                dualar.push(dua);
            };
        });
        dualar=_.sortBy(dualar, 'duaAdi');
    }
}

document.addEventListener("deviceready", function () {
    DualarYukle();
}, false);
