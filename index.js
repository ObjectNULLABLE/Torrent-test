var WebTorrent = require('webtorrent');
var argv = require('optimist').argv;
var clear = require("cli-clear");

var client = new WebTorrent();
var torrentData = argv.path;            //for links to torrent (path on computer, link to .torrent, magnet, infohash,..)
var downloadFolder = argv.folder;       //where download file
var peer = argv.peer;                   //optional, if need to add peers


client.add(torrentData, { path: downloadFolder }, function (torrent) {      //create torrent process

    var interval = setInterval(function () {
        clear();
        console.log(
            'Progress: ' + (torrent.progress * 100).toFixed(1) + '% | ' +
            'Download speed: ' + (torrent.downloadSpeed / (1024 * 1024)).toFixed(1) + ' Mb/s | ' +
            'Time remaining: ' + (torrent.timeRemaining / 60000).toFixed(1) + ' min')
    }, 5000);

    torrent.on('ready', function () {                       //add peer
        if (peer !== undefined) {
            if (!torrent.addPeer(peer))
                console.log('something go wrong');
        }

    });

    torrent.on('done', function () {                         //call when download finish
        console.log('torrent download finished');
        clearInterval(interval);
        require('child_process').exec('start "" ' + torrent.path + ' '); //open folder with downloaded path
    });
})