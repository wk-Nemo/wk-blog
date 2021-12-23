---
title: JavaScript中的异步编程
date: 2021-05-11 20:14:43
categories: JavaScript
---
# 你不知道的JavaScript（中）

你不知道的JavaScript深入的解析了JavaScript这门语言，而第二本中册主要讲了两大板块：JS中的类型和JS中的异步，本篇内容重在总结归纳异步编程部分。



### 第一章、异步：现在与将来

###### 1、js是单线程

浏览器的渲染进程是多线程的，如下：

- JS引擎线程
- 事件触发线程
- 定时触发器线程
- 异步http请求线程
- GUI渲染线程

而js因为防止对DOM的操作产生混乱，因此它是单线程的。单线程就是一次只能只能一个任务，有多个任务的话需要一个个的执行，为了解决异步事件，js引擎产生了Event Loop机制。



#### 1.1 事件循环(EventLoop)

js引擎不是独立运行的，它运行在**宿主环境**中，我们常见的便是浏览器，但是随着发展，nodej.s已经进入了服务器的领域，js还渗透到了其他的一些领域。这些宿主环境每个人都提供了各自的**事件循环机制**。

那么什么是事件循环机制呢？js是单线程的，单线程就是一次只能只能一个任务，有多个任务的话需要一个个的执行，为了解决异步事件，js引擎产生了Event Loop机制。js中任务执行时会有任务队列，setTimeout是在设定的时间后加到任务队列的尾部。因此它虽然是定时器，但是在设定的时间结束时，回调函数是否执行取决于任务队列的状态。换个通俗点的话来说，setTimeout是一个“不太准确”的定时器。

直到ES6中，js中才从本质上改变了在哪里管理事件循环，ES6精确得制定了事件循环的工作细节，其中最主要的原因是Promise的引入，这使得对事件循环队列调度的运行能直接进行精细的控制，而不像上面说到的”不太准确“的定时器。



###### 1、宏任务

- 在 JS 中，大部分的任务都是在主线程上执行，常见的任务有:
  - 渲染事件
  - 用户交互事件
  - js脚本执行
  - 网络请求、文件读写完成事件等等。
  - setTimeout、setInterval
- 为了让这些事件有条不紊地进行，JS引擎需要对之执行的顺序做一定的安排，V8 其实采用的是一种队列的方式来存储这些任务， 即先进来的先执行。



###### 2、微任务

（1）对每个宏任务而言，内部有一个都有一个微任务

（2）引入微任务的初衷是为了解决异步回调的问题

- 将异步回调进行宏任务队列的入队操作。

采用改方式，那么执行回调的时机应该是在前面所有的宏任务完成之后，倘若现在的任务队列非常长，那么回调迟迟得不到执行，造成应用卡顿。

- 将异步回调放到当前宏任务的末尾。

为了规避第一种方式中的这样的问题，V8 引入了第二种方式，这就是微任务的解决方式。在每一个宏任务中定义一个微任务队列，当该宏任务执行完成，会检查其中的微任务队列，如果为空则直接执行下一个宏任务，如果不为空，则依次执行微任务，执行完成才去执行下一个宏任务。

（3）常见的微任务有：

- MutationObserver
- Promise.then(或.reject) 以及以
- Promise 为基础开发的其他技术(比如fetch API)
- V8 的垃圾回收过程。



我们来看一个常见的面试题：

```javascript
console.log('start'); 
setTimeout(() => { 
  console.log('timeout'); 
}); 
Promise.resolve().then(() => { 
  console.log('resolve'); 
}); 
console.log('end'); 
```

（1）先执行同步队列的任务，因此先打印start和end
（2）setTimeout 作为一个宏任务放入宏任务队列
（3）Promise.then作为一个为微任务放入到微任务队列
（4）Promise.resolve()将Promise的状态变为已成功，即相当于本次宏任务执行完，检查微任务队列，发现一个Promise.then, 执行
（5）接下来进入到下一个宏任务——setTimeout, 执行



再看一个例子：

```javascript
Promise.resolve().then(()=>{ 
  console.log('Promise1')   
  setTimeout(()=>{ 
    console.log('setTimeout2') 
  },0) 
}); 
setTimeout(()=>{ 
  console.log('setTimeout1') 
  Promise.resolve().then(()=>{ 
    console.log('Promise2')     
  }) 
},0); 
console.log('start'); 
 
// start 
// Promise1 
// setTimeout1 
// Promise2 
// setTimeout2 
```



