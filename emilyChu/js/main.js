var formatTime = d3.format(",.2f");
var music = document.querySelector('audio');
var time;
var view;
var audio;
var measure;
var beat;
var ref = document.querySelector('#ref');
var watch = "same";
var time_option;
var zoom_option;
var card_pos = "down";
var people_status = [{performer: "both", audience: "all", backup: "both"}];
var performer = people_status[0]['performer'];
var audience = people_status[0]['audience'];
var backup = people_status[0]['backup'];
//mobile view
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    page=document.querySelectorAll('.page');
    for(i=0;i<page.length;i++){
    	page[i].style.height="120vh";
    }
};
// run functions
window.onload=function() {
	spatial();
}
getScore();
d3.csv('data/cluster_results.csv')
	.then(function(data) {
		getMusic(data);
	})
	.catch(function(error){
	})
function loadReactions() {
	d3.json('data/new_moment_all.json')
	.then(function(data){
		console.log(data);
		getReactions(data);
		endorsementsDetail(data);
	})
	.catch(function(error){
	})
}
resizeInterface();
window.onresize=function() {
	resizeInterface();
}
optionsListen("playback");
document.querySelector('.option[value="real"]').click();
optionsListen("zoom");
document.querySelector('.option[value="locked"]').click();
status();
getView("comments")
document.querySelector('#comments').click();
menuListen();
drawCircles(14);
getPeopleStyles();
getAllSignatures();
// svg watcher
svg_x = {
  aInternal: 0,
  aListener: function(val) {},
  set a(val) {
    this.aInternal = val;
    this.aListener(val);
  },
  get a() {
    return this.aInternal;
  },
  registerListener: function(listener) {
    this.aListener = listener;
  }
}
// get all signatures
function getAllSignatures() {
	console.log("get signatures")
	window.addEventListener('DOMContentLoaded', (event) => {
		el=document.querySelector('svg')
		checkSvg = setInterval(function() {
				if(el.clientHeight!=0){
					svg_x.a = 1;
					clearInterval(checkSvg);
				}
			},0)
		
		d3.json('data/new_moment_all.json')
		.then(function(data){
			svg_x.registerListener(function(val) {
				for(i=0;i<data.length;i++){
					info = data[i];
					role = info['role']
						console.log("changed")
					  getSignature(info, role)
				}
			});
		})
		.catch(function(error){
		})
	});
}
// play on audio click
audio = document.querySelector('audio');
audio.onclick=function() {
	clear();
	audiocontainer=document.querySelector('.audio-container');
	audiocontainer.style.backgroundColor="white";
}
audio.onpause=function(){
	stopSpin();
}
// play on play button click
play = document.querySelector('.button');
play.onclick=function() {
	clear();
	audio.play();
	audiocontainer=document.querySelector('.audio-container');
	audiocontainer.style.backgroundColor="white";
	
}
// clear reactions container
function clear() {
	console.log("clear")
	removeStartMessage();
	clearSignature();
}
// remove start message
function removeStartMessage() {
	if(time!=0.00){
		target=document.querySelector('#reactions');
		start_message = document.querySelector('#start-message')
		if(start_message!=null){
			start_message.remove();
		}
		items = target.querySelectorAll('.item')
		for (k=0;k<items.length;k++){
			items[k].remove();
		}
		target.style.paddingBottom="70vh";
	}
}
// clear signature
function clearSignature() {
	d3.selectAll('path').remove();
	d3.selectAll('circle')
		.attr("fill", "#1A1A1A")
		.attr("class", "")
		.attr("r", 10);
}
// load music
function getMusic(data) {
	audio.onplay=function() {
		setInterval(function () {
			time = formatTime(music.currentTime);
			filter = data.filter(function(d){
		    	return (formatTime(d.timestamp-0.20).indexOf(time-0.20) == 0);
			 })
			if(filter.length==1){
				designByCluster(filter);
				roll(filter[0]);
				console.log(time, formatTime(filter[0]['timestamp']))
			} 
			if(time==0.00 || time==221.59){
				stopSpin();
				removeClusterDesign();
			}
		}, 0);
	}
}
// go to cluster analysis when click on cluster labels
function goToAnalysis() {
	targets = document.querySelectorAll('.clusterlabel')
	for(i=0;i<targets.length;i++){
		targets[i].onclick=function() {
			var analysis = window.open('cluster-analysis.html', '_blank');
			analysis.focus();
		}
	}
}
// design record based on cluster by score image of that beat
function designByCluster(data){
	target = document.querySelector('#record');
	svg = document.querySelector('svg');
	target.className = "";
	label = data[0]['labels'];
	console.log("cluster" + label);
	// turn background to cluster label through css class
	target.classList.add("cluster"+label);
	// turn svg color through css class
	// clear previous svg
	// if cluster 2, turn disc dark
	// if(label==2){
	// 	svg.style.backgroundColor="#1d1d1d"
	// } else {
	// 	svg.style.backgroundColor="transparent"
	// }
}
function removeClusterDesign(){
	target = document.querySelector('#record');
	target.className = "";
	target.classList.add("cluster-none");
}
// cameras: roll music and show
function roll(data) {
	reset();
	label = data['img'];
	hover(label);
	scrollTo(label);
	getRef(data);
	spin();
}
// spin and stop record player in signature view
function spin(){
	record = document.querySelector('svg');
	record.classList.add("spin");
	document.getElementById("record").style.animation = "5s zoom infinite ease-in-out";
	document.querySelector('#reactions2').style.backgroundColor="#1d1d1d";
}
function stopSpin(){
	record = document.querySelector('svg');
	if(record!=null){
		record.classList.remove("spin");
	}
	document.getElementById("record").style.animation = "";
	document.querySelector('#reactions2').style.backgroundColor="transparent";
}
// get where we are in music/data at all times there is some data
function getRef(data){
	measure = data['measure'];
	beat = data['beat'];
	if(ref.value!=measure+beat) {
		ref.value= measure+beat;
		watch = "changed";
		loadReactions();
		} else {
		watch ="same"
	}
}
// people filters menu
function menuListen(){
	menu = document.querySelector('#perspective-filter');
	people_options = document.querySelector('.people-filters');
	
	var toggle = function (a, b) {
	    var togg = false;
	    return function () {
	        // passes return value back to caller
	        return (togg = !togg) ? a() : b();
	    };
	};
	menu.addEventListener('click', toggle(function () {
		people_options = document.querySelector('.people-filters');
	    people_options.style.display="block";
	}, function () { 
		people_options = document.querySelector('.people-filters');
		people_options.style.display="none";
	}));
}
// time navigation options listen
function optionsListen(name) {
	options=document.querySelectorAll("div[name="+name+"]");
	for(i=0;i<options.length;i++){
		options[i].onclick=function(){
			this.style.fontWeight="800";
			this.style.color="#1A1A1A";
			if(this.innerHTML=="Relative time"){
				time_option = "experienced";
				modify = document.querySelector('div[value=real]');
			}else if(this.innerHTML=="Absolute time") {
				time_option = "real";
				modify = document.querySelector('div[value=experienced]');
			} else if(this.innerHTML=="Dynamic"){
				zoom_option= "dynamic";
				modify = document.querySelector('div[value=locked]');
			} else if (this.innerHTML=="Locked"){
				zoom_option="locked";
				modify = document.querySelector('div[value=dynamic');
			}
			modify.style.removeProperty('background');
			modify.style.backgroundColor="transparent";
			modify.style.fontWeight="300";
			modify.style.color="#6666666";
			console.log(this.innerHTML);
			console.log(time_option);
			console.log(zoom_option);
		}
	}
}
// capitalize first letter
function caps(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// get selections
function status() {
	perspective = document.querySelector('.perspective');
	p_options = perspective.querySelectorAll('.option');
	for (i=0;i<p_options.length;i++){
		p_options[i].onclick=function() {
			for(j=0;j<p_options.length;j++){
				modify = p_options[j].querySelector('.circle-button');
				modify.style.backgroundColor="#F2F2F2";
				modify.style.color="black";
				modify.style.transform="scale(0.7)";
			}
			// change color
			target = document.getElementById(this.id);
			target = target.querySelector('.circle-button');
			target.style.transform="scale(1)";
			target.style.backgroundColor="#D8A693";
			target.style.color="white";
			// change var view
			view = this.id;
			getView(view);
			getPeopleStatus();
		}
	}
}
function getPeopleStatus() {
	people_filters = document.querySelector('.people-filters');
	people_options = people_filters.querySelectorAll('option')
	for(i=0;i<people_options.length;i++){
		people_options[i].onclick=function() {
			type = this.id;
			name = this.value;
			type_family = document.querySelectorAll('#'+type);
			console.log(name, type);
			people_status[0][type]=name;
			if(this.style.backgroundColor == "rgb(216, 166, 147)"){
				this.style.backgroundColor="transparent";
				this.style.color="black";
				people_status[0][type]="none";
			} else {
				for(i=0;i<type_family.length;i++){
					type_family[i].style.backgroundColor="";
					type_family[i].style.color="black";
					this.style.backgroundColor="rgb(216, 166, 147)";
					this.style.color="white";
				}
			}
			getPeopleStyles();
			console.log(people_status)
		}
	}
}
function getPeopleStyles() {
	all_selection = document.querySelector('#all')
	performer = people_status[0]['performer'];
	audience = people_status[0]['audience'];
	backup = people_status[0]['backup'];
	console.log(performer, audience, backup)
	if(performer == "both" && audience == "all" && backup == "both"){
		console.log('everyone')
		all_selection.style.backgroundColor = "#D8A693";
		all.style.color = "white"
	} else {
		console.log('not everyone')
		all_selection.style.backgroundColor = "white";
		all.style.color = "black";
	}
}
// get dataset view: 0= comments; 2=spatial, 3=signature
function getView(view){
	view_container = document.querySelector('.view');
	start_message = document.querySelector('#start-message');
	labels = document.querySelectorAll('.label')
	if(view == "comments"){
		document.querySelector('#reactions').style.display="inline-block";
		document.querySelector('#reactions2').style.display="none";
		document.querySelector('#reactions3').style.display="none";
		view_container.style.backgroundColor="white";
		if(start_message!=null){
			for(i=0;i<labels.length;i++){
				labels[i].style.color="#F2F2F2";
			}
		}
	} else if (view == "spatial") {
		document.querySelector('#reactions').style.display="none";
		document.querySelector('#reactions2').style.display="table";
		document.querySelector('#reactions3').style.display="none";
		view_container.style.backgroundColor="white";
		if(start_message!=null){
			for(i=0;i<labels.length;i++){
				labels[i].style.color="#666666";
			}
		}
	} else if (view == "signature") {
		document.querySelector('#reactions').style.display="none";
		document.querySelector('#reactions2').style.display="none";
		document.querySelector('#reactions3').style.display="inline-block";
		view_container.style.backgroundColor="transparent";
		if(start_message!=null){
			for(i=0;i<labels.length;i++){
				labels[i].style.color="#666666";
			}
		}
	}
}
// get reactions
function getReactions(data){
	// display reactions
	clear();
	data = updateData(data);
	add= data.filter(function(d){
	return ((parseInt(d.MOM_STARTBAR+d.MOM_STARTBEAT) <= ref.value) && (parseInt(d.MOM_ENDBAR+d.MOM_ENDBEAT) >= ref.value));
	 })
	// add stuff
	d3.selectAll('.curve').remove();
	addComments(add);
	// adjust playback rate
	setExperienceOptions(add);
	// change svg
	justListening(add.length)
}

function justListening(length){
	console.log(length);
	animation = document.getElementById('just_listening')
	if(length==0){
		console.log('hide animation')
		animation.style.opacity=1;
	} else if (length>0){
		animation.style.opacity=0;
	}
}

function updateData(data){
	all = document.querySelector('#all');
	test = all.style.backgroundColor;
	if(test == "#D8A693"){
		data = data;
	} else {
		if(performer != "both" && performer!= "none"){
			data1 = data.filter(function(d){return d.role == "Performing " + performer})
		}
		if(performer == "none"){
			data1 = [];
		}
		if(performer == "both"){
			data1 = data.filter(function(d){return d.role == "Performing pianist" || d.role == "Performing cellist"})
		}
		if(audience == "all"){
			data2 = data.filter(function(d){return d.role.match(/Class member/)})
		}
		if(audience == "none"){
			data2 = [];
		}
		if(audience == "heard"){
			data2 = data.filter(function(d){return d.role.match(/Class member/)})
			data2 = data2.filter(function(d){return d.heard == "yes"})
		}
		if(audience == "played"){
			data2 = data.filter(function(d){return d.role.match(/Class member/)})
			data2 = data2.filter(function(d){return d.played == "yes"})
		}
		if(backup != "both" && backup != "none"){
			data3 = data.filter(function(d){return d.role== "Non-performing "+ backup})
		}
		if(backup =="none"){
			data3 = [];
		}
		if(backup == "both"){
			data3 = data.filter(function(d){return d.role == "Non-performing pianist" || d.role == "Non-performing cellist"})
		}
		console.log(data1, data2, data3)
		data4 = data1.concat(data2);
		data = data3.concat(data4);
		data = data.reverse();
	}
	return data;
}
// add reactions to comments view, spatial view and signature view
function addComments(add) {
	if(add.length!=0){
		console.log(add);
		for (j=0;j<add.length;j++){
			info = add[j];
			id = info['comment_id'];
			comment = info['MOM1CHAR'];
			console.log(comment);
			role = info['role'];
			test = document.getElementById(id);
			if(test==null || test==undefined){
				createComment(info,id,role)
				displayEndorsement(info, id);
				displayTags(info, id);
				updateSpatial(info, role);
				getSignature(info, role)
			}
		}
	}
}
// draw signatures
function getSignature(data, role){
	sentiment = data['sentiment'];
	comment = data['MOM1CHAR']
	var point1 = getGraphableId(role);
	var point2 = getGraphableId(data['rater1'])
	var point3 = getGraphableId(data['rater2'])
	
	if(data['rater1_reassigned']>=3){
		if(sentiment == "pos"){
			drawPath(point1, point2, "sig_pos", comment);
		} else if( sentiment == "neg") {
			drawPath(point1, point2, "sig_neg", comment);
		} else {
			drawPath(point1, point2, "sig_mixed", comment)
		}
	} else {
		if(sentiment == "pos"){
			highlight(point2, "usig_neg")
		} else {
			highlight(point2, "usig_pos")
		}
	}
	if(data['rater2_reassigned']>=3){
		if(sentiment == "pos"){
			drawPath(point1, point3, "sig_pos", comment);
		} else if(sentiment == "neg") {
			drawPath(point1, point3, "sig_neg", comment);
		} else {
			drawPath(point1, point3, "sig_mixed", comment)
		}
	} else {
		if(sentiment == "pos"){
			highlight(point3, "usig_neg")
		} else {
			highlight(point3, "usig_pos")
		}
	}
	if(data['rater1_reassigned']<3 && data['rater2_reassigned']<3){
		if(sentiment=="pos"){
			highlight(point1, "usig_pos");
			highlight(point2, "usig_neg");
			highlight(point3, "usig_neg");
		} 
		if(sentiment=="neg"){
			highlight(point1, "usig_neg");
			highlight(point2, "usig_pos");
			highlight(point3, "usig_pos");
		} 
		if(sentiment!= "pos" && sentiment !="neg"){
			highlight(point1, "usig_mixed");
			highlight(point2, "usig_mixed");
			highlight(point3, "usig_mixed");
		}
	}
}
function getGraphableId(name){
	// sig_ref = parseInt(name.slice(-1));
	sig_ref = parseInt(name.slice(-2));
	test = Number.isInteger(sig_ref);
	if(test==true){
			return "person"+sig_ref;
	} else if (test==false){
		if(name=="Performing pianist"){
			return "person11";
		}
		if(name=="Performing cellist"){
			return "person12";
		}
		if(name=="Non-performing pianist"){
			return "person13";
		}
		if(name=="Non-performing cellist"){
			return "person14";
		}
	}
}
function setExperienceOptions(add){
	if(time_option == "experienced"){
		adjustPlayback(add);
	} else if (time_option =="real"){
		audio.playbackRate = 1;
	}
	if(zoom_option=="dynamic"){
		alignScoreView(add.length)
	}else if(zoom_option=="locked"){
		// score_view = document.querySelector('#page1');
		// score_view.style.height=height/8+"px";
		alignScoreView(add.length)
	}
}
function createComment(data, id, role){
	reactions = document.querySelector('#reactions');
	comment = data['MOM1CHAR'];
	div = document.createElement('div');
	div.setAttribute("class","item")
	div.setAttribute('id',id);
	h3 = document.createElement('h3');
	h3.innerHTML=data['role2'];
	p = document.createElement('p');
	p.innerHTML="'"+comment+"'";
	label = document.createElement('label');
	div.appendChild(h3);
	div.appendChild(p);
	reactions.prepend(div);
}
function getpos(event) {
	var e = window.event;
	x = e.clientX + "px";
	y = e.clientY + "px";
}
// setup signature view
function drawCircles(num_circles){
       var createNodes = function (numNodes, radius) {
         var nodes = [], 
             width = (radius * 2) + 50,
             height = (radius * 2) + 50,
             angle,
             x,
             y,
             i;
         for (i=0; i<numNodes; i++) {
          angle = (i / (numNodes/2)) * Math.PI; // Calculate the angle at which the element will be placed.
                                                // For a semicircle, we would use (i / numNodes) * Math.PI.
          x = (radius * Math.cos(angle)) + (width/2); // Calculate the x position of the element.
          y = (radius * Math.sin(angle)) + (width/2); // Calculate the y position of the element.
          nodes.push({'id': i+1, 'x': x, 'y': y});
         }
         return nodes;
       }
       var createSvg = function (radius, callback) {
         d3.selectAll('svg').remove();
         var svg = d3.select('#canvas')
         	.append('svg')
            .attr('width', (radius * 2) + 50)
            .attr('height', (radius * 2) + 50);
        	callback(svg);
          var defs = svg.append("defs")
		filter = defs
				 .append("filter")
				.attr("id", "blur")
				.append("feGaussianBlur")
				.attr("stdDeviation", 5);
          gradient = defs
			  .append("linearGradient")
			    .attr("id", "gradient")
			    .attr("x1", "0%")
			    .attr("y1", "0%")
			    .attr("x2", "100%")
			    .attr("y2", "100%")
			    .attr("spreadMethod", "pad");
			gradient.append("stop")
			    .attr("offset", "0%")
			    .attr("stop-color", "#666666")
			    .attr("stop-opacity", 1);
			gradient.append("stop")
			    .attr("offset", "25%")
			    .attr("stop-color", "#666666")
			    .attr("stop-opacity", 1);
			gradient.append("stop")
			    .attr("offset", "75%")
			    .attr("stop-color", "#DBDBDB")
			    .attr("stop-opacity", 1);
        }
        // const rc = rough.svg(svg);
       var createElements = function (svg, radius, nodes, elementRadius) {
       	   svg
        	.append('rect')
        	.attr("id","performers_corner")
        	.attr("x",radius-35 )
        	.attr("y",0)
        	.attr("width",radius+150)
        	.attr("height",radius)
        	.style("filter","url(#blur)")
        	.style("fill", "url(#gradient)");
         element = svg.selectAll('circle')
            .data(nodes)
            .enter()
            .append('circle')
            .attr("id", function(d,i){return "person" + d.id})
            .attr('r', elementRadius)
            .attr('cx', function (d, i) {return d.x;})
            .attr('cy', function (d, i) {return d.y;})
            .append('text')
            .attr("x", function(d){return d.x})
            .attr("y", function(d){return d.y})
       }
       var draw = function () {
       	view = document.querySelector('.view');
		view_height = view.style.height;
		view_height = view_height.split("px");
		view_height = view_height[0]
		view_width = view.clientWidth;
         var numNodes = num_circles;
         var radius;
         if(window.innerWidth<=767){
         	radius = view_width/4;
         } else {
         	radius = (view_height/1.7)/2;
         }
         
         var nodes = createNodes(numNodes, radius);
         createSvg(radius, function (svg) {
           createElements(svg, radius, nodes, 10);
         });
       }
       document.addEventListener('DOMContentLoaded', (event) => {
          draw();
          showSigPpl();
        })
}
// draw shared network for signature view
function drawPath(point1_id, point2_id, sig_class, comment) {
            var p1x = parseFloat(document.getElementById(point1_id).getAttribute("cx"));
            var p1y = parseFloat(document.getElementById(point1_id).getAttribute("cy"));
            var p2x = parseFloat(document.getElementById(point2_id).getAttribute("cx"));
            var p2y = parseFloat(document.getElementById(point2_id).getAttribute("cy"));
            // mid-point of line:
            var mpx = (p2x + p1x) * 0.5;
            var mpy = (p2y + p1y) * 0.5;
            // center of svg
            el=document.querySelector('svg')
            this_h=el.clientHeight;
   			c1x =this_h/2;
    		c1y=this_h/2;
    		offset = Math.floor(Math.random()*100)+(0)
    		offset *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
           // const rc = rough.svg(svg);
            // construct the command to draw a quadratic curve
            var curve = "M" + p1x + " " + p1y + " Q " + (c1x+offset) + " " + (c1y+offset) + " " + p2x + " " + p2y;
   			// curve = rc.path("M" + p1x + " " + p1y + " Q " + c1x + " " + c1y + " " + p2x + " " + p2y, {
			//   stroke: 'inherit', strokeWidth: 5
			// });
   			//  curve.setAttribute("class","curve "+sig_class)
   			//  console.log(curve);
   			tooltip = document.querySelector('.tooltip')
            path = d3.select('svg')
              .append('path')
              .attr("id", point1_id + "_"+ point2_id)
              .attr("class","curve "+sig_class)
              .attr('d', curve)
              .on("mouseover", function(){
              	getpos()
              	tooltip.innerHTML=comment
              	tooltip.style.display="block"
              	tooltip.style.opacity="1"
              	tooltip.style.left=x
              	tooltip.style.top=y
              	tooltip.style.width="10em"
              })
              .on("mouseout", function(){
              	tooltip.innerHTML=""
              	tooltip.style.display="none"
              	tooltip.style.opacity="0"
              	tooltip.style.width="auto"
              });
            // svg.appendChild(curve);
        }
function updatePaths(){
		path_data = [];
		paths = document.querySelectorAll('.curve')
		for(i=0;i<paths.length;i++){
			id = paths[i].id
			console.log(paths[i])
			console.log(id)
			split = id.split("_")
			point1 = split[0]
			point2 = split[1]
			var p1x = parseFloat(document.getElementById(point1).getAttribute("cx"));
		    var p1y = parseFloat(document.getElementById(point1).getAttribute("cy"));
		    var p2x = parseFloat(document.getElementById(point2).getAttribute("cx"));
		    var p2y = parseFloat(document.getElementById(point2).getAttribute("cy"));
			path_data.push({
				id: id,
				p1x: p1x,
				p1y: p1y,
				p2x: p2x,
				p2y: p2y
			})
		}
		console.log(path_data)
		// center of svg
	    el=document.querySelector('svg')
	    this_h=el.clientHeight;
		c1x =this_h/2;
		c1y=this_h/2;
		for(i=0;i<path_data.length;i++){
			updated_curve = "M" + path_data[i]['p1x'] + " " + path_data[i]['p1y'] + " Q " + c1x + " " + c1y + " " + path_data[i]['p2x'] + " " + path_data[i]['p2y'];
			d3.selectAll('#'+path_data[i]['id'])
				.attr('d', updated_curve)
				.transition()
				.ease(d3.easeLinear)
				.duration(0);
		}
}
function updateSvg(width,height){
		svg = d3.select('svg')
			.transition()
			.duration(100)
			.attr("width", height + 50)
			.attr("height", height + 50);
       function createNodes (numNodes, radius) {
         var nodes = [], 
             width = (radius*2) + 50,
             height = (radius*2) + 50,
             angle,
             x,
             y,
             i;
         for (i=0; i<numNodes; i++) {
          angle = (i / (numNodes/2)) * Math.PI;
          x = (radius * Math.cos(angle)) + (width/2); 
          y = (radius * Math.sin(angle)) + (width/2);
          nodes.push({'id': i+1, 'x': x, 'y': y});
         }
         return nodes;
       }
      function updateCircles (radius, nodes, elementRadius) {
      	svg = d3.select('svg');
      	svg.select('rect')
      		.transition()
      		.duration(100)
        	.attr("x",radius-35 )
        	.attr("y",0)
        	.attr("width",radius+150)
        	.attr("height",radius);
        svg.selectAll('circle')
        	.data(nodes)
         	.transition()
         	.duration(100)
            .attr('r', elementRadius)
            .attr('cx', function (d, i) {return d.x;})
            .attr('cy', function (d, i) {return d.y;})
       };
       nodes = createNodes(14, height/2);
       updateCircles(height/2, nodes,10)
}
// highlight unique reactions in signature view
function highlight(point, sig_class){
	var highlight = document.getElementById(point);
	highlight.classList.add(sig_class);
	// highlight.setAttribute("r",15);
}
function showSigPpl() {
	tooltip=document.querySelector('.tooltip');
	circles = document.querySelectorAll('circle');
	for(i=0;i<circles.length;i++){
		circles[i].onmouseover=function() {
			// get mouse event
			getpos();
			text= this.id;
			if(text=="person11" || text=="person12" || text=="person13" || text=="person14"){
				
				if(text=="person11"){
					text= "B Performing pianist";
				}
				if(text=="person12"){
					text= "A Performing cellist";
				}
				if(text=="person13"){
					text= "Prepared pianist";
				}
				if(text=="person14"){
					text="Prepared cellist";
				}
			} else {
				test = Number.isInteger(parseInt(text.slice(-2)));
				if(test==true){
					ending = parseInt(text.slice(-2));
					if(ending==10){
						text ='E String listener, played it'
					}

				} else if (test==false) {
					ending = parseInt(text.slice(-1));
					if(ending==1){
						text ='G String listener, unfamiliar'
					}else if (ending==2){
						text ='H String listener, unfamiliar'
					}else if(ending==3){
						text ='F String listener, heard it'
					}else if (ending==4){
						text ='I Pianist listener, played it'
					}else if (ending==5){
						text ='J Pianist listener, played item'
					}else if (ending==6){
						text ='K Pianist listener, played it'
					}else if (ending==7){
						text ='N Pianist listener, unfamiliar'
					}else if (ending==8){
						text ='L Pianist listener, played it'
					}else if (ending==9){
						text ='M Pianist listener, heard it'
					}
				}
				
			}
			tooltip.style.display="block";
			tooltip.style.opacity="1";
			tooltip.innerHTML = caps(text.replace(/_/g, " "));
		  	tooltip.style.left=x;
		  	tooltip.style.right="auto";
		  	tooltip.style.top=y;
		}
		circles[i].onmouseout=function() {
			tooltip.style.opacity="0";
			tooltip.style.display="none";
		}
	}
}
function clearDiv(div) {
	div.innerHTML="";
}
function getProfile() {
// make profile container
			target = document.querySelector('.profile')
			if(target!=null){
				target.innerHTML="";
			} else {
				div = document.createElement('div')
				div.setAttribute("class","profile")
				tooltip.appendChild(div);
			}
}
function getProfileData(data, role){
	target = document.querySelector('.profile')
	role = caps(role.replace(/_/g, " "))
	data = data.filter(function(d){return d.role== role});
	summary1 = data[0]['summary1']
	summary2 = data[0]['summary2']
	summary3 = data[0]['summary3']
	heard = data[0]['heard']
	if (heard != "no"){
		heard_bool = "yes"
	} else {
		heard_bool = "no"
	}
	played = data[0]['played']
	if(played == "no"){
		played_bool = "no"
	} else {
		played_bool = "yes"
	}
	if (role.match("pianist")){
		pic = "pianist"
	} else if (role.match("cellist")){
		pic = "cellist"
	} else if (role.match("Class member")){
		if(heard_bool=="yes" && played_bool == "yes"){
			pic = "both"
		} else if (heard_bool == "no" && played_bool == "no"){
			pic = "none"
		} else if (heard_bool == "yes"){
			pic = "heard"
		} else if (played_bool == "yes"){
			pic = "played"
		}
	}
	getDetails(data, target, pic, role)
	tooltip.style.display="block";
	tooltip.style.opacity="0.95";
}
function getDetails(data, target, pic, role){
	formatPercent = d3.format(".0%")
	listendaily = data[0]['q5_listendaily']
	console.log(listendaily)
	critique = data[0]['q6_talkwrite']
	primary_instrument = data[0]['q7_instr_primary'].split(",")
	all_instruments = data[0]['q8_instr_all'].split(",")
	play_genres = data[0]['q9_play_genres']
	listen_genres = data[0]['q10_listen_genres']
	gender = data[0]['gender']
	ethnicity = data[0]['ethnicity']
	education = data[0]['education']
	random = (Math.floor(Math.random() * 3) + 1).toString()
	random = "summary" + random;
	profile_pic = "<div class='profile-pic "+ pic + "'></div>"
	target.innerHTML+= "<div class=top>" + profile_pic + "<h2>"+ data[0]['role2'] + "</h2></div>"
	target.innerHTML+="<h2>Example General Comment</h2><p>"+ data[0][random] + "</p>"
	target.innerHTML+="<h2>Familiarity with Piece</h2>"
	if(data[0]['played']!="No" || data[0]['heard']!="No"){
		if(data[0]['played']!="No"){
			text = data[0]['played'].split("Yes, ");
			target.innerHTML+="<p>"+text[1]+"</p>"
		}
		if(data[0]['heard']!="No"){
			text2 = data[0]['heard'].split("Yes, ");
			target.innerHTML+="<p>"+text2[1]+"</p>"
		}
	} else {
		target.innerHTML+="<p>"+"No prior familiarity with the piece"+"</p>"
	}
	target.innerHTML+="<h2>Daily Listener</h2>"
	target.innerHTML+="<div style='width:80%;height:0.5em;background-color:#CCCCCC;border-radius:2em;overflow:hidden;'><div style='background:linear-gradient(15deg, #D9DFFF, #00A99A);border-radius:2em;height:0.5em;width:"+formatPercent(listendaily/5)+"'></div>"
	target.innerHTML+="<h2>Writes and Talks about Music</h2>"
	target.innerHTML+="<div style='width:80%;height:0.5em;background-color:#CCCCCC;border-radius:2em;overflow:hidden;'><div style='background:linear-gradient(15deg, #D9DFFF, #00A99A);height:0.5em;border-radius:2em;width:"+formatPercent(critique/5)+"'></div>"
	target.innerHTML+="<h2>Primary Instrument</h2>"
	target.innerHTML+="<tag>" + primary_instrument[0].trim() + "</tag>"
	target.innerHTML+="<h2>Other Instruments</h2>"
	if(all_instruments!=""){
		for(j=0;j<all_instruments.length;j++){
			instrument = all_instruments[j].trim();
			console.log(instrument);
			target.innerHTML+="<tag>"+instrument+"</tag>"
		}
	}
}
// setup spatial view
function spatial() {
	page = document.querySelector('.page')
	tooltip=document.querySelector('.tooltip');
	people = document.querySelectorAll('.person');
	for(i=0;i<people.length;i++){
		people[i].onmouseenter=function() {
			clearDiv(tooltip)
			getProfile()
			getpos();
			role= this.id;
			// get bio info
			d3.csv('data/new_bio.csv')
				.then (function(data){
					getProfileData(data, role)
				})
				.catch(function(error){
				})
			test = x.split("px");
			console.log(test[0], window.innerWidth/2)
			if(test[0]<=window.innerWidth/2){
				tooltip.style.left=x;
				tooltip.style.right="auto"
			} else if(test[0]>window.innerWidth/2) {
				tooltip.style.left="auto"
				tooltip.style.right=window.innerWidth-test[0]+"px";
			}
		  	y = y.split("px")
		  	if(y[0]<=window.innerHeight/2){
		  		tooltip.style.top=parseInt(y[0])-150+"px";
		  	} else {
		  		tooltip.style.top=parseInt(y[0])-250+"px";
		  	}
		  	
		}
		people[i].onmouseleave=function() {
			tooltip.style.display="none";
			tooltip.style.opacity="0";
		}
	}
}
function updateSpatial(data, role){
	role = role.replace(/\s/g, "_");
	role = role.toLowerCase();
	rate1 = parseInt(data['rater1_reassigned']);
	rate2 = parseInt(data['rater1_reassigned']);
	rater1 = data['rater1'].replace(/\s/g, "_").toLowerCase();
	rater1 = document.getElementById(rater1);
	rater2 = data['rater2'].replace(/\s/g, "_").toLowerCase();
	rater2 = document.getElementById(rater2);
	sentiment = data['sentiment'];
	target = document.getElementById(role);
	if(sentiment == "pos"){
		target.classList.add('posFade');
		if(rate1<3){
			rater1.classList.add('negFade');
		} else {
			rater1.classList.add('posFade');
		}
		if(rate2<3){
			rater2.classList.add('negFade');
		} else {
			rater2.classList.add('posFade');
		}
	} else if (sentiment == "neg") {
			target.classList.add('negFade');
		if(rate1<3){
			rater1.classList.add('posFade');
		} else {
			rater1.classList.add('negFade');
		}
		if(rate2<3){
			rater2.classList.add('posFade');
		} else {
			rater2.classList.add('negFade');
		}
	} else if (sentiment == "mixed" | sentiment =="other"){
		target.classList.add('mixedFade');
	}
	setTimeout( ()=> {
		role = this.role.toString();
		role = role.replace(/\s/g, "_").toLowerCase();
		role = document.getElementById(role);
		if(role.classList.contains('posFade')){
			role.classList.remove('posFade')
		} else if (role.classList.contains('negFade')){
			role.classList.remove('negFade')
		} else if (role.classList.contains('mixedFade')){
			role.classList.remove('mixedFade')
		};
		if(rater1.classList.contains('posFade')){
			rater1.classList.remove('posFade')
		} else if (rater1.classList.contains('negFade')){
			rater1.classList.remove('negFade')
		} else if (rater1.classList.contains('mixedFade')){
			rater1.classList.remove('mixedFade')
		};
		if(rater2.classList.contains('posFade')){
			rater2.classList.remove('posFade')
		} else if (rater2.classList.contains('negFade')){
			rater2.classList.remove('negFade')
		} else if (rater2.classList.contains('mixedFade')){
			rater2.classList.remove('mixedFade')
		};
	},10000)
}
// dynamic or locked view of score based on # of reactions 
function alignScoreView(comments_count){
	console.log(comments_count)
	score_view = document.querySelector('#page1');
	perspective = document.querySelector('.perspective');
	perspective_h = perspective.offsetHeight;
	container_view = document.querySelector('.view');
	container_height= container_view.offsetHeight;
	audio_container = document.querySelector('.audio-container');
	audio_container_h = audio_container.offsetHeight
	height = window.innerHeight;
	if(card_pos=="down"){
		// console.log('down')
		// if (comments_count<1){
		// 	score_view.style.height=(height-audio_container_h)+"px";
		// } else if (comments_count>=1){
			score_view.style.height=height/6+"px";
		// };
	} else if (card_pos=="up"){
		console.log("up")
		score_view.style.height="0px";
	}
}
// number of agreements/disagreements by raters for each reaction
function displayEndorsement(data, comment_id){
	results = [];
	rater1 = parseInt(data['rater1_reassigned']);
	if(rater1<3){
		results.push({
			rater: data['rater1'],
			judgement:"disagree"
		});
	} else {
		results.push({
			rater: data['rater1'],
			judgement:"agree"
		});
	}
	rater2 = data['rater2_reassigned'];
	if(rater2<3){
		results.push({
			rater: data['rater2'],
			judgement:"disagree"
		});
	} else {
		results.push({
			rater: data['rater2'],
			judgement:"agree"
		});
	}
	agrees = results.filter(function(d) {return d.judgement =="agree"})
	disagrees = results.filter(function(d) {return d.judgement =="disagree"})
	target = document.getElementById(comment_id);
	endorsements = document.createElement('div');
	endorsements.setAttribute("class", "endorsements");
	endorsements.innerHTML="<div class='social agree' name="+ comment_id +"><em>"+ agrees.length + " <i class='material-icons'>thumb_up</i></em></div><div class='social disagree' name="+ comment_id +"><em>"+ disagrees.length + " <i class='material-icons' style='transform:translate(360deg);color:#CCCCCC'>thumb_down</i></em></div>";
	target.prepend(endorsements);
}
function endorsementsDetail(data) {
	tooltip=document.querySelector('.tooltip');
	agrees = document.querySelectorAll(".agree");
	disagrees = document.querySelectorAll(".disagree");
	for (i=0;i<agrees.length;i++){
		agrees[i].onmouseover=function() {
			agree = [];
			disagree = [];
			getpos();
			tooltip.style.left=x;
			tooltip.style.right="auto";
			tooltip.style.top=y;
			comment_id = this.getAttribute("name");
			index = data.findIndex(obj => obj.comment_id==comment_id);
			if(parseInt(data[index]['rater1_reassigned'])<3){
				disagree.push(data[index]['rater1'])
			} else {
				agree.push(data[index]['rater1'])
			}
			if(parseInt(data[index]['rater2_reassigned'])<3){
				disagree.push(data[index]['rater2'])
			} else {
				agree.push(data[index]['rater2'])
			}
			displayEndorsement();
			function displayEndorsement() {
				if(agree.length!=0){
					tooltip.style.display="block";
					tooltip.style.opacity="1";
					tooltip.innerHTML="";
					for(j=0;j<agree.length;j++){
					tooltip.innerHTML+="<div>"+agree[j]+"</div>"
					}
				}
			}
		}
		agrees[i].onmouseout=function() {
			tooltip.style.display="none";
			tooltip.style.opacity="0";
		}
	}
	for (i=0;i<disagrees.length;i++){
	disagrees[i].onmouseover=function() {
		agree = [];
		disagree = [];
		getpos();
		tooltip.style.left=x;
		tooltip.style.right="auto";
		tooltip.style.top=y;
		comment_id = this.getAttribute("name");
		index = data.findIndex(obj => obj.comment_id==comment_id);
		if(parseInt(data[index]['rater1_reassigned'])<3){
			disagree.push(data[index]['rater1'])
		} else {
			agree.push(data[index]['rater1'])
		}
		if(parseInt(data[index]['rater2_reassigned'])<3){
			disagree.push(data[index]['rater2'])
		} else {
			agree.push(data[index]['rater2'])
		}
		displayEndorsement();
		function displayEndorsement() {
			if(disagree.length!=0){
				tooltip.style.display="block";
				tooltip.style.opacity="1";
				tooltip.innerHTML="";
				for(j=0;j<disagree.length;j++){
				tooltip.innerHTML+="<div>"+disagree[j]+"</div>"
				}
			}
		}
	}
	disagrees[i].onmouseout=function() {
		tooltip.style.display="none";
		tooltip.style.opacity="0";
	}
}
}
// each reaction's category by sentiment
function displayTags(data, comment_id){
	tags = []
	categories=['DYNAMICS', 'BALANCE (NEW)', 'TEMPO', 'TIMING/RHYTHMIC MOTION', 'SYNCHRONIZATION', 'COMMUNICATION', 'EXPRESSIVITY', 'TONE QUALITY', 'OTHER'];
	for(i=0;i<categories.length;i++){
		category = categories[i];
		if(data[category]!=undefined && data[category]!= ""){
			if(category=='BALANCE (NEW)'){
				category=='BALANCE'
			}
			category2 = category.replace(/_/g, " ")
			category2 = category2.toLowerCase();
			tags.push({
				tag: category2,
				sentiment:data[category]
			});
		}
	}
	for(i=0;i<tags.length;i++){
		category_tag = document.createElement('div');
		category_tag.setAttribute("class", "tag");
		category_tag.setAttribute("value",tags[i]['sentiment'] )
		category_tag.innerHTML=tags[i]['tag'];
		target = document.getElementById(comment_id);
		target.appendChild(category_tag);
	}
}
// adjust audio playback rate based on # reactions
function adjustPlayback(data) {
	slow=0.6;
	normal=1;
	fast=2;
	veryfast=2.5
	if(data.length==0){
		audio.playbackRate = veryfast;
	} else if(data.length==1){
		audio.playbackRate = fast;
	}else if (data.length>1 && data.length <3){
		audio.playbackRate = normal;
	} else {
		audio.playbackRate = slow;
	}
}
// highlight score image and scroll to it during audio play
function reset() {
	overlays = document.querySelectorAll('.overlay');
	for(i=0;i<overlays.length;i++){
		overlays[i].style.opacity="0.5";
		overlay.style.removeProperty('background');
	}
}
function hover(img){
	target = document.querySelector('#page-holder'+img)
	overlay = target.querySelector('.overlay');
	// overlay.style.opacity="0.2";
	overlay.style.background="linear-gradient(to left, rgba(0,0,0,1), rgba(0,0,0,0)), linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))";
}
function scrollTo(img){
	scrollpost = document.querySelector('.page');
	test=document.querySelector('#page-holder'+img);
	target=test.offsetLeft - window.innerWidth/2;
	if(time_option=="dynamic"){
		scrollpost.scrollTo({
		  left: target,
		  behavior: 'smooth'
		});
	}else {
		scrollpost.scrollTo({
		  left: target,
		  // behavior:'smooth'
		});
	}
}
//calculate which measure each beat falls under
function getScore() {
d3.csv('data/cluster_results.csv')
.then(function(data) {
	for(i=1;i<274;i++){
		target=document.querySelector('#page1');
		height=window.innerHeight
		div = document.createElement('div');
		div.setAttribute("class","page-holder");
		div.setAttribute("id","page-holder"+i);
		overlay=document.createElement('div');
		overlay.setAttribute("class","overlay");
		img = document.createElement('img');
		img.src="assets/cropped/500w/"+i+".png";
		target.style.height=height/6+"px";
		cluster = document.createElement('div');
		label = data[i-1]['labels'];
		cluster.setAttribute("class", "label"+label + " clusterlabel")
		div.appendChild(img);
		div.appendChild(overlay);
		div.appendChild(cluster);
		target.appendChild(div);
		}
	goToAnalysis();
		})
	.catch(function(error){
	})
}
	
// resize reactions container based on window size
function resizeInterface() {
	fill = document.querySelector('.fill');
	// header=document.querySelector('header');
	// header_h=header.offsetHeight;
	check=document.querySelector('.page');
	// check.style.marginTop=header_h+"px";
	calc_h = check.offsetHeight;
	page_height = check.style.height;
	view = document.querySelector('.view');
	// offset = header_h+calc_h;
	offset = calc_h;
	view_height = window.innerHeight - offset+"px";
	view.style.height=view_height;
	start_message = document.querySelector('#start-message');
	if(start_message!=null){
		start_message.style.height=view.offsetHeight+"px";
	}
	fill.style.height = (calc_h*4) + "px";
	toggleScore(view, view_height);
	svg_w = view.offsetWidth;
	svg_h = view.offsetHeight;
	updateSvg(svg_h/1.7, svg_h/1.7);
	svg = document.querySelector('svg');
	if(svg!=null){
		setTimeout(function() {
			updatePaths();
		},1000)
	}
}
function toggleScore(view, view_height) {
	page = document.querySelector('.page');
	view2 = document.querySelector('#reactions2');
	view3 = document.querySelector('#reactions3');
	return_2 = view2.offsetHeight;
	return_3 = view3.offsetHeight;
	return_h = window.innerHeight/6;
	var toggle = function (a, b) {
	    var togg = false;
	    return function () {
	        return (togg = !togg) ? a() : b();
	    };
	};
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		view2.addEventListener('swiped-up', function(e) {
		    page.style.height="0px";
		    view.style.height = window.innerHeight+"px";
		    console.log(view.style.height)
		    view2.style.height = window.innerHeight + "px";
		    card_pos = "up";
		});
		view2.addEventListener('swiped-down', function(e) { 
			page.style.height=return_h + "px";
			view2.style.height=(window.innerHeight-return_h)+ "px";
			view.style.marginTop = return_h;
			card_pos = "down";
		});
		view3.addEventListener('swiped-up', function(e) {
		    page.style.height="0px";
		    view.style.height =  window.innerHeight+"px";
		     console.log(view.style.height)
		    view3.style.height =  window.innerHeight+"px";
		    card_pos = "up";
		});
		view3.addEventListener('swiped-down', function(e) { 
			page.style.height=return_h + "px";
			view3.style.height=(window.innerHeight-return_h)+ "px";
			view.style.marginTop = return_h;
			card_pos = "down";
		});
	} else {
		view2.addEventListener('click', toggle(function () {
		    page.style.height="0px";
		    view.style.height = window.innerHeight+"px";
		    console.log(view.style.height)
		    view2.style.height = window.innerHeight + "px";
		    card_pos = "up";
		}, function () { 
			page.style.height=return_h + "px";
			view2.style.height=(window.innerHeight-return_h)+ "px";
			view.style.marginTop = return_h;
			card_pos = "down";
		}));
		view3.addEventListener('click', toggle(function () {
		    page.style.height="0px";
		    view.style.height =  window.innerHeight+"px";
		     console.log(view.style.height)
		    view3.style.height =  window.innerHeight+"px";
		    card_pos = "up";
		}, function () { 
			page.style.height=return_h + "px";
			view3.style.height=(window.innerHeight-return_h)+ "px";
			view.style.marginTop = return_h;
			card_pos = "down";
		}));
	}	
}
// run other supporting/tour functions 
onboard();
tourImpressions() 
tourEnsemble();
// get Impressions information
function tourImpressions() {
	icon = document.querySelector('#imp_show');
	lightbox = document.querySelector('#imp_about');
	icon.onmouseover=function() {
		lightbox.style.display="block";
	}
	icon.onmouseout=function() {
		lightbox.style.display="none";
	}
}
function tourEnsemble() {
	icon2 = document.querySelector('#ensemble_show');
	lightbox2 = document.querySelector('#ensemble_about');
	icon2.onmouseover=function() {
		lightbox2.style.display="block";
	}
	icon2.onmouseout=function() {
		lightbox2.style.display="none";
	}
}
function onboard() {
	onboarding = document.querySelector('.onboarding');
	about = document.querySelector('#about');
	about.onclick=function() {
		onboarding.innerHTML="<iframe src='start.html' frameborder=0></iframe><div class='close'>X</div>"
		onboarding.style.display="block";
		close = onboarding.querySelector('.close');
		close.onclick=function() {
			onboarding.style.display="none";
		}
	}
}