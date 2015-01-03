(function (){
	var Button = TM.Button = function(control, name, width, height, xPos, yPos, parent){
		this.control = control
		this.name = name
		this.element = $('<button>' + name + '</button>')[0]
		this.width = width
		this.height = height
		this.xPos = xPos
		this.yPos = yPos
		this.parent = parent
	}

	Button.prototype.resetPosition = function(){
		this.element.style.position = "absolute"
		var left = canvas.getX(this.pos()[0]) + canvas.offset()[0]
		this.element.style.left = left
		var top = canvas.getY(this.pos()[1]) + canvas.offset()[1]
		this.element.style.top = top
	}

	Button.prototype.resetDimension = function(){
		this.element.style.width = canvas.getX(this.width)
		this.element.style.height = canvas.getY(this.height)
		this.element.style.fontSize = canvas.getY(this.height) / 1.618
		this.element.style.padding = "0px"
		this.element.style.textAlign = "center"
	}

	Button.prototype.reset = function(){
		this.resetPosition()
		this.resetDimension()
		$('body').append($(this.element))
	}

	Button.prototype.show = function(){
		$(this.element).show()
	}

	Button.prototype.hide = function(){
		$(this.element).hide()
	}

	Button.prototype.pos = function(){
		var x =  this.xPos
		var y =  this.yPos
		if(this.parent){
			x += this.parent.pos[0]
			y += this.parent.pos[1]
		}
		return [x, y]
	}

})()