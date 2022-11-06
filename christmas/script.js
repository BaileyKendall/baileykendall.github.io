let getID = id => document.getElementById(id) || undefined;

window.onload = () => {
  console.log("THIS IS A TEST KTHX");
  updateStats();
  setInterval(updateStats, 5000);
}


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


(audioPlayer.crossOrigin = "anonymous"),
  (volumeSlider.oninput = function() {
    audioPlayer.volume = this.value / 100;
  }),
  updateStats(),


  renderFrame();

  function updateStats() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        let dj = data.live.is_live ? data.live.streamer_name : "Non-Stop Christmas";
        if (dj !== "Non-Stop Christmas") {
          getID("dj").style.left = "0";
        }
        getID("title").innerHTML = data.now_playing.song.title;
        getID("artist").innerHTML = data.now_playing.song.artist;
        getID("dj").innerText = dj;
        getID("listeners").innerHTML = data.listeners.current;
      }
    };
    xhttp.open("GET", "https://dorothy.azuraca.st/api/nowplaying/17", true);
    xhttp.send();
  }
