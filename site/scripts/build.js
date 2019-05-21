// dependencies
var fs = require('fs'),
    gm = require('gm'),
    glob = require('glob'),
    serveStatic = require('serve-static');

var imageOptions = {
        widths: [3840, 2560, 1920, 1366, 1280, 640, 320, 160],
    },
    imagePaths = glob.sync("../content/**/*.{png,jpg,gif}");

if (Array.isArray(imagePaths) && imagePaths.length) {
    var image = {},
        images;
    
    for (i=0; i < imagePaths.length; i++) {
        image.path = imagePaths[i];
        image.widths = [];

        // get original width
        gm(image.path).identify((err, data) => {
            if (!err) {
                image.widths.push(data.size.width);        
                
                for (i=0; i < imageOptions.widths.length; i++) {
                    if (imageOptions.widths[i] < image.widths[0]) {
                        console.log(imageOptions.widths[i] + ' is < ' + image.widths[0]);
                        image.widths.push(imageOptions.widths[i]);
                   }
                }

                console.log('image widths:' + image.widths);
            }
        });

        // generate images below original width
        // image.widths;

    }
}