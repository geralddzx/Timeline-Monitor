(function(){
	var Generator = TM.Generator = function(timeline){
		this.timeline = timeline
		this.time = this.timeline.time
	}
	
	Generator.prototype.start = function(){
		setInterval(this.step.bind(this), 1000)
	}

	Generator.prototype.step = function(){
		this.time = this.time + 1
		var data = this.genData()
		this.timeline.addData(this.time, data)
	}

	Generator.prototype.genRealData = function(){
		var data = {time: this.time}
		data.rings = {}
		this.genRingsData(data.rings)
		return data
	}

	Generator.prototype.genRingsData = function(ringsData){
		for (var i = 0; i < this.timeline.rings.length; i++){
			var ring = this.timeline.rings[i]
			ringsData[ring.name] = {} 
			this.genRingData(ring, ringsData[ring.name])
		}
	}

	Generator.prototype.genRingData = function(ring, ringData){
		var prevData = this.timeline.dataIndex.data[this.time - 1]
		var prevRingData = prevData && prevData.rings[ring.name]
		prevRingData = prevRingData || this.forgeRingData(ring)
		if (prevRingData.phase && this.roll(prevRingData.state)){
			this.forgeNextState(prevRingData, ringData, ring)
		} else {
			ringData.dupKeys(prevRingData)
		}
	}

	Generator.prototype.roll = function(state){
		return Math.roll(Generator.shift[state])
	}

	Generator.prototype.forgeRingData = function(ring){
		var data = {}
		if (ring.phases.length){
			data.phase = ring.phases.rand().name
			data.state = Generator.states.rand()
		}
		return data
	}

	Generator.prototype.forgeNextState = function(prevData, currentData, ring){
		currentData.state = Generator.nextState(prevData.state)
		currentData.phase = ring.nextPhase(prevData.phase).name
	}

	Generator.states = [
		"green",
		"yellow",
		"red",
	]

	Generator.nextState = function(currentState){
		var index = Generator.states.indexOf(currentState)
		return Generator.states[(index + 1) % 3]
	}

	Generator.shift = {
		"green": 0.03,
		"yellow": 0.4,
		"red": 0.4,
	}






})()