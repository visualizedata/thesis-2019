timecodes = [];
d3.csv('https://raw.githubusercontent.com/3milychu/notesonperspective/master/data/cluster_results.csv')
.then(function(data) {
	console.log(data)
	showClusters(data)
	getTimeCodes(data)
})
.catch(function(error){
})
setTimeout(function() {
	console.log('fire it up')
	gotoClusters();
},300)
descriptions = [{0:"Main melody line"},{0:"Main melody line supported by half or whole note chord progressions in the bass, as well as gentle crescendos and descrescendos climaxing at whole notes"}, {0: "Modified with sharps and flats outside of the key supported by mostly quarter notes on the bass clef in later parts of the piece"}, {0: "Modified with sharps and flats outside of the key and supported by triplets, half or whole notes in crescendo or descrendo in earlier parts of the piece, and/or parts demarcated with forte or fortepiano"}, {0:"Modified with eighth note progressions in the treble clef with half and eight note progressions in the bass clef, eighth rests, and sharp accents"}]
console.log(descriptions[0])
function getTimeCodes(data){
	formatTime = d3.format(",.2f");
	for(i=0;i<data.length;i++){
		id = 'beat' + data[i]['img']
		measure = data[i]['measure']
		beat = data[i]['beat']
		start = data[i]['timestamp']
		end =data[i+1]['timestamp']
		start = parseFloat(formatTime(start))
		end = parseFloat(formatTime(end-0.01))
		timecodes.push({
			id: id,
			measure: measure,
			beat: beat,
			start: start,
			end: end
		})
	}
}
function gotoClusters() {
	body = document.querySelector('body')
	button = document.querySelector('.button');
	button.onclick=function() {
		melody = document.querySelector('#Melody')
		target = window.innerHeight;
		window.scrollTo({
		  top: target,
		  behavior:'smooth'
		});
	}
}
function playAudioSprite(){
	holders = document.querySelectorAll('.holder')
	audio = document.querySelector('audio')
	for(i=0;i<holders.length;i++){
		holders[i].onmouseover=function() {
			// play audio sprite
			id = this.id
			sprite = timecodes.filter(function(d){return d.id==id})
			console.log(sprite)
			audio.src='assets/music.wav#t='+sprite[0]['start']+","+sprite[0]['end']
			console.log(audio.src)
			audio.play();
			// show tooltip info
			showTooltip(sprite)
		}
		holders[i].onmouseout=function() {
			hideTooltip();
		}
	}
}
function getpos(event) {
	var e = window.event;
	x = e.clientX + "px";
	y = e.clientY + "px";
}
function showTooltip(data){
	tooltip = document.querySelector('.tooltip')
	measure = "<div class='item'><em>Measure</em><p>"+sprite[0]['measure']+"</p></div>"
	beat = "<div class='item'><em>Beat</em><p>"+sprite[0]['beat']+"</p></div>"
	start = "<div class='item'><em>Start</em><p>"+sprite[0]['start']+"</p></div>"
	end = "<div class='item'><em>End</em><p>"+sprite[0]['end']+"</p></div>"
	tooltip.innerHTML+=measure
	tooltip.innerHTML+=beat
	tooltip.innerHTML+=start
	tooltip.innerHTML+=end
	getpos()
	tooltip.style.opacity="0.9";
  	tooltip.style.left=x;
  	tooltip.style.top=y;
}
function hideTooltip(){
	tooltip = document.querySelector('.tooltip')
	tooltip.innerHTML=""
	tooltip.style.opacity="0";
}
function showClusters(data){
	cluster0 = data.filter(function(d){return d.labels==0})
	cluster1 = data.filter(function(d){return d.labels==1})
	cluster2 = data.filter(function(d){return d.labels==2})
	cluster3 = data.filter(function(d){return d.labels==3})
	cluster4 = data.filter(function(d){return d.labels==4})
	getCluster(cluster0, 0)
	getCluster(cluster1, 1)
	getCluster(cluster2, 2)
	getCluster(cluster3, 3)
	getCluster(cluster4, 4)
	function getCluster(cluster, num){
		target = document.querySelector('body')
		div = document.createElement('div')
		div.setAttribute("class","cluster")
		h1 = document.createElement('h1')
		if(num==0){
			name = 'Melody'
		} else if (num ==1){
			name = 'Magic'
		} else if (num ==2){
			name = 'Building'
		} else if (num == 3){
			name = 'Emerging'
		} else if (num == 4){
			name = 'Drama'
		}
		div.setAttribute('id', name)
		h1.innerHTML=name
		play = document.createElement('div')
		play.setAttribute("class", "play")
		play.innerHTML="<i class='material-icons'>play_arrow</i>"
		identity = document.createElement('img')
		identity.setAttribute("class","identity")
		identity.src ="assets/images/cluster"+num+".png"
		p = document.createElement('p');
		p.innerHTML=descriptions[num][0]
		content = document.createElement('div')
		content.setAttribute("class","content")
		for(i=0;i<cluster.length;i++){
			holder = document.createElement('div')
			holder.setAttribute('id', 'beat'+cluster[i]['img'])
			holder.setAttribute('class', 'holder')
			img = document.createElement('img')
			img.src="assets/cropped/500w/"+cluster[i]['img']+".png"
			holder.appendChild(img)
			content.appendChild(holder)
		}
		// div.appendChild(identity)
		h1.appendChild(play)
		div.appendChild(h1)
		div.appendChild(p)
		div.appendChild(content)
		target.appendChild(div)
	}
	playAudioSprite();
	
}