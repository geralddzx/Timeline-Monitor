(function (){
	var Timeline = TM.Timeline = function(){
		this.time = Date.now()
		this.forward = 1
		this.rings = []
		this.preIndex = new TM.DataIndex(this)
		this.realIndex = new TM.DataIndex(this)
		this.zoom = 100
	}

	Timeline.prototype.start = function(){
		setInterval(this.step.bind(this), 1000)
	}

	Timeline.prototype.step = function(){
		this.time = this.time + this.forward
		this.draw()
	}

	Timeline.prototype.draw = function(){
		this.drawBackground()
		this.drawRings()
		this.drawData()
	}
	
	Timeline.prototype.drawBackground = function(){
		ctx.fillStyle = "black"
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	}

	Timeline.prototype.drawRings = function(){
		this.rings.each(function(ring){
			ring.draw()
		})
	}

	Timeline.prototype.displaySize = function(){
		return this.cycleTime * 100 / this.zoom
	}

	Timeline.prototype.dataWidth = function(){
		return 90.0 / this.displaySize() / 2
	}

	Timeline.prototype.drawData = function(){
		var startTime = this.time - this.displaySize()
		var endTime = this.time + this.displaySize()
		this.dataIndex.drawDataRange(startTime, endTime)
	}

	Timeline.prototype.setCycleTime = function(cycleTime){
		this.cycleTime = cycleTime
	}

	Timeline.prototype.getPreData = function(ringName, time){
		return this.preIndex.ringName.data[time]
	}

	Timeline.prototype.getFirstPreTime = function(ringName){
		return this.preIndex.ringName.data.keys().first()
	}

	Timeline.prototype.getLastPreTime = function(ringName){
		return this.preIndex.ringName.data.keys().last()
	}

	Timeline.prototype.setPreData = function(ringName, time, data){
		this.preIndex.ringName.data[time] = data
	}

	Timeline.prototype.getRing = function(name){
		var ring = this.rings.find(function(ring){
			return ring.name == name
		})
		return ring
	}

	// Timeline.prototype.currentData = function(){
	// 	return this.dataIndex[this.time]
	// }

})()

