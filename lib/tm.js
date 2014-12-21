var timeline = new TM.Timeline()
var control = new TM.Control(timeline)

TM.PreGenerator.buildGenerators(timeline)
TM.RealGenerator.buildGenerators(timeline)
timeline.start()