接下来从js异步发展的历史来学习异步的相关知识



### 第二章、回调函数

回调是js中最基础的异步模式。

#### 2.1 回调地狱

```javaScript
listen("click", function handle(evt){
	setTimeout(function request(){
		ajax("...", function response(test){
			if (text === "hello") {
				handle();
			} else {
				request();
			}
		})
	}, 500)
})
```

这种代码常常被成为**回调地狱**， 有时候也叫**毁灭金字塔**。因为多个异步操作形成了**强耦合**，只要有一个操作需要修改，只要有一个操作需要修改，它的上层回调函数和下层回调函数就需要跟着修改，想要理解、更新或维护这样的代码十分的困难。



#### 2.2 信任问题

有的回调函数不是由你自己编写的，也不是在你直接的控制下的。多数情况下是第三方提供的。这种称位**控制反转**，就i是把自己程序的一部分执行控制交给了第三方。而你的代码和第三方工具之间没有一份明确表达的契约。会造成大量的混乱逻辑，导致信任链完全断裂。



### 第三章、Promise

回调函数的两个缺陷：回调地狱和缺乏可信任性。Promise解决了这两个问题。

#### 3.1 Promise的含义

Promise简单来说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

- Promise对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：**Pending（进行中）**、**Fulfilled（已成功）**、**Reject（已失败）**。只有异步操作的结果可以决定当前是哪一种状态，其他任何操作都无法改变这个状态。
- 一旦状态改变就不会再变，任何时候都可以得到这个结果。Promise的状态改变有两种可能：从Pending到Fulfilled和从Pending到Rejected。状态一旦发生改变就不会再变，会一直保持这个结果。

Promise相当于购餐时的订单号，当我们付钱购买了想要的食物后，便会拿到小票。这时餐厅就在厨房后面为你准备可口的午餐，你在等待的过程中可以做点其他的事情，比如看个视频，打个游戏。当服务员喊道我们的订单时，我们就可以拿着小票去前台换我们的午餐。当然有时候，前台会跟你说你点的鸡腿没有了。这就是Promise的工作方式。



#### 3.2 基本用法

###### 1、Promise

ES6规定，Promise对象是一个构造函数，用来生成Promise实例。

```javascript
var promise = new Promise(function(resolvem reject) {
	// some code
	if (/*异步操作成功*/) {
		resolve(value);
	} else {
		reject(error);
	}
})
```

- resolve的作用是将Promise对象的状态从“未完成”变成“成功”，在异步操作成功时调用，并将异步操作结果作为参数传递出去
- reject的作用是将Promise对象的状态从“未完成”变成“失败“，在异步操作失败时调用，并将异步操作爆出的错误作为参数传递出去



##### 2、resolve函数、reject函数和then()方法

Promise实例生成以后，可以使用then方法分别指定Resolved状态和Rejected状态的回调函数

```javaScript
promise.then(function(value) {
	// success
}, function(error) {
	// failure
})
```

- then方法接受两个参数：第一个回调函数是Promise状态变为Resolved时调用的，第二个是Promise状态变成Rejected时调用

- 第二个参数是可选的，不一定要提供

- 两个函数都接受Promise对象传出去的值做参数。

  - reject函数传递的参数一半时Error对象的实例，表示抛出错误。

  - resolve函数除了传递正常值以外，还可以传递一个Promise实例

    ```javascript
    var p1 = new Promise(function(resolve, reject) {
    	//...
    });
    
    // 这种情况下，p1的状态决定了p2的状态。p2必须等到p1的状态变为resolve或reject才会执行回调函数
    var p2 = new Promise(function(resolve, reject) {
    	//...
    	resolve(p1);
    });
    ```



#### 3.3 Promise.prototype.then()

then方法是定义在原型对象Promise.prototype上的。它的作用是为Promise实例添加改变状态时的回调函数。

- then方法接受两个参数：第一个回调函数是Promise状态变为Resolved时调用的，第二个是Promise状态变成Rejected时调用

- then方法返回的是一个新的Promise实例。因此可以采用**链式**的写法。

  ```javaScript
  promise((resolve, reject) => {
  	// ...
  }).then(() => {
  	// ...
  }).then(() => {
  	// ...
  })
  ```

