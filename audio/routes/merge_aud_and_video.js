const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const {Router} = require('express');
const route = Router();
 
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

route.get('/audio', function(req, res) {
  let range = req.headers.range;
  console.log(range)
  res.set('Content-Type', 'video/mp4');
	const proc = ffmpeg()
	.addInput('video.mp4').format('mp4')
	.addInput('song.mp3')
	.format('mp3')
	.outputOptions('-movflags frag_keyframe+empty_moov')
	.on('progress', function(progress) {
		console.log(progress);
	})
	.on('error', function(err) {
		console.log('An error occurred: ' + err.message);
	})
	.on('end', function() {
		console.log('Processing finished !');
	})
	const ffStream = proc.pipe();
	ffStream.on('data', function(chunk) {
		console.log('ffmpeg just wrote ' + chunk.length + ' bytes');
	});
	ffStream.pipe(res);
})

module.exports = route;