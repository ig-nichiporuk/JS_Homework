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
	var stringLowerCase = string.toLowerCase();
	console.log(stringLowerCase.split('').reverse().join('') === stringLowerCase ? true : false);
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
	if(original.length === anagram.length) {
		var originalChars = original.split(''),
			anagramChars = anagram.split('');
		for (var key in originalChars) {
			if(anagram.indexOf(originalChars[key]) !== -1) {
				var originalSingleCharArr = originalChars.filter(function(item) {
					return item === originalChars[key];
				});
				var anagramSingleCharArr = anagramChars.filter(function(item) {
					return item === originalChars[key];
				});
				if(originalSingleCharArr.length !== anagramSingleCharArr.length) return false;
			}
		} return true;
	} return false;
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