- 采用链式的写法可以指定一组按照次序调用的回调函数。如果前一个回调函数返回了一个Promise实例，那么后一个回调函数就会等待该Promise对象状态的变化再被调用。

  ```javascript
  promise((resolve, reject) => {
  	// ...
  }).then(() => {
  	// ...
  	return new Promise((resolve, reject) => {
  		// ...
  	})
  }).then((comments) => {
  	console.log("resolved: ", comments)
  }, (err) => {
  	console.log("rejected: ", err)
  })
  
  // 或者可以写的更加简洁一些
  promise((resolve, reject) => {
  	// ...
  })
  .then(() => new Promise((resolve, reject) => {...})
  .then(
  	comments => console.log("resolved: ", comments),
  	err => console.log("rejected: ", err)
  )
  ```



#### 3.4 Promise.prototype.catch()

Promise.prototype.catch()是方法.then(null, rejection)的别名，用于指定发生错误时的回调函数。

```javaScript
getJSON('/post.json').then((posts) => {
	// ....
}).catch((error) => {
	console.log("发生错误", error);
})
```

- getJSON返回一个Promise对象，如果该对象变成Resolved则会调用then()方法

- 如果异步发生错误或者then方法发生错误，则会被catch捕捉

- Promise在resolve语句后面再抛出错误不会被捕获，因为Promise的状态一旦改变就不会再改变了。

  ```javascript
  var promise = new Promise((resolve, reject) => {
  	resolve('ok');
  	throw new Error('test')
  })
  promise
  	.then((value) => {console.log(value)})
  	.catch((error) => {console.log(error)})
  ```

- Promise对象的错误具有“冒泡”的性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch捕获。一般来说不要再then中定义第二个函数，而总是用catch方法。

  ```javaScript
  var promise = new Promise((resolve, reject) => {
  	resolve('ok');
  	throw new Error('test')
  })
  // 不推荐
  promise
  	.then(
  		(value) => {console.log(value)},
  		(error) => {console.log(error)}
  	)
  	
  //推荐
  promise
  	.then((value) => {console.log(value)})
  	.catch((error) => {console.log(error)})
  ```

- 和传统的try/catch不同，如果没有使用catch指定错误处理的回调函数，promise对象抛出的错误不会传递到外层代码，即不会有任何反应

- catch返回的也是一个Promise对象，后面还可以跟then



#### 3.5 done()和finally()

##### 1. done()

无论Promise对象的回调链是以then方法结束还是以catch方法结束，只要最后一个方法抛出错误，都有可能无法捕捉到（因为Promise内部的错误不会冒泡到全局）。为此可以提供一个done()方法，他总是在回调链的尾部，保证抛出任何可能出现的错误。

```javascript
asyncFunc ()
.then(f1)
.catch(f2)
.then(f3)
.done()
```

它的源码实现很简单： 

```javascript
Promise.prototypr.done = function (onFulfilled, onRejected) {
	this.then(onFulfilled, onRejected)
	.catch(function(reason){
		// 抛出一个全局错误
		setTimeout(() => {throw reason}, 0)
	})
}
```



##### 2. finally()

finally方法用于指定不管Promise对象最后如何都会执行的操作。他与done方法的最大区别在于它接受一个回调函数作为参数，该函数不管怎么样都会执行。来看看它的实现方式。

```javaScript
Promise.prototype.finally = function (callback) {
	let P = this.constructor
    // 巧妙的使用Promise.resolve方法，达到不管前面的Promise状态是fulfilled还是rejected，都会执行回调函数
	return this.then(
		value => P.resolve(callback()).then(() => value),
		reason => P.resolve(callback()).then(() => throw reason)
	)
}
```



#### 3.6 Promise.all()

Promise.all方法用于将多个Promise实例包装成一个新的Promise实例

```javascript
var p = Promise.all([p1, p2, p3])
```

- p1、p2、p3都是Promise实例，如果不是，则会使用Promise.resolve方法，将参数转化为Promise实例，再进行处理

- 该方法的参数不一定是要数组，但必须要有Iterator接口，且每个组员都是Promise实例

