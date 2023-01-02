const {Router}  = require('express');
const route = Router();
const fs = require('fs');

route.get('/files', function(req, res, next){
    var text = "";
    let directory_name = "C:/Users/agamg/Documents/audio/src";
    let filenames = fs.readdirSync(directory_name);
    
    filenames.forEach((file) => {
        text = text + file + ",";
    });
    res.json({
        Status:"ok",
        data:text
    })
})

module.exports = route;