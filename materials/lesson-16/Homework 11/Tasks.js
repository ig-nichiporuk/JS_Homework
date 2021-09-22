// Преобразование массива имен в объекты
function mapNamesArr(names) {
	return names.map(function(name) {
		return {name: name};
	});
}

mapNamesArr(['Vasya', 'Piotr', 'Fedya']);

// Получение строки со временем
function getTime(arr) {
	return arr.reduce(function(prevVal, currentVal) {
		return prevVal + ' : ' + currentVal;
	}, 'Текущее время');
}

getTime(['00', '13', '24']);

// Подсчет кол-ва гласных в тексте (вариант 1)
function countVowelLetters(text) {
    text = text.toLowerCase();

    var vowelLetters = 'аяыиоёуюэеaeiouy',
        counter = 0;

    for (var i = 0; i < vowelLetters.length; i++) {
        for (var j = 0; j < text.length; j++) {
            vowelLetters[i] === text[j] && counter++;
        }
    }

    return counter;
}

countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12

// Подсчет кол-ва гласных в тексте (вариант 2)
function countVowelLetters(text) {
    var vowelLetters = ['а', 'я', 'ы', 'и', 'о', 'ё', 'у', 'ю', 'э', 'е', 'a', 'e', 'i', 'o', 'u', 'y'],
        counter = 0;

    text.toLowerCase().split('').forEach(function(letter) {
        vowelLetters.indexOf(letter) !== -1 && counter++;
    });

    return counter;
}

countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12

// Подсчет кол-ва гласных в тексте (вариант 3)
function countVowelLetters(text) {
    return text.toLowerCase().split('').filter(function(letter) {
    	return 'аеёиоуыэюяaeiouy'.indexOf(letter) !== -1;
    }).length;
}

countVowelLetters('Шла Саша по шоссе И сосала сУшку'); // 12

// Подсчет количества букв в предложениях
function countSentencesLetters(text) {
	var sentences = text.split(/[.!?]+/);
	
	if (!(sentences[sentences.length - 1].length)) {
		sentences.pop();
	}

	sentences.forEach(function(sentence) {
        console.log(sentence.trim() + ': Letters quantity is: ' + sentence.split(/[,\s]+/).join('').length);
	});
}

countSentencesLetters('Привет, студент! Студент... Как дела, студент?');

// Поиск максимально повторяющегося слова в тексте (вариант 1)
function findFrequentWord(story) {
	var storyWords = story.toLowerCase().split(/[.,!?\s]+/),
		wordsArr = [];

	storyWords.forEach(function(initialWord) {
        var quantity = 0;

        storyWords.forEach(function(comparedWord) {
			(initialWord === comparedWord) && quantity++;
		});

        wordsArr.push({word: initialWord, quantity: quantity});
    });

	wordsArr.sort(function(a, b) {
		return b.quantity - a.quantity;
	});

	var firstWord = wordsArr[0];

	return 'Максимальное число повторений у слова "' + firstWord.word + '" - ' + firstWord.quantity + '.';
}

findFrequentWord('Привет, студент! Студент... Как дела, студент?');

// Поиск максимально повторяющегося слова в тексте (вариант 2)
function findFrequentWord(story) {
	var storyWords = story.toLowerCase().split(/[.,!?\s]+/),
		repeatCounter = 0,
 		repeatWord = '';

	storyWords.forEach(function(initialWord) {
        var counter = 0;

        storyWords.forEach(function(comparedWord) {
            (initialWord === comparedWord) && counter++;
        });

        if (counter > repeatCounter) {
            repeatCounter = counter;
            repeatWord = initialWord;
        }
	});

	return 'Максимальное число повторений у слова "' + repeatWord + '" - ' + repeatCounter + '.';
}

findFrequentWord('Привет, студент! Студент... Как дела, студент?');