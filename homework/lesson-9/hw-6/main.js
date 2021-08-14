function Animals(name, foodAmount) {
	var DAILY_FOOD_MIN = 50;
	var DAILY_FOOD_MAX = 500;
	this._name = name;
	this._foodAmount = foodAmount;


	this.dailyNorm = function (foodAmount) {
		if (!arguments.length) {
			return foodAmount;
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
		this._foodAmount = foodAmount;
	};

	var self = this;
	this.feed = function () {
		self.dailyNorm(self._foodAmount);
		var message = 'Насыпаем в миску ' + self._foodAmount + ' гр. корма.';
		console.log(message);
	};
}

function Cat(name, foodAmount) {
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

var cat = new Cat('Vasya', 20);
console.log(cat._name);
console.log(cat.stroke().feed());
