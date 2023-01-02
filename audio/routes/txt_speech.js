const {Router} = require('express');
const route = Router();

 route.get('/hear', function (req, res) {
    const gTTS = require('gtts');
    var gtts = new gTTS(req.body.text, 'hi');
    gtts.save('hello.mp3', function (err, result) {
    if(err) { throw new Error(err) }
    else{
        res.json(
        {
            "status": "ok",
            "message": "text to speech converted",
            "audio_file_path": "hello.mp3"
        }
        )
    }
    });
 });

module.exports = route;