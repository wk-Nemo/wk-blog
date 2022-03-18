---
title: 秋招保驾护航——js面试篇（下）
date: 2021-08-10 23:54:00
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


## js的异步编程

> 参考另一篇文章[JavaScript中的异步编程](https://juejin.cn/post/6961009179351842830#heading-0)

### 1. 为什么js是单线程的？

浏览器的渲染进程是多线程的，如下：

-   JS引擎线程
-   事件触发线程
-   定时触发器线程
-   异步http请求线程
-   GUI渲染线程

而js因为防止对DOM的操作产生混乱，因此它是单线程的。单线程就是一次只能只能一个任务，有多个任务的话需要一个个的执行，为了解决异步事件，js引擎产生了Event Loop机制。

### 2. 说一说js中的事件循环机制


**（1）同步任务和异步任务**

- **同步任务：** 是那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。

- **异步任务：** 是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果），该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有“堵塞”效应。

**（2）任务队列和事件循环**

JavaScript 运行时，除了一个正在运行的主线程，引擎还提供一个任务队列（task queue），里面是各种需要当前程序处理的异步任务。（实际上，根据异步任务的类型，存在多个任务队列。为了方便理解，这里假设只存在一个队列。）

- **主线程：** 首先，主线程会去执行所有的同步任务。等到同步任务全部执行完，就会去看任务队列里面的异步任务。如果满足条件，那么异步任务就重新进入主线程开始执行，这时它就变成同步任务了。等到执行完，下一个异步任务再进入主线程开始执行。一旦任务队列清空，程序就结束执行。

- **任务队列：** 异步任务的写法通常是回调函数。一旦异步任务重新进入主线程，就会执行对应的回调函数。如果一个异步任务没有回调函数，就不会进入任务队列，也就是说，不会重新进入主线程，因为没有用回调函数指定下一步的操作。

- **事件循环（Event Loop）：** JavaScript 引擎怎么知道异步任务有没有结果，能不能进入主线程呢？答案就是引擎在不停地检查，一遍又一遍，只要同步任务执行完了，引擎就会去检查那些挂起来的异步任务，是不是可以进入主线程了。这种循环检查的机制，就叫做事件循环（Event Loop）。

**事件循环机制示意图：**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db6f1d4b587f4c169cba4962921d0223~tplv-k3u1fbpfcp-watermark.image)



**（3）宏任务**

**我们可以将每次执行栈执行的代码当做是一个宏任务包括每次从事件队列中获取一个事件回调并放到执行栈中执行， 每一个宏任务会从头到尾执行完毕。**

常见宏任务：
-   主代码块
-   setTimeout
-   setInterval
-   Node：setImmediate()
-   浏览器：requestAnimationFrame()

**（4）微任务**

- 对每个宏任务而言，内部有一个都有一个微任务，引入微任务的初衷是为了解决异步回调的问题。

    -   将异步回调进行宏任务队列的入队操作：采用该方式，那么执行回调的时机应该是在前面所有的宏任务完成之后，倘若现在的任务队列非常长，那么回调迟迟得不到执行，造成应用卡顿。
    -   将异步回调放到当前宏任务的末尾：为了规避第一种方式中的这样的问题，V8 引入了第二种方式，这就是微任务的解决方式。在每一个宏任务中定义一个微任务队列，当该宏任务执行完成，会检查其中的微任务队列，如果为空则直接执行下一个宏任务，如果不为空，则依次执行微任务，执行完成才去执行下一个宏任务。

- 常见的微任务：
   -   Node：process.nextTick
   -   Promise.then()
   -   catch
   -   finally
   -   Object.observe
   -   MutationObserver



### 3. 说出下面这段代码的输出

```javaScript
console.log('start'); 
setTimeout(() => { 
  console.log('timeout'); 
}); 
Promise.resolve().then(() => { 
  console.log('resolve'); 
}); 
console.log('end'); 
// start
// end
// resolve
// timeout
```

-   先执行同步队列的任务，因此先打印start和end
-   setTimeout 作为一个宏任务放入任务队列
-   Promise.then作为一个为微任务放入到第一次代码执行的微任务队列
-   Promise.resolve()将Promise的状态变为已成功，即相当于本次宏任务执行完，检查微任务队列，发现一个Promise.then, 执行
-   接下来进入到下一个宏任务——setTimeout, 执行

再来一题

```javaScript
setTimeout(()=>{ 
  console.log('setTimeout1') 
  Promise.resolve().then(()=>{ 
    console.log('Promise2')     
  }) 
},0); 
Promise.resolve().then(()=>{ 
  console.log('Promise1')   
  setTimeout(()=>{ 
    console.log('setTimeout2') 
  },0) 
}); 
console.log('start'); 
 
// start 
// Promise1 
// setTimeout1 
// Promise2 
// setTimeout2 
```

