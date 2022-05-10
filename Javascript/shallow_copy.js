let grandeur = { engine: "gdi", cc: 3000 };
let aa = { name: "kildong", age: 20, car: grandeur };
// let bb = JSON.parse(JSON.stringify(aa)); // Object Deep Copy, 하위Object Deep Copy
let bb = {...aa}; // Object Deep Copy, 하위Object Shallow Copy
// let bb = aa; // Object Shallow Copy, 하위Object Shallow Copy

aa.car.engine = "changed"
console.log(aa.car);
console.log(bb.car);
console.log(aa == bb);
console.log(aa === bb);
console.log(aa.car == bb.car);
console.log(aa.car === bb.car);
console.log(Object.is(aa, bb));
console.log(Object.is(aa.car, bb.car));