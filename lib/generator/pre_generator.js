(function(){
	var PreGenerator = TM.PreGenerator = function(timeline){
		this._super.call(this, timeline)
		this.initializeData()
	}

	PreGenerator.inherits(TM.Generator)

	PreGenerator.prototype.initializeData = function(){
		this.timeline.rings.each(function(ring){
			if(!this.timeline.preIndex[ring.name].data.keys().length){
				var initialData = this.genRingData(ring)
				var randStart = Math.randInt(this.timeline.time - 80, this.timeline.time)
				this.setData(ring, randStart, initialData)
			}
		})
	}

	PreGenerator.prototype.setData = function(ring, startTime, data){
		data.startTime = startTime
		for(var i = startTime; i < startTime + data.duration; i++){
			this.timeline.setPreData(ring.name, i, data)
		}
	}

	PreGenerator.prototype.genData = function(){
		var timeline = this.timeline
		var startTime = timeline.time - timeline.displaySize()
		while(!timeline.getPreData(startTime)){
			startTime < timeline.getFirstPreTime() && this.genBackward()
			startTime > timeline.getFirstPreTime() && this.genForward()
		}
		while(!timeline.getPredictedData(timeline.time)){
			this.genForward()
		}
	}

	PreGenerator.prototype.genForward = function(){
		var startTime = this.timeline.getLastPreTime() + 1
		this.setData(startTime, this.genRingData)
	}

	PreGenerator.genRingData = function(ring){
		var data = {}
		var startTime = 0
		ring.phases.each(function(phase){
			data.phases[phase.name] = PreGenerator.genPhaseData(startTime, phase)
			startTime = data[phase.name].endTime
		})
		data.duration = startTime
		return data
	}

	PreGenerator.genPhaseData = function(startTime, phase){
		var data = {}
		data.startTime = startTime
		data.majorStops = PreGenerator.genMajorStops(startTime)
		var minorStart = data.majorStops[0].startTime
		var minorEnd = data.majorStops[1].startTime()
		data.minorStops = PreGenerator.genMinorStops(minorStart, minorEnd)
		data.flashStop = PreGenerator.genFlashStops(data.minorStops)
		data.endTime = data.majorStops.last().endTime
	}

	PreGenerator.genMajorStops = function(startTime){
		var stops = []
		PreGenerator.lengths.keys().each(function(state){
			var stop = {}
			var length = PreGenerator.lengths[state]
			stop.state = state
			stop.startTime = startTime
			stop.endTime = startTime + Math.randInt(length * 0.9, length * 1.1)
			stops.push(stop)
			startTime = stop.endTime
		})
		return stops
	}

	PreGenerator.genMinorStops = function(startTime, endTime){
		var stop1 = {state: PreGenerator.minorStates[0]}
		var stop2 = {state: PreGenerator.minorStates[1]}
		stop1.startTime = startTime
		stop1.endTime = Math.randInt(startTime + 1, endTime) 
		stop2.startTime = stop1.endTime
		stop2.endTime = endTime
		return [stop1, stop2]
	}

	PreGenerator.genFlashStops = function(minorStops){
		var stop = {}
		stop.state = PreGenerator.flashState
		stop.startTime = Math.randInt(minorStops[0].startTime, minorStops[0].endTime)
		if (Math.roll(0.5)){
			stop.endTime = minorStops[0].endTime
		} else {
			stop.endTime = minorStops[1].endTime
		}
		return stop
	}
})()