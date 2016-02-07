var files = [];
var endReadFiles = false;
var downloaded = 0;
var Downloader = {};
var _speed = 0;
Downloader.download = function (speed) {
    _speed = speed;
    //window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + "www/resources/settings.xml", function (fileEntry) {
    window.resolveLocalFileSystemURL("file://"+getPath() + "settings.xml", function (fileEntry) {
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
}
function ParseXml(xml) {
    files = [];
    $(xml).find("sound").each(function () {
        var speed = $(this).attr("speed");
        if (speed == _speed) {
            var url = $(this).attr("url");
            files.push(url);
        }
    });
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        //var sPath = cordova.file.externalRootDirectory;
        var sPath = getSoundPath(_speed);
        testLog(sPath + " yoluna donload ediliyor: Dosyalar: " + files.length);
        var fileTransfer = new FileTransfer();
        downloaded = 0;
        for (var i = 0; i < files.length; i++) {
            var linkPath = files[i];
            var filename = linkPath.substr(linkPath.lastIndexOf('/') + 1);
            var fullName = sPath + filename;
            fileTransfer.download(
              linkPath,
              fullName,
              function (theFile) {
                  downloaded++;
                  testLog("Downloaded: " + theFile.toURI());
              }, fail
              );
        }
    }, null);
    endReadFiles = true;
}
