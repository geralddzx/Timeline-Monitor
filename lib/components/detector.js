(function (){
	var Detector = TM.Detector = function(number, timeline){
		this.timeline = timeline
		this.number = number
		this.type = Detector.types.rand()
		this.name = this.type.slice(0, 1) + "D " + (number)
		this.roadName = TM.Names.rand()
	}

	Detector.genDetectors = function(timeline){
		timeline.detectors = []
		var numDetectors = Math.randInt(1,9)
		for(var i = 0; i < numDetectors; i++){
			timeline.detectors.push(new Detector(i, timeline))
		}
	}

	Detector.prototype.genData = function(){
		this.generator.genData()
	}

	Detector.prototype.currentData = function(){
		var data = []
		var startTime = this.timeline.startTime()
		for(var i = startTime; i < this.timeline.time; i++){
			var indexData = this.dataIndex[i] || {}
			indexData.detector = this
			data.push(indexData)
		}
		return data
	}

	Detector.types = [
		"Citilog",
		"Transit",
		"System",
	]
})()

