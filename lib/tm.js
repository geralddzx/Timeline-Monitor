var canvas = new Canvas($("canvas")[0])
var ctx = canvas.element.getContext("2d")
TM.data = []

var timeline = new TM.Timeline()
TM.Ring.genRings(timeline)
TM.PreGenerator.buildGenerators(timeline)
timeline.start()

