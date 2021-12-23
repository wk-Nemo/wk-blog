---
title: Generator函数
date: 2021-05-08 21:53:09
categories: JavaScript
---
Generator函数是ES6提供的一种异步编程方案，语法与传统的函数完全不同。为了更深入的学习javaScript中的异步编程，对究阮一峰老师ES6中的《Generator函数的语法》做一个总结。

## 1. 基本概念

### 1.1 什么是Gnerator函数

##### 1. 从语法上来看

- Generator可以理解成一个状态机，封装了多个内部状态
- Generator函数执行会返回一个遍历器对象，该遍历器对象可以依次遍历Generator函数内部的每一个状态

##### 2. 从形式上来看

Generator是一个普通函数，但是有两个特征：

- function命令和函数名之间有一个星号
- 函数体内部使用yield定义不同内部状态



### 1.2 Generator函数使用方法

- 调用Generator函数返回一个遍历器对象，代表Generator函数内部指针。
- 以后每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象
  - value是yield后面表达式的值。当遇到return语句后，value为return的值，如果函数没有return则为undefined
  - done表示是否遍历结束，结束后会一直显示true

```javascript
function* helloWorld() {
	yield 'hello'
	yield 'world'
	return 'ending'
}

var hw = helloWorld();

hw.next() // { value: 'hello', done: false }
hw.next() // { value: 'world', done: false }
hw.next() // { value: 'ending', done: true }
hw.next() // { value: undefined, done: true }
hw.next() // { value: undefined, done: true }
```

##### 1. yield和return

（1）return

- 正常函数只能return一次
- return不具备记忆功能

（2）yield

- yield在Generator函数中可以使用多次，每次遇到后函数执行会暂停，使用next方法后才会继续执行
- yield表达式只能在Generator函数中使用，其他函数使用会报错
- yield表达式如果用在另一个表达式中，则必须使用括号，但是作为函数的参数或者放在赋值表达式的右侧不用加括号。



##### 2. next方法

yield语句本身没有返回值，总是返回undefined。next方法可以带一个参数，该参数会被当作上一条yield语句的返回值。

```javaScript
function* f() {
	for (var i = 0; true; i++) {
		var reset = yield i;
		if (reset) {
			i = -1;
		}
	}
}

var g = f();

console.log(g.next()) // { value: 0, done: false }
console.log(g.next()) // { value: 1, done: false }
console.log(g.next()) // { value: 2, done: false }
console.log(g.next(true)) // { value: 0, done: false }
console.log(g.next()) // { value: 1, done: false }
```

ps: 因为next方法传参表示上一条yield的返回值，所以第一次使用next方法传递参数是无效的。 



##### 3. Generator.prototype.throw()

Generator函数返回的遍历器对象都有一个throw方法

（1）可以在函数体外抛出错误，即给throw方法传入一个参数，然后在Generator函数体内部捕获。

（2）如果函数体内部没有部署try...catch代码块，那么抛出的错误将会被外部的catch捕获

```javascript
var g = function* () {
	try {
		yield;
	} catch(e) {
		console.log('内部捕获', e);
	}
};

var i = g();
i.next();

try {
    // 第一次错误被函数体内部的catch捕获
	i.throw('a');
    // 第二次因为函数体内部的catch已经执行过了，不会再捕捉这个错误了，所以错误就抛出函数体外部
	i.throw('b');
} catch(e) {
	console.log('外部捕获', e);
}
// 内部捕获a
// 外部捕获b
```



（3）如果Generator函数体内部部署了try...catch代码块，那么遍历器的throw方法抛出的错误不影响下一次遍历，切会自动执行下一条yield语句，否则终止遍历

```javaScript
var gen = function* gen() {
	yield console.log(1);
	yield console.log(2);
}

var g = gen();

g.next() // 1
// 内部没有捕获异常，函数终止
g.throw() // Uncaught undefined

var gen1 = function* gen1() {
	try {
		yield console.log(1);
	} catch(e) {
		// ...
	}
	yield console.log(2);
	yield console.log(3);
}

var g1 = gen1();
g.next() // 1
// 内部捕获异常，函数可以继续执行
g.throw() // 2
g.next() // 3
```



