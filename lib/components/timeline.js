(function (){
	var Timeline = TM.Timeline = function(){
		this.time = Date.nowInSeconds()  - 1
		this.forward = 1
		this.zoom = 100

		canvas = this.canvas = new Canvas(1080, 540)
		this.ruler = new TM.TimelineRuler(this)
		this.scroll = new TM.Scroll(this)
		TM.Ring.genRings(this)
	}

	Timeline.prototype.start = function(){
		this.genData()
		this.draw()
		setInterval(this.step.bind(this), 1000)
	}

	Timeline.prototype.step = function(){
		this.time = this.time + this.forward
		this.genData()
		this.draw()
	}

	Timeline.prototype.genData = function(){
		this.rings.each(function(ring){
			ring.genData()
		})
	}

	Timeline.prototype.draw = function(){
		this.drawBackground()
		this.drawRings()
		this.drawRealData()
		this.drawCenterLine()
		this.drawPreData()
		this.drawMarkers()
		this.scroll.draw()
	}

	Timeline.prototype.drawMarkers = function(){
		this.markers = {}
		this.rings.each(function(ring){
			ring.drawMarkers()
		})
		this.drawMarkerLine()
		this.drawTimelineMarkers()
	}

	Timeline.prototype.drawMarkerLine = function(){
		var x0 = TM.TimelineRuler.barStart
		var y0 = this.ruler.markerLinePos()
		var x1 = 50.0
		canvas.drawLine("white", x0, y0, x1, y0)
	}

	Timeline.prototype.drawTimelineMarkers = function(){
		var timeline = this
		this.markers.keys().each(function(time){
			timeline.drawPointers(time)
		})
	}

	Timeline.prototype.drawPointers = function(time){
		var pointers = this.markers[time]
		for(var i = pointers.length - 1; i >= 0 ; i--){
			var pointer = pointers[i]
			var xPos = this.ruler.xPos(time)
			var y0 = this.ringHeight() / 20
			var y1 = this.ruler.markerLinePos()
			y1 = y1 + (i * 2 - 1) * this.pointerRadius()
			var grad = pointer.gradient
			new TM.Pointer(pointer.color, xPos, y0, y1, grad, this).draw()
		}
	}

	Timeline.prototype.drawPreData = function(){
		this.rings.each(function(ring){
			new TM.PreDataPaint(ring).draw()
		})
	}

	Timeline.prototype.drawRealData = function(){
		this.rings.each(function(ring){
			new TM.RealDataPaint(ring).draw()
		})
	}

	Timeline.prototype.drawCenterLine = function(){
		var y1 = 100 - this.ringHeight() * 0.5
		canvas.drawLine("white", 50.0, 0.0, 50.0, y1)
	}
	
	Timeline.prototype.drawBackground = function(){
		canvas.fillRect("black", 0, 0, 100.0, 100.0)
	}

	Timeline.prototype.drawRings = function(){
		this.rings.each(function(ring){
			ring.draw()
		})
	}

	Timeline.prototype.displaySize = function(){
		return Timeline.displaySize * 100 / this.zoom
	}

	Timeline.prototype.startTime = function(){
		return this.time - this.displaySize()
	}

	Timeline.prototype.endTime = function(){
		return this.time + this.displaySize()
	}

	Timeline.prototype.ringHeight = function(){
		return 100.0 / (this.rings.length + 1)
	}

	Timeline.prototype.dayStart = function(){
		var date = new Date(this.time * 1000)
		date.setHours(0, 0, 0, 0)
		return date.getTime() / 1000
	}

	Timeline.prototype.pointerRadius = function(){
		return this.ringHeight() * 0.05
	}

	Timeline.displaySize = 100

	Timeline.states = ["green", "amber", "red", "walk", "dw", "pp"]
})()

