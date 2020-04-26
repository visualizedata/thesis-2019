element=document.querySelector('#scene')
getAnim(1,true);
animation.setSpeed(0.8);

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	document.addEventListener('swiped-left', function(e) {
	element.innerHTML="";
	console.log(animation.path)
	if(animation.path=="https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/1/"){
		grey();
		document.querySelector('#l2').style.backgroundColor="#D8A693";
		getAnim(2,true);
		animation.setSpeed(1);
	} else if (animation.path=="https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/2/"){
		grey();
		document.querySelector('#l3').style.backgroundColor="#D8A693";
		getAnim(3, true);
		animation.setSpeed(1);
	} else if (animation.path=="https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/3/"){
		grey();
		document.querySelector('#l4').style.backgroundColor="#D8A693";
		getAnim(1, true);
		animation.setSpeed(0.8);
	} 
	});
	document.addEventListener('swiped-right', function(e) {
	element.innerHTML="";
	console.log(animation.path)
	if(animation.path=="https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/1/"){
		grey();
		document.querySelector('#l1').style.backgroundColor="#D8A693";
		getAnim(1, true);
		animation.setSpeed(0.8);
	} else if (animation.path=="https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/2/"){
		grey();
		document.querySelector('#l1').style.backgroundColor="#D8A693";
		getAnim(1, false);
		animation.setSpeed(0.8);
	} else if (animation.path=="https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/3/"){
		grey();
		document.querySelector('#l2').style.backgroundColor="#D8A693";
		getAnim(2, true);
		animation.setSpeed(1);
	} 
	});
} else {

element.onclick=function() {
	element.innerHTML="";
	console.log(animation.path)
	if(animation.path=="https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/1/"){
		grey();
		document.querySelector('#l2').style.backgroundColor="#D8A693";
		getAnim(2, true);
		animation.setSpeed(1);
	} else if (animation.path=="https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/2/"){
		grey();
		document.querySelector('#l3').style.backgroundColor="#D8A693";
		getAnim(3, true);
		animation.setSpeed(1);
	} else if (animation.path=="https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/3/"){
		grey();
		document.querySelector('#l1').style.backgroundColor="#D8A693";
		getAnim(1, true);
		animation.setSpeed(0.8);
	}
}

}



controls = document.querySelectorAll('.progress div');
console.log(controls);

function grey() {
	for(i=0;i<controls.length;i++){
		controls[i].style.backgroundColor="#CCCCCC";
	}
}

document.querySelector('#l1').style.backgroundColor="#D8A693";

for(i=0;i<controls.length;i++){
	controls[i].onclick=function() {
		element.innerHTML="";
		grey();
		this.style.backgroundColor="#D8A693";
		id= this.id;
		console.log(id);
		if(id=="l1"){
			getAnim(1, true)
			animation.setSpeed(0.8);
		} else if (id=="l2"){
			getAnim(2, true)
			animation.setSpeed(1);
		} else if (id=="l3"){
			getAnim(3, true)
			animation.setSpeed(1);
		}
	}
}

function getAnim(number, autoplay_value){
	if(number==3){
	animation= lottie.loadAnimation({
		  container: element, // the dom element that will contain the animation
		  renderer: 'svg',
		  loop: false,
		  autoplay: autoplay_value,
		  autoloadSegments: false,
		  path: "https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/"+number+"/data.json" // the path to the animation json
		});
	} else {
	animation= lottie.loadAnimation({
		  container: element, // the dom element that will contain the animation
		  renderer: 'svg',
		  loop: true,
		  autoplay: autoplay_value,
		  autoloadSegments: false,
		  path: "https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/"+number+"/data.json" // the path to the animation json
		});	}


	if(autoplay_value == false ){
		console.log("reverse")
		var duration;
		animation.addEventListener( "data_ready", function(){
	  	lastFrame = animation.totalFrames;
	  	animation.currentFrame = lastFrame;
	  	animation.currentRawFrame = lastFrame;
	  	console.log(animation.currentFrame)
		animation.setDirection( -1 );
		animation.play();
		animation.setSpeed(2)
		duration = animation.totalFrames*animation.frameRate-1000;
		console.log(duration)
		setTimeout(function() {
			animation.setDirection( 1 );
			animation.play();
			animation.setSpeed(1)
		},duration)
		})
	}

	// animation.play();
	d3.select('.container').remove();
	container = document.createElement('div')
	container.setAttribute("class","container")
	h2 = document.createElement('h2')
	p = document.createElement('p')
	target = document.querySelector('body')
	container.appendChild(h2)
	container.appendChild(p)
	target.appendChild(container)


	d3.csv('https://raw.githubusercontent.com/3milychu/notesonperspective/master/assets/onboarding/data/text.csv')
		.then(function(data){
			console.log(data);
			filter = data.filter(function(d){return d.scene == number})
			h2.innerHTML = filter[0]['h2']
			p.innerHTML= filter[0]['p']
		})
		.catch(function(error){
		})
}