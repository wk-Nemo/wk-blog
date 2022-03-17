---
title: 秋招保驾护航——js面试篇（上）
date: 2021-07-24 00:01:48
categories: JavaScript
tags: 面试
---

秋招正在逼近！快点学起来，本文从js的常见面试题出发，结合基本经典的js书籍《JavaScript高级程序设计》、《你不知道的JavaScript》系列以及一些大神的博客进行总结归纳。大致内容纲要如下：

[秋招保驾护航——js面试篇（上）](https://juejin.cn/post/6987776819281805342/)
- js中的数据类型
- js的垃圾回收机制
- js中的数组
- js中的函数
- js的面向对象编程

[秋招保驾护航——js面试篇（下）](https://juejin.cn/post/6988515657105047559)

- js的异步编程
- js的模块化管理
- ES6新特性
- DOM
- 事件

## js中的数据类型

### 1. js中的数据类型有哪些？

在js中数据类型分为基本类型和引用类型：

（1）基本类型有：

-   null
-   undefined
-   boolean
-   number
-   string
-   symbol（ES6引入）

（2）js的引用类型是从object的子类型，有如下几种：

-   Object
-   Function
-   Array
-   RegExp
-   Date
-   包装类：String、Number、Boolean
-   Math

### 2. js中的基本类型和引用类型分别是如何存储的？

（1）先记结论：**基本类型的数据类型都存储在栈空间，引用类型的值保存在堆中的。**

（2）再看道题目加强理解：

```JavaScript
// 定义四个变量
var num1 = 5
var num2 = num1;
var obj1 = {
    name: '小猪皮皮呆'
}
var obj2 = obj1

// 修改num1和obj1
num1 = 4
obj1.name = '小猪'

// 输出四个变量
console.log(num1) // 4
console.log(num2) // 5
console.log(obj1.name) // 小猪
console.log(obj2.name) // 小猪
```

上面代码num1和num2的输出我们能够很好的理解，因为在**js中基本类型的数据类型都存储在栈空间**。如果一个变量向另一个变量赋值**基本类型**的值，会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/acf91d455b0347fead040760fd350eb1~tplv-k3u1fbpfcp-zoom-1.image)

那么为什么obj1和obj2的name输出的结果都改变了呢？这是因为在**js中引用类型的值保存在堆中的**。如果一个变量向另一个变量赋值**引用类型**的值，同样会在变量对象上创建一个新值，然后把该值复制到为新变量分配的位置上，但与基础类型不同的是，这个值是一个指针，这个指针指向了**堆**中的同一个对象，因此在修改其中任何一个对象都是在对同一个对象修改。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91e154e72d5140748fde5c0d24afbe72~tplv-k3u1fbpfcp-zoom-1.image)

### 3. js中传递参数的方式是怎么样的？

（1）先记结论：在js中，**所有函数的参数都是按值传递的**，也就是说把函数外部的值复制给函数内部使用，就像把值从一个变量复制到另一个变量里一样。这就意味着，不管是基本类型值的传递还是引用类型值的传递都如同上述所说的复制过程是一样的。

（2）再看道题目加强理解：

```JavaScript
// 基本类型的传递
function addTen(num) {
   num += 10
   return num
}
var count = 20
var result = addTen(count)
alert(count) //20
alert(result) //30

// 引用类型的传递
function setName(obj) {
    obj.name = "小猪皮皮呆"
}
var person = {}
setName(person)
console.log(person.name) // 小猪皮皮呆
```

在这里有些同学可能会将引用类型传递参数的方式搞错，会发出疑问：访问变量有按值和按引用两种方式，为什么传递参数只有按值传递？

对于上例的基础类型的值的传递可以很容易的理解，但是引用类型的传递在局部中的修改会在全局中反应出来，会有同学**误以为**引用类型的传递是按参数传递的。但其实真正的过程是这样的：

-   创建了一个对象，保存倒了person变量中
-   调用setName函数，person变量传递到setName中
-   person的值复制给了obj，复制的是一个指针，指向了堆中的一个对象
-   修改了obj
-   person中也体现出来了

从上述的过程中，可以看出来，person这个变量是按值传递的。我们再看个例子来说明这个问题

```JavaScript
function setName(obj){
    obj.name = "小猪皮皮呆"
    obj = new Object()
    obj.name = "三元大神"
}
var person = {}
setName(person)
alert(person.name) // 小猪皮皮呆
复制代码
```

如果是按引用传递，显示的值应该是“三元大神”,但js中的引用类型的传递也是按值传递的，所以打印出来的是“小猪皮皮呆”。

### 3. 如何判断各种数据类型

（1）为什么要判断？

在js中变量是松散类型的，所谓松散类型就是可以保存任何类型的数据。

（2）判断方法：

- typeof检测

```JavaScript
typeof undefined === "undefined" // true
typeof true === "boolean" // true
typeof 42 === "number" // true
typeof "42" === "string" //true
typeof {...} === "object" //true
```

- null检测，因为 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。
```JavaScript
var a = null
(!a && typeof a === "object") // true
```

- 引用类型的检测

```JavaScript
// 1. function检测
typeof function a() {...} === "function" //true

// 2. Array类型检测
// 2.1 根据原型链的两种方法，但是原型链可能会修改，所以有时候不靠谱
arr instanceof Array === true
arr.proto.constructor === Array
// 2.2 靠谱的方法
Object.prototype.toString.apply(arr) === “[object Array]”
// 2.3 官方提供方法，可靠可行，简单 
Array.isArray(arr) === true
```


### 4. 讲一讲undefined和null的区别
（1）null：

-   null 指空值，指曾经赋过值，但是当前没有值
-   null 是一个特殊关键字，不是标识符，不能**当作变量来使用**和**赋值**

（2）undefined

- 未初始化的值默认值是undefined
- undefined 指没有值，指从未赋过值
- undifined 是一个标识符，可以当作变量来使用和赋值

