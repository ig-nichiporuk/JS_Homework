function Animals(name) {
	var DAILY_FOOD_MIN = 50,
		DAILY_FOOD_MAX = 500,
		foodAmount = 20;
	this.name = name;

	function formatFoodAmount() {
		return foodAmount + ' гр.';
	}
	this.dailyNorm = function (foodAmount) {
		if (!arguments.length) {
			return formatFoodAmount();
		}
		if (!(typeof foodAmount === 'number') || !isFinite(foodAmount)) {
			throw new Error('Вы сыпете что-то не понятное!');
		}
		if ((typeof foodAmount === 'number') && isFinite(foodAmount) && foodAmount < DAILY_FOOD_MIN) {
			throw new Error('Вашего питомца вы точно не порадуете! Насыпте не меньше ' + DAILY_FOOD_MIN + ' гр.');
		}
		if ((typeof foodAmount === 'number') && isFinite(foodAmount) && foodAmount > DAILY_FOOD_MAX) {
			throw new Error('Ваш питомец станет толстым! Не сыпте больше ' + DAILY_FOOD_MAX + ' гр.');
		}
	};

	var self = this;
	this.feed = function () {
		console.log('Насыпаем в миску ' + self.dailyNorm(foodAmount) + ' гр. корма.');
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
console.log(cat.name);
console.log(cat.stroke().feed());
