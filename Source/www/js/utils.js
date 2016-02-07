function fail(e) {
    testLog('error: ' + JSON.stringify(e));
}
var logindex = 0;
function testLog(log) {
    $('#status')[0].innerHTML += " / " + logindex++ + ": " + JSON.stringify(log);
    console.info(log)
}

function getPath() {
    if (typeof device == "undefined") {
        return "resources/"
    } else
        return "/android_asset/www/resources/"
}

function getSoundPath(speed) {
    var hiz = GetSoundSpeed();
    if (!speed && (!hiz || hiz.toString() == 'ORTA')) {
        return getPath() + "sounds/";
    } else if((speed && speed.toString() == '-1') || (!hiz && hiz.toString() == 'YAVAŞ')) {
        return GetStoragePath()+"yavas/";
    }else if((speed && speed.toString() == '1') || (!hiz && hiz.toString() == 'HIZLI')) {
        return GetStoragePath()+"hizli/";
    }
}

function GetStoragePath() {
    return cordova.file.applicationStorageDirectory + "sounds/";
}


function isDebug() {
    var is = typeof device == "undefined";
    return is;
}


String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}



function fillPlaylist(rekatList) {
    var ul = "<ul>{0}</ul>";
    var li = "<li><div style='color:{2}' index=\"{1}\">{0}</div></li>";
    var header = "<li><div index=\"{0}\">{1}</div><ul>{2}</ul></li>";
    var s1 = [];
    var s2 = [];
    var s3 = [];
    var o1 = [];
    var o2 = [];
    var o3 = [];
    var o4 = [];
    var i1 = [];
    var i2 = [];
    var i3 = [];
    var a1 = [];
    var a2 = [];
    var a3 = [];
    var y1 = [];
    var y2 = [];
    var y3 = [];
    var y4 = [];
    var y5 = [];
    var content = "";
    angular.forEach(rekatList, function (val, index) {
        if (val.no == 1) {
            switch (val.section) {
                case '1': s1.push(String.format(li, val.duaAdi, index,  'red')); break;
                case '2': s2.push(String.format(li, val.duaAdi, index,'green')); break;
                case '3': s3.push(String.format(li, val.duaAdi, index,'black')); break;
                default: break;
            }
        } else if (val.no == 2) {
            switch (val.section) {
                case '1': o1.push(String.format(li, val.duaAdi, index,  'red')); break;
                case '2': o2.push(String.format(li, val.duaAdi, index,'green')); break;
                case '3': o3.push(String.format(li, val.duaAdi, index, 'blue')); break;
                case '4': o4.push(String.format(li, val.duaAdi, index,'black')); break;
                default: break;
            }
        }else if (val.no == 3) {
            switch (val.section) {
                case '1': i1.push(String.format(li, val.duaAdi, index,  'red')); break;
                case '2': i2.push(String.format(li, val.duaAdi, index,'green')); break;
                case '3': i3.push(String.format(li, val.duaAdi, index, 'black')); break;
                default: break;
            }
        }else if (val.no == 4) {
            switch (val.section) {
                case '1': a1.push(String.format(li, val.duaAdi, index,  'red')); break;
                case '2': a2.push(String.format(li, val.duaAdi, index,'green')); break;
                case '3': a3.push(String.format(li, val.duaAdi, index, 'blue')); break;
                case '4': a4.push(String.format(li, val.duaAdi, index,'black')); break;
                default: break;
            }
        }else if (val.no == 5) {
            switch (val.section) {
                case '1': y1.push(String.format(li, val.duaAdi, index,  'red')); break;
                case '2': y2.push(String.format(li, val.duaAdi, index,'green')); break;
                case '3': y3.push(String.format(li, val.duaAdi, index, 'blue')); break;
                case '4': y4.push(String.format(li, val.duaAdi, index,'grey')); break;
                case '5': y5.push(String.format(li, val.duaAdi, index,'black')); break;
                default: break;
            }
        }
    });
    var sections = "";
    if (s1.length > 0) sections += String.format(header, 1000, "<b>SÜNNET</b>", s1.join(""));
    if (s2.length > 0) sections += String.format(header, 2000, "<b>FARZ</b>", s2.join(""));
    if (s3.length > 0) sections += String.format(header, 3000, "<b>TESBİHAT</b>", s3.join(""));
    
    if (o1.length > 0) sections += String.format(header, 1000, "<b>İLK SÜNNET</b>", o1.join(""));
    if (o2.length > 0) sections += String.format(header, 2000, "<b>FARZ</b>", o2.join(""));
    if (o3.length > 0) sections += String.format(header, 3000, "<b>SON SÜNNET</b>", o3.join(""));
    if (o4.length > 0) sections += String.format(header, 4000, "<b>TESBİHAT</b>", o4.join(""));
    
    if (i1.length > 0) sections += String.format(header, 1000, "<b>SÜNNET</b>", i1.join(""));
    if (i2.length > 0) sections += String.format(header, 2000, "<b>FARZ</b>", i2.join(""));
    if (i3.length > 0) sections += String.format(header, 3000, "<b>TESBİHAT</b>", i3.join(""));
    
    if (a1.length > 0) sections += String.format(header, 1000, "<b>FARZ</b>", a1.join(""));
    if (a2.length > 0) sections += String.format(header, 2000, "<b>SÜNNET</b>", a2.join(""));
    if (a3.length > 0) sections += String.format(header, 3000, "<b>TESBİHAT</b>", a3.join(""));
    
    if (y1.length > 0) sections += String.format(header, 1000, "<b>İLK SÜNNET</b>", y1.join(""));
    if (y2.length > 0) sections += String.format(header, 2000, "<b>FARZ</b>", y2.join(""));
    if (y3.length > 0) sections += String.format(header, 3000, "<b>SON SÜNNET</b>", y3.join(""));
    if (y4.length > 0) sections += String.format(header, 4000, "<b>VİTRİ VACİB</b>", y4.join(""));
    if (y5.length > 0) sections += String.format(header, 5000, "<b>TESBİHAT</b>", y5.join(""));
    content = sections;
    $('#playlist')[0].innerHTML = String.format(ul, content);
}

function Toast(msg) {
    window.plugins.toast.showWithOptions({
        message: msg,
        duration: "long",
        position: "center",
        addPixelsY: -40  // added a negative value to move it up a bit (default 0)
    },
    OnSuccess,
    fail
    );

    /*
    You have two choices to make when showing a Toast: where to show it and for how long.
        show(message, duration, position)
        duration: 'short', 'long'
        position: 'top', 'center', 'bottom'
        You can also use any of these convenience methods:

        showShortTop(message)
        showShortCenter(message)
        showShortBottom(message)
        showLongTop(message)
        showLongCenter(message)
        showLongBottom(message)
    */
}

function OnSuccess() {

}

function CheckFileExists(fileName) {
    var http = new XMLHttpRequest();
    http.open('HEAD', fileName, false);
    http.send(null);
    if (http.status.toString() == "200") {
        return true;
    }
    return false
}

function IsConnected() {
    //testLog(navigator.connection);
    return !(navigator.connection.type == Connection.NONE) // || navigator.connection.type == Connection.UNKNOWN)
}