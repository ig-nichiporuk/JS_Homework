//Task-1
function arrToObject(arr) {
	return arr.map(function (item) {
		return item = { name : item };
	});
}
arrToObject(['Igor', 'Vasya', 'Tanya', 'Christina']);


//Task-2
function currentTime(arr) {
	var time = arr.reduce(function (prevItem, currentItem) {
		return prevItem + ' : ' + currentItem;
	});
	return 'Текущее время : ' + time;
}
currentTime(['00', '13', '24']);


//Task-3
function vowelCount(text, counter) {
	var vowels = 'аеёиоуыэюя',
		textCharsArr = text.toLowerCase().split('');
	textCharsArr.forEach(function (item) {
		if (vowels.indexOf(item) !== -1) counter++;
	});
	return counter;
}
vowelCount('Текущее время', 0);



//Task-4
function separatePhrases(text) {
	var phrasesArr = text.toLowerCase().split(/[\.!\?]\s/g);
	return phrasesArr.map(function (item) {
		return "'"+ item +"' : Letters quantity is: " + item.replace(/[!-,.-/:-@[-`{-~\n\s\–\.{3,}\«\»]/g, '').length;
	});
}
separatePhrases('Немногие, очень «друзья»! Я выскажусь: дружба. Человека – этим, немногие «друзья»? Разделить радость.');


//Task-5
function findRepetition(text) {
	var textWords = text.toLowerCase().replace(/[!-,.-/:-@[-`{-~\n\s\–\.{3,}\«\»]/g, ' ').split(/\s{1,}/g),
		mostRepetitive = {};
	for (var key in textWords) {
		var compareWord = textWords[key],
			singleWord = textWords.filter(function(item) {
				return item === compareWord;
			});
		if(!mostRepetitive.count || singleWord.length > mostRepetitive.count) {
			mostRepetitive.word = compareWord;
			mostRepetitive.count = singleWord.length;
		}
	}
	return "Максимальное число повторений у слова '" + mostRepetitive.word + "' - " + mostRepetitive.count;
}

findRepetition('Шла Саша по шоссе и сосала сушку. Сушку Саша не не не не не  не не должна сосать! Саша вообще нормальная? Саша: «Да, я нормальная! Что за вопрос такой?!». Шла Саша дальше и шла');

findRepetition('Он закрыл книгу, заложил указательным пальцем и, еще прежде чем обернуться, ощутил радостное волнение – не от знакомства с девушкой, но от слов ее бpата. В этом мускулистом парне таилась безмерно ранимая чуткость. Стоило внешнему миру задеть какую-то струну в его сознаний – и все мысли, представления, чувства тотчас вспыхнут, запляшут, точно трепетное пламя. Был он на редкость восприимчив и отзывчив, а живое воображение не закрыл знало покоя в беспрестанном поиске закрыл подобий и различий. «Мистер Иден» – вот что радостно закрыл поразило его, ведь всю жизнь его звали Иден. Мартин закрыл Иден или просто Мартин закрыл. И вдруг, «мистер»! Это кое-что да значит; отметил он про себя. Память закрыл мигом обратилась в громадную камеру-обскуру, и перед его внутренним взором заскользили нескончаемой вереницей картины пережитого – кочегарки: и кубрики, стоянки и причалы, тюрьмы и кабаки, тифозные бараки и трущобы, и одновременно закрыл раскручивалась нить, воспоминаний – как называли его при всех этих поворотах судьбы? Если вас интересует мое мнение – я выскажусь: настоящая закрыл дружба (именно дружба, а не шапочное знакомство или приятельские отношения) проверяется в радости;\n' + 'умение разделить закрыл радость другого человека – этим сегодня закрыл могут похвастаться немногие, очень немногие «друзья»!')

/*function findRepetition(text, editText) {
	if(!editText) {
		var textWords = text.toLowerCase().replace(/[!-,.-/:-@[-`{-~\n\–\.{3,}\«\»]/g, ' ').split(/\s{1,}/g);
		findRepetition(textWords, true);
	}
	else {
		var mostRepetitive = {},
			currentWord = text[0],
			singleWord = text.filter(function(item) {
				return item === currentWord;
			});
		if(!mostRepetitive.count || singleWord.length > mostRepetitive.count) {
			mostRepetitive.word = currentWord;
			mostRepetitive.count = singleWord.length;
		}
		findRepetition(text.join(' ').replace(/\b(шла)\b/gmi, '').trim().split(/\s{1,}/g), true);
	}
	return mostRepetitive;
}*/

