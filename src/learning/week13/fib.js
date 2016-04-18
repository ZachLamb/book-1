function setup(){
	 createCanvas(windowWidth,windowHeight);
}
var myColor = 0;
function draw(){
	fill('rgba(0,255,0, 0.25)');
	ellipse(mouseX, mouseY, 80, 80);
}
function xCoord(var a){
	var result = 5 * a * cos(a)
}