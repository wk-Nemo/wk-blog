---
title: JavaScript中的数据类型
date: 2021-05-02 10:05:49
categories: JavaScript
---
# 你不知道的JavaScript（中）

你不知道的JavaScript深入的解析了JavaScript这门语言，而第二本中册主要讲了两大板块：JS中的类型和JS中的异步，本篇内容重在总结归纳类型部分。

### 第一章、类型

JavaScript是一门动态语言（脚本语言），只在被调用时进行解释或编译。

- 脚本语言([JavaScript](https://baike.baidu.com/item/JavaScript)，[VBscript](https://baike.baidu.com/item/VBscript)等)介于[HTML](https://baike.baidu.com/item/HTML)和[C](https://baike.baidu.com/item/C/7252092),[C++](https://baike.baidu.com/item/C%2B%2B),Java,[C#](https://baike.baidu.com/item/C%23)等编程语言之间。　HTML通常用于格式化和链接文本。而编程语言通常用于向机器发出一系列复杂的指令。

- 脚本语言与编程语言也有很多相似地方，其函数与编程语言比较相像一些,其也涉及到变量。与编程语言之间最大的区别是编程语言的语法和规则更为严格和复杂一些.

- 脚本语言是一种解释性的语言,例如[Python](https://baike.baidu.com/item/Python)、vbscript,javascript,installshield script,ActionScript等等,它不象c\c++等可以编译成二进制代码,以[可执行文件](https://baike.baidu.com/item/可执行文件)的形式存在，脚本语言不需要编译，可以直接用，由解释器来负责解释。

#### 1.1 内置类型

##### 1、类型和引用类型

js的内置类型有：

- null
- undefined
- boolean
- number
- string
- symbol

js的引用类型是从object的子类型，有如下几种：

- Object
- Function
- Array
- RegExp
- Data
- 包装类：String、Number、Boolean
- Math



##### 2、判断方法：

（1）typeof检测

```javascript
typeof undefined === "undefined" // true
typeof true === "boolean" // true
typeof 42 === "number" // true
typeof "42" === "string" //true
typeof {...} === "object" //true
```

（2）null检测

```javascript
var a = null
(!a && typeof a === "object") // true
```

（3）引用类型的检测

```javascript
// function检测
typeof function a() {...} === "function" //true

// Array类型检测
// 根据原型链的两种方法，但是原型链可能会修改，所以有时候不靠谱
arr instanceof Array === true
arr.proto.constructor === Array
// 靠谱的方法
Object.prototype.toString.apply(arr) === “[object Array]”
// 官方提供方法，可靠可行，简单 
Array.isArray(arr) === true
```



### 第二章、值

#### 2.1 数组

##### 1、js的数组特点

- js中的数组可以容纳任何类型的值，包括字符串、数字、对象或者其他数组。
- js中的数组可以声明后向内部加入值，不需要预先设定大小

##### 2、类数组

在js中，函数的参数arguments，DOM查询返回的元素列表，他们并非严格意义上的数组，只是用起来像数组，但本质是是对象。有时候需要将类数组转换成真正的数组，有如下几种方法：

```javascript
// 假设下面都发生在一个函数当中，arguments为函数的参数列表

// silce方法
var arr = Array.prototype.slice.call(arguments)

// concat
var arr = Array.prototype.concat.apply([], arguments)

// ES6语法
var arr = [...arguments]

// 内置函数
var arr = Array.from(arguments)
```



#### 2.2 字符串

字符串和数组，但是有一些相似的地方，都有length属性、indexof() 和 concat()方法。但是字符串不是数组:

- js中的字符串是不可变的，而数组是可变的，这就意味着改变某个位上的值，对于字符串而言是要创建一个新的值再赋给变量，而数组是直接在变量的基础上更改
- 字符串可以借用数组的一些处理函数

```javascript
var a = "hello world"

// 字符串未含有的方法
a.join //undefined
a.map //undefined

// 借用数组的方法
var c = Array.prototype.join.call(a, '-')
var d = Array.prototype.map.call(a, () => {...})

// 注意reverse等变更成员的函数不可以使用，因为字符串是不可变的
Array.prototype.reverse().call(a) //hello world

// 如果非要使用可以先将字符串转成数组
var c = a.split("").reverse().join("") // dlrow olleh
```



#### 2.3 数字

js只有一种数值类型number，包括整数和小数，但是js没有真正意义上的整数，所以42.0和42是没有区别的。js中的数字类型是基于IEEE754标准来实现的，这类标准也成为“浮点数”，js使用的双精度格式（即64位二进制）

###### 1、0.1 + 0.2 === 0.3 ？

所有遵循IEEE754标准的二进制浮点数最大的问题会出现如下情况：

```javascript
0.1 + 0.2 === 0.3 //false
```

0.1和0.2在转换成二进制后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现了精度的损失，相加后因浮点数小数位的限制而截断的二进制数字在转换为十进制就会变成0.30000000000000004。



解决办法：

```javascript
// 首先设置一个误差范围，通常成为“机器精度”，对于js来说，这个值通常是2^-52
if (!Number.EPSILON) {
  Number.EPSILON = Math.pow(2, -52);
}

// 比较误差值
function nbumersCloseEnoughToEqual(n1, n2) {
   return Math.abs(n1 - n2) < Number.EPSILON
}

// 比较
var a = 0.2 + 0.1
var b = 0.3
nbumersCloseEnoughToEqual(a, b) //true
```



测试：

![image-20210430112757027](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210430112757027.png)



#### 2.4 特殊数值

js中有几个特殊值值得注意

##### 1、null、undefined和void

null和undefined他们即是名称也是值，他们有一些差别：

（1）null：

- null 指空值，指曾经赋过值，但是当前没有值
- null 是一个特殊关键字，不是标识符，不能**当作变量来使用**和**赋值**

（2）undefined

- undefined 指没有值，指从未赋过值

- undifined 是一个标识符，可以当作变量来使用和赋值

```javascript
// 非严格模式下可以为全局标识符undefined赋值
function foo() {
	undefined = 2
}

foo()

function foo() {
	"use strict";
	undefined = 2;
}

foo()

// 在严格和非严格模式下，可以声明一个undefined的局部变量
function foo() {
	"use strict";
	var undefined = 2;
	console.log(undefined);
}
foo();
```

（3）void运算符

void __ 没有返回值，因此返回的结果是undefined，但是它并不改变表达式的结果，只是让表达式不返回值。

```javascript
var a = 3
console.log(void a, a) //undefined 3
```

 

##### 2、特殊的数字

（1）NaN

如果数学运算的操作符不是数字类型（或者无法解析成常规的十进制和十六进制数字），就无法返回一个有效的数字，这种情况下返回的值未NaN。可以将它理解为“无效数值” “失败数值” 或者 “坏数值”

```javascript
// 不是数字的数字
var a = 2 / "foo"  // NaN
typeof a === "number" // true

// 与自身不相等，唯一一个非自反的值
NaN ！= NaN // true

// 判断NaN
var a = 2 // "foo"j
function isNaN(n) {
	return n !== n 
}
isNaN(a) // true
```

（2）Infinity

js使用IEEE 754浮点数，运算的结果可能溢出，此时的结果为Infinity或-Infinity

```javascript
var a = 1 / 0 // Infinity
var b = -1 / 0 // -Infiniy
```



#### 2.5 值和引用

在很多编程语言中，赋值和参数传递可以通过复制或者引用复制来完成。**在js中，对值的赋值或引用取决于值的类型**。

- 简单值总是通过**值复制**传递来赋值的，包括：null、undefined、字符串、布尔和symbol
- 复合值 —— 对象（包括数组、函数等引用类型）都是通过**引用复制**的方式来赋值

有些人会迷惑函数的参数传递是如何赋值的，结论在前，通过引用复制

```javascript
function foo(x) {
	x.push(4)
	x = [4, 5, 6]
    x.push(7)
}
var a = [1, 2, 3]
foo(a)
a // [1, 2, 3, 4]
```

上述过程如下：

- 首先数组的[1, 2, 3]的地址通过引用复制给了变量a
- 接着调用函数foo时将地址通过引用赋值给了函数参数x
- x通过地址在数组[1, 2, 3]的尾部添加了一个4变成[1, 2, 3, 4]
- 接着x又被赋予了一个新的地址引用，这个地址指向了新的数组[4, 5, 6]，所以后面的所有操作都不会影响到最开始的数组[1, 2, 3, 4]



### 第三章、原生函数

在js中有一些引用类型，在此详细介绍他们：

- Object
- Function
- Array
- RegExp
- Data
- 包装类：String、Number、Boolean
- Math

首先来看看如何分辨他们，所有typeof返回值为object的对象都包含一个内部属性[[Class]]，这个属性无法直接访问，一般通过Object.prototype.toString(..)来查看

```javascript
// 引用类型
Object.prototype.toString.call([1]) // "[object Array]"
Object.prototype.toString.call(/regex-literal/i) // "[object RegExp]"

// null和undefined
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"

// 其他基本类型
Object.prototype.toString.call("131") // "[object String]"
Object.prototype.toString.call(131) // "[object Number]"
Object.prototype.toString.call(true) // "[object Boolean]"
```



##### 1、对象（Object）

object的相关API：[Object 对象](https://wangdoc.com/javascript/stdlib/object.html)

自己的博客：[Object类型和面向对象的程序设计](http://blog.wutortoise.cn/2021/01/15/Object类型和面向对象的程序设计)

（1） 原型、原型链

- 原型对象和构造函数
  - js中每定义一个函数，会有一个自带的prototype指向函数的原型对象
  - 函数经过new后，成为了构造函数会返回一个全新的实例对象，具有一个__proto__属性，指向构造函数的原型函数
- 说说原型链
  - JavaScript实例对象通过__proto__ 指向父类对象，直到指向Object对象为止，这样就形成了一个原型指向的链条, 即原型链。
  - 对象的 hasOwnProperty() 来检查对象自身中是否含有该属性
  - 使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型链中有，也会返回 true

（2）js如何实现继承

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



##### 2、函数（Function）

自己的博客链接：[函数](http://blog.wutortoise.cn/2021/02/07/函数)

（1）函数的参数

- 你可以传递一个参数进函数，不论你在定义函数时规定了多少个参数，因为你传递的参数会依次传递给arguments
- arguments可以使用方括号访问元素（arguments[0]表示传递进来的第一个参数，依次类推），用length属性确定传递进来多少个参数
- arguments对象只是与数组类似，但它并不是Array的实例
  - arguments当作数组一样使用



（2）new一个函数发生了什么？

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



（3）闭包

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



（4）this、bind、call、apply

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



（5）箭头函数

普通函数通过 function 关键字定义， this 无法结合词法作用域使用，在运行时绑定，只取决于函数的调用方式，在哪里被调用，调用位置。（取决于调用者，和是否独立运行）
箭头函数使用被称为 “胖箭头” 的操作 => 定义，箭头函数不应用普通函数 this 绑定的四种规则，而是根据外层（函数或全局）的作用域来决定 this，且箭头函数的绑定无法被修改（new 也不行）。

- 箭头函数常用于回调函数中，包括事件处理器或定时器
- 箭头函数和 var self = this，都试图取代传统的 this 运行机制，将 this 的绑定拉回到词法作用域
- 没有原型、没有 this、没有 super，没有 arguments，没有 new.target
- 不能通过 new 关键字调用
  - 一个函数内部有两个方法：[[Call]] 和 [[Construct]]，在通过 new 进行函数调用时，会执行 [[construct]] 方法，创建一个实例对象，然后再执行这个函数体，将函数的 this 绑定在这个实例对象上
  - 当直接调用时，执行 [[Call]] 方法，直接执行函数体
  - 箭头函数没有 [[Construct]] 方法，不能被用作构造函数调用，当使用 new 进行函数调用时会报错。