```JavaScript
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

### 5. 0.1+0.2为什么不等于0.3？

（1）原因：0.1和0.2在转换成二进制后会无限循环，由于标准位数的限制后面多余的位数会被截掉，此时就已经出现了精度的损失，相加后因浮点数小数位的限制而截断的二进制数字在转换为十进制就会变成0.30000000000000004。

（2）解决办法：

```javaScript
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



### 7. 包装类的一些知识

字符串是基本类型，不是对象，为什么会有调用方法这种操作？下面代码过程中发生了什么？

```javaScript
var S1 = "some test"
var s2 = s1.substring(2)
```
- 创建String类型的一个实例
- 在实例上调用了指定的方法
- 销毁这个实例

### 8. js的类型转换

**（1）[] == ![]结果是什么？为什么？**

- == 中，左右两边都需要转换为数字然后进行比较。
- []转换为数字为0。
- ![] 首先是转换为布尔值，由于[]作为一个引用类型转换为布尔值为true,
- 因此![]为false，进而在转换成数字，变为0。
- 0 == 0 ， 结果为true

```javaScript
!!null // false
!!'' // false
!!undefined // false
!!0 // false
!!NaN // false

!!1 //true
!!{} // true
!![] // true
```

**（2）== 和 ===有什么区别？**
- ===叫做严格相等，是指：左右两边不仅值要相等，类型也要相等，例如'1'===1的结果是false，因为一边是string，另一边是number。
- ==不像===那样严格，对于一般情况，只要值相等，就返回true，但==还涉及一些类型转换，它的转换规则如下：
    -   两边的类型是否相同，相同的话就比较值的大小，例如1==2，返回false
    -   判断的是否是null和undefined，是的话就返回true
    -   判断的类型是否是String和Number，是的话，把String类型转换成Number，再进行比较
    -   判断其中一方是否是Boolean，是的话就把Boolean转换成Number，再进行比较
    -   如果其中一方为Object，且另一方为String、Number或者Symbol，会将Object转换成字符串，再进行比较
    
```javaScript
console.log({a: 1} == true);//false 
console.log({a: 1} == "[object Object]");//true

100 == '100' // true
0 == '' // true
0 == false // true
false == '' // true

null == undefined // true
if (obj == null) {
    ...
}
// 相当于
if (obj === null || obj === undefined) {
    ...
}
```
**（3）字符串拼接**
```javaScript
const a = 100 + 10 // 110
const b = 100 + '10' // '110'
const c = true + '10' // 'true10'
```

## js的垃圾回收机制

> 参考另一篇文章[js的垃圾回收机制](https://juejin.cn/post/6962860870791593998)

**（1）调用栈中的垃圾回收机制**

js中栈中的数据回收依靠ESP（记录当前执行状态的指针）的下移来消除栈中保存的的执行上下文。

**（2）堆中的垃圾回收机制**

在v8中，堆分为**新生代**和**老生代**两个区域。

-   新生代存放的是生存时间短的对象，内存在1~8M之间，**使用js中的副垃圾回收器**。
-   老生代中存放着生成时间久的对象，内存容量较大，**使用js中的主垃圾回收器**。

工作流程如下：

-   标记空间中活动对象和非活动对象。所谓活动对象就是还在使用的对象，非活动对象就是可以进行垃圾回收的对象。
-   回收非活动对象所占据的内存。其实就是在所有的标记完成之后，统一清理内存中所有被标记为可回收的对象。
-   内存整理。一般来说，频繁回收对象后，内存中就会存在大量不连续空间，我们把这些不连续的内存空间称为内存碎片。当内存中出现了大量的内存碎片之后，如果需要分配较大连续内存的时候，就有可能出现内存不足的情况。所以最后一步需要整理这些内存碎片，但这步其实是可选的，因为有的垃圾回收器不会产生内存碎片，比如副垃圾回收器。

注意：

上面已经了解了js的垃圾回收机制，不过由于 JavaScript 是运行在单线程之上的，一旦执行垃圾回收算法，都需要将正在执行的 JavaScript 脚本暂停下来，待垃圾回收完毕后再恢复脚本执行。我们把这种行为叫做**全停顿**。

- 新生代的内存较小，回收较快，停顿的影响不大。
- 老生代的内存较大，占用线程的时间较长，为了降低老生代造成的卡顿现象，使用了**增量标记算法**。将一个完整的垃圾回收拆分成一个个小的垃圾回收，减小了卡顿的现象。

## js中的数组

### 1. 数组的检测方式有哪些？

```JavaScript
// 根据原型链的两种方法，但是原型链可能会修改，所以有时候不靠谱
arr instanceof Array === true
arr.__proto__.constructor === Array
// 靠谱的方法
Object.prototype.toString.apply(arr) === “[object Array]”
// 官方提供方法，可靠可行，简单 
Array.isArray(arr) === true
```
**（1）通过原型的方式进行检测详解**

看看Array的原型上有些啥？

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/805639aae73b42bcb5503f118460b657~tplv-k3u1fbpfcp-watermark.image)
可以看到Array的原型上定义了很多的方法，我们会在后面了解这些方法的作用和实现方法。

我们回到正题，我们如何通过原型判断数组。Array的实例的__proto__属性指向Array的原型，这样说可能不太具体，因为涉及到了原型的相关知识。我们直接从下图可以看出arr的__proto__属性和上面看到的Array的原型是一样的内容。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29dbe226f2b8465a8adc9f9f6d90c6c7~tplv-k3u1fbpfcp-watermark.image)

而`Array`的原型的`constructor`属性指向`Array`构造函数，而`Array`的原型的`constructor`指向`Array`构造函数，所以`arr.__proto__.constructor`指向`Array`构造函数，因此可以进行判断。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05af7341776f4a9fb2973bf8fb05225e~tplv-k3u1fbpfcp-watermark.image)

###  2. Array的栈和队列方法

栈和队列的相关API在算法题里经常使用到，相关理论也和数据解构中的栈和队列对应，在此不多赘述。

-   push()方法，接受任意数量的参数，把他们逐个添加到数组的末尾，并返回修改后的数组长度
-   pop()方法，移除数组末尾最后一项，减少数组的length值，返回移除的项
-   shift()方法，移除数组中的第一项，同时将数组的长度减一，返回移除项
-   unshift()方法，再数组的前端依次添加参数值，返回新数组的长度

