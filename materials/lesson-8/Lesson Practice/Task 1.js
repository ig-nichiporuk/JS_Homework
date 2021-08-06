function Cat(name) {
    this.name = name;

    this.feed = function() {

    };
}

var barsik = new Cat('Барсик');

console.log(barsik.name);

barsik = null;