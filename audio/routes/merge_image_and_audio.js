const { Router } = require("express");
const route = Router();
var videoshow = require('videoshow')

var videoOptions = {
  fps: 25,
  loop: 5, // seconds
  transition: true,
  transitionDuration: 1, // seconds
  videoBitrate: 1024,
  videoCodec: 'libx264',
  size: '640x?',
  audioBitrate: '128k',
  audioChannels: 2,
  format: 'mp4',
  pixelFormat: 'yuv420p'
}

route.post("/merge_image_and_audio",async (req,res) => {
        const  image_file_path1 = req.body.image_file_path;
        const audio_file_path1 = req.body.audio_file_path;
        console.log(image_file_path1)
        console.log(audio_file_path1)
        var images = [image_file_path1];

        videoshow(images, videoOptions).audio(audio_file_path1).save('video.mp4')
        .on('start', function (command) {
            console.log('ffmpeg process started:', command)
        })
        .on('error', function (err, stdout, stderr) {
            console.error('Error:', err)
            console.error('ffmpeg stderr:', stderr)
        })
        .on('end', function (output) {
            console.error('Video created in:', output)
        })
        res.json({
            "status": "ok",
            "message": "Video Created Successfully",
            "video_file_path":"voice.mp4"
        })
});

module.exports = route;