### 4.异步编程的发展

**（1）回调地狱**

```JavaScript
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // ...
      });
    });
  });
});
```
这种代码常常被成为**回调地狱**， 有时候也叫**毁灭金字塔**。因为多个异步操作形成了**强耦合**，只要有一个操作需要修改，只要有一个操作需要修改，它的上层回调函数和下层回调函数就需要跟着修改，想要理解、更新或维护这样的代码十分的困难。

**（2）Promise**

```JavaScript
readFilePromise('1.json').then(data => {
    return readFilePromise('2.json')
}).then(data => {
    return readFilePromise('3.json')
}).then(data => {
    return readFilePromise('4.json')
});
```

ES6 中新增的 Promise 就很好了解决了`回调地狱`的问题，同时了合并了错误处理。

**（3）Generator**

- promise存在的问题
    Promise解决了回调函数的回调地狱的问题，但是Promise最大的问题是代码的冗余，原来的任务被Promise包装后，无论什么操作，一眼看过去都是许多then的堆积，原来的语义变得很不清楚。

- 协程： 传统的编程语言中早有异步编程的解决方案，其中一个叫做**协程**，意思为多个线程相互作用，完成异步任务。它的运行流程如下：

    -   协程A开始执行
    -   协程A执行到一般暂停，执行权交到协程B中
    -   一段时间后，协程B交还执行权
    -   协程A恢复执行

    **它最大的优点就是，代码写法很像同步操作。**

- Generator：Generator函数是协程在ES6中最大的实现，整个Generator函数就是一个封装的异步任务容器，异步操作需要用yield表明。Generator他能封装异步任务的原因如下：

    -   暂停和恢复执行
    -   函数体内外的数据交换
    -   错误处理机制

- 自动交回执行权：Generator函数是一个异步操作的容器，它的自动执行需要一种机制，当异步操作有了结果，这种机制需要自动交回执行权，有两种方法可以做到：

    -   回调函数：将异步操作包装成Thunk函数，在回调函数里面交回执行权
    -   Promise对象：将异步操作包装成Promise对象，使用then方法交回执行权
    
- 最终方案：利用协程完成 Generator 函数，用 co 库让代码依次执行完，同时以同步的方式书写，也让异步操作按顺序执行。（co模块使用的不是Thunk函数，而是通过Promise的then方法交回执行权）



**（4）Async**

ES2017标准引入了async函数，使得异步操作变得更加方便。**async函数就是Generator函数的语法糖**。

async函数就是将Generator函数的*换成async，将yield换成await。

```JavaScript
varasyncReadFile = async function () {
    var r1 = await readFileThunk('/etc/fstab');
    console.log(r1.toString());
    var r2 = await readFileThunk('/etc/shell');
    console.log(r2.toString());
}
```

async对于Generator的改进有三点：

-   内置执行器：不需要像Generator函数那样引入Thunk函数和co模块来解决自动执行的问题
-   适用性更广：Generator函数中yield后只能跟Thunk函数或者Promise对象，在async函数中可以是Promise对象和原始类型的值（数值、字符串和布尔值，但此之等同于同步操作）
-   返回值是Promise：比Generator函数的返回值是一个Iterator对象方便了很多

### 5. 防抖和节流

**手写防抖：**

```javaScript
function debounce(fn) {
  let t = null;
  return function () {
    if (t) {
      clearTimeout(t)
    }
    //注意此处改成箭头函数，因为直接使用函数argument会指向自身的实参列表
      //而不是return的函数的列表
      //apply绑定了this指向了return的函数，并将return的函数的参数列表传给了fun
    t = setTimeout(() => {
      fn.apply(this, arguments)
    }, 1000)
  }
}
```

**手写节流：**
```javaScript
function throttle(fn, delay) {
  var begin = 0;
  return function() {
    var cur = new Date().getTime()
    if ((cur - begin) > delay) {
      fn.apply(this, arguments)
      begin = cur
    }
  }
}
```

### 6. 手写Promise

