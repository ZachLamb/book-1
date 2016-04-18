function setup(){
	 createCanvas(windowWidth,windowHeight);
}
var myColor = 0;
function draw(){

	if (mouseIsPressed) {
	    fill('rgba(0,255,0, 0.25)');
	    ellipse(mouseX, mouseY, 80, 80);
  }
  	else if(keyIsPressed){
  		fill(255, 204, 0);
		rect(random(0,windowWidth),random(0,windowHeight), 60, 60);
  	}
}
function mouseWheel(event) {
  print(event.delta);

  myColor += event.delta*5;
}