### 3. Array的转换方法

- toLocaleString()方法，输出数组的每个元素以逗号进行连接。
- toString()方法，同toLocaleString方法。
- value()方法，输出数组本身。
- join()方法，将数组的每个元素用传入进的参数进行连接。如果传空相当于将数组转换成字符串。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bfb934761b849e7bd97a6f0d456889b~tplv-k3u1fbpfcp-watermark.image)

### 4. Array的重排序方法

说到反转数组和排序，也是两道非常经典的编程题。排序更是如此，常见的几种排序方法，要在后面进行熟练的编程。

-   reverse()方法，反转数组的顺序，注意改方法会改变原数组
-   sort()方法，按升序排列数组项——最小值位于最前面，较大值位于最后面。sort()函数可以接受一个比较函数作为参数，以便我们决定哪个数在前面
    -   如果第一个参数位于第二个之前，返回负数
    -   如果两个参数相等，返回0
    -   如果第一个参数位于第二个参数后面，返回正数
    
### 5. Array的操作方法

-  concat()方法，用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。


    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea299aa27ad0462e90dc5f7e0678ed77~tplv-k3u1fbpfcp-watermark.image)
-  slice()方法，用于提取目标数组的一部分，返回一个新数组，原数组不变。
    -   它的第一个参数为起始位置（从0开始，会包括在返回的新数组之中）
    -   第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员
    -   没有参数，实际上等于返回一个原数组的拷贝。
    
    ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43c3f8707aed4bf09260f4b5add1b58f~tplv-k3u1fbpfcp-watermark.image)
    
-  splice()方法，用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。注意，该方法会改变原数组。
    -   第一个参数是删除的起始位置（从0开始）
    -   第二个参数是被删除的元素个数。
    -   如果后面还有更多的参数，则表示这些就是要被插入数组的新元素
    
    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15d2a00685ed4e87ba094b35913590e3~tplv-k3u1fbpfcp-watermark.image)
    
### 6. Array的位置方法
-  indexOf()方法，返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1
-  lastIndexOf()方法，返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。

### 7. Array的迭代方法

**（1）map()方法**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f5ad4789cbc4b3abf3432589b258f0b~tplv-k3u1fbpfcp-watermark.image)

手动实现map：

```javaScript
Array.prototype.map = function(callback, thisArg) {
  const res = []

  const O = Object(this);
  const len = O.length >>> 0;

  for (let i = 0; i < len; i++) {
    if (i in O) {
      res.push(callback.call(thisArg, O[i], i, this))
    }

  }
  return res;
}

const arr = [1, 2, 3, 4]
const arr1 = arr.map((item) => {
  return item + 1
})
console.log(arr1) // [ 2, 3, 4, 5 ]
```


**（2）forEach()方法**


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7530df6bf5cc41b3921091187dab06af~tplv-k3u1fbpfcp-watermark.image)

手动实现forEach：

```javaScript
// 和map类似，只是没有了返回值
Array.prototype.forEach = function (callback, thisArg) {
  const O = Object(this)
  const len = O.length >>> 0

  for (let i = 0; i < len; i++) {
    if (i in O) {
      callback.call(thisArg, O[i], i, this);
    }
  }
}
```

**（3）fliter()方法**

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a021e197362427ea0abd1fb6a9f9f4d~tplv-k3u1fbpfcp-watermark.image)

```javaScript
Array.prototype.filter = function (callback, thisArg) {
  const res = []
  const O = Object(this)
  const len = O.length >>> 0

  for (let i = 0; i < len; i++) {
    if (i in O) {
       if (callback.call(thisArg, O[i], i, this)) {
         res.push(O[i])
       }
    }
  }

  return res;
}
```

**（4）some()方法和every()方法**

- some方法是只要一个成员的返回值是true，则整个some方法的返回值就是true，否则返回false。
- every方法是所有成员的返回值都是true，整个every方法才返回true，否则返回false。


### 8. 归并方法

**（1）reduce()方法**

从左向右，依次处理数组的每个成员，最终累计为一个值。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4529100b8271460a9815baddb24ac3e3~tplv-k3u1fbpfcp-watermark.image)

手写reduce：
```javaScript
Array.prototype.reduce = function (callback, initialValue) {
  const O = Object(this)
  const len = O.length >>> 0
  if (len == 0) {
    return false;
  }
  let accumulator = initialValue ? initialValue : O[0]

  for (let i = 1; i < len; i++) {
    if (i in O) {
      accumulator = callback.call(undefined, accumulator, O[i], i, this)
    }
  }

  return accumulator
}

const arr = [1, 2, 3, 4]
const result = arr.reduce((accumulator, item) => {
  return accumulator + item;
})
console.log(result) // 10
```

**（2）reduceRight()方法**

从右向左，依次处理数组的每个成员，最终累计为一个值。

### 9. 数组去重

```javaScript
// 数组去重

// let arr = [1, 2, 2, 1, 3, 4, 5, 6, 4, 2]

function arrDelRepeat1(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
      }
    }
  }
  return arr;
}

function arrDelRepeat2(arr) {
  return [...new Set(arr)]
}

function arrDelRepeat3(arr) {
  let myArr = []
  for (let i = 0; i < arr.length; i++) {
    if (myArr.indexOf(arr[i]) == -1) {
      myArr.push(arr[i]);
    }
  }
  return myArr;
}
```

### 10. 数组扁平化

```javaScript
// 数组扁平化
let arr = [1, [2, [3, [4, 5]]], 6];

// es6语法
function flat1(arr) {
  return arr.flat(Infinity);
}

// JSON + 正则
function flat2(arr) {
  let str = JSON.stringify(arr);
  str = str.replace(/(\[|\])/g, '');
  str = '[' + str + ']';
  return JSON.parse(str);
}

// 递归
function flat3(arr) {
  let result = []
  let fn = function (ary) {
    for (let i = 0; i < ary.length; i++) {
      let item = ary[i];
      if (Array.isArray(ary[i])) {
        fn(item)
      } else {
        result.push(item)
      }
    }
  }
  fn(arr)
  return result;
}

// reduce迭代
function flat4(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat4(cur) : cur);
  }, [])
}

console.log(flat4(arr));
```

