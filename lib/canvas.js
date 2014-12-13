Canvas = function(canvas){
	this.element = canvas
	this.width = canvas.width
	this.height = canvas.height
}

Canvas.prototype.getX = function(percent){
	return this.width * percent / 100
}

Canvas.prototype.getY = function(percent){
	return this.height * percent / 100
}