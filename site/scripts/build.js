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
    
if (Array.isArray(imagePaths) && Number.isInteger(imagesTotal) && imagesTotal > 0) {

    var /*images = {},
        imagesArray = [],*/
        image = {};
        
    for (i=0; i < imagesTotal; i++) {
        gm(imagePaths[i]).identify((err, data) => {
            if (!err) {

                image.original.pathPrivate = data.path,
                image.original.pathPublic = image.original.pathPrivate.replace("content", "public");
                image.original.filename = image.original.pathPublic.slice(0, data.path.lastIndexOf("/"));
                image.original.size = data.size;
                
                for (i=0; i < imageOptions.widths.length; i++) {
                    if (image.original.size.width[0] > imageOptions.widths[i]) {
                        image.generated = [];
                        image.generated.push({
                            pathPublic: ''
                        })
                    }
                }

                for (i=0; i < imageOptions.widths.length; i++) {
                    if (image.original.size.width[0] > imageOptions.widths[i]) {
                        image.generated.size.widths.push(imageOptions.widths[i]);
                    }
                }
            }

            //imagesArray.push(image);

            if (image.size.widths.length > 1) {
                 
                image = {
                    original: { 
                        pathPrivate: '../content/foo/bar/img.png',
                        pathPublic: '../public/foo/bar/img.png',
                        size: {
                            width: 1620,
                            height: 912
                        }
                    },
                    generated: [{ 
                        pathPublic: '../public/foo/bar/img-1366.png',
                        size: {
                            width: 1366,
                            height: 769
                        },
                    }, /* image objects */ {
                        pathPublic: '../public/foo/bar/img-160.png',
                        size: {
                            width: 1366,
                            height: 769
                        }
                    }]
                };
            }
        })
    }
};
    