## js中的函数

### 1. argument是数组吗？如何转换成数组？

在js中，函数的参数arguments，DOM查询返回的元素列表，他们并非严格意义上的数组，只是用起来像数组，但本质是是对象。有时候需要将类数组转换成真正的数组，有如下几种方法：

```JavaScript
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

### 2. new一个函数发生了什么？
-   创造一个全新的对象
-   这个对象会被执行 [[Prototype]] 连接，将这个新对象的 [[Prototype]] 链接到这个构造函数.prototype 所指向的对象
-   让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
-   判断函数的返回值类型，如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象

手动实现一个new：
```javaScript
function myNew(fn, args) {
  if (typeof fn !== 'function') {
    return false;
  }
  // 创建一个新对象
  let newObject = Object.create(fn.prototype);
  // 执行构造函数代码，为对象添加属性
  let result = fn.apply(newObject, ...args);
  // 判断返回的是函数对象还是新创建的newObject
  let flag = result && (typeof result === "object" || typeof result === "function");
  return flag ? result : newObject;
}
```

### 3. 说一说作用域和作用域链
**（1）什么是全局上下文？**

执行上下文的创建分为三种情况：

-   执行全局代码，编译全局代码，创建全局上下文，且只有一个
-   调用函数，函数体内代码会被编译，创建函数上下文，函数执行完毕后该函数上下文会被销毁
-   使用eval函数，很少遇到，在此不讨论。

**(2) 变量提升是怎么回事？**

而在js中，上下文的管理则由**调用栈**负责，js执行过程中三种内存空间之一的**栈空间**。我们来看看它是如何负责的：

```javaScript
showName() // 小猪 
console.log(myName) // undefiend 
var myName = "小猪皮皮呆" 
function showName() { 
    console.log("小猪") 
}
```

1.  js编译全局代码，创建全局上下文，将其压入栈底
1.  全局代码执行console.log，打印出undefined
1.  为myName变量赋值“小猪皮皮呆”
1.  调用showName函数，js对其进行编译，创建showName函数的执行上下文
1.  showName函数执行完毕，showName函数的执行上下文弹出栈并销毁
1.  全局代码执行完毕，弹出栈，代码运行结束

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/418cc94b087a4a5bbacbfa74257cef45~tplv-k3u1fbpfcp-zoom-1.image)

看到这里我们便可以回答之前的问题了。所谓的变量提升就是js代码执行的过程中，会先将代码进行编译，编译的过程中变量的声明和函数的声明会被放入调用栈中形成上下文调用栈，剩余下的会生成执行代码。这就造成了变量提升的现象。

**（3）下面这道题的输出是什么？**
```javaScript
var name = "小猪皮皮呆"
function showName() {
    console.log(name);
    if (0) {
        var name = "小猪"
    }
    console.log(name)
}
showName()
// undefined
// undefiend
```
这道题目和作用域和变量提升有关，在上面我们已经了解了变量提升，我们由这题引出作用域的相关问题。

js中存在三种作用域，ES6之前只两种作用域：

-   全局作用域
-   函数作用域
-   块级作用域（ES6新增）

刚开始时，会生成全局上下文，也就是全局作用域，内部有变量`name = "小猪皮皮呆"`。后面执行到函数`showName`时会形成showName函数的执行上下文，也就是showName的作用域，在showName的作用域中因为使用的是var声明的name，没有形成块级作用域，所以会出现变量提升的情况，所以第一个console没有打印出“小猪皮皮呆”，第二个打印之前因为if语句里面的语句没有执行，所以打印出的依然是undefined。

**（4）下面这道题的输出是什么？**

```javaScript
function bar() {
    console.log(name)
}

function foo() {
    var name = "小猪皮皮呆"
    bar()
}

var name = "小猪"

foo() // 小猪
```

这段代码很容易让人觉得会打印结果会是“小猪皮皮呆”，这和我们接下来要提到的另一个概念**作用域链**有关

相信前面的执行上下文部分同学们已经理解了，接下来我们会结合执行上下文来看**作用域链**：

-   每个执行上下文的变量环境中，都包含了一个外部引用，用来指向外部的执行上下文，我们把这个外部引用称为 outer。
-   当一段代码使用了一个变量的时候，js引擎会在当前执行上下文查找该变量，如果没有找到，会继续在outer执行的执行上下文中去寻找。这样一级一级的查找就形成了**作用域链**。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a9b958fa681432587371bcbb4424141~tplv-k3u1fbpfcp-zoom-1.image)

-   **作用域链的生成由代码决定，和调用无关**。所以一开始代码bar编译好了后outer就指向全局上下文，因此打印的不是foo()内部的“小猪皮皮呆”

**（5）说说块级作用域形成的原理**

在各类执行上下文中会分为环境变量和词法环境，环境变量存放一些var声明的变量，而词法环境存放let等声明的块级作用域的变量，相当于在词法环境内部形成了一个新的调用栈，在查询变量时会先查询词法环境，再去查询变量环境。

我们结合执行上下文看看这个问题的详细流程：

```javaScript
function foo() {
    var a = 1
    let b = 2
    {
        let b = 3
        var c = 4
        let d = 5
        console.log(a)
        console.log(b)
    }
    console.log(b)
    console.log(c)
    console.log(d)
}
foo()
```

-   第一步是编译并创建执行上下文

    -   函数内部通过 var 声明的变量，在编译阶段全都被存放到变量环境里面了。
    -   通过 let 声明的变量，在编译阶段会被存放到词法环境（Lexical Environment）中。
    -   在函数的作用域块内部，通过 let 声明的变量并没有被存放到词法环境中。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/09dc2e08b2424dc8af0dcfab296fd4b3~tplv-k3u1fbpfcp-zoom-1.image)

-   执行到代码块

    -   代码块内部的let声明存放在了一个新的区域中

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aaf0039a506a43f0abb0e9835b385663~tplv-k3u1fbpfcp-zoom-1.image)

-   执行console.log(a)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc145d39ee204651a16ea911de6e47c1~tplv-k3u1fbpfcp-zoom-1.image)

-   当作用域块执行结束之后，其内部定义的变量就会从词法环境的栈顶弹出

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/408ce43951d5434e99a3d417eadbe49f~tplv-k3u1fbpfcp-zoom-1.image)

上述形成的新的作用域链便是js对变量提升和块级作用域同时支持的实现。

**（6）如何解决下面的循环输出问题？**

```javaScript
for(var i = 1; i <= 5; i ++){
  setTimeout(function timer(){
    console.log(i)
  }, 0)
}
```

-   原因：setTimeout是宏任务，等同步任务执行完毕后i为6，所以会输出五个6
-   解决办法：使用let，形成块级作用域

```javaScript
for(let i = 1; i <= 5; i ++){
  setTimeout(function timer(){
    console.log(i)
  }, 0)
}
```


### 4. 说一说闭包

**（1）什么是闭包？**

ES5中存在两个作用域：全局作用域、函数作用域，函数作用域会在函数运行结束后自动销毁 作用域链：查找一个变量时会从自身的作用域开始沿着作用域链一直向上查找 闭包：利用了作用域，可以将函数内部的作用域的变量访问到

**（2）闭包如何产生**

-   返回函数 （常见）

```javaScript
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

