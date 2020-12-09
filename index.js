//here you can require you dependencies or external functions
let { decode64, makeOptimizedFile } = require('./utils')
const fs = require('fs');

exports.handler = async function (event) {

	moveImagesOutput = await exports.moveImages();
	optimized = moveImagesOutput.optimized;
	initial_files = moveImagesOutput.initial_files;

	for(i = 0; i < optimized.length; i += 1) {
		initial_path = './images/' + initial_files[i];
		procent = (1-exports.getFilesizeInBytes(optimized[i].filePath)/exports.getFilesizeInBytes(initial_path))*100;
		optimized[i].procent = procent;
		optimized[i].filePath = optimized[i].filePath.slice(1);
	}
	response = { 
		pass: decode64(event),
		optimized : optimized
	  }
	return response;
};

//function to move and create the optimize images
exports.moveImages = async function() {
	optimized = [];
	initial_files = [];
	
	fs.readdirSync('./images/').forEach(file => {
		optimized.push(makeOptimizedFile(file, 60, file.split('.')[1]));
		initial_files.push(file);
	});
	return {optimized, initial_files}; //returning the optimized javascript object array and initial file paths
}


//function to return file size in bytes
exports.getFilesizeInBytes = function(filename) {
    var stats = fs.statSync(filename);
	var fileSizeInBytes = stats.size;
	return fileSizeInBytes;
}



