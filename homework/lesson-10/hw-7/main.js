var initialObj = {
	string: 'Vasya',
	number: 30,
	boolean: true,
	undefined: undefined,
	null: null,
	array: [1, 2, 3],
	// object: {
	// 	string2: 'Petrov',
	// 	object2: {
	// 		array2: [{}, {}]
	// 	},
	// 	object3: {}
	// },
	// method: function() {
	// 	alert('Hello');
	// }
};

function deepClone(initialObj) {
	// var clone = {};
	this.prototype.call(initialObj);
	/*for (key in initialObj) {
		if(!Array.isArray(initialObj[key])) {
			clone[key] = initialObj[key];
		}
		if(Array.isArray(initialObj[key]) && initialObj[key].length) {
			clone[key] = [];
			clone[key].push(initialObj[key]);
		}


		// if(!Array.isArray(initialObj[key])) {
		// 	clone[key] = initialObj[key];
		// }
		// if(Array.isArray(initialObj[key])) {
		// 	clone[key] = [];
		// 	clone[key].push(deepClone(initialObj[key]));
		// }
	}*/
	return this;
}
var clonedObj = deepClone(initialObj);

console.log(clonedObj);
