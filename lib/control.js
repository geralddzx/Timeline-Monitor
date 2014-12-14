(function (){
	var Control = TM.Control = function(timeline){
		this.timeline = timeline
		this.makeZoom()
		this.makeRewind()
		this.makeDoubleRewind()
	}

	Control.prototype.yPos = function(){
		return 100 - this.timeline.height()
	}

	Control.prototype.makeZoom = function(){
		var btn = $('<button>+</button>')[0]
		var yPos = this.yPos() + this.timeline.height() / 5
		Control.setPosition(btn, 0.0, yPos)
		$('body').append(btn)
		// $(btn).click(this.addZoom.bind(this))
	}

	Control.prototype.makeRewind = function(){
		var btn = $('<button><</button>')[0]
		var yPos = this.yPos() + this.timeline.height() * 0.6
		var timeline = this.timeline
		Control.setPosition(btn, 70.0, yPos)
		$('body').append(btn)
		$(btn).click(function(){timeline.forward = -1})
	}

	Control.prototype.makeDoubleRewind = function(){
		var btn = $('<button><<</button>')[0]
		var yPos = this.yPos() + this.timeline.height() * 0.6
		var timeline = this.timeline
		Control.setPosition(btn, 66.5, yPos)
		$('body').append(btn)
		$(btn).click(this.doubleRewind.bind(this))
	}

	Control.prototype.doubleRewind = function(){
		var timeline = this.timeline
		if(timeline.forward > -2){
			timeline.forward = -2
		} else {
			timeline.forward = Math.max(-32, timeline.forward * 2)
		}
	}

	Control.setPosition = function(element, x, y){
		element.style.position = "absolute"
		element.style.left = canvas.getX(x) + 8
		element.style.top = canvas.getY(y) + 8
	}
})()