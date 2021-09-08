//Task-1
function filterNumbersArr(arr) {
	return arr.filter(function(item) {
		return item > 0;
	});
}
filterNumbersArr([-1, 0, 2, 34, -2]);

//Task-2
function positiveNumber(arr) {
	return arr.find(function (item) {
		return item > 0;
	});
}
positiveNumber([-1, 0, 2, 34, -2]);


//Task-3
function isPalindrome(string) {
	console.log(string.toLowerCase().split('').reverse().join('') === string.toLowerCase());
}
isPalindrome('игра');
isPalindrome('скРипт');
isPalindrome('ПУНКт');
isPalindrome('доход');
isPalindrome('кОМок');
isPalindrome('ШАБАШ');
isPalindrome('шАЛАш');


//Task-4
function areAnagrams(original, anagram) {
	console.log(original.split('').sort().join('') === anagram.split('').sort().join(''));
}
areAnagrams('мошкара', 'ромашка');


//Task-5
function divideArr(arr, count) {
	var newArr = [];
	if(arr.length < count + 1) {
		throw new Error('Количество элементов меньше, чем число делений массива на подмассивы');
	} else {
		for (var i = 0; Math.ceil(arr.length / count); i++) {
			newArr.push(arr.splice(0, count));
		}
		return newArr;
	}
}
divideArr([1, 2, 1, 2, 3, 4, 5, 6, 7, 8], 3);


