var VersionChecker=function(){
	 var isOnline = IsConnected();
	 if (isOnline) {
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			        var sPath = cordova.file.applicationStorageDirectory;// sonunda / var
			        var fileTransfer = new FileTransfer();
		            var linkPath = "https://raw.githubusercontent.com/supermaker/namazOgreniyorum/master/resources/namazogreniyorumsettings.xml";
		            var filename = linkPath.substr(linkPath.lastIndexOf('/') + 1);
		            var fullName = sPath + filename;
		            fileTransfer.download(
		              linkPath,
		              fullName,
		              function (theFile) {
		              		window.resolveLocalFileSystemURL(fullName, function (fileEntry) {
						        fileEntry.file(function (file) {
						            var reader = new FileReader();
						            reader.onloadend = function (evt) {
						                var xml = evt.target.result;
						                fileObject = xml;
						                VersionXML(xml);
						            };
						            reader.readAsText(file);
						        });
						    }, fail);
		              }, fail);
			    });
		}
}

function VersionXML(xml) {
	debugger;
	$(xml).find("setting").each(function () {
	    var version = $(this).attr("version");
	    var message = $(this).attr("message");
	    var link = $(this).attr("link");

	    if (version > GetLocalVersion()){
			if (window.confirm(message)){
				cordova.plugins.market.open('com.namaz.namazOgretmeni');
			}
	    }    
	});	
}