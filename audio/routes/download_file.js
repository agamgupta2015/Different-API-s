const { Router } = require("express");
const route = Router();

route.get('/download', function(req, res){
    const file = req.body.file;
    res.download(file);
});

module.exports = route