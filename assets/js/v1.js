console.log('init');

let playing = false;
let audio = null;
let volume = localStorage.getItem('volume') || 0.1;

$('.volume').val(volume);

$('.play-button').on('click', (e) => {
  e.preventDefault();

  if (!playing) {
    $('.play-button i').removeClass('fa-play').addClass('fa-pause');
    audio = new Audio(`https://ascella.streamerr.co/listen/gbradio/radio.mp3?cacheBuster=${Math.ceil(Math.random() * 40000)}`);
    audio.volume = volume;
    playing = true;
    audio.play();
  } else {
    playing = false;
    $('.play-button i').addClass('fa-play').removeClass('fa-pause');
    audio.pause();
    audio.src = "";
    audio = null;
  }
});

$('.volume').on('change', (e) => {
  e.preventDefault();
  volume = e.target.value;
  localStorage.setItem('volume', e.target.value)
  if (audio) {
    audio.volume = e.target.value;
  }
})

stats()
setInterval(function(){
	stats()
}, 20000)
function stats(){
	$.getJSON('https://ascella.streamerr.co/api/nowplaying/619', (data) => {
		if(data.live.is_live == true){
			$(".dj").html(data.live.streamer_name)
			$(".dj-avatar-top").attr("src","https://gbradiorx.co.uk/avatars/"+data.live.streamer_name+".png")
      $(".art").attr("src",data.now_playing.song.art)

		}else{
			$(".dj").html("GBRadio Non-Stop")
			$(".dj-avatar-top").attr("src","https://gbradiorx.co.uk/gbradio.png")
		}
		$(".song").html(data.now_playing.song.title)
		$(".artist").html(data.now_playing.song.artist)
	})
}


$('.request-song').on('click', (e) => {
  e.preventDefault();
  $('.m-modal-container').show();
})

$('.close-button').on('click', (e) => {
  e.preventDefault();
  $('.m-modal-container').hide();
})

