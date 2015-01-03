(function (){
	var Checkbox = TM.Checkbox = function(parent, text, textSize, boxSize, canvas, xPos, yPos){
		this.parent = parent
		this.createEl(text)
		this.textSize = textSize
		this.boxSize = boxSize
		this.height = boxSize
		this.canvas = canvas
		this.xPos = xPos
		this.yPos = yPos
	}

	Checkbox.prototype.createEl = function(text){
		this.div = $('<div>')[0]
		this.div.style.position = "absolute"
		var label = $('<label>' + text + '</label>')
		label.attr("for", text + "-checkbox")
		this.label = label[0]
		this.label.style.color = "white"
		this.label.style.verticalAlign = "middle"

		var box = $('<input type="checkbox"/>')
		box.attr("id", text + "-checkbox")
		this.box = box[0]
		this.box.checked = true
		this.box.style.verticalAlign = "middle"

		$(this.div).append(box)
		$(this.div).append(label)
	}

	Checkbox.prototype.resetPosition = function(){
		var left = this.canvas.getX(this.xPos) + this.canvas.offset()[0]
		this.div.style.left = left
		var top = this.canvas.getY(this.yPos) + this.canvas.offset()[1]
		this.div.style.top = top	
	}

	Checkbox.prototype.resetDimension = function(){
		var boxSize = this.canvas.getY(this.boxSize)
		this.box.style.height = boxSize + "px"
		this.box.style.width = boxSize + "px"
		this.label.style.fontSize = this.canvas.getY(this.textSize) / 1.618
	}

	Checkbox.prototype.reset = function(){
		this.resetPosition()
		this.resetDimension()
		$('body').append($(this.div))
	}

	Checkbox.prototype.hide = function(){
		$(this.div).hide()
	}

	Checkbox.prototype.show = function(){
		$(this.div).show()
	}

})()