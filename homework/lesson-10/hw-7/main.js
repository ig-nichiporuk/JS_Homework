//Task - 1
function Animal(name) {
	this._foodAmount = 50;
	this.name = name;
}

Animal.prototype._formatFoodAmount = function () {
	return this._foodAmount + ' гр.';
}

Animal.prototype.dailyNorm = function (amount) {
	if (!arguments.length) return this._formatFoodAmount();

	if (amount < 50 || amount > 500) {
		throw new Error('Недопустимое количество корма.');
	}
	this._foodAmount = amount;
}

Animal.prototype.feed = function () {
	console.log('Насыпаем в миску ' + this.dailyNorm() + ' корма.');
}

function Cat(name) {
	Animal.apply(this, arguments);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.feed = function () {
	Animal.prototype.feed.apply(this, arguments);
	console.log('Кот доволен ^_^');
	return this;
}

Cat.prototype.stroke = function () {
	console.log('Гладим кота.');
	return this;
}

var barsik = new Cat('Барсик');

barsik.dailyNorm(60);

console.log(barsik.feed().stroke().stroke().feed());

barsik = null;


//Task - 2
var initialObj = {
	string: 'Vasya',
	number: 30,
	boolean: true,
	undefined: undefined,
	null: null,
	array: [1, 2, 3],
	object: {
		string2: 'Petrov',
		object2: {
			array2: [{}, {}]
		},
		object3: {}
	},
	method: function() {
		alert('Hello');
	}
};

function deepClone(obj) {
	if (Array.isArray(obj)) {
		var clone = [];
		for (var i = 0; i < obj.length; i++) {
			clone[i] = deepClone(obj[i]);
		}
		return clone;
	}
	if (typeof obj === 'object' && obj !== null) {
		var clone = {};
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				clone[key] = deepClone(obj[key]);
			}
		}
		return clone;
	}
	return obj;
}
var clonedObj = deepClone(initialObj);

clonedObj.object.object2.array2[1].name = 'Vasya';
clonedObj.array.push(2);

console.log(initialObj);
console.log(clonedObj);


//Task - 3
var checkStatus = true;
function isCompare(obj1, obj2) {
	if(Object.keys(obj1).length !== Object.keys(obj2).length) {
		checkStatus = false;
		return checkStatus;
	}
	for (var key in obj1) {
		if (typeof obj1[key] === 'object' && obj1[key] != null) {
			isCompare(obj1[key], obj2[key]);
		} else if (typeof obj1[key] === 'function' && typeof obj2[key] === 'function') {
			if ((obj1[key].toString() !== obj2[key].toString())) {
				checkStatus = false;
				return checkStatus;
			}
		} else if ((obj1[key] !== obj2[key])) {
			checkStatus = false;
			return checkStatus;
		}
	}
	return checkStatus;
}

console.log(isCompare(
		initialObj1 = {
			string: 'Vasya',
			number: 30,
			boolean: true,
			undefined: undefined,
			null: null,
			array: [1, 2, 3],
			object: {
				string2: 'Petrov',
				object2: {
					array2: [{}, {}]
				},
				object3: {}
			},
			method: function() {
				alert('Hello2');
			}
		},
		initialObj2 = {
			string: 'Vasya',
			number: 30,
			boolean: true,
			undefined: undefined,
			null: null,
			array: [1, 2, 3],
			object: {
				string2: 'Petrov',
				object2: {
					array2: [{}, {}]
				},
				object3: {}
			},
			method: function() {
				alert('Hello');
			}
		}
	)
);
