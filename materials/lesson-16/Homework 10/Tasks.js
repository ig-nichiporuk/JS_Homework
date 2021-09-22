// Использование перебирающего метода массивов
function filterNumbersArr(numbers) {
    return numbers.filter(function(number) {
        return number > 0;
    });
}

filterNumbersArr([-1, 0, 2, 34, -2]);

// Возврат первого найденного положительного числа
function findPositiveNumber(numbers) {
    return numbers.find(function(number) {
        return number > 0;
    });
}

findPositiveNumber([-1, 0, 2, 34, -2]);

// Палиндром
function isPalindrome(word) {
    return word.toLowerCase() === word.toLowerCase().split('').reverse().join('');
}

isPalindrome('шалаш'); // true

// Анаграммы
function areAnagrams(word1, word2) {
    return word1.toLowerCase().split('').sort().join('') === word2.toLowerCase().split('').sort().join('');
}

areAnagrams('кот', 'отк');

// Разделение массива на под-массивы (вариант 1)
function divideArr(arr, size) {
    var outputArr = [];

    for (var i = 0; i < arr.length; i += size) {
        outputArr.push(arr.slice(i, i + size));
    }

    return outputArr;
}

divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]

// Разделение массива на под-массивы (вариант 2)
function divideArr(arr, size) {
	var outputArr = [];

	while (arr.length) {
		outputArr.push(arr.splice(0, size));
	}

	return outputArr;
}

divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3); // [[1, 2, 3], [4, 5, 6], [7, 8]]