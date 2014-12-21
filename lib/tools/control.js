(function (){
	var Control = TM.Control = function(timeline){
		this.timeline = timeline
		this.makeButtons()
	}

	Control.prototype.makeButtons = function(){
		this.buttons = []
		this.makeSpeedButtons()
		this.makeSizeButtons()
	}

	Control.prototype.yPos = function(){
		return 100 - this.timeline.ringHeight()
	}

	Control.prototype.makeSpeedButtons = function(){
		this.buttons.push(this.makeRewind())
		this.buttons.push(this.makeDoubleRewind())
		this.buttons.push(this.makePause())
		this.buttons.push(this.makeForward())
		this.buttons.push(this.makeDoubleForward())
	}

	Control.prototype.makeSizeButtons = function(){
		this.makeFullButton()
		this.makeLeftButton()
		this.makeTopButton()
	}

	Control.prototype.makeFullButton = function(){
		var width = Control.sizeWidth
		var xPos = Control.sizeXPos + (width + 1) * 0
		var btn = new TM.Button(this, "Full", xPos, Control.sizeYPos, width, Control.sizeHeight)
		var control = this
		this.buttons.push(btn)
		$(btn.element).click(function(){
			control.resetCanvas(1080, 540)
		})
	}

	Control.prototype.makeTopButton = function(){
		var width = Control.sizeWidth
		var xPos = Control.sizeXPos + (width + 1) * 1
		var btn = new TM.Button(this, "Top", xPos, Control.sizeYPos, width, Control.sizeHeight)
		var control = this
		this.buttons.push(btn)
		$(btn.element).click(function(){
			control.resetCanvas(1080, 270)
		})
	}

	Control.prototype.makeLeftButton = function(){
		var width = Control.sizeWidth
		var xPos = Control.sizeXPos + (width + 1) * 2
		var btn = new TM.Button(this, "Left", xPos, Control.sizeYPos, width, Control.sizeHeight)
		var control = this
		this.buttons.push(btn)
		$(btn.element).click(function(){
			control.resetCanvas(540, 540)
		})
	}

	Control.prototype.resetCanvas = function(x, y){
		canvas.width(x)
		canvas.height(y)
		this.buttons.each(function(button){
			button.resetPosition()
			button.resetDimension()
		})
		this.timeline.draw()
	}

	Control.prototype.makeDoubleRewind = function(){
		var width = Control.speedWidth
		var height = Control.speedHeight
		var xPos = Control.speedXPos + (width + 1) * 0
		var yPos = this.speedYPos()
		var btn = new TM.Button(this, "<<", xPos, yPos, width, height)
		$(btn.element).click(this.doubleRewind.bind(this))
		return btn
	}

	Control.prototype.makeRewind = function(){
		var width = Control.speedWidth
		var height = Control.speedHeight
		var xPos = Control.speedXPos + (width + 1) * 1
		var yPos = this.speedYPos()
		var btn = new TM.Button(this, "<", xPos, yPos, width, height)
		$(btn.element).click(function(){this.timeline.forward = -1})
		return btn
	}

	Control.prototype.makePause = function(){
		var width = Control.speedWidth
		var height = Control.speedHeight
		var xPos = Control.speedXPos + (width + 1) * 2
		var yPos = this.speedYPos()
		var btn = new TM.Button(this, "▷", xPos, yPos, width, height)
		$(btn.element).click(this.pause.bind(this))
		return btn
	}

	Control.prototype.makeForward = function(){
		var width = Control.speedWidth
		var height = Control.speedHeight
		var xPos = Control.speedXPos + (width + 1) * 3
		var yPos = this.speedYPos()
		var btn = new TM.Button(this, ">", xPos, yPos, width, height)
		var timeline = this.timeline
		this.buttons.push(btn)
		$(btn.element).click(function(){timeline.forward = 1})
		return btn
	}

	Control.prototype.makeDoubleForward = function(){
		var width = Control.speedWidth
		var height = Control.speedHeight
		var xPos = Control.speedXPos + (width + 1) * 4
		var yPos = this.speedYPos()
		var btn = new TM.Button(this, ">>", xPos, yPos, width, height)
		this.buttons.push(btn)
		$(btn.element).click(this.doubleForward.bind(this))
		return btn
	}

	Control.prototype.pause = function(){
		if(this.timeline.forward){
			this.timeline.forward = 0
		} else {
			this.timeline.forward = 1
		}
	}

	Control.prototype.doubleRewind = function(){
		var timeline = this.timeline
		if(timeline.forward > -2){
			timeline.forward = -2
		} else {
			timeline.forward = Math.max(-32, timeline.forward * 2)
		}
	}

	Control.prototype.doubleForward = function(){
		var timeline = this.timeline
		if(timeline.forward < 2){
			timeline.forward = 2
		} else {
			timeline.forward = Math.min(32, timeline.forward * 2)
		}
	}

	Control.prototype.speedYPos = function(){
		return this.yPos() + this.timeline.ringHeight() * 0.15
	}

	Control.speedXPos = 71
	Control.speedWidth = 4
	Control.speedHeight = 6

	Control.sizeXPos = 0
	Control.sizeYPos = 101
	Control.sizeWidth = 6
	Control.sizeHeight = 6
})()