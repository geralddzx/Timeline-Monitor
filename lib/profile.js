(function(){
	var Profile = TM.Profile = {}
	
	Profile.lightColors = {
		green: "#33CC00",
		red: "#CC0000",
		amber: "#FFFF00",
		walk: "#FFFFFF",
		pp: "#6666CC",
		dw: "#FF9900",
	}

	Profile.scrollColor = "#FF0066"
	Profile.markers = {}

	Profile.genMarkers = function(){
		for (var i = 1; i < 30; i++){
			var marker = {}
			marker.color = TM.Colors[Math.randInt(0, TM.Colors.length)]
			marker.gradient = true
			marker.type = TM.Profile.markerTypes[Math.randInt(0, 3)]
			TM.Profile.markers[i] = marker
		}
	}

	Profile.markerTypes = [
		"phase", "ring", "timeline"
	]

	Profile.genMarkers()
})()

