Canvas = function(canvas){
	this.element = canvas
	this.width = canvas.width
	this.height = canvas.height
	this.ctx = this.element.getContext("2d")
}

Canvas.prototype.fillRect = function(color, x1, y1, width, height){
	var ctx = this.ctx 
	ctx.fillStyle = color
	ctx.fillRect(this.getX(x1), this.getY(y1), this.getX(width), this.getY(height))
}

Canvas.prototype.fillText = function(color, size, text, startX, startY){
	var ctx = this.ctx 
	ctx.font = this.height / 200.0 * size + 'pt georgia'
	ctx.fillStyle = color
	ctx.textBaseline = "top"
	ctx.fillText(text, this.getX(startX), this.getY(startY))
}

Canvas.prototype.drawLine = function(color, x0, y0, x1, y1){
	ctx.strokeStyle = color
	ctx.beginPath()
    ctx.moveTo(this.getX(x0), this.getY(y0))
    ctx.lineTo(this.getX(x1), this.getY(y1))
    ctx.stroke()
}

Canvas.prototype.getX = function(percent){
	return this.width * percent / 100
}

Canvas.prototype.getY = function(percent){
	return this.height * percent / 100
}