- p的状态由p1、p2、p3决定

  - 只有p1、p2、p3的状态都变成Fulfilled，p的状态才会变成Fulfilled，此时p1、p2、p3的返回值组成一个数组传递给p的回调函数
  - 只要p1、p2、p3有一个状态变成Rejected，p的状态就会变成Rejected，此时第一个Rejected的实例的返回值传递给p的回调函数

  ```javascript
  var promises = [2, 3, 4, 5, 6, 7].map((id) => {
  	return getJSON(`/post/${id}.json`)
  })
  
  Promise.all(promises).then((posts) => {
  	//...
  }).catch((error) => {
  	//...
  })
  ```

- 如果作为参数的Promise实例自身定义了catch方法，那么它被rejected时并不会出发Promise.all()的catch方法

```javaScript
const p1 = new Promise((resolve, reject) => {
	resolve('hello')
})
.then(result => result)
.catch(e => e)

const p2 = new Promise(resolve, reject) => {
	throw new Error('error')
})
.then(result => result)
.catch(e => e)

const p3 = new Promise(resolve, reject) => {
	throw new Error('error')
})
.then(result => result)

// p2的catch返回了一个新的Promise实例，该实例的最终状态是resolved
Promise.all([p1, p2])
.then(result => result)
.catch(e => e)
// ["hello", Error: error]

// p3没有自己的catch，所以错误被Promise.all的catch捕获倒了
Promise.all([p1, p3])
.then(result => result)
.catch(e => e)
// Error: error
```



#### 3.7 Promise.race()

Promise.race方法用于将多个Promise实例包装成一个新的Promise实例

```javascript
var p = Promise.race([p1, p2, p3])
```

- p1、p2、p3都是Promise实例，如果不是，则会使用Promise.resolve方法，将参数转化为Promise实例，再进行处理
- 该方法的参数不一定是要数组，但必须要有Iterator接口，且每个组员都是Promise实例

- p的状态由p1、p2、p3决定，只要p1、p2、p3有一个实例率先改变状态，p的状态就会跟着改变。率先改变状态的实例的返回值传递给p的回调函数。



#### 3.8 Promise.resolve()

Promise.resolve方法将现有对象转换成Promise对象，分为以下四种情况：

##### 1. 参数是一个Promise实例

Promise.resolve不做任何改变



##### 2. 参数是一个thenable对象

thenable对象是指具有then方法的对象

```javascript
let thenable = {
	then: function(resolve, reject) {
		resolve(42);
	}
}
let p1 = Promise.resolve(thenable)
p1.then(function(value) {
    console.log(value) // 42
})
```

Promise.resolve会将这个对象转换成Promise对象，然后立即执行thenable对象的then方法



##### 3. 参数是不具有then方法或根本不是对象

该情况下，Promise.resolve返回一个新的Promise对象，状态为Resolved

```javascript
var p = Promise.resolve('hello');
p.then((s) => {
	console.log(s)
})
// hello
```



##### 4. 不带任何参数

此情况下，Promise.resolve方法返回一个Resolved状态的Promise对象

```javascript
console.log('start'); 
setTimeout(() => { 
  console.log('timeout'); 
}); 
Promise.resolve().then(() => { 
  console.log('resolve'); 
}); 
console.log('end'); 
```

（1）先执行同步队列的任务，因此先打印start和end
（2）setTimeout 作为一个宏任务放入宏任务队列
（3）Promise.then作为一个为微任务放入到微任务队列
（4）Promise.resolve()将Promise的状态变为已成功，即相当于本次宏任务执行完，检查微任务队列，发现一个Promise.then, 执行
（5）接下来进入到下一个宏任务——setTimeout, 执行



#### 3.9 Promise.reject()

Promise.reject方法会返回一个新的Promise实例，状态为Rejected

与Promise.resolve不同，Promise.reject会原封不动的将其参数作为reject的理由传递给后续的方法，因此没有那么多的情况分类

```javaScript
let thenable = {
	then: function(resolve, reject) {
		resolve(42);
	}
}

Promise.reject(thenable)
.catch(e => {
	console.log(e === thenable)
})
//true
```



### 第四章、Gnerator

Promise解决了回调函数的回调地狱的问题，但是Promise最大的问题是代码的冗余，原来的任务被Promise包装后，无论什么操作，一眼看过去都是许多then的堆积，原来的语义变得很不清楚。

