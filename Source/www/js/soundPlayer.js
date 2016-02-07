

var SoundPlayer = function () {
}
var media;
var current = {};
var events = {};
var itself = false;
current.playIndex = 0;
current.status = 4;
SoundPlayer.Playlist = [];
SoundPlayer.tekrar=false;
SoundPlayer.Play = function (isNewMedia) {
    if (isNewMedia && current.status != Media.MEDIA_PAUSED) {
        var mp3URL = getSoundPath() + SoundPlayer.Playlist[current.playIndex];
        testLog(mp3URL+" çalınıyor.");
        if (media) media.release();
        media = new Media(mp3URL, events.success, fail, events.status);
        current.status = Media.MEDIA_RUNNING;
    }
    media.play();
}

events.success = function () {
    if (!itself) {
        if (SoundPlayer.tekrar) 
            SoundPlayer.Play(true);
        else    
            if (SoundPlayer.Playlist.length > current.playIndex + 1) {            
                current.playIndex++;
                SoundPlayer.Play(true);
            }
            else {
                current.status = 5; //Finished
            }
    } else {
        itself = false;
    }
}
events.status = function (status) {
    current.status = status;
}
SoundPlayer.Stop = function () {
    if (media && current.status != Media.MEDIA_STOPPED && current.status != 5) {
        itself = true;
        media.stop();
        return true;
    } else {
        return false;
    }
}

SoundPlayer.Next = function () {
    if (SoundPlayer.Playlist.length > current.playIndex + 1) {
        var playing = current.status;
        SoundPlayer.Stop()
        current.playIndex++;
        if (playing == Media.MEDIA_RUNNING) {
            SoundPlayer.Play(true);
        }
    }
}
SoundPlayer.Back = function () {
    if (current.playIndex - 1 >= 0) {
        var playing = current.status;
        SoundPlayer.Stop()
        current.playIndex--;
        if (playing == Media.MEDIA_RUNNING) {
            SoundPlayer.Play(true);
        }
    }
}
SoundPlayer.Pause = function () {
    if (current.status == Media.MEDIA_RUNNING) {
        media.pause();
    }
}