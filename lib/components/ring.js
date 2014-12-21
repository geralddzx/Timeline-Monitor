(function (){
	var Ring = TM.Ring = function(number, timeline){
		this.timeline = timeline
		this.number = number
		this.name = "R" + (number + 1)
		
		TM.Phase.genPhases(this)
		this.ruler = new TM.Ruler(this)
		this.tRuler = this.timeline.ruler
		this.preIndex = {}
		this.realIndex = {}
	}

	Ring.genRings = function(timeline){
		timeline.rings = []
		var numRings = 2 + Math.floor(Math.random() * 3)
		for (var i = 0; i < numRings; i++){
			var ring = new Ring(i, timeline)
			timeline.rings.push(ring)
		}
	}

	Ring.prototype.genData = function(){
		if(this.phases.length){
			this.preGenerator.genData()
			this.realGenerator.genData()
		}
	}

	Ring.prototype.draw = function(){
		this.drawLabel()
		this.drawBorder()
		this.drawPhases()
		this.phases.length && this.drawMarkerLine()
	}

	Ring.prototype.drawLabel = function(){
		var xPos = 1.0
		var yPos = this.ruler.yPos() + 1.0
		var height = this.ruler.barHeight() * 0.8
		canvas.fillText("white", height, this.name, xPos, yPos, "left", "top")
	}

	Ring.prototype.drawBorder = function(){
		var x0 = 2.0
		var y0 = this.ruler.yPos() + this.timeline.ringHeight()
		var x1 = 98.0
		var y1 = y0
		canvas.drawLine("grey", x0, y0, x1, y1)
	}

	Ring.prototype.drawMarkerLine = function(){
		var x0 = TM.TimelineRuler.barStart
		var y0 = this.ruler.markerLinePos()
		var x1 = 50.0
		canvas.drawLine("white", x0, y0, x1, y0)
	}

	Ring.prototype.drawPhases = function(){
		this.phases.each(function(phase){
			phase.draw()
		})
	}

	Ring.prototype.drawMarkers = function(){
		var startTime = this.timeline.startTime()
		for(var i = startTime; i < this.timeline.time; i++){
			if(this.realIndex[i] && this.realIndex[i].marker){
				var marker = Profile.markers[this.realIndex[i].marker]
				var add = marker.type == "timeline"
				add && this.addMarker(i, marker) 
				!add && this.drawMarker(i, marker)
			}
			
		}
	}

	Ring.prototype.drawMarker = function(time, marker){
		var xPos = this.tRuler.xPos(time)
		if(marker.type == "phase"){
			var yPos = this.ruler.phaseMarkerPos()
		} else if(marker.type == "ring"){
			var yPos = this.ruler.ringMarkerPos()
		}
		var color = marker.color
		var timeline = this.timeline
		var grad = marker.gradient
		new TM.Pointer(color, xPos, yPos[0], yPos[1], grad, timeline).draw()
	}

	Ring.prototype.addMarker = function(time, marker){
		this.timeline.markers[time] = (this.timeline.markers[time] || [])
		this.timeline.markers[time].push(marker)
	}

	// 	Ring.prototype.currentData = function(){
	// 	if (this.timeline.currentData()){
	// 		return this.timeline.currentData().rings[this.name]
	// 	} else {
	// 		return null
	// 	}
	// }

	// Ring.prototype.currentPhase = function(){
	// 	if (this.currentData()){
	// 		return this.currentData().phase
	// 	} else {
	// 		return null
	// 	}
	// }

	// Ring.prototype.currentPhaseState = function(){
	// 	if (this.currentData()){
	// 		return this.currentData().state
	// 	} else {
	// 		return null
	// 	}
	// }

	



	// Ring.prototype.borderPos = function(){
	// 	var xStart = canvas.getX(this.pos()[0] + TM.Offset.ringBorder[0])
	// 	var yStart = canvas.getY(this.pos()[1] + this.height() + TM.Offset.ringBorder[1])
	// 	var xEnd = canvas.getX(100 - TM.Offset.ringBorder[0])
	// 	var yEnd = yStart
	// 	return [xStart, yStart, xEnd, yEnd]
	// }


	// Ring.prototype.nextPhase = function(currentPhaseName){
	// 	var currentIndex = this.phases.findIndex(function(phase){
	// 		return phase.name == currentPhaseName
	// 	})
	// 	nextIndex = (currentIndex + 1) % this.phases.length
	// 	return this.phases[nextIndex]
	// }



	// Ring.prototype.getPhaseIndex = function(phaseName){
	// 	this.phases.findIndex(function(phase){
	// 		return phase.name == phaseName
	// 	})
	// }


	




	

	

	

	

	// Ring.prototype.realBarPos = function(){
	// 	return [5.0, this.pos()[1] + this.height() * 0.3]
	// }


	




})()

