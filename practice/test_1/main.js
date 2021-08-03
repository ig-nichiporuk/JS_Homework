// Task-1
var arrNumbers = [-54, 3, 5, -14, 0, 7, -40],
	arrPositiveNumbers = [];

function showPositiveNumbers(arr) {
	var i = 0;
	outer: for (key in arr) {
		if (arr[key] <= 0) continue outer;
		if (arr[key] > 0) {
			arrPositiveNumbers[i++] = arr[key];
		}
	}
	return arrPositiveNumbers;
}

console.log(showPositiveNumbers(arrNumbers));


// Task-2
var userData = {
	name : 'Igor',
	city : 'Brest',
	country : 'Belarus'
}

function changeData(obj) {
	for (key in obj) {
		obj[key + '_length'] = obj[key].length;
		delete obj[key];
	}
	return obj;
}

console.log(changeData(userData));

