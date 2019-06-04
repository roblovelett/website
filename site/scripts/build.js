// dependencies
var fs = require('fs'),
    gm = require('gm'),
    glob = require('glob'),
    serveStatic = require('serve-static');

var imageOptions = {
        widths: [3840, 2560, 1920, 1366, 1280, 640, 320, 160],
    },
    imagePaths = glob.sync("../content/**/*.{png,jpg,gif}"),
    imagesTotal = imagePaths.length;
    
if (Array.isArray(imagePaths) && Number.isInteger(imagesTotal)) {

    var imagesArray = [],
        image = {};
        
    for (i=0; i < imagesTotal; i++) {
        gm(imagePaths[i]).identify((err, data) => {
            if (!err) {
                image.size = data.size;
                image.path = data.path;
                image.size.widths = [];
                image.size.widths.push(data.size.width);
                
                for (i=0; i < imageOptions.widths.length; i++) {
                    if (image.size.widths[0] > imageOptions.widths[i]) {
                        image.size.widths.push(imageOptions.widths[i]);
                    }
                }
            }

            imagesArray.push(image);

            if (image.size.widths.length > 1) {
                console.log("image.size.widths is > 1");
            }
        })
    }
};
    
