// dependencies
var fs = require('fs'),
    gm = require('gm'),
    glob = require('glob'),
    serveStatic = require('serve-static');

var imagePaths = glob.sync("../content/**/*.{png,jpg,gif}");

if (Array.isArray(imagePaths) && imagePaths.length) {
    // do this
}

options = {
    widths: [3840, 2560, 1920, 1366, 1280, 640, 320, 160],
}

var images = [];
