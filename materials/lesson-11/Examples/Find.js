// Работает аналогично методу filter(), но возвращает не новый массив подошедших под условие элементов, а только первое
// найденное совпадение или undefined, если совпадений не найдено
// Как и все перебирающие методы может принимать в себя элемент массива, число итерации и сам массив
var objectsArr = [
    {name: 'Piotr'},
    {name: 'Vasya'},
    {name: 'Piotr'}
];

var foundObj = objectsArr.find(function(obj) {
    return obj.name === 'Piotr';
});

console.log(foundObj); // {name: 'Piotr' }

// Аналогично
foundObj = objectsArr.filter(function(obj) {
    return obj.name === 'Piotr';
})[0];