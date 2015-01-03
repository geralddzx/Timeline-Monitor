(function (){
	var Config = TM.Config = function(monitor){
		this.monitor = monitor
		this.timeline = monitor.timeline
		this.canvas = this.monitor.canvas
		this.initCoords()
		this.initSettings()
		
		this.button = this.makeButton()
		this.exit = this.makeExit()
		this.makeLabels()
		this.startHandler()
	}

	Config.prototype.initCoords = function(){
		this.display = 0
		this.width = 20
		this.height = 50
		this.pos = [99.5 - this.width, this.yBound()]
	}

	Config.prototype.initSettings = function(){
		this.displayRing = true
		this.displayDevice = true
		this.displayPhase = true
		this.displayTimeline = true
	}

	Config.prototype.makeLabels = function(){
		var xSpace = this.width / 10
		var ySpace = this.height / 20
		this.labelGroup = new TM.ElementGroup(xSpace, ySpace, ySpace * 2, false, true, this)
		this.labelGroup.add(this.makeDisplay("Device"))
		this.labelGroup.add(this.makeDisplay("Ring"))
		this.labelGroup.add(this.makeDisplay("Phase"))
		this.labelGroup.add(this.makeDisplay("Timeline"))
	}

	Config.prototype.makeDisplay = function(component){
		var size = this.height / 10
		var checkbox = new TM.Checkbox(this, component, size, size, this.canvas)
		var config = this
		$(checkbox.box).change(function(){
			if($(this).prop('checked')){
				config["display" + component] = true
			} else {
				config["display" + component] = false
			}
			config.monitor.draw()
		})
		return checkbox
	}


	Config.prototype.makeButton = function(){
		var y = 100 - this.timeline.ringHeight() * 0.95
		var btn = new TM.Button(this, "⚙", 4, this.buttonHeight(), 95, y)
		var config = this
		$(btn.element).click(function(){
			if(config.display){
				config.hide()
			} else {
				config.show()
			}
		})
		return btn
	}

	Config.prototype.makeExit = function(){
		var width = this.width / 10
		var height = width * 2
		var space = width / 2
		var x = this.width - width
		var y = 0
		var btn = new TM.Button(this, "×", width, height, x, y, this)
		var config = this
		$(btn.element).click(function(){config.hide()})
		return btn
	}

	Config.prototype.show = function(){
		this.display = 1
		this.labelGroup.show()
		this.exit.show()
		this.monitor.draw()
	}

	Config.prototype.hide = function(){
		this.display = 0
		this.labelGroup.hide()
		this.exit.hide()
		this.monitor.draw()
	}

	Config.prototype.buttonHeight = function(){
		return this.monitor.timeline.ringHeight() / 5
	}

	Config.prototype.draw = function(){
		this.button.reset()
		if(this.display){
			this.labelGroup.reset()
			this.exit.reset()
			this.drawContainer()
		}
	}

	Config.prototype.drawContainer = function(){
		var x = this.pos[0]
		var y = this.pos[1]
		var w = this.width
		var h = this.height
		this.canvas.fillRect("black", x, y, w, h, "white")
	}

	Config.prototype.startHandler = function(){
		this.bindMouseDown()
		this.bindMouseUp()
		this.bindMouseMove()
	}

	Config.prototype.checkClick = function(x0, y0){
		if(this.display){
			x0 = this.canvas.percentX(x0)
			y0 = this.canvas.percentY(y0)
			var withinX = Math.between(x0, this.pos[0], this.pos[0] + this.width)
			var withinY = Math.between(y0, this.pos[1], this.pos[1] + this.height)
			return withinX && withinY
		}
	}

	Config.prototype.bindMouseDown = function(){
		var canvas = $(this.canvas.element)
		var callback = function(event){
			if(this.checkClick(event.offsetX, event.offsetY)){
				this.move = true
				this.xStart = event.clientX
				this.yStart = event.clientY
			}
		}
		canvas.mousedown(callback.bind(this))
	}

	Config.prototype.bindMouseUp = function(){
		var callback = function(event){
			this.move = false
		}
		$(window).mouseup(callback.bind(this))
	}

	Config.prototype.bindMouseMove = function(){
		var callback = function(event){
			if(this.move){
				var xShift = this.canvas.percentX(event.clientX - this.xStart)
				var yShift = this.canvas.percentY(event.clientY - this.yStart)
				this.shift(xShift, yShift)
				this.xStart = event.clientX
				this.yStart = event.clientY
			}
		}
		$(window).mousemove(callback.bind(this))
	}

	Config.prototype.shift = function(xShift, yShift){
		var xBound = 100 - this.width
		this.pos[0] = Math.bound(this.pos[0] + xShift, 0, xBound)
		this.pos[1] = Math.bound(this.pos[1] + yShift, 0, this.yBound())
		this.monitor.draw()
	}

	Config.prototype.yBound = function(){
		return 100 - this.timeline.ringHeight() - this.height
	}


})()