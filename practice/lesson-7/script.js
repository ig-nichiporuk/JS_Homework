// Task-3
var userData = {
	name : 'Igor',
	name2 : 'Igor',
	city : 'Brest',
	country : 'Belarus',
	country1 : 'Belarus',
	country2 : 'Belarus'
}

function changeData(obj) {
	var arrValues = [];
	for (key in obj) {
		arrValues.push(obj[key]);
		obj[key + '_length'] = obj[key].length;
		delete obj[key];
	}
	obj['Duplicated values'] = {};
	for(var i = 0; i < arrValues.length; i++) {
		var counter = 0;
		for (var k = 0; k < arrValues.length; k++) {
			if(arrValues[i] === arrValues[k]) {
				++counter;
				if(counter > 1) {
					obj['Duplicated values'][arrValues[i]] = counter + ' items';
				}
			}
		}
	}
	return obj;
}
console.log(changeData(userData));
