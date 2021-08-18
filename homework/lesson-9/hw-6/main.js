function Animals(name) {
	var DAILY_FOOD_MIN = 50,
		DAILY_FOOD_MAX = 500,
		foodAmount = 50;
	this.name = name;

	function formatFoodAmount() {
		return foodAmount + ' гр.';
	}
	this.dailyNorm = function (amount) {
		if (!arguments.length) {
			return formatFoodAmount();
		}
		if (!(typeof amount === 'number') || !isFinite(amount)) {
			throw new Error('Вы сыпете что-то не понятное!');
		}
		if ((typeof amount === 'number') && isFinite(amount) && amount < DAILY_FOOD_MIN) {
			throw new Error('Вашего питомца вы точно не порадуете! Насыпте не меньше ' + DAILY_FOOD_MIN + ' гр.');
		}
		if ((typeof amount === 'number') && isFinite(amount) && amount > DAILY_FOOD_MAX) {
			throw new Error('Ваш питомец станет толстым! Не сыпте больше ' + DAILY_FOOD_MAX + ' гр.');
		}
		foodAmount = amount;
	};

	var self = this;
	this.feed = function () {
		console.log('Насыпаем в миску ' + self.dailyNorm() + ' корма.');
	};
}

function Cat(name) {
	Animals.apply(this, arguments);

	var animalFeed = this.feed;

	this.stroke = function () {
		console.log('Гладим кота.');
		return this;
	}
	this.feed = function() {
		animalFeed();
		console.log('Кот доволен ^_^');
		return this;
	}
}

var cat = new Cat('Vasya');
cat.dailyNorm(60);
console.log(cat.name);
console.log(cat.feed().stroke());
