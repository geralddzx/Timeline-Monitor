(function (){
	var ElementGroup = TM.ElementGroup = function(xOffset, yOffset, spacing, h, v, parent){
		this.elements = []
		this.xOffset = xOffset
		this.yOffset = yOffset
		this.spacing = spacing
		this.h = h
		this.v = v
		this.parent = parent
	}

	ElementGroup.prototype.add = function(button){
		this.elements.push(button)
	}

	ElementGroup.prototype.pos = function(){
		var x =  this.xOffset
		var y =  this.yOffset
		if(this.parent){
			x += this.parent.pos[0]
			y += this.parent.pos[1]
		}
		return [x, y]
	}

	ElementGroup.prototype.startPos = function(index){
		x = this.pos()[0]
		y = this.pos()[1]
		for(var i = 0; i < index; i++){
			this.h && (x += this.elements[i].width) && (x += this.spacing)
			this.v && (y += this.elements[i].height) && (y += this.spacing)
		}
		return [x, y]
	}

	ElementGroup.prototype.reset = function(){
		for(var i = 0; i < this.elements.length; i++){
			var element = this.elements[i]
			var pos = this.startPos(i)
			element.xPos = pos[0]
			element.yPos = pos[1]
			element.reset()
		}
	}

	ElementGroup.prototype.hide = function(){
		for(var i = 0; i < this.elements.length; i++){
			this.elements[i].hide()
		}
	}

	ElementGroup.prototype.show = function(){
		for(var i = 0; i < this.elements.length; i++){
			this.elements[i].show()
		}
	}

})()