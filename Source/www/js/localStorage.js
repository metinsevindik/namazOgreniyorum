function GetGender() {
    return window.localStorage.getItem('Gender');
}

function SetGender(gender) {
    window.localStorage.setItem('Gender', gender);
}

function GetSoundSpeed() {
    //Seçili hız
    return window.localStorage.getItem('SoundSpeed');
}

function SetSoundSpeed(speed) {
    window.localStorage.setItem('SoundSpeed', speed);
}

function Getlogger() {
    return window.localStorage.getItem('showLog');
}
function Setlogger(val) {
    window.localStorage.setItem('showLog', val);
}

function GetUpdateControl() {
    return window.localStorage.getItem('UpdateControl');
}
function SetUpdateControl(val) {
    window.localStorage.setItem('UpdateControl', val);
}


function GetDownloadedSpeed() {
    //Son indirilen hız
    return window.localStorage.getItem('DownloadedSpeed');
}
function SetDownloadedSpeed(val) {
    window.localStorage.setItem('DownloadedSpeed', val);
}

function GetFontSize() {
    return window.localStorage.getItem('FontSize');
}
function SetFontSize(val) {
    window.localStorage.setItem('FontSize', val);
}


function GetLocalVersion() {
    return window.localStorage.getItem('LocalVersion');
}
function SetLocalVersion(val) {
    window.localStorage.setItem('LocalVersion', val);
}