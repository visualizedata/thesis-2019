var play = document.querySelector('#play');
var pause = document.querySelector('#pause');
var formatTime = d3.format(",.2f");
var sound = new Howl({
  src: ['assets/music.wav']
});

play.onclick=function() {
	sound.play();
	console.log("playing")
}
pause.onclick=function() {
	sound.pause();
	console.log("paused")
}

var app = new Vue({
	el: '#player',
	data: {
		time: formatTime(sound.seek())
	},
	watch: {
		// whenever time changes, this function should run
	    time: function (newtime, oldtime) {
	      this.debouncedGetTime();
	    }
	},
	 created: function () {
		this.debouncedGetTime = _.debounce(this.getTime, 30)
	},
	methods: {
		getTime: function() {
			// get the reaction data
			return this.time;
		}
	}
})