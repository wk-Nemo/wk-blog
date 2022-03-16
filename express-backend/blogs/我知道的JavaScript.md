---
title: 我知道的JavaScript
date: 2021-04-03 01:25:44
categories: JavaScript
---
## 1. 数据类型
- 基本的数据类型：undefined null boolean number string symbol  BigInt 
- 引用类型： Object Array Data  Function Regular String Number Boolean
### （1）0.1 + 0.2 === 0.3 ？
0.1和0.2在转换成二进制后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现了精度的损失，相加后因浮点数小数位的限制而截断的二进制数字在转换为十进制就会变成0.30000000000000004。

### （2）null使用typeof会输出object
这是一个历史遗留的bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象然而 null 表示为全零，所以将它错误的判断为 object

### （3）包装类
- ‘1’.toString()的执行过程
- var s = new Object('1'); 
- s.toString(); 
- s = null; 


### （4）symbol创建一个独一无二的数

### （5）BigInt
用于当整数值大于Number数据类型支持的范围时。这种数据类型允许我们安全地对大整数执行算术操作，表示高分辨率的时间戳，使用大整数id，等等，而不需要使用库。

## 2. js数据类型检测
### （1）typeof
- 对于原始类型来说，除了 null 都可以调用typeof显示正确的类型

```javascript
typeof 1 // 'number' 
typeof '1' // 'string' 
typeof undefined // 'undefined' 
typeof true // 'boolean' 
typeof Symbol() // 'symbol' 
```

- 对于引用数据类型，除了函数之外，都会显示"object"。

```javascript
typeof [] // 'object' 
typeof {} // 'object' 
typeof console.log // 'function' 
```

- 因此采用typeof判断对象数据类型是不合适的，采用instanceof会更好，instanceof的原理是基于原型链的查询，只要处于原型链中，判断永远为true

```javascript
const Person = function() {} 
const p1 = new Person() 
p1 instanceof Person // true 
 
var str1 = 'hello world' 
str1 instanceof String // false 
 
var str2 = new String('hello world') 
str2 instanceof String // true 
```

### （2）instanceof手动实现
核心: 原型链的向上查找。

```javascript
function myInstanceof(left, right) { 
    //基本数据类型直接返回false 
    if(typeof left !== 'object' || left === null) return false; 
    //getProtypeOf是Object对象自带的一个方法，能够拿到参数的原型对象 
    let proto = Object.getPrototypeOf(left); 
    while(true) { 
        //查找到尽头，还没找到 
        if(proto == null) return false; 
        //找到相同的原型对象 
        if(proto == right.prototype) return true; 
        proto = Object.getPrototypeOf(proto); 
    } 
} 

function myInstanceof(left, right) {
    if(typeof left === null || typeof left !== 'object') return false
    let proto = Object.getPrototypeOf(left)
    while (true) {
        if (proto == null) return false
        if (proto == right.prototype) return true
        proto = Object.getPrototype(proto)
    }
}
```

 

### （3）深拷贝和浅拷贝
- 浅拷贝：

```javascript
function shallowClone(obj) { 
  let cloneObj = {}; 
   
  for (let i in obj) { 
    cloneObj[i] = obj[i]; 
  } 
   
  return cloneObj; 
} 
```

- 深拷贝：
  - 考虑基础类型
  - 引用类型
    - RegExp、Date、函数 不是 JSON 安全的
    - 会丢失 constructor，所有的构造函数都指向 Object
    - 破解循环引用
```javascript
function deepClone(obj) { 
  if (typeof obj === 'object') { 
    var result = obj.constructor === Array ? [] : {}; 
     
    for (var i in obj) { 
      result[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]; 
    } 
  } else { 
    var result = obj; 
  } 
   
  return result; 
} 

function deepCopy(obj) {
    if (typeof obj === 'object') {
        if (object.constructor === 'Array') {
            var result = []
        } else {
            var result = {}
        }
        for (var i in obj) {
            result[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];]
        }
    } else {
        var result = obj
    }
    return result
}
```

### （4）判断arr是不是数组的方法
- 根据原型链的两种方法，但是原型链可能会修改，所以有时候不靠谱
  - arr instanceof Array  === true
  - arr.__proto__.constructor === Array
