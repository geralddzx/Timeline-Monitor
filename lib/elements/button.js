(function (){
	var Button = TM.Button = function(control, name, x, y, width, height){
		this.control = control
		this.name = name
		this.element = $('<button>' + name + '</button>')[0]
		this.xPos = x
		this.yPos = y
		this.width = width
		this.height = height

		this.resetPosition()
		this.resetDimension()
		$('body').append(this.element)	
	}

	Button.prototype.resetPosition = function(){
		this.element.style.position = "absolute"
		var left = canvas.getX(this.xPos) + canvas.offset()[0]
		this.element.style.left = left
		var top = canvas.getY(this.yPos) + canvas.offset()[1]
		this.element.style.top = top + canvas.getMargin()
	}

	Button.prototype.resetDimension = function(){
		this.element.style.width = canvas.getX(this.width)
		this.element.style.height = canvas.getY(this.height)
		this.element.style.fontSize = canvas.getY(this.height) / 1.618 * 0.75
		this.element.style.padding = "0px"
		this.element.style.textAlign = "center"
	}

})()