-   函数当作参数传递 ：当作参数的函数可以访问到函数主体的内部作用域

```javaScript
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

-   在定时器、事件监听、Ajax请求、跨窗口通信、Web Workers或者任何异步中，只要使用了回调函数，其实就是上面那种情况，将函数当作参数，也就是在使用闭包。

```javaScript
// 定时器
setTimeout(function timeHandler(){
  console.log('111');
}, 100)

// 事件监听
$('#app').click(function(){
  console.log('DOM Listener');
})
```

-   立即执行函数：

```javaScript
var a = 2;
(function IIFE(){
  // 输出2
  console.log(a);
})();
```

IIFE(立即执行函数表达式)创建闭包, 保存了全局作用域window和当前函数的作用域，因此可以全局的变量。

```javaScript
for(var i = 1; i <= 5; i ++){
  (function(j){
      setTimeout(function timer(){
        console.log(j)
      }, 0)
  })(i)
}
```

**（3）闭包的应用场景**

-   柯里化：

函数柯里化、前端经典面试题解密-add(1)(2)(3)(4) == 10到底是个啥？

```javaScript
// 函数柯里化

// 参数固定
function add(fn) {
  let args = []
  return function _c(...newArgs) {
    if (args.length < fn.length - 1) {
      args = [...args, ...newArgs];
      return _c;
    } else {
      args = [...args, ...newArgs];
      return fn.call(this, ...args)
    }
  }
}
function x (a, b, c, d, e) {
  return a + b + c + d + e;
}
let func = add(x)
console.log(func(1)(2)(3)(4)(5)) // 15

// 参数不固定
function add() {
  let args = []
  return function _c(...newArgs) {
    if (newArgs.length) {
      args = [...args, ...newArgs]
      return _c
    } else {
      return args.reduce((sum, item) => sum + item);
    }
  }
}
let func = add()
func(1)(2)(3)(4, 5)() // 15
```

**（4）闭包的缺点**

全局使用闭包会造成内存泄漏，所以尽量少用

**（5）this的指向问题**

this：谁调用，指向谁

-   默认绑定：在全局执行上下文中，this的指向全局对象。(在浏览器中，this引用 Window 对象)。
-   隐式绑定：在函数执行上下文中，this 的值取决于该函数是如何被调用的。如果它被一个引用对象调用，那么this会被设置成那个对象，否则this的值被设置为全局对象或者undefined（在严格模式下）
-   显示绑定：apply、call、bind
-   箭头函数：只取决于函数的调用方式，在哪里被调用，调用位置。由外层的（函数或全局）作用域来决定。

ps：虽然这里bar是obj.foo的引用，但此时他引用的是foo本身，调用的环境是全局

```javaScript
function foo() {
  console.log(this.a)
}

var obj = {
  a: 2,
  foo: foo
}

var bar = obj.foo
var a = 1
bar() // 1
```

与上面一题原理类似，总结起来就是隐式绑定取决于函数是如何调用的。

```javaScript
function foo() {
  console.log(this.a)
}

function doFoo(fn) {
  fn();
}

var obj = {
  a: 2,
  foo: foo
}

var a = 1

doFoo(obj.foo) // 1

function doFoo(fn) {
  fn();
}

var obj = {
  a: 2,
  foo: function () {
    console.log(this.a)
  }
}

var a = 1

doFoo(obj.foo) // 1
```

再来看看箭头函数，**由外层的（函数或全局）作用域来决定**。

```javaScript
var obj = {
  a: 2,
  foo: () => {
    console.log(this.a)
  }
}

var a = 1

obj.foo() // 1
```
**箭头函数的this由外层的（函数或全局）作用域来决定!**
```javaScript
var obj = {
  a: 2,
  foo: () => {
    console.log(this.a)
  }
}

function doFoo(fn) {
  this.a = 3
  fn()
}

doFoo(obj.foo) // 3
```




**（6）bind、call、apply**

call、apply、bind用途：都是函数的方法、改变this的指向

-   call和apply的区别：call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组。
-   bind与apply和call的区别在bind不会立即执行函数而是返回函数

**手动实现call：**

```javaScript
Function.prototype.myCall = function(context) {
  context = context || window;
  let fn = Symbol();
  context[fn] = this;

  let args = [...arguments]
  console.log(args)
  args.shift()
  let res = context[fn](...args);

  delete context[fn];
  return res;
}

let Obj = {
  age: 18
}

function getAge() {
  console.log(this.age)
}

getAge.myCall(Obj) // 18
```

**手动实现apply：**

```javaScript
Function.prototype.apply = function(context, args) {
  context = context || window;
  context.fn = this;

  let result;
  if (args) {
    result = context.fn(...args)
  } else {
    result = context.fn()
  }
  
  delete context.fn;
  return result
}


