var WebTorrent = require('webtorrent');
var clear = require("cli-clear");

var client = new WebTorrent();
var torrentData = "http://new-rutor.org/parse/d.rutor.org/download/564170";

client.add(torrentData, { path: __dirname }, function (torrent) {

    var interval = setInterval(function () {
        clear();
        console.log(
            'Progress: ' + (torrent.progress * 100).toFixed(1) + '% | ' +
            'Download speed: ' + (torrent.downloadSpeed / (1024 * 1024)).toFixed(1) + ' Mb/s | ' +
            'Time remaining: ' + (torrent.timeRemaining / 60000).toFixed(1) + ' min')
    }, 1000);

    torrent.on('done', function () {
        console.log('torrent download finished');
        clearInterval(interval);
        require('child_process').exec('start "" ' + torrent.path + ' ');
    });
})