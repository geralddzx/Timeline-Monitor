(function (){
	var Ring = TM.Ring = function(number, timeline){
		this.number = number
		this.name = "R" + (number + 1)
		this.phases = []

		timeline.rings.push(this)
		this.timeline = timeline
	}

	Ring.genRings = function(timeline){
		timeline.setCycleTime(Math.floor(Math.random() * 20) + 80)
		var numRings = 2 + Math.floor(Math.random() * 3)
		for (var i = 0; i < numRings; i++){
			var ring = new Ring(i, timeline)
			TM.Phase.genPhases(ring)
		}
	}

	Ring.labelFont = function(){
		return canvas.height / 40.0 + 'pt Calibri'
	}

	Ring.prototype.draw = function(){
		this.drawLabel()
		this.drawPhases()
		this.drawBorder()
	}
	
	Ring.prototype.drawLabel = function(){
		ctx.font = Ring.labelFont()
		ctx.fillStyle = "white"
		ctx.textBaseline = "top"
		var xPos = canvas.getX(this.pos()[0] + TM.Offset.ringLabel[0])
		var yPos = canvas.getY(this.pos()[1] + TM.Offset.ringLabel[1])
		ctx.fillText(this.name, xPos, yPos)
	}

	Ring.prototype.drawPhases = function(){
		this.phases.each(function(phase){
			phase.draw()
		})
	}

	Ring.prototype.drawBorder = function(){
		ctx.strokeStyle = "grey"
		ctx.beginPath()
      	ctx.moveTo(this.borderPos()[0], this.borderPos()[1])
      	ctx.lineTo(this.borderPos()[2], this.borderPos()[3])
      	ctx.stroke()
	}

	Ring.prototype.borderPos = function(){
		var xStart = canvas.getX(this.pos()[0] + TM.Offset.ringBorder[0])
		var yStart = canvas.getY(this.pos()[1] + this.height() + TM.Offset.ringBorder[1])
		var xEnd = canvas.getX(100 - TM.Offset.ringBorder[0])
		var yEnd = yStart
		return [xStart, yStart, xEnd, yEnd]
	}

	Ring.prototype.pos = function(){
		return [0, this.number * this.height()]
	}

	Ring.prototype.height = function(){
		return 100.0 / (this.timeline.rings.length + 1)
	}

	Ring.prototype.nextPhase = function(currentPhaseName){
		var currentIndex = this.phases.findIndex(function(phase){
			return phase.name == currentPhaseName
		})
		nextIndex = (currentIndex + 1) % this.phases.length
		return this.phases[nextIndex]
	}

	Ring.prototype.realBarPos = function(){
		return [5.0, this.pos()[1] + this.height() * 0.3]
	}

	Ring.prototype.barHeight = function(){
		return this.height() / 5
	}

	Ring.prototype.getPhaseIndex = function(phaseName){
		this.phases.findIndex(function(phase){
			return phase.name == phaseName
		})
	}

	Ring.prototype.currentData = function(){
		if (this.timeline.currentData()){
			return this.timeline.currentData().rings[this.name]
		} else {
			return null
		}
	}

	Ring.prototype.currentPhase = function(){
		if (this.currentData()){
			return this.currentData().phase
		} else {
			return null
		}
	}

	Ring.prototype.currentPhaseState = function(){
		if (this.currentData()){
			return this.currentData().state
		} else {
			return null
		}
	}




})()