let Obj = {
  age: 18
}

function getAge() {
  console.log(this.age)
}

getAge.apply(Obj)
```

**手动实现bind：**

```javaScript
Function.prototype.bind = function(context) {
  let self = this
  let args = Array.prototype.slice.call(arguments, 1)
  context = context || window

  let func = function() {
    let funArgs = Array.prototype.slice.call(arguments)
    // 根据func的不同使用方法，绑定的this应该不同
    // 如果this是self的实例，则说明对func使用了new进行实例化，此时调用的环境就是this
    // 否则只是正常调用，绑定context即可
    return self.call(this instanceof self ? this : context, ...args, ...funArgs)
  }

  func.prototype = Object.create(this.prototype);
  return func
}
```

**（6）箭头函数**

箭头函数使用被称为 “胖箭头” 的操作 => 定义，箭头函数不应用普通函数 this 绑定的四种规则，而是根据外层（函数或全局）的作用域来决定 this，且箭头函数的绑定无法被修改（new 也不行）。

-   箭头函数常用于回调函数中，包括事件处理器或定时器
-   箭头函数的this对象就是定义时所在的对象，而不是使用时所在的对象
-   箭头函数没有自己的this，当然就不能用call、apply、bind来改变this指向
-   没有原型、没有 this、没有 super，没有 arguments，没有 new.target
-   不能通过 new 关键字调用。new一个函数时，会将**返回的对象的原型**指向该**函数的原型**，而箭头函数没有原型，所以会报错。
    
### 5. 说出下面段代码的输出

```javaScript
function Foo() {
  getName = function () { alert(1); };
  return this;
}
Foo.getName = function () { alert(2); };
Foo.prototype.getName = function () { alert(3); };
var getName = function () { alert(4); };
function getName() { alert(5); }


// 请写出以下输出结果：
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
```
第一次做可能比较蒙，让我们来分析一下。

**（1）首先第一个`Foo.getName()`输出的是2**


```javaScript
function Foo() {
  getName = function () { alert(1); };
  return this;
}

Foo.getName = function () { alert(2); };

Foo.getName(); // 所以Foo.getName()调用的结果输出的是2
```

- 在函数内部添加的属性，在执行new的过程中，会添加到使用该函数属性作为构造函数创建的对象身上
- 在构造函数外部添加的属性，只作为该函数的属性，即对象属性，不会添加到对象身上

**（2）第二个`getName()`输出的是4**

这个和我们上面提到的变量提升有关

```javaScript
var getName = function () { alert(4); };
function getName() { alert(5); }

