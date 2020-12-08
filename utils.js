const sharp = require('sharp');


//function to decode base63 strings
exports.decode64 =  function (event) {
	let buff = new Buffer(event.optimoleKey, 'base64');
	let text = buff.toString('ascii');
	return text;
}

//function to optimize images by file type
exports.makeOptimizedFile = function(file, img_quality, extension) {
    const fs = require('fs');
    var dir = './optimized';
    var image_dir = './images';
    var image_path = image_dir + '/' + file;

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    if(extension === 'jpg') {

        new_file_path = dir + '/' + file;

       sharp(image_path)
            .resize({width : 500,  fit: 'contain'})
            .jpeg({quality : img_quality})
            .toFile(new_file_path);

    } else if (extension === 'png') {

        new_file_path = dir + '/' + file;

         sharp(image_path)
            .resize({width : 500, fit : 'contain'})
            .png({quality : img_quality})
            .toFile(new_file_path);

    } else if (extension === 'svg') {
        new_file_path = dir + '/' + file.split('.')[0] + '.jpg';

         sharp(image_path)
            .resize({width: 500,  fit: 'contain'})
            .jpeg({ quality: img_quality })
            .toFile(new_file_path);

    } else if (extension === 'gif') {
        new_file_path = dir + '/' + file.split('.')[0] + '.png'

        sharp(image_path)
            .resize({width: 500,  fit: 'contain'})
            .png({ quality: img_quality })
            .toFile(new_file_path);
    }
    optimized_file = {filePath: new_file_path, procent: 0};
    return optimized_file;
}