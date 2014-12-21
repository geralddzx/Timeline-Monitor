Profile = {}
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
		marker.color = Colors[Math.randInt(0, Colors.length)]
		marker.gradient = true
		marker.type = Profile.markerTypes[Math.randInt(0, 3)]
		Profile.markers[i] = marker
	}
}

Profile.markerTypes = [
	"phase", "ring", "timeline"
]

Profile.genMarkers()