传统的编程语言中早有异步编程的解决方案，其中一个叫做**协程**，意思为多个线程相互作用，完成异步任务。它的运行流程如下：

- 协程A开始执行
- 协程A执行到一般暂停，执行权交到协程B中
- 一段时间后，协程B交还执行权
- 协程A恢复执行

```javascript
function *asyncJob () {
	// ...
	var f = yield readFile(fileA);
	// ...
}
```

**它最大的优点就是，代码写法很像同步操作。**

 

#### 4.1 Generator封装异步任务

Generator函数是协程在ES6中最大的实现，最大的特点就是可以交出函数的执行权。

整个Generator函数就是一个封装的异步任务容器，异步操作需要用yield表明。Generator他能封装异步任务的原因如下：

- 暂停和恢复执行
- 函数体内外的数据交换
- 错误处理机制

上面代码的Generator函数的语法相关已经在上一篇[博客](http://blog.wutortoise.cn/2021/05/08/Generator%E5%87%BD%E6%95%B0)中总结了，不能理解此处可以前往复习。



Generator函数是一个异步操作的容器，它的自动执行需要一种机制，当异步操作有了结果，这种机制需要自动交回执行权，有两种方法可以做到：

- 回调函数：将异步操作包装成Thunk函数，在回调函数里面交回执行权

- Promise对象：将异步操作包装成Promise对象，使用then方法交回执行权



#### 4.2 Thunk函数

> 参数的求值策略有两种，一种是传值调用，另一种是传名调用
>
> - 传值调用，在参数进入函数体前就进行计算；可能会造成性能损失。
> - 传名调用，在参数被调用时再进行计算。

编译器的**传名调用**的实现将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫Thunk函数。

```javascript
function f(m) {
	return m * 2;
}

f(x + 5);

// 等同于
var Thunk = function () {
	return x + 5;
}

function f(thunk) () {
	return thunk() * 2
}
```



##### 1. js中的Thunk函数

js语言是按值调用的，它的Thunk函数含义和上述的有些不同。在js中，Thunk函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。

（1）在js中，任何函数，只要参数有回调函数就可以写成Thunk函数的形式。

```javascript
// ES5
var Thunk = function (fn) {
	return function () {
		var args = Array.prototype.slice.call(arguments);
		return function (callback) {
			return function (callback) {
				args.push(callback);
				return fn.apply(this, args)
			}
		}
	}
}

// ES6
var Thunk = function (fn) {
	return function (...args) {
		return function (callback) {
			return fn.call(this, ...args, callback)
		}
	}
}

// 实例
function f (a, cb) {
    cb(a)
}
const ft = Thunk(f);
ft(1)(console.log); // 1
```

​                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

（2）生产环境中使用Thunkify模块

```javascript
$ npm install Thunkify

var thunkify = require('thunkify');
var fs = require('fs');

var read = thunkify(fs.readFile);
read('package.json')(function(err, str) {
	// ...
})
```



##### 2. Generator函数的流程管理

前面提到了Thunk可以用于Generator函数的自动流程管理

（1）Generator可以自动执行

```javascript
function *gen() {
	// ...
}

var g = gen();
var res = g.next();

while (!res.done) {
	console.log(res.value);
	res = g.next();
}
```

但是这不适合异步操作，如果必须满足上一步执行完成才能执行下一步，上面的自动执行就不可行。



（2）Thunk函数自动执行

```javascript
var thunkify = require('thunkify');
var fs = require('fs');
var readFileThunk = thunkify(fs.readFile);

var gen = function* () {
	var r1 = yield readFileThunk('/etc/fstab');
	console.log(r1.toString());
	var r2 = yield readFileThunk('/etc/shell');
	console.log(r2.toString());
}
var g = gen();

// 将同一个函数反复传入next方法的value属性
var r1 = g.next();
r1.value(function(err, data) {
	if (err) throw err;
	var r2 = g.next(data);
	r2.value(function (err, data) {
		if (err) throw err;
		g.next(data);
	})
})

// Thunk函数自动化流程管理
function run (fn) {
	var gen = fn();
	
	function next (err, data) {
		var result = gen.next(data);
		if (result.done) return;
		result.value(next)
	}
	
	next();
}

run(g)
```

上述的run函数就是以一个Generator函数自动执行器。有了这个执行器，不管内部有多少个异步操作，直接在将Generator函数传入run函数即可，但是要注意，**每一个异步操作都是Thunk函数，也就是说yield后面必须是Thunk函数**。



#### 4.3 co模块

co模块不需要编写Generator函数的执行器

```javascript
var co = require('co');
// gen函数自动执行
co(gen);
// co函数返回一个Promise对象，因此可以用then方法添加回调
co(gen).then(function () {
    console.log('Generator函数执行完毕')
})
```



##### 1. 基于Promise对象的自动执行

```javascript
var fs = require('fs');

var readFile = function (fileName) {
	return new Promise(function (resolve, reject) {
		fs.readFile(fileName, function (error, data) {
			if (error) return reject(error);
			resolve(data);
		})
	})
}


var gen = function* () {
	var r1 = yield readFileThunk('/etc/fstab');
	console.log(r1.toString());
	var r2 = yield readFileThunk('/etc/shell');
	console.log(r2.toString());
}
var g = gen()

// 手动执行，使用then方法层层添加回调函数
g.next().value.then(function(data){
	g.next(data).value.then(function(data){
		g.next(data)
	})
})

// 根据手动执行，写一个自动执行器
function run (gen) {
    var g = gen();
    
    function next(data) {
        var result = g.next(data);
        if (result.done) return result.value;
        result.value.then(function (data) {
            next(data);
        })
    }
    
    next();
}

run(gen)
```



### 第五章、async函数

ES2017标准引入了async函数，使得异步操作变得更加方便。**async函数就是Generator函数的语法糖**。

async函数就是将Generator函数的*换成async，将yield换成await。

```javascript
varasyncReadFile = async function () {
	var r1 = await readFileThunk('/etc/fstab');
	console.log(r1.toString());
	var r2 = await readFileThunk('/etc/shell');
	console.log(r2.toString());
}
```



async对于Generator的改进有三点：

- 内置执行器：不需要像Generator函数那样引入Thunk函数和co模块来解决自动执行的问题
- 适用性更广：Generator函数中yield后只能跟Thunk函数或者Promise对象，在async函数中可以是Promise对象和原始类型的值（数值、字符串和布尔值，但此之等同于同步操作）
- 返回值是Promise：比Generator函数的返回值是一个Iterator对象方便了很多



##### 1. async函数的声明

```javascript
// 函数式声明
async function foo() {}

// 函数表达式
const foo = async function() {}

// 箭头函数
const foo = async () => {}

// 对象方法
let obj = { async foo() {} }
obj.foo().then(...)

// class方法
class Storage {
	constructor () { ... }
	
	async getName() {}
}
```



##### 2. 语法

（1）async函数返回一个Promise对象

- async函数内部return语句的返回值，会成为then方法回调函数的参数

```javascript
async function f() {
	return 'hello'
}

f().then(v => console.log(v)) // hello
```

- async函数内部抛出的错误会导致返回的Promise对象变成reject状态，抛出的错误对象会被catch方法回调函数接收到。

```javascript
async function f() {
	 throw new Error('出错了')；
}

f().then(
	v => console.log(v)
	e => console.log(e)
)
// Error: 出错了
```

- async函数返回的Promise对象必须等到内部所有的await命令后面的Promise对象执行完毕才会发生状态改变，除非遇到return语句或者抛出错误。



（2）await命令

- 正常情况下await命令后面是一个Promise对象，如果不是会被resolve立即转成一个Promise对象

- await命令后面的Promise对象如果变成reject状态，则reject的参数会被catch方法的而回调函数接收到
- 有时不希望抛出错误终止后面的步骤
  - 将await放在try...catch结构里面
  - 在await后面的Promise对象后添加一个catch方法

```javascript
async function f() {
	try {
		await Promise.reject('出错了')
	} catch(e) {
	}	
	return await Promise.resolve('hello')
}

f().then( v => console.log(v)) // hello

async function f1() {
    await Promise.reject('出错了')
		.catch(e => console.log(e));
	return await Promise.resolve('hello')
}

f1().then( v => console.log(v)) // hello
```

- await命令只能在async函数中使用，否则会报错

- 如果await命令后面的异步操作不是继发关系，最好让他们同步触发

```javascript
let foo = getFoo();
let bar = getBar();

// 写法1
let [foo, bar] = await Promise.all([getFoo(), getBar()])

// 写法2
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```