（4）遍历器对象的throw方法抛出的错误被Generator函数体内部的catch捕获，而throw方法抛出的错误不能被内部函数捕捉

（5）Generator函数体外抛出的错误可以在函数体内部捕获（注意这里必须要用Generator的throw方法）；Generator函数内部抛出的错误也可以被函数体外部捕获

```javaScript
var g = function* () {
	try {
		yield;
	} catch(e) {
		if (e !== 'a') throw e;
		console.log('内部捕获', e);
	}
};

var i = g();
i.next();

try {
    // 第一次错误被函数体内部的catch捕获，由全局抛出，所以被外部的catch捕获
	i.throw('a');
    // 第二次因为函数体外部的catch已经执行过了，不会再捕捉b这个错误了
	i.throw('b');
} catch(e) {
    // Generator函数体内部使用throw方法抛出的错误可以被外部的catch捕捉到
	console.log('外部捕获', e);
}
// 外部捕获a
```



##### 4. Generator.prototype.return()

（1）enerator函数返回的遍历器对象还有一个return方法，可以返回给定的值，并终结Generator函数的遍历

```javaScript
function* gen() {
	yield 1;
	yield 1;
	yield 3;
}

var g = gen();

g.next(); // { value: 1, done: false }
g.return('foo') // { value: 'foo', done: true }
g.next(); // { value: undefined, done: true }
```

（2）如果Generator函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完毕再执行

```javaScript
function* numbers() {
	yield 1;
	try {
		yield 2;
		yield 3;
	} finally {
		yield 4;
		yield 5;
	}
	yield 6;
}

var g = numbers()
 
console.log(g.next()) // { value: 1, done: false }
console.log(g.next()) // { value: 2, done: false }
console.log(g.return(7)) // { value: 4, done: false }
console.log(g.next()) // { value: 5, done: false }
console.log(g.next()) // { value: 7, done: true }
```



##### 5. yield* 表达式

如果要在一个Generator函数中调用另一个Generator函数，则需要使用yield*

```javaScript
function* bar() {
	yield 1;
	yield* foo();
	yield 4;
}

function* yield() {
	yield 2;
	yield 3;
}

for (let v of bar()) {
	console.log(v) // 1, 2, 3, 4
}
```

下面从几个方面来看yield*的作用

（1）相当于将yield全部移到一个函数

```javascript
// 相当于如下函数
function* bar() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
}
```



（2）相当于对一个遍历器对象的遍历，也就是再函数体内部调用了for...of循环

```javaScript
function* bar() {
	yield 1;
	for (var value of foo()) {
		yield value;
	}
	yield 4;
}
```



从这一点可以看出来yield*实际上就是对遍历器的一种遍历，所以后面如果跟了一个有Iterator接口的对象就会自动对其进行遍历

```javascript
function* gen() {
	yield* [1, 2, 3, 4]
}
var g = gen()

console.log(g.next()) // { value: 1, done: false }
console.log(g.next()) // { value: 2, done: false }
console.log(g.next()) // { value: 3, done: false }
console.log(g.next()) // { value: 4, done: false }
console.log(g.next()) // { value: undefined, done: true}
```



## 2. Generator函数和Iterator接口的关系

在我的上一篇博客中初步认识了Iterator，任意一个对象的Symbol.iterator方法等于该对象的遍历器对象生成函数，调用改函数会返回一个遍历器对象。

由于Generator函数就是遍历器生成函数，因此可以把Generator赋给对象的Symbol.iterator属性，从而让该对象具有Iterator接口。



##### 1.  Generator函数赋给对象Symbol.iterator属性

```javascript
var myIterator = {};
myIterator[Symbol.iterator] = function* () {
	yield 1;
	yield 2;
	yield 3;
};

[...myIterator] // 1, 2, 3
```



##### 2. Generator函数执行后，返回一个遍历器对象。该对象本身也具有Symbol.iterator属性，执行后返回自身

```javascript
function* gen () {
	// ...
}

var g = gen();

g[Symbol.iterator]() === g // true
```



## 3. Generator和for...of循环

for...of循环可以自动遍历Generator函数生成的Iterator对象，且此时不需要使用next方法

