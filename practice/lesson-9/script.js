function Cat(name) {
	this.name = name;
	var foodAmount = 50;

	function formatFoodAmount() {
		return foodAmount + ' гр.';
	}
	this.feed = function () {
		return 'Насыпаем в миску ' + formatFoodAmount() + ' корма.'
	};
}

var cat = new Cat('Vasya');
console.log(cat.feed());
cat = null;
