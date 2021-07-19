// Option-1
var a = 10,
	b = 5;
	temp = b;
b = a;
a = temp;
console.log(a);
console.log(b);

// Option-2
var a = 10,
	b = 5;
a = a + b;
b = a - b;
a = a - b;
console.log(a);
console.log(b);

// Option-3
var a = 10,
	b = 5;
a = a * b;
b = a / b;
a = a / b;
console.log(a);
console.log(b);