```javaScript
class Promise {
  constructor(executor) {

    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];

    let resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        // 对应发布消息的动作，当状态改变时，通知所有的订阅者
        this.resolveCallbacks.forEach(fn => fn())
      }
    }

    let reject = reason => {
      if (this.state === 'pending') {
        this.state = 'reject';
        this.reason = reason;
        // 对应发布消息的动作，当状态改变时，通知所有的订阅者
        this.rejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    // onFulfilled返回一个普通的值，成功时直接等于 value => value
    onFulfilled = typeof onFulfilled ? onFulfilled : value => value
    // onRejected返回一个普通的值，失败时如果直接等于 value => value，
    // 则会跑到下一个then中的onFulfilled中，所以直接扔出一个错误reason => throw err
    onRejected = typeof onRejected ? onRejected : err => {throw err}
    let promise2 = new Promise((resolve, reject) => {
      

      // 对于同步事件，执行完后状态会马上改变
      // 所以执行传递进来的函数
      if (this.state === 'fulfilled') {
        // onFulfilled或onRejected不能同步被调用，必须异步调用。我们就用setTimeout解决异步问题
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            this.resolvedCallbacks(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
      // 对于异步事件，第一次宏任务执行完毕以后任然是pending状态
      // 需要执行一个类似订阅的动作，当状态发生改变时，再依次执行
      if (this.state === 'pending') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            this.resolvedCallbacks(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        }, 0)
      }
    })
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject){
  // 循环引用报错
  if(x === promise2){
    // reject报错
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  // 防止多次调用
  let called;
  // x不是null 且x是对象或者函数
  if (x != null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      // A+规定，声明then = x的then方法
      let then = x.then;
      // 如果then是函数，就默认是promise了
      if (typeof then === 'function') { 
        // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
        then.call(x, y => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          // resolve的结果依旧是promise 那就继续解析
          resolvePromise(promise2, y, resolve, reject);
        }, err => {
          // 成功和失败只能调用一个
          if (called) return;
          called = true;
          reject(err);// 失败了就失败了
        })
      } else {
        resolve(x); // 直接成功即可
      }
    } catch (e) {
      // 也属于失败
      if (called) return;
      called = true;
      // 取then出错了那就不要在继续执行了
      reject(e); 
    }
  } else {
    resolve(x);
  }
}

Promise.resolve = function(val) {
  return new Promise((resolve, reject) => {
    resolve(val)
  })
}

Promise.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}

Promise.all = function(promises) {
  let arr = []
  let i = 0
  function processData(index, data) {
    arr[index] = data;
    i++;
    if (i === arr.length) {
      resolve(arr)
    }
  }
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(data => {
        processData(i, data)
      }, reject)
    }
  })
}

console.log(5)
let p = new Promise(() => {
  setTimeout(() => {
    console.log(1)
  })
})
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })

setTimeout(() => {
  console.log(6)
})
console.log(4)
// 5
// 4
// 1
// 2
// 3
// 6
```

## js模块化管理

