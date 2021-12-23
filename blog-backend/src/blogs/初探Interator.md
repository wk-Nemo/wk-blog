---
title: 初探Iterator
date: 2021-05-07 18:33:20
categories: JavaScript
---
今天在学习异步的过程中，发现Iterator和Generator函数息息相关，因此细读以下阮一峰老师的ES6中的《Iterator和for...of》

## 1. Iterator是什么

Iterator（遍历器）它是一种接口，为了各种不同的数据结构提供统一的访问机制。任何数据结构，只要部署了Iterator接口，就可以完成遍历操作。



### 1.1 作用

Iterator的作用主要有三点：

- 为各种数据结构提供一个统一、简介的访问的接口
- 使得数据结构成员能按照某种次序排列
- 创建了新的遍历命令——for...of循环



### 1.2 遍历过程

Iterator的遍历过程如下：

- 创建一个指针对象，指向当前数据结构的起始位置。
- 第一次调用指针对象的next方法，将指针指向数据结构的第一个成员
- 第二次调用指针对象的next方法，将指针指向数据结构的第二个成员
- .......
- 第n次调用指针对象的next方法，将指针指向数据结构的第n个成员

每次调用next方法都会返回当前数据结构的成员信息——一个包含了value和done两个属性的对象

- value：当前成员的值
- done：一个布尔值，表示循环有没有结束



### 1.3 实现Interator

```javaScript
function makeIterator(arr) {
  var nextIndex = 0;
  return {
    next: function () {
      return nextIndex < arr.length ? 
      {value: arr[nextIndex++], done: false} :
      {value: undefined, done: true}
    }
  }
}

var it = makeIterator([1,2,3,4,5]);


console.log(it.next()) // { value: 1, done: false }
console.log(it.next()) // { value: 2, done: false }
console.log(it.next()) // { value: 3, done: false }
console.log(it.next()) // { value: 4, done: false }
console.log(it.next()) // { value: 5, done: false }
console.log(it.next()) // { value: undefined, done: true }
```



## 2. 默认Iterator接口

Iterator接口的目的是为所有的数据结构提供一种统一的访问机制，即for...of循环。当使用for..of循环遍历某种数据结构时，该循环会自动去寻找Iterator接口。

### 2.1 Symbol.iterator属性 

ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要有Symbol.iterator属性，就可以认为是可便利的。调用Symbol.iterator方法，我们就会得到当前数据结构默认的的遍历器生成函数。

#### 2.1.1 Symbol.iterator

Symbol.iterator本身是一个表达式，返回Symbol对象中的iterator属性，这是一个预定义好的，类型为Symbol的特殊值，所以要放在方括号中。

```javascript
const obj = {
	[Symbol.iterator]:function () {
		return {
			next: function () {
				return {
					value: 1,
					done: true
				};
			}
		};
	}
};
```

- Symbol.iterator方法对应的方法如果不是遍历器生成函数，那么解释引擎将会报错
- 有了遍历器接口，数据结构就可以使用for...of和while循环遍历



#### 2.1.2 原生具备Iterator的数据结构

ES6有一些数据结构原生具备Iterator接口，不用任何处理就可以被for...of 循环遍历，因为这些数据结构原生部署了Symbol.iterator。有如下几种数据结构：

- Array
- Map
- Set
- String
- TypedArray
- 函数的arguments对象
- NodeList对象

ps：注意Object没有原生部署Symbol.iterator，这是因为对象的遍历先后顺序是不确定的，Iterator从本质上来说是一种线性处理。

```javascript
let arr = [1, 2, 3, 4, 5]
let it = arr[Symbol.iterator]();

console.log(it.next()) // { value: 1, done: false }
console.log(it.next()) // { value: 2, done: false }
console.log(it.next()) // { value: 3, done: false }
console.log(it.next()) // { value: 4, done: false }
console.log(it.next()) // { value: 5, done: false }
console.log(it.next()) // { value: undefined, done: true }
```



### 2.2 部署Iterator

#### 2.2.1 类部署Iterator

```javaScript
class RangeIterator {
  constructor (start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator] () {
    return this;
  }

  next() {
    var value = this.value
    if (value < this.stop) {
      this.value ++;
      return { done: false, value: value };
    }
    return { done: true, value: undefined };
  }
}

function range (start, stop) {
  return new RangeIterator(start, stop);
}

for (var value of range(0, 3)) {
  console.log(value)
}
// 1
// 2
// 3
```

​              

#### 2.2.2 为对象添加一个Iterator接口

```javaScript
let obj = {
	data: ['hello', 'world'],
	[Symbol.iterator] () {
        const self = this;
        let index = 0;
        return {
        	next() {
        		if (index < self.data.length) {
        			return {
        				value: self.data[index++],
        				done: false
        			};
        		} else {
        			return { 
        				value:undefined,
        				done: true
        			};
        		}
        	}
        }
    }
}
```



#### 2.2.3 类数组的对象添加一个Iterator接口

对于类数组对象，即存在键名和length属性，部署Iterator有一个简便的方法

```javascript
NodeList.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
NodeList.prototype[Symbol.iterator] = [][Symbol.iterator];
```

再看一个例子：

```javascript
let iterable = {
	0: 'a',
	1: 'b',
	2: 'c',
	length: 3,
	[Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
	console.log(item)
}
// a
// b
// c

// 注意普通对象无法实现，必须是类数组对象才可以
let iterable = {
	a: 'a',
	b: 'b',
	c: 'c',
	length: 3,
	[Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
	console.log(item)
}
// undeined
// undeined
// undeined
```

​           

### 3. 调用Iterator接口的场合

有一些场合会默认调用Iterator接口，即调用Symbol.inerator方法

- 解构解析
- 扩展运算符
- yield*
- 任何接受数组作为参数的场合
  - for...of
  - Array.from()
  - Map()、Set()、WeakMap()和WeakSet()
  - Promise.all()
  - Promise.race()



### 4. js中的循环

##### （1）for循环，最原始的方法

```javascript
for (let index = 0; index < 10; index++) {
	console.log(index)
}
```

缺点：比较麻烦



##### （2）数组内置forEach方法

```
myArray.forEach(function (value) {
	console.log(value);
})
```

缺点：无法中途跳出循环，break命令和return命令都不能凑效



##### （3）for...in 循环获取键名

```javascript
for (let index in myArray) {
    console.log(myArray[index])
}
```

缺点：for...in是为了遍历对象而设计的，不适合用于遍历数组

- 数组的键名都是数字，但是for...in都是以字符串作为键名，“0”、“1”、“2”等。
- for...in不仅会遍历数字键名，还会便利其他添加的键
- 某些情况，for...in循环会以任意顺序遍历键名



##### （4）for...of 循环获取键值

```javascript
let arr = [3, 4, 5]
arr.foo = 'hello'

for (let i in arr) {
	console.log(i) // 0, 1, 2, foo
}

// for...of 不会返回arr的foo属性 
for (let i of arr) {
	console.log(i) // 3, 4, 5
}
```

优点：

- 简洁
- 可以和break、continue和return配合使用
- 提供了遍历所有数据结构的统一接口























