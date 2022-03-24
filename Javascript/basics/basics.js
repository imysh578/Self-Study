console.log(`Infinity = ${Infinity}`);
console.log(`Infinity + 1 = ${Infinity + 1}`);
console.log(`Infinity - 1 = ${Infinity - 1}`);
console.log(`Infinity / 1 = ${Infinity / 1}`);
console.log(`Infinity * 1 = ${Infinity * 1}`);
console.log(`100 / 0 = ${100 / 0}`);
console.log(`Math.pow(100,100) : ${Math.pow(100, 100)}`);
console.log(`NaN : ${NaN}`);
console.log(`isNaN(NaN) : ${isNaN(NaN)}`);
console.log("---------------------------------");
let x;
console.log(`let x; : ${x}`);
console.log(`null : ${null}`);
console.log(`null + 1 : ${null + 1}`);
console.log(`undefined : ${undefined}`);
console.log(`undefined + 1: ${undefined + 1}`);
console.log(`null === undefined : ${null === undefined}`);
console.log(`null == undefined : ${null == undefined}`);
console.log(`typeof(null) : ${typeof null}`);
console.log(`typeof(undefined) : ${typeof undefined}`);
console.log("---------------------------------");
console.log(`parseInt('100', 10) : ${parseInt("100", 10)}`);
console.log(`parseInt('100', 16) : ${parseInt("100", 16)}`);
console.log(`parseInt('100', 8) : ${parseInt("100", 8)}`);
console.log(`parseInt('100', 2) : ${parseInt("100", 2)}`);
console.log(`parseInt('100%abc', 10) : ${parseInt("100%abc", 10)}`);
console.log(`Number('100%abc'), 10 : ${Number("100%abc")}`);
console.log(
	`parseInt('100.199.293.1.asdf%abc', 10) : ${parseFloat(
		"100.199.293.1.asdf%abc",
		10
	)}`
);
console.log(
	`Number('100.199.293.1.asdf%abc', 10) : ${Number("100.199.293.1.asdf%abc")}`
);
console.log(
	`parseInt('100,199,293,1,asdf%abc', 10) : ${parseFloat(
		"100,199,293,1,asdf%abc",
		10
	)}`
);
console.log("---------------------------------");
// Type
// Array()
let arr = [10, 2, 3, 22, 33, 100, 11];
let arrTwo = [1, 2, 13];
console.log("----------Stack----------");
console.log("@Concat");
console.log(arr.concat(arrTwo));
console.log(arr);
console.log("@Pop");
console.log(arr.pop());
console.log(arr);
console.log("@Push");
console.log(arr.push());
console.log(arr);
console.log("----------Queue----------");
console.log(arr.push(9090));
console.log(arr);
console.log(arr.shift());
console.log(arr);
console.log("---------------------------------");

console.log(arr.length);
console.log(arrTwo.fill(789));
console.log(arrTwo);
// console.log(arr.filter(x=>x.length>2)) // for string array
console.log(arr.filter((x) => x > 30));
let arrThree = [1, 2, 3, [10, 20]];
console.log(arrThree.flat());
console.log(arr.includes(10));
console.log(arr.includes(100));
console.log(arr);
console.log(arr.join("!"));
console.log(arr);
console.log("---------------------------------");
function powFunc(x) {
	return x ** 2;
}
console.log(arr.map(powFunc));
console.log(arr.map((x) => x * 2));
console.log(arr.sort());
console.log(arr);
console.log(arr.reverse());
console.log(arr);
console.log(arr.sort((a, b) => a - b));
console.log(arr);
stringArr = "hello word";
console.log(stringArr.slice(3));
console.log(stringArr.slice(1, 6));
console.log(stringArr);
console.log("---------------------------------");
// Set()

let s = new Set(stringArr);
console.log(s);
console.log(s.size);
console.log(s.length);
console.log(s.has("e"));
console.log(s.has("k"));

console.log("---------------------------------");
// Map()
let m = new Map();
m.set("하나", "one")
m.set("둘", "two")
m.set("셋", "three")
m.set(4, "four")
console.log(m)
console.log(m.has("하나"))
console.log(m.get("하나"))
console.log(m)
for (const [key, value] of m) {
  console.log(key)
  console.log(value)
}
for (const element of m) {
  console.log(element)
}
console.log("---------------------------------");
let str = "js ts nodejs react solidity hardhat JS";
// \n \t \' \" \\
console.log(str.concat("hello world"));
console.log(str)
console.log(str.includes("js"))
console.log(str.includes("Js"))
console.log(str.split())
console.log(str.split(" "))
console.log(str.replace(" ", "&"))
console.log(str.replace(/ /g, "&"))
console.log(str)
console.log(str.indexOf("node"))
let indexOfNode = str.indexOf("node");
let lengthOfNode = ("node").length
console.log(str.slice(indexOfNode,indexOfNode+lengthOfNode))

console.log(str);
let re1 = /js/i
let re2 = /js/gi
console.log(str.match(re1))
console.log(str.match(re2))

console.log("---------------------------------");
// Boolean(), Number(), String(), Object(), RegExp()
let [input1, input2] = ["1","2"]
console.log(parseInt(input1) + parseInt(input2))