// 相当于
var getName = undefined;
function getName() { alert(5); }
getName = function () { alert(4); };
// 所以最后输出的是4
getName();
```

**（3）第三个`Foo().getName()`和第四个`getName()`原理一样**

- js的执行上下文分为两种：全局和函数的，函数执行完毕后，该函数的执行上下文会销毁
- `Foo()`函数执行的过程中内部的`getName`因为没有声明，会变量提升到全局，再赋值`function () { alert(4); }`
- `Foo()`函数执行完毕后返回了this，该this根据this的指向规则是指向全局的，此时执行`this.getName()`相当于在全局调用了`getName()`，而在上一个步骤的我们知道此时的全局中`getName()`输出的是4
- 执行第四条语句，执行的函数全局的`getName()`,输出的结果依然是4。

```javaScript
Foo().getName();
```

**（4)第五个`new Foo.getName()`**
在上面我们知道Foo.getName是一个函数，所以这里其实就是new一个函数，因为会执行函数内部的语句，所以输出2.如果该函数内部有一些this语句，那么这个会被作为一个新的对象的属性被返回

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/caae9278bfc24c5083c989c6c402b80c~tplv-k3u1fbpfcp-watermark.image)

**（5）最后一个和原型有关，不在赘述**

##  js的面向对象编程

### 1. 什么是原型？什么是原型链？

-   原型对象和构造函数

    -   js中每定义一个函数，会有一个自带的prototype指向函数的原型对象
        - Object.isPrototypeOf()可以判读某个对象是否是传入的参数的原型prototype（ES5之前只能进行这一的判断）
        - Object.getprototype()返回原型prototpe（ES5之前无法获取）
        
    -   函数经过new后，成为了构造函数会返回一个全新的实例对象，具有一个__proto__属性，指向构造函数的原型函数
        - Object.hasOwnProperty()可以检测一个属性是存在于实例中还是原型中
        - in操作符只要在对象的实例或者原型中查询到了对应的属性就会返回true
    -   而原型对象中都会有constructor属性，这个属性指向原函数。
    

    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3bfdda7dc0a4ed4ad01aeb1371739a6~tplv-k3u1fbpfcp-watermark.image)

-   说说原型链

    - JavaScript实例对象通过__proto__ 指向父类对象，直到指向Object对象为止，Object对象的__proto__指向null，这样就形成了一个原型指向的链条, 即原型链。
    - instanceof 确定原型和实例的关系
        ```JavaScript
        // person是Object、Child、Parent中任意一个类型的实例
        person instanceof Object // true
        person instanceof Child // true
        person instanceof Parent // true
        
        [] instanceof Array // true
        [] instanceof Object // true
        {} instanceof Object // true
        ```
    - isPrototypeOf 确定原型和实例的关系
        ```JavaScript
        // person是Object、Child、Parent中任意一个类型的实例
        Object.prototype.isPrototypeOf(person) //true
        Parent.prototype.isPrototypeOf(person) //true
        Child.prototype.isPrototypeOf(person) //true
        ```
    
    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d67c27648a744586a6e9de82d083d570~tplv-k3u1fbpfcp-watermark.image)
    
    
### 2 构造函数经历的阶段？

- 创建一个新对象
- 将构造函数的作用域赋给新对象，this也自然而然的指向了这个新对象
    - 构造函数使用了new，将this指向了新创建的对象。
    - 普通的函数调用，this会指向Global，即浏览器的window对象。
- 执行构造函数中的代码，给新对象添加属性
- 返回新对象

解释下面的输出：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b046092a7b8a4c66a69b965e7bd9ef3b~tplv-k3u1fbpfcp-watermark.image)

- 先定义了一个`Foo`函数
- 此时全局没有`name`，所以打印为""
- 执行了`new Foo()`，因为new一个函数会返回一个对象，所以对全局没有影响，`name`依旧是""
- 全局执行`Foo()`，this指向全局，所以全局的`this.name = "wk"`
- 打印`name`为`wk`

### 3 js如何创建对象？

- Object构造函数或对象字面量都可以用来创建单个对象
    ```JavaScript
    var person = {
       name:"小猪皮皮呆",
       age:20,
       job:"students",
       sayName:function(){
           alert(this.name)
       }
    };
    ```
    **缺点**：复用性太差。如果要创建多个对象会产生大量重复的代码，比如有100个人的信息要录入，就需要重复
    上列代码100次，并赋不同的信息值。

- 工厂模式：考虑在ECMAScript中无法创建类，开发人员发明了一种函数，用函数来封装以特定接口创建对象的细节。

    ```JavaScript
    function createPerson (name,age,job) {
       var o = new Object();
       o.name = name;
       o.age = age;
       o.job = job;
       o.sayName = function() {
           alert(this.name);
       };
       return o;
    }
    var person1 = createPerson("wk",20,"student");
    ```
    **缺点：** 工厂模式解决了创建多个相似对象的问题，却没有解决对象识别的问题（即判断一个对象的类型）
    
 - 构造函数模式：我们知道构造函数可以创建指定类型的对象。除了Object、Array这样的原生构造函数，我们还可以自己创建定义构造函数。如下：

    ```JavaScript
   function Person(name,age,job) {
       this.name = name;
       this.age = age;
       this.job = job;
       this.sayName = function() {
           alert(this.name);
       };
   }
   var person1 = Person("小猪皮皮呆", 20, "student");
   var person2 = Person("神三元", 18, "student");
   ```
   **缺点：** 每个方法都要在每个实例上重新创建一边，导致了不同作用域链和标识符解析，不同实例上的同名函
   数时不相等的。因为每通过构造函数new一个实例，构造函数中的代码就要执行一遍。对于字段属性来说，每个实例
   的字段本来就应该是独立的，当然没有问题；但是对于方法属性，我们是希望所有的实例是共享同一个的。
   
- 原型模式：所有的函数都有prototype（原型）属性,这个属性是一个指针，指向一个对象。这样就解决了构造函数模型带来的问题。

    ```javaScript
    function Person() {
    }
    Person.prototype.name = "小猪皮皮呆";
    Person.prototype.age = 20;
    Person.prototype.job = "student";
    Person.prototype.sayName = function(){
       alert(this.name);
    };
    
    var person1 = new Person();
    person1.sayName();//"小猪皮皮呆"
    
    var person2 = new Person();
    person2.sayName();//"小猪皮皮呆"
    
    alert(person1.sayName == person2.sayName);//true
    ```
    **缺点：** 原型模式最大的好处就是他的共享，而这也恰恰是他的缺点，有时一些数据我们并不想和其他的实例共享，比如每个人的名字都不一样，而在原型模式中所有实例的名字都会变成一样。
    
- 组合模式：组合使用构造函数模式和原型模式，公共属性写入原型，传入属性写入构造函数。

    ```javaScript
    function Person(name,age,job)
    {
        this.name = name;
        this.age = age;
        this.job = job;    
    }
    
    Person.prototype = {
       constructor:Person,
       sayName = function(){
           alert(this.name);
       }
    }
    ```

### 4. 对象的拷贝

**（1）浅拷贝**

浅拷贝对于非引用类型的值进行复制，对于引用类型的值复制地址（指向对象的指针）

```javaScript
// 浅拷贝
function shallowCopy(obj) {
  if (typeof obj !== 'object') {
    return false;
  }
  let newObj = Array.isArray(obj) ? [] : {}
  for (let i in obj) {
    // Obj.hasOwnProperty判断属性是实例上的还是原型上的
    if (obj.hasOwnProperty(i)) {
      newObj[i] = obj[i]
    }
  } 
}
```

**（2）深拷贝**

对于引用类型的值，不是简单的复制对象的地址，而是在堆中新建一个全新的对象并复制其中的每一项

- 使用JSON的方法

    ```javaScript
    function jsonCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    }
    ```
    **缺点：** 此方法无法复制函数和正则
    
 - 递归实现

    ```javaScript
    function jsonCopy(obj) {
      return JSON.parse(JSON.stringify(obj))
    }


    function deepCopy(target) {
      if (typeof target !== 'object' || obj == null) {
        return target
      }
      let cloneObj = Array.isArray(target) ? [] : {};
      for (let i in target) {
        if (target.hasOwnProperty(i)) {
          cloneObj[i] = deepCopy(target[i])
        }
      }
      return cloneObj;
    }
    ```
    这种实现简单的概括了深拷贝的原理，如果想进一步完善，移步我参考的博客：[如何写出一个惊艳面试官的深拷贝?](https://link.juejin.cn/?target=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000020255831 "https://segmentfault.com/a/1190000020255831")


### 5. js如何实现继承？

- 借助原型链

    ```JavaScript
    function Parent() {
      this.name = "wk";
    }
    Parent.prototype.getName = function() {
      console.log(this.name);
    }
    function Child(age) {
      this.age = age
    }
    Child.prototype = new Parent()
    Child.prototype.getAge = function() {
      console.log(this.age)
    }

    let child = new Child(18)
    child.getName() // wk
    child.getAge() // 18
    ```

    **优点：**
    
    - 父类方法可以复用
    
    **缺点：**
    
    - 父类的所有`引用属性`（info）会被所有子类共享，更改一个子类的引用属性，其他子类也会受影响
    
    - 子类型实例不能给父类型构造函数传参

- 借用构造函数：借助call()方法在Child1环境下调用了Parent1,Child1的每个实例都会有一个Parent的name属性副本。

    ```JavaScript
    function Parent(name, age) {
      this.name = name;
      this.age = age;
    }
    Parent.prototype.getName = function() {
      console.log(this.name);
    }
    function Child(name, age, job) {
      Parent.call(this, name, age)
      this.job = job;
    }
    let child = new Child('wk', 18, 'coder');
    child.getName() // TypeError: child.getName is not a function
    ```
    
    **优点：**
    
    - 可以在子类构造函数中向父类传参数
    - 父类的引用属性不会被共享
    
    **缺点：**
    
    - 子类不能访问父类原型上定义的方法



-   组合：融合了原型链和借用构造函数的优点，成为了js中最常用的继承模式。

    ```JavaScript
    function Parent(name, age) {
      this.name = name;
      this.age = age;
    }
    Parent.prototype.getName = function() {
      console.log(this.name);
    }
    function Child(name, age, job) {
      Parent.call(this, name, age)
      this.job = job;
    }
    Child.prototype = new Parent();
    
    let child = new Child('wk', 18, 'coder');
    child.getName(); // wk
    ```
    **优点：**
    - 父类的方法可以复用
    - 可以在Child构造函数中向Parent构造函数中传参
    - 父类构造函数中的引用属性不会被共享
    
    **缺点：**
    - 多执行了一次new Parent()内部的执行函数，造成了性能上的损失
    
- 原型式继承：对参数对象的一种浅复制

    ```javaScript
    function objectCopy(obj) {
      function Fun() { };
      Fun.prototype = obj;
      return new Fun()
    }
    
    let person = {
      name: "wk",
      age: 18,
      friends: ["jack", "tom", "rose"],
      sayName:function() {
        console.log(this.name);
      }
    }
    
    let person1 = objectCopy(person);
    person1.name = "wxb";
    person1.friends.push("lily");
    person1.sayName(); // wxb
    
    let person2 = objectCopy(person);
    person2.name = "gsr";
    person2.friends.push("kobe");
    person2.sayName(); // "gsr"
    
    console.log(person.name); //wk
    console.log(person.friends); // ["jack", "tom", "rose", "lily", "kobe"]
    ```
    
    **优点：**
    
    - 父类方法可复用
    
    **缺点：**
    
    - 父类的引用会被所有子类所共享
    - 子类实例不能向父类传参
    
- 寄生式继承：使用原型式继承对一个目标对象进行浅复制，增强这个浅复制的能力

    ```javaScript
    function objectCopy(obj) {
      function Fun() { };
      Fun.prototype = obj;
      return new Fun();
    }


    function createAnother(original) {
      let clone = objectCopy(original);
      clone.getName = function () {
        console.log(this.name);
      };
      return clone;
    }
    
    let person = {
      name: 'wk',
      friend: ["rose", "tom", "jack"],
    }
    
    let person1 = createAnother(person);
    person1.friends.push("lily");
    console.log(person1.friends);
    person1.getName(); // wk
    
    let person2 = createAnother(person);
    console.log(person2.friends); // ["rose", "tom", "jack", "lily"]
    ```

- 寄生组合继承（组合的优化）：寄生式组合继承可以算是引用类型继承的最佳模式

    ```JavaScript
    function Parent(name) {
      this.name = name;
      this.friends = ["rose", "lily", "tom"]
    }
    Parent.prototype.getName = function () {
      console.log(this.name);
    }
    
    function Child(name, age) {
      Parent.call(this, name);
      this.age = age;
    }
    Child.prototype = Object.create(Parent.prototype); // 效果类似寄生继承里的objectCopy
    Child.prototype.constructor = Child; // 改变了prototype就会改变constructor，再将其指回Child
    Child.prototype.getAge = function () {
      console.log(this.age);
    }
    
    let child1 = new Child("wk", 18);
    child1.getAge(); // 18
    child1.getName(); // wk
    child1.friends.push("jack");
    console.log(child1.friends); // ["rose", "lily", "tom", "jack"]
    
    let child2 = new Child("cy", 21);
    child2.getAge(); // 21
    child2.getName(); // cy
    console.log(child2.friends); // ["rose", "lily", "tom"]
    ```
    优点：
    - 只调用一次父类构造函数
    - Child可以向Parent传参
    - 父类方法可以复用
    - 父类的引用属性不会被共享
    
### 6. class

**（1）基础用法**
- constructor
- 属性
- 方法

```javaScript
class Student {
  constructor(name, number){
    this.name = name
    this.number = number
  }