一旦next方法返回对象的done属性为true，for...of循环就会终止，且不包含该返回对象

```javascript
function* foo() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	yield 5;
	return 6
}

for (let v of foo()) {
    console.log(v)
}
// 1 2 3 4 5
```



原生的js对象没有遍历接口，无法使用for...of循环，下面讨论几种为没有遍历器接口添加遍历器接口的方法

##### 1. 通过Generator函数为它加上这个接口后就可以使用了。

```javascript
function* objectEntries(obj) {
	let propKeys = Reflect.ownKeys(obj);
	for (let propKey of propKeys) {
		yield [propKey, obj[propKey]];
	}
}

let jane = {
	first: 'wu',
	last: 'kui'
}

for (let [key, value] of objectEntries(jane)) {
	console.log(`${key}: ${value}`)
}
// first: wu
// last: kui
```



##### 2. 将Generator函数添加到对象的Symbol.iterator属性上

```
function* objectEntries() {
	let propKeys = Object.keys(this);
	for (let propKey of propKeys) {
		yield [propKey, obj[propKey]];
	}
}

let jane = {
	first: 'wu',
	last: 'kui'
}

jane[Symbol.iterator] = objectEntries

for (let [key, value] of jane) {
	console.log(`${key}: ${value}`)
}
```



##### 3. 除了for..of,扩展运算符、解构赋值和Array.from方法内部调用的都是遍历器接口。所以他们都可以将Generator函数返回的Iterator对象作为参数。

```javascript
function* numbers() {
	yield 1;
    yield 2;
	yield 3;
	return 4;
	yield 5;
}

[...numbers()] // [1, 2, 3]

Array.from(numbers()) // [1, 2, 3]

let [x, y, z]  = numbers(); // x=1, y=2, z=3
```



## 4. 作为对象属性的Generator函数

如果一个对象的属性是Generator函数，那么可以简成下面的形式

```javascript
let obj = {
	* myFunction() {
		// ...
	}
}

// 相当于
let obj = {
	myFunction: function* () {
		// ...
	}
}
```



## 5. Generator函数this

Generator函数总是返回一个遍历器，ES6规定这个遍历器是Generator函数的实例，它也继承了Gnerator函数的prototype对象上的方法

```javascript
function* g() {
}

g.prototype.hello = function {
	return 'hi'
}

let obj = g()

obj instanceof g // true
obj.hello() // hi
```



##### 1.  但是这里要区分Generator函数和构造函数

- Generator函数内部的this创建的属性不能被它的实例访问
- Generator函数不能通过new方法创建



##### 2. 要想Generator函数不但满足于本身的功能还要做到上面两点，则需要进行变通

- 生成一个空对象
- 使用call方法绑定Generator函数内部的this

```javascript
function* F() {
	this.a = 1;
	yield this.b = 2;
	yield this.c = 3;
}

var obj = {}
var f = F.call(obj);

console.log(f.next()) // { value: 2, done: false }
console.log(f.next()) // { value: 3, done: false }
console.log(f.next()) // { value: undefined, done: true }

obj.a // 1
obj.b // 2
obj.c // 3
```

上面的f任然是遍历器对象，生成的对象实例时obj，接下来我们要将两个对象进行统一。

我们知道Generator函数调用后返回的遍历器是原函数的实例，所以可以原函数的原型绑定到call上

```javaScript
function* F() {
	this.a = 1;
	yield this.b = 2;
	yield this.c = 3;
}

var f = F.call(F.prototype);

console.log(f.next()) // { value: 2, done: false }
console.log(f.next()) // { value: 3, done: false }
console.log(f.next()) // { value: undefined, done: true }

f.a // 1
f.b // 2
f.c // 3
```

如果我们还想使用new操作符来完成调用，再将F改造一下即可

```javascript
function* gen() {
	this.a = 1;
	yield this.b = 2;
	yield this.c = 3;
}

function F() {
	return gen().call(gen.prototype)
}

var f = new F();

console.log(f.next()) // { value: 2, done: false }
console.log(f.next()) // { value: 3, done: false }
console.log(f.next()) // { value: undefined, done: true }

f.a // 1
f.b // 2
f.c // 3
```























