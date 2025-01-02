const cars = ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Ford'];
cars.length;
cars.sort();
cars.reverse(); // reverse order
cars.push('Fiat'); // Fiat @ last
Array.isArray(cars);
cars.pop(); // Fiat removed
cars.shift(); // 1st elem removed
cars.unshift('Fiat'); // Fiat @ 1st
let pos = cars.indexOf('Toyota'); // 3

const n = [1, 2, 3, 4, 5];
n.map(x => x * 2); // [2, 4, 6, 8, 10]
n.sort((a, b) => a - b); // [1, 2, 3, 4, 5]
n.sort((a, b) => b - a); // [5, 4, 3, 2, 1]
const sum = n.reduce((acc, val) => acc + val, 0); // 15