> 参考文章[前端模块化的十年征程](https://zhuanlan.zhihu.com/p/265632724)

### 1. 外部模块管理

**（1）npm之前**

在一开始没有npm的时候，如果我们需要在项目里使用某个外部模块，我们可能会去官网直接把文件下载下来放到项目中，同时在入口html中通过script标签引用它。

缺点：
-   使用上缺乏便利性
-   难以跟踪各个外部模块的来源
-   没有统一的版本管理机制

**（2）npm之后**

npm是一个Node自带的模块管理工具。从概念上看它由以下两个部分组成

-   NPM是一个远程的JavaScript代码仓库，所有的开发者都可以向这里提交可共享的模块，并给其他开发者下载和使用
-   NPM还包含一个命令行工具，开发者通过运行npm publish命令把自己写的模块发布到NPM仓库上去，通过运行npm install [模块名]，可以将别人的模块下载到自己项目根目录中一个叫node_modules的子目录下

### 2. 内部模块的管理

**（1）原生js组织阶段**

在最原始的时代，我们是通过将不同的JS文件在html中一一引入来组织模块代码，每个文件代表一个模块。将每个模块包裹在一个函数作用域里面执行，这样就可以最大程度地避免污染全局执行环境；通过执行匿名函数得到模块输出，可以暴露给下面的其他模块使用

存在的问题：
-   随着项目扩大，html文件中会包含大量script标签。
-   script标签的先后顺序并不能很好地契合模块间的依赖关系。在复杂应用中，模块的依赖关系通常树状或网状的，如a.js依赖于b.js和c.js，b.js依赖于b1.js和b2.js。相对复杂的依赖关系难以用script标签的先后顺序组织。
-   让代码的逻辑关系难以理解，也不便于维护，容易出现某个脚本加载时依赖的变量尚未加载而导致的错误。
-   因为对script标签顺序的要求而使用同步加载，但这却容易导致加载时页面卡死的问题
-   仍然会因为全局变量污染全局环境，导致命名冲突

我们需要针对这些问题提出解决方案，**而AMD和CMD就是为解决这些问题而提出的规范**

**（2）AMD&CMD**

> AMD和CMD只是一种设计规范，而不是一种实现。

AMD的理念可以用如下两个API概括，define和require
- **define**方法用于定义一个模块，它接收两个参数：
    -   第一个参数是一个数组，表示这个模块所依赖的其他模块
    -   第二个参数是一个方法，这个方法通过入参的方式将所依赖模块的输出依次取出，并在方法内使用，同时将返回值传递给依赖它的其他模块使用。

```JavaScript
// module0.js
define(['Module1', 'Module2'], function (module1, module2) {
    var result1 = module1.exec();
    var result2 = module2.exec();
    return {
      result1: result1,
      result2: result2
    }
});     
```

- **require**用于真正执行模块，通常AMD框架会以require方法作为入口，进行依赖关系分析并依次有序地进行加载

```JavaScript
// 入口文件
require(['math'], function (math) {
  math.sqrt(15)
});
```

CMD没有提供前置的依赖数组，而是接收一个factory函数，这个factory函数包括3个参数

- require: 一个方法标识符，调用它可以动态的获取一个依赖模块的输出
- exports: 一个对象，用于对其他模块提供输出接口，例如:exports.name = "xxx"
- module: 一个对象，存储了当前模块相关的一些属性和方法，其中module.exports属性等同于上面的exports

如下所示

```
// CMD
define(function (requie, exports, module) {
    //依赖就近书写
    var module1 = require('Module1');
    var result1 = module1.exec();
    module.exports = {
      result1: result1,
    }
});

// AMD
define(['Module1'], function (module1) {
    var result1 = module1.exec();
    return {
      result1: result1,
    }
}); 
```

**（3）CommonJS && ES6**

伴随着babel等编译工具和webpack等自动化工具的出现，AMD/CMD逐渐湮没在历史的浪潮当中，然后大家都习惯于用CommonJS和ES6的模块化方式编写代码了。

CommonJS是Node.js使用的模块化方式，而import/export则是ES6提出的模块化规范。它们的语法规则如下。

```JavaScript
// ES6
import { foo } from './foo'; // 输入
export const bar = 1;        // 输出

// CommonJS
const foo = require('./foo'); // 输入
module.exports = {            // 输出
    bar:1
}
```

但在最开始的时候，我们却不能在前端页面中使用它们，因为浏览器并不能理解这种语法。**但后来，编译工具babel的出现让这变成了可能**。babel是一个JavaScript 编译器，它让我们能够使用符合开发需求的编程风格去编写代码，然后通过babel的编译转化成对浏览器兼容良好的JavaScript。

**（4）webpack等打包工具**

一开始的CMD/AMD方案，可看作是“**在线编译**”模块的方案，也就是等到用户浏览web页面下载了js文件之后，才开始进行模块依赖分析，确定加载顺序和执行顺序。但这样却不可避免的带来了一些问题

-   在线组织模块的方式会延长前端页面的加载时间，影响用户体验。
-   加载过程中发出了海量的http请求，降低了页面性能。

webpack应运而生，它通过预先打包的方式，把前端项目里面的多个文件打包成单个文件或少数几个文件，这样的话就可以压缩首次页面访问时的http请求数量，从而提高性能。

**（5）gulp、grunt、webpack等自动化构建工具**

什么叫自动化构建工具呢？自动化构建工具在开发流程中给开发者最大的自由度和便捷性，不仅极大的提高了工作效率，同时在生产流程中能保证浏览器兼容性和良好性能的工具。而所有的功能已经由插件直接提供，所以被称作“自动化” 构建工具。

-   开发时使用丰富且方便的JS新特性，如用ES6，typescript编程，由自动化构建工具转化成浏览器兼容的ES5格式的JS代码
-   用Sass，less编写阅读性和扩展性良好的样式代码，由自动化构建工具转化成浏览器兼容的CSS代码
-   提供开发时SourceMap功能，也即提供生产代码(如ES5)到源代码(typescript)的映射，方便开发调试
-   提供生产时代码压缩功能，压缩js和css，删除注释，替换变量名(长变短)，减少代码加载体积
-   提供开发热重载功能(Hot Module Reload), 也即在编辑器保存代码的时候自动刷新浏览调试页面。
-   当然也还包括基本的模块打包功能
-   其他.....

## ES6新特性

### 1. let && const

`let`和`const`是ES6新增的变量声明命令

**共有的特性：**

- 没有变量提升：ES6之前的变量声明使用的是`var`，会出现变量提升这种情况。
- 不允许重复声明：在同一个作用域内不能重复声明同一个变量。
- 块级作用域：ES6之前只有全局作用域和函数作用域，导致很多场景不合理

**区别：**

- `const`声明的是一个常量，一旦声明就不能改变（注意：对于引用类型的是不能改变引用的地址）。

### 2. 解构赋值

解构赋值是指允许按照一定的模式从数组和对象中提取值，然后对变量进行赋值

**（1）数组的解构赋值**

```javaScript
let [a, [[b], c]] = [1, [[2], 3]]
console.log(a, b, c) // 1 2 3

let [x = 1, y = 2] = [3, undefined]
console.log(x, y) // 3 2
```

**（2）对象的解构赋值**

```javaScript
let { foo, bar } = { foo: 'aaa', bar: 'bbb'}
console.log(foo, bar) // aaa bbb

// 解构赋值是先找到同名属性，再赋值给对应的变量
let { foo: baz } = { foo: 'aaa', bar: 'bbb'}
console.log(baz) // aaa
```

**（3）函数的解构赋值**

```javaScript
let arr = [[1, 2], [3, 4], [5, 6]].map(([a, b]) => a + b)
console.log(arr) // [3, 7, 11]

function move({x = 0, y = 5} = {}) {
  return x + y
}
console.log(move({x: 1})) // 6
```

**（4）用途**

- 使用解构赋值遍历Map

    ```javaScript
    let map = new Map()
    map.set('first', 'hello')
    map.set('second', 'world')
    
    for (let [key, value] of map) {
      console.log(key + 'is' + value)
    }
    // first is hello
    // second is world
    ```
- 加载模块
    ```javaScript
   const {
       // ...
   } from './requirement'
   ```

### 3. 模板字符串

```javaScript
let value = '小猪皮皮呆'
console.log(`${value} is 帅小伙`) // 小猪皮皮呆 is 帅小伙
```

### 4. 箭头函数

普通函数通过`function`关键字定义，`this`无法结合词法作用域使用，在运行时绑定，只取决于函数的调用方式，在哪里被调用，调用位置。（取决于调用者，和是否独立运行）

箭头函数使用被称为 “胖箭头” 的操作` => `定义，箭头函数不应用普通函数` this `绑定的四种规则，而是根据外层（函数或全局）的作用域来决定` this`，且箭头函数的绑定无法被修改（`new`也不行）。

-   箭头函数常用于回调函数中，包括事件处理器或定时器
-   箭头函数和`var self = this`，都试图取代传统的` this `运行机制，将` this `的绑定拉回到词法作用域
-   没有原型、没有` this `、没有` super `，没有` arguments `，没有` new.target `
-   不能通过` new `关键字调用。`new`一个函数时，会将**返回的对象的原型**指向该**函数的原型**，而箭头函数没有原型，所以会报错。

### 5. 扩展运算符

（1）合并数组

```javaScript
let arr1 = [1, 2, 3]
let arr2 = [4, 5, 6]
console.log([...arr1, ...arr2]) // [ 1, 2, 3, 4, 5, 6 ]
```

（2）与解构赋值结合

```javaScript
const [first, ...rest] = [1, 2, 3, 4, 5]
console.log(first) // 1
console.log(rest) // [ 2, 3, 4, 5 ]
```

（3）将任何Iterator接口的对象换成真正的数组

```javaScript
function test() {
  console.log([...arguments]);
}
test(1, 2, 3, 4, 5) // [ 1, 2, 3, 4, 5 ]
```

### 6. Set && Map

（1）Set

Set类型是一种有序列表，其中含有一些相互独立的非重复值。

-   size属性：返回Set 集合的成员总数。
-   add(value) 方法：添加某个值，返回 Set 集合本身。
-   delete(value)方法：删除某个值，返回一个布尔值，表示删除是否成功。
-   has(value) 方法：返回一个布尔值，表示该值是否为Set的成员。
-   clear() 方法：清除所有成员，没有返回值。

注意：

> 1、Set 集合不会添加重复的成员。
> 2、Set 构造函数可以接受所有可迭代对象作为参数。

（2）Map
-   clear()方法：从映射中移除所有元素。
-   delete()方法：从映射中移除指定的元素。
-   forEach()方法：对映射中的每个元素执行指定操作。
-   get()方法：返回映射中的指定元素。
-   has()方法：如果映射包含指定元素，则返回 true。
-   set()方法：添加一个新建元素到映射。
-   toString()方法：返回映射的字符串表示形式。
-   valueOf()方法：返回指定对象的原始值。













