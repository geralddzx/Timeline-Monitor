Function.prototype.inherits = function(superClass){
	this.prototype = Object.create(superClass.prototype)
	this.prototype.constructor = this
	this._super = superClass
}

Array.prototype.findIndex = function(testBlock){
	for(var i = 0; i < this.length; i++){
		if (testBlock(this[i])){
			return i
		}
	}
	return false
}

Array.prototype.find = function(testBlock){
	for(var i = 0; i < this.length; i++){
		if (testBlock(this[i])){
			return this[i]
		}
	}
	return false
}

Array.prototype.each = function(block){
	for(var i = 0; i < this.length; i++){
		block(this[i])
	}
}

Array.prototype.first = function(block){
	return this[0]
}

Array.prototype.rand = function(){
	var index = Math.floor((Math.random() * this.length))
	return this[index]
}

Array.prototype.last = function(){
	return this[this.length -1]
}

Array.prototype.include = function(element){
	for(var i = 0; i < this.length; i++){
		if(this[i] == element){
			return true
		}
	}
	return false
}

Array.prototype.add = function(num){
	for(var i = 0; i < this.length; i++){
		this[i] = this[i] + num
	}
	return this
}

Object.prototype.keys = function(){
	return Object.keys(this)
}

Object.prototype.each = function(block){
	for(var i = 0; i < this.keys().length; i++){
		block(this[this.keys()[i]])
	}
}

Object.prototype.dup = function(){
	currentObj = this
	var newObj = {}
	this.keys().each(function(key){
		var val = currentObj[key]
		if (typeof(val) == "object"){
			val = val.dup()
		}
		newObj[key] = val
	})
	return newObj
}

Object.prototype.dupKeys = function(otherObj){
	currentObj = this
	otherObj.keys().each(function(key){
		var val = otherObj[key]
		if (typeof(val) == "object"){
			val = val.dup()
		}
		currentObj[key] = val
	})
}

Object.prototype.last = function(){
	return this[this.keys().last()]
}

Object.prototype.first = function(){
	return this[this.keys().first()]
}

Math.randInt = function(start, end){
	start = Math.round(start)
	end = Math.round(end)
	var range = end - start
	return start + Math.floor(Math.random() * range)
}

Math.roll = function(prob){
	return Math.random() < prob || null
}

Math.range = function(n1, n2){
	var range = []
	for(var i = n1; i < n2; i++){
		range.push(i)
	}
	return range
}

Math.distance = function(x0, y0, x1, y1){
	var a = (x0 - x1)
	var b = (y0 - y1)
	return Math.sqrt(a * a + b * b)
}

Math.bound = function(n, lower, upper){
	n = Math.max(n, lower)
	n = Math.min(n, upper)
	return n
}

String.prototype.times = function(num){
	var str = ""
	for(var i = 0; i < num; i++){
		str = str + this
	}
	return str
}

TM.getPhaseNum = function(phaseText){
	var string = phaseText.split(":")[0].slice(2)
	return parseInt(string)
}

Date.nowInSeconds = function(){
	return Math.floor(Date.now() / 1000)
}