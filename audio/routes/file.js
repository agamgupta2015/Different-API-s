const {Router} = require("express");
const route = Router()
const fs = require('fs');
const path = require('path')
const formidable = require('formidable');

route.post('/upload', (req, res, next) => {
	
	const form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files){

		var oldPath = files.profilePic.filepath;
		var newPath = 'src/'+files.filename
		var rawData = fs.readFileSync(oldPath)
	
		fs.writeFile(newPath, rawData, function(err){
			if(err) 
                console.log(err)
			return res.json(
                {
                    "status": "ok",
                    "file_path": newPath
                 }
                )
		})
})
});

module.exports = route;