- Object.prototype.toString.apply(arr) === "[object Array]"
- 官方提供方法，可靠可行 Array.isArray(arr) === true 
## 3. 数据类型之转换
- [] ==![]
  - ==两边都要转换成数字
  - []转换成数字为0
  - ![]布尔值为false ------ false转数字为0
  - 结果为true

- js的转换类型
  - 转成数字
  - 转成布尔值
  - 转成字符串


- \==和===
  - ===严格相等，不经值要相等，类型也要相等
  - ==涉及一些类型转换

- 对象转换成原始类型
对象转原始类型，会调用内置的[ToPrimitive]函数，对于该函数而言，其逻辑如下：
  1. 如果Symbol.toPrimitive()方法，优先调用再返回
  2. 调用valueOf()，如果转换为原始类型，则返回
  3. 调用toString()，如果转换为原始类型，则返回
  4. 如果都没有返回原始类型，会报错

- 如何if(a ==1 && a==2)成立

```javascript
var a = {
    value: 0,
    valueOf: function(){
        this.value ++;
        return this.value
    }
}
```


## 4. 函数（Function）
自己的博客链接：[函数](http://blog.wutortoise.cn/2021/02/07/%E5%87%BD%E6%95%B0)
### （1）函数的参数
- 你可以传递一个参数进函数，不论你在定义函数时规定了多少个参数，因为你传递的参数会依次传递给arguments
- arguments可以使用方括号访问元素（arguments[0]表示传递进来的第一个参数，依次类推），用length属性确定传递进来多少个参数
- arguments对象只是与数组类似，但它并不是Array的实例
  - arguments当作数组一样使用

### （2）new一个函数发生了什么？
- 创造一个全新的对象
- 这个对象会被执行 [[Prototype]] 连接，将这个新对象的 [[Prototype]] 链接到这个构造函数.prototype 所指向的对象
- 这个新对象会绑定到函数调用的 this
- 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象



### （3）闭包
- 什么是闭包？
ES5中存在两个作用域：全局作用域、函数作用域，函数作用域会在函数运行结束后自动销毁
作用域链：查找一个变量时会从自身的作用域开始沿着作用域链一直向上查找
闭包：利用了作用域，可以将函数内部的作用域的变量访问到

- 闭包如何产生：
  - 返回函数 （常见）

```javascript
const a = 2
function out () {
  let a = 1
  return function b () {
    console.log(a)
  }
}
const b = out()
b() // 1
```

  - 函数当作参数传递 ：当作参数的函数可以访问到函数主体的内部作用域

```javascript
var a = 1
function bar(fn) {
  var a = 2
  console.log(fn)
}

function baz() {
  console.log(a)
}

bar(baz) // 1
```

js中有全局作用域和函数作用域，函数执行时所在的作用域是定义时的作用域，而不是调用时所在的作用域，注意要与this的指向区分开来。作用域在声明时就决定了，但是上下文执行时决定。
参考这篇文章：[JavaScript：理解函数执行时的作用域](https://blog.csdn.net/qq_40755381/article/details/114213442)

```javascript
var a = 1
function foo() {
  var a =2
  function baz() {
    console.log(a)
  }
  bar(baz)
}
function bar(fn) {
  fn()
}
foo() // 2
```

  - 在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，其实就是上面那种情况，将函数当作参数，也就是在使用闭包。

```javascript
// 定时器
setTimeout(function timeHandler(){
  console.log('111');
}, 100)

// 事件监听
$('#app').click(function(){
  console.log('DOM Listener');
})
```

  - 立即执行函数：


```javascript
var a = 2;
(function IIFE(){
  // 输出2
  console.log(a);
})();
```
IIFE(立即执行函数表达式)创建闭包, 保存了全局作用域window和当前函数的作用域，因此可以全局的变量。
```javascript
for(var i = 1; i <= 5; i ++){
  (function(j){
      setTimeout(function timer(){
        console.log(j)
      }, 0)
  })(i)
}
```



  - 应用场景：柯里化（bind）、模块
    - 柯里化：函数柯里化、前端经典面试题解密-add(1)(2)(3)(4) == 10到底是个啥？
```javascript
function add (...args) {
  return args.reduce((a, b) => a + b)
}

function currying(fn) {
  let args = []
  return function _c (...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs]
      return _c
    } else {
      return fn.apply(this, args)
    }
  }
}

let addCurry = currying(add)
let total = addCurry(1)(2)(3, 4)(5, 6 ,7)()
console.log(total) // 28
```

  - 缺点：内存泄漏，所以尽量少用

一个常见的问题：如何解决下面的循环输出问题？

```javascript
for(var i = 1; i <= 5; i ++){
  setTimeout(function timer(){
    console.log(i)
  }, 0)
}
```

- 原因：setTimeout是宏任务，等同步任务执行完毕后i为6，所以会输出五个6
- 解决办法：
  - 使用立即执行函数：将变量i依次传入了每个作用域

```javascript
for(var i = 1; i <= 5; i ++){
  (function(j){
      setTimeout(function timer(){
        console.log(j)
      }, 0)
  })(i)
}
```

  - 使用let，形成块级作用域

```javascript
for(let i = 1; i <= 5; i ++){
  setTimeout(function timer(){
    console.log(i)
  }, 0)
}
```


### （4）this、bind、call、apply
- this：谁调用，指向谁
  - 默认绑定：在全局执行上下文中，this的指向全局对象。(在浏览器中，this引用 Window 对象)。
  - 隐式绑定：在函数执行上下文中，this 的值取决于该函数是如何被调用的。如果它被一个引用对象调用，那么this会被设置成那个对象，否则this的值被设置为全局对象或者undefined（在严格模式下）
  - 显示绑定:apply、call、bind
- call、apply、bind用途：都是函数的方法、改变this的指向
  - call和apply的区别：call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组。
- 手写call
```javascript
Function.prototype.call = function(context, ...args) {
  context = context || window
  const fn = this

  context.fn = fn
  const res = context.fn(...args)

  delete context.fn
  return res
}
```
- 手写apply
```javascript
Function.prototype.apply = function (context, ...args) { 
  context = context || window
  console.log(context)
  const fn = this
  console.log(fn)

  context.fn = fn
  console.log(context.fn)
  const res  =context.fn(...args[0])

  delete context.fn
  return res
}
```

  - bind与apply和call的区别在bind不会立即执行函数而是返回函数

```javascript
 var a = { 
   name: "Cherry", 
   fn: function (a,b) {
      console.log( a + b) 
   } 
} 
var b = a.fn; 
b.bind(a,1,2)    // 函数不执行
b.bind(a,1,2)() // 3
```


   - 手写bind
```javascript
Function.prototype.bind = function (context, ...args) {
  context = context || window
  const fn = this

  context.fn = fn

  // bind和call、apply的区别
  return function () {
    const res = context.fn(...args)
    delete context.fn
    return res
  }
}
```


### （5）箭头函数
普通函数通过 function 关键字定义， this 无法结合词法作用域使用，在运行时绑定，只取决于函数的调用方式，在哪里被调用，调用位置。（取决于调用者，和是否独立运行）
箭头函数使用被称为 “胖箭头” 的操作 => 定义，箭头函数不应用普通函数 this 绑定的四种规则，而是根据外层（函数或全局）的作用域来决定 this，且箭头函数的绑定无法被修改（new 也不行）。 
- 箭头函数常用于回调函数中，包括事件处理器或定时器
- 箭头函数和 var self = this，都试图取代传统的 this 运行机制，将 this 的绑定拉回到词法作用域
- 没有原型、没有 this、没有 super，没有 arguments，没有 new.target
- 不能通过 new 关键字调用 
  - 一个函数内部有两个方法：[[Call]] 和 [[Construct]]，在通过 new 进行函数调用时，会执行 [[construct]] 方法，创建一个实例对象，然后再执行这个函数体，将函数的 this 绑定在这个实例对象上
  - 当直接调用时，执行 [[Call]] 方法，直接执行函数体
  - 箭头函数没有 [[Construct]] 方法，不能被用作构造函数调用，当使用 new 进行函数调用时会报错。

## 5. Object
object的相关API：[Object 对象](https://wangdoc.com/javascript/stdlib/object.html)

自己的博客：[Object类型和面向对象的程序设计](http://blog.wutortoise.cn/2021/01/15/Object%E7%B1%BB%E5%9E%8B%E5%92%8C%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%9A%84%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1)
### （1） 原型、原型链
  - 原型对象和构造函数
    - js中每定义一个函数，会有一个自带的prototype指向函数的原型对象
    - 函数经过new后，成为了构造函数会返回一个全新的实例对象，具有一个__proto__属性，指向构造函数的原型函数

  - 说说原型链
    - JavaScript实例对象通过__proto__ 指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条, 即原型链。

    - 对象的 hasOwnProperty() 来检查对象自身中是否含有该属性
    - 使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true

### （2）js如何实现继承
  - 借助call

```javascript
  function Parent1(){ 
    this.name = 'parent1'; 
  } 
  function Child1(){ 
    Parent1.call(this); 
    this.type = 'child1' 
  } 
  console.log(new Child1); 
```

这样写的时候子类虽然能够拿到父类的属性值，但是问题是父类原型对象中一旦存在方法那么子类无法继承。那么引出下面的方法。

- 借助原型链

```javascript
  function Parent2() { 
    this.name = 'parent2'; 
    this.play = [1, 2, 3] 
  } 
  function Child2() { 
    this.type = 'child2'; 
  } 
  Child2.prototype = new Parent2(); 
 
  console.log(new Child2()); 
```

潜在的问题：多个实例对象绑定的是同一个原型，改变一个会影响另外一个

- 组合

```javascript
  function Parent3 () { 
    this.name = 'parent3'; 
    this.play = [1, 2, 3]; 
  } 
  function Child3() { 
    Parent3.call(this); 
    this.type = 'child3'; 
  } 
  Child3.prototype = new Parent3(); 
  var s3 = new Child3(); 
  var s4 = new Child3(); 
  s3.play.push(4); 
  console.log(s3.play, s4.play); 
```

又徒增了一个新问题，那就是Parent3的构造函数会多执行了一次（Child3.prototype = new Parent3();）

- 寄生组合继承

```javascript
  function Parent5 () { 
    this.name = 'parent5'; 
    this.play = [1, 2, 3]; 
  } 
  function Child5() { 
    Parent5.call(this); 
    this.type = 'child5'; 
  } 
  Child5.prototype = Object.create(Parent5.prototype); 
  Child5.prototype.constructor = Child5; 
```


- class继承

```javascript
class Animal {
  constructor(name) {
      this.name = name
  } 
  getName() {
      return this.name
  }
}
class Dog extends Animal {
  constructor(name, age) {
      super(name)
      this.age = age
  }
}
```

## 6. 异步机制
异步机制前先了解一下js里面的事件执行机制：[宏任务/微任务的个人理解](https://juejin.cn/post/6844904113877188622)
### （1）js是单线程
但是浏览器的渲染进程是多线程的，如下：
  - JS引擎线程
  - 事件触发线程
  - 定时触发器线程
  - 异步http请求线程
  - GUI渲染线程
单线程就是一次只能只能一个任务，有多个任务的话需要一个个的执行，为了解决异步事件，js引擎产生了Event Loop机制。

### （2）宏任务
  - 在 JS 中，大部分的任务都是在主线程上执行，常见的任务有:
    - 渲染事件
    - 用户交互事件
    - js脚本执行
    - 网络请求、文件读写完成事件等等。
    - setTimeout、setInterval
  - 为了让这些事件有条不紊地进行，JS引擎需要对之执行的顺序做一定的安排，V8 其实采用的是一种队列的方式来存储这些任务， 即先进来的先执行。

### （3）微任务
  - 对每个宏任务而言，内部有一个都有一个微任务
  - 引入微任务的初衷是为了解决异步回调的问题
    - 将异步回调进行宏任务队列的入队操作。
      - 采用第一种方式，那么执行回调的时机应该是在前面所有的宏任务完成之后，倘若现在的任务队列非常长，那么回调迟迟得不到执行，造成应用卡顿。
    - 将异步回调放到当前宏任务的末尾。
      - 为了规避第一种方式中的这样的问题，V8 引入了第二种方式，这就是微任务的解决方式。在每一个宏任务中定义一个微任务队列，当该宏任务执行完成，会检查其中的微任务队列，如果为空则直接执行下一个宏任务，如果不为空，则依次执行微任务，执行完成才去执行下一个宏任务。
  - 常见的微任务有：
    - MutationObserver
    - Promise.then(或.reject) 以及以
    -  Promise 为基础开发的其他技术(比如fetch API)
    - V8 的垃圾回收过程。

### （4）EventLoop

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

- Promise
  - Promise解决了什么问题
  - 手写Promise
  - 手写resolve() reject() finally()
## 7. 常见手写题
### 函数部分
（1）参数列表转换成数组
因为arguments本身并不能调用数组方法，它是一个另外一种对象类型，只不过属性从0开始排，依次为0，1，2...最后还有callee和length属性。我们也把这样的对象称为类数组。
```javascript
// 函数参数转数组
function sum1(a, b) {
    let args = Array.prototype.slice.call(arguments)
    console.log(args.reduce((sum, cur) => sum + cur))
}

function sum2(a, b) {
    let args = Array.from(arguments)
    console.log(args.reduce((sum, cur) => sum + cur))
}

function sum3(a, b) {
    let args = [...arguments]
    console.log(args.reduce((sum, cur) => {
        return sum.concat(cur)
    }, []))
}

function sum4(a, b) {
    let args = Array.prototype.concat.apply([], arguments)
    console.log(args.reduce((sum, cur) => sum + cur))
}
```
（2）call、apply、bind：见上面函数
（3）函数柯里化：见上面函数
### 对象部分
（1）instanceof
instanceOf()的原理就是沿着原型链一直查找
```javascript
function instanceOf(left, right) {
  let proto =left.__proto__
  while (1) {
    console.log(proto)
    if (proto === null) return false
    if (proto === right.prototype) {
      return true
    }
    proto = proto.__proto__
  }
}

let arr = [1, 2, 3]
console.log(instanceOf(arr, Array))
```
（2）new
- 创建一个新对象
- 执行构造函数，把属性方法设置给了对象
- 将this指向这个新对象
- 将新对象的__proto__指向构造函数的Prototype
- 如果没有return别的对象，则返回该对象
```javascript
function objectFactory() {
  // 创建一个新对象
  var obj = new Object()
  // 第一个参数是传入的构造函数
  Constructor = Array.prototype.shift.call(arguments)
  // 对象的原型指向构造函数原型
  obj.__proto__ = Constructor.prototype
  // 将属性值赋给对象
  var ret = Constructor.apply(obj, arguments)
  // 返回结果
  return typeof ret === 'obj' ? ret || obj : obj
}

function person(name, age) {
  this.name = name
  this.age = age
} 

let p = objectFactory(person, '布兰', 12)
console.log(p)
```

（3）浅拷贝和深拷贝 
- 浅拷贝
```javascript
function shallowCopy (obj) {
    if (typeof obj !== 'object') {
        return 
    }
    let newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
        // in会遍历到原型
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
} 
```

- 深拷贝
```javascript
const deepClone = (target) => {
    const cloneTarget = Array.isArray(target) ? [] : {}
    if (typeof target === 'object' && target !== null) {
        // 是对象或者数组的情况
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloneTarget[key] = deepClone(obj[key])
            } else {
                cloneTarget[key] = obj[key]
            }
        }
    }
    return cloneTarget
}
```

（4）继承的实现：见上面
（5）Object.create()：可以指定原型和对象的属性，返回一个新对象
```javascript
Object.create = function (proto, propertyObject = undefined) { 
  if (typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null.')
  }
  if (propertyObject === null) {
    new TypeError('Cannot convert undefined or null to object')
  }
  function F() {}
  F.prototype = proto
  const obj = new F()
  if (propertyObject != undefined) {
    Object.defineProperties(obj, propertyObject)
  }
  if (proto === null) {
    obj.__pro__ = null
  }
  return obj
}
```

### 数组部分
（1）数组扁平化
```javascript
// 数组扁平化
let ary = [1, [2, [3, [4, 5]]], 6];
let str = JSON.stringify(ary)
// 转换成JSON，然后用正则替换掉[],最后转成数组
ary1 = str.replace(/(\[|\])/g,'').split(',')

// 递归实现
let result = []
function re(ary) {
    for (let i = 0; i < ary.length; i++) {
        let item = ary[i]
        if (Array.isArray(item)) {
            re(item)
        } else {
            result.push(item)
        }
    }
}
re(ary)
console.log(result)

// reduce
function flatten(ary) {
    return ary.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
    }, [])
}

实现一个函数：format("3[a]2[bc]") => "aaabcbc"
function format(str) {
  const arr = str.replace(/(\[|\])/g,',').split(',')
  let result = []
  for (let i = 0; i < arr.length - 1; i++) {
    if ( i % 2 === 0) {
      let num = Number(arr[i])
      for(let j = 0; j < num; j++) {
        result.push(arr[i+1])
      }
    }
  }
  return result.join('')
}
const str1 = "3[a]2[bc]4[def]"
console.log(format(str1)) //aaabcbcdefdefdefdef
```

（2）数组去重
```javascript
// 使用indexOf()
function noRepeat1(arr) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }
  return result
}
console.log(noRepeat1(arr))

// 使用set特性，然后将set转换成数组
// 转换数组的方式有很多：扩展运算符、Array.from()、Array.prototype.slice.call、Array.prototype.concat.apply([], arguments)

function noRepeat2(arr) {
  const set = new Set(arr)
  const result = [...set]
  return result
}
console.log(noRepeat2(arr))
```

（3）数组的一些API：map、reduce、fliter、sort
- map
```javascript
Array.prototype.map = function (callbackFn, thisArg) {
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'map' of null or undefined")
  }

  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackFn) != '[object Function]') {
    throw new TypeError(callbackFn + "is not a function")
  }

  // 把数组转换成对象
  let O = Object(this)
  let T = thisArg

  // 保证len为数字且为整数
  let len = O.length >>> 0
  let A  = new Array(len)
  // 大致遍历一边属性，每个属性执行一次回调函数得到值添加到新数组中
  for (let k = 0; k < len; k++) {
    if (k in O) {
      let kValue = O[k]
      let mappedValue = callbackFn.call(T, kValue, k, O)
      A[k] = mappedValue
    }
  }
  return A
}

const arr = [1, 2, 3, 4, 5]
console.log(arr.map(item => item + 1))
```

- reduce
```javascript
Array.prototype.reduce = function (callbackfn, initialValue) {
    // 异常处理，和 map 一样
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'reduce' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
    throw new TypeError(callbackfn + ' is not a function')
  }

  let O = Object(this)
  let len = O.length >>> 0
  let k = 0

  // 有一个判断数组是否为空的过程
  let accumulator = initialValue
  if (accumulator === undefined) {
    for (; k < len; k++) {
      if (k in O) {
        accumulator = O[k]
        k++
        break
      }
    }
  }
  if (k === len && accumulator === undefined) {
    throw new Error('Each element of the array is empty')
  }
  for (;k < len; k++) {
    if (k in O) {
      accumulator = callbackfn.call(undefined, accumulator, O[k], k ,O)
    }
  }
  return accumulator
}

const arr = [1, 2, 3, 4, 5]
console.log(arr.reduce((a, b) => {
  return a + b
}))
```
- fliter
```javascript
Array.prototype.filter = function (callbackfn, thisArg) {
  // 处理数组类型异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'filter' of null or undefined");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) != "[object Function]") {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let O = Object(this)
  let len = O.length >>> 0
  let resLen = 0
  let res = []
  for (let i = 0; i < len; i++) {
    if (i in O) {
      let element = O[i]
      if (callbackfn.call(thisArg, O[i], i, O)) {
        res[resLen++] = element
      }
    }
  }
  return res
}

const arr = [1, 3, 5, 4, 2, 0, 1, 3, 4, 5,6]
console.log(arr.filter((item) => {
  if (item > 3) {
    return true
  }
}))
```
- sort
  - 当 n <= 10 时，采用插入排序
  -  当 n > 10 时，采用三路快速排序 
    - 10 < n <= 1000, 采用中位数作为哨兵元素
    - n > 1000, 每隔 200~215 个元素挑出一个元素，放到一个新数组，然后对它排序，找到中间位置的数，以此作为中位数

### 异步机制
（1）Promise
（2）Promise.reject()
（3）Promise.all()
（4）Promise.race()
（5）Promise.allSettled()
（6）Promise.any()

