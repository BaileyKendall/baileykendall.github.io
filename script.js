var audioPlayer = new Audio(radioStreamLink),
  isPlaying = !1,
  isVolOpen = !1,
  ctx = new AudioContext(),
  audioSrc = ctx.createMediaElementSource(audioPlayer),
  analyser = ctx.createAnalyser();
audioSrc.connect(analyser), audioSrc.connect(ctx.destination);
var frequencyData = new Uint8Array(analyser.frequencyBinCount),
  volumeSlider = document.getElementById("volslider");
function playPauseClick() {
  isPlaying ? (pause(), (isPlaying = !1)) : (play(), (isPlaying = !0));
}
function play() {
  (document.getElementById("playpause").innerHTML =
    '<i class="fa fa-pause-circle"></i>'),
    (audioPlayer = new Audio(
      radioStreamLink + "?t=" + Math.floor(Date.now() / 1e3)
    )),
    (ctx = new AudioContext()),
    (audioSrc = ctx.createMediaElementSource(audioPlayer)),
    (analyser = ctx.createAnalyser()),
    audioSrc.connect(analyser),
    audioSrc.connect(ctx.destination),
    (frequencyData = new Uint8Array(analyser.frequencyBinCount)),
    (audioPlayer.crossOrigin = "anonymous"),
    audioPlayer.play();
}
function pause() {
  (document.getElementById("playpause").innerHTML =
    '<i class="fa fa-play-circle"></i>'),
    audioPlayer.pause();
}

function updateStats() {
	$.getJSON("https://ascella.streamerr.co/api/nowplaying/619", stats => {
    		$("#dj").html(stats.live.is_live ? stats.live.streamer_name : "GBRadio Non-Stop");
		$("#artist").html(stats.now_playing.song.artist);
    $("#title").html(stats.now_playing.song.title);
  });
}

(audioPlayer.crossOrigin = "anonymous"),
  (volumeSlider.oninput = function() {
    audioPlayer.volume = this.value / 100;
  }),
  updateStats(),


	
$(window).ready(function () {
	updateStats();
	setInterval(updateStats, 5000);
});


  renderFrame();
