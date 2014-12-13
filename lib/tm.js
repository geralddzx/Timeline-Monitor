var canvas = new Canvas($("canvas")[0])
var ctx = canvas.element.getContext("2d")
TM.data = []

var timeline = new TM.Timeline()
TM.Ring.genRings(timeline)
var generator = new TM.Generator(timeline)

generator.start()
timeline.start()