  sayName() {
    console.log(this.name)
  }

  sayNumber() {
    console.log(this.number)
  }
}

let a = new Student("wk", 18)
a.sayName()
a.sayNumber()
```

**（2）继承**

- extends
- super
- 扩展或重写方法

```javaScript
// 父类
class People {
  constructor(name) {
    this.name = name
  }

  eat() {
    console.log(this.name + ' eat food')
  }
}

// 子类1
class Teacher extends People {
  constructor(name, id) {
    super(name)
    this.id = id
  }

  sayId() {
    console.log(this.id)
  }
}

// 子类2
class Coder extends People {
  constructor(name, company) {
    super(name)
    this.company = company
  }

  sayCompany() {
    console.log(this.company)
  }
}

let b = new Teacher("wk", 12)
b.eat()
b.sayId()

let c = new Coder("cy", "tencent")
c.eat()
c.sayCompany()
```

**（3）class原理**

class是语法糖，本质还是构造函数，属性会放在构造函数体内，而方法会写在函数的原型里
    
### 7. 看下列代码说输出

```javaScript
var A = function() {};
A.prototype.n = 1;
var b = new A();
A.prototype = {
  n: 2,
  m: 3
}
var c = new A();

console.log(b.n); // 1
console.log(b.m); // undefined

console.log(c.n); // 2
console.log(c.m); // 3
```

开始时，A的原型是{ n = 1 }，b在此时创建，`__proto__`属性指向{ n = 1 }，后面构造函数A的原型换成了{n:2, m :3}，但是不会影响b的`__proto__`的指向。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70da41d71e0c42c38a07e9c7b4966a9c~tplv-k3u1fbpfcp-watermark.image)







