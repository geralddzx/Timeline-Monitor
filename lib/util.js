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

Array.prototype.rand = function(){
	var index = Math.floor((Math.random() * this.length))
	return this[index]
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

Math.randInt = function(start, end){
	var range = end - start
	return start + Math.floor(Math.random() * range)
}

Math.roll = function(prob){
	return Math.random() < prob
}