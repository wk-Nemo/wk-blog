---
title: Object类型和面向对象的程序设计
date: 2021-01-15 02:04:59
categories: JavaScript
---

## 1 Object类型
ES中的对象其实就是一组数据和功能的集合。

### 1.1 Object类型的创建方法
1. new操作符

```javascript
var person = new Object();
person.name = "wk";
person.age = 18;
```
 - Object可以不传递参数，此时的括号可以省略，但是不推荐
 
2. 字面向量表示法 **（推荐）**

```javascript
var person = {
    name:"wk",
    age:18,
    5：true
}
```

 - 对象的属性会自动转换成字符串,上述的5会转换成“5”
 - 字面向量法表示起来干净利落，十分推荐
 
### 1.2 Object类型的使用方法
1. .进行使用

```javascript
alert(person.name);
```
2. [ ]进行调用

```javascript
alert(person["name"]);
```
- 当属性名中出现会导致语法错误的字符，或是属性名使用的是关键词或保留字，但是一般我们遵循正常的命名规则就不会用到该调用，所以可以任性的说“可以但是没必要！”。
## 2.面向对象程序的程序设计
### 2.1 简单的了解对象的概念
#### 2.1.1 简介
- ECMAScript没有类的概念，因此他的对象和基于类的语言中的对象有所不同。ECMA-262把对象定义成：“**无序属性的集合，其属性值可以包含基本值、对象或者函数**。"我们知道对象都是基于一个引用类型创建的，在第五章中我们学习了一些原生类型，如Array类型、Date类型等，但是除此之外开发人员也可以自己定义新的类型。
我们上一节了解了Object类型，他不具备多少功能，但是对应用程序中存储和传输数据而言，是一个很好的选择。我们采用对象字面量语法可以定义一个person类型，如下：

```javascript
var person = {
           name:"wk",
           age:20,
           job:"students",
           sayName:function(){
               alert(this.name)
           }
       };
```

#### 2.1.2 属性类型
ECMAScript中有两种属性：**数据属性**和**访问器属性**。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200603122309724.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)
##### 2.1.2.1 数据属性 
包含一个数据值的位置，可以进行读写。有四个描述行为的特性，如下：
 - [[Configurable]]：表示能否①删除属性从而重新定义属性②能否修改属性的特性③能否把属性修改成访问器属性。默认值为true。
 - [[Enumerable]]：表示能否通过for-in循环返回属性。默认值为true。
 - [[Writable]]：表示能否修改属性的值。默认值为true。
 - [[Value]]：包含这个属性的数据值，从该位置进行读写。默认值为undefined。
 
##### 2.1.2.2 访问器属性
 访问器属性不包含数据值，他们包含一对getter和setter函数。他也有四个特性，如下：
 - [[Configurable]]：表示能否①删除属性从而重新定义属性②能否修改属性的特性③能否把属性修改成访问器属性。默认值为true。
 - [[Enumerable]]：表示能否通过for-in循环返回属性。默认值为true。
 - [[Get]]：读取访问器属性时调用的函数，负责返回有效值。默认值为undefined。
 - [[Set]]：写入访问器属性时调用的函数，负责传入新值，决定如何处理数据。默认值为undefined。
 
##### 2.1.2.3 Object.defineProperty()、Object.defineProperties()和Object.getOwnPropertyDescriptor()
 Object.defineProperty()
  
 - 三个参数：属性所在的对象、属性的名字、一个描述符对象
  - 注意修改Configurable为false后，就不能再对对象进行配置了。
 - 用 Object.defineProperty()创建一个新的属性时，若不指定特性，则会默认为false。
```javascript
//对于数据属性的操作
var person = {};
Object.defineProperty(person,"name",{
    writable:false,
    value:"wk"
});
alert(person.name); //wk
person.name = "cy";
alert(person.name); //wk
```

```javascript
//对于访问器属性
var book = {
   _year:2004;
   edition:1;
};
Object.defineProperty(book,"year",{
    get:function(){
       return this._year;
    }
    set:function(newValue){
       if(newValue > 2004){
           this.year = newValue;
           this.edition += newValue - 2004;
       }
    }
});
book.year = 2005;
alert(book.edition);2
```
Object.defineProperties()定义多个属性

 - 接受参数：①要添加或修改的属性对象②添加或修改的属性

Object.getOwnPropertyDescriptor()取得给定属性的描述符

 - 接收参数：①属性所在的对象②描述符的属性名称
 - 返回值：一个对象，包含了输入属性的所有特性。
```javascript
var book = {};
       Object.defineProperties(book,{
           _year:{
               writable:true,
               value:2004
           },
           edition:{
               writable:true,
               value:1
           },
           year:{
               get:function(){
                   return this._year;
               },

               set:function(newValue){
                   if(newValue > 2004){
                       this._year = newValue;
                       this.edition += newValue - 2004;
                   }
               }
           }
       });

     var descriptor = Object.Object.getOwnPropertyDescriptor(book,"_year");
     alert(descriptor.value); //2004
     alert(descriptor.configurable);//true
```
## 2.2 创建对象
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200603191654358.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)
### 2.2.1工厂模式
问题：虽然Object构造函数或对象字面量都可以用来创建单个对象，但是可以清楚的看见该方法的**缺点**：复用性太差。如果要创建多个对象会产生大量重复的代码，比如有100个人的信息要录入，就需要重复上列代码100次，并赋不同的信息值。
```javascript
var person = {
           name:"wk",
           age:20,
           job:"students",
           sayName:function(){
               alert(this.name)
           }
       };
```
工厂模式则解决了这个问题，考虑在ECMAScript中无法创建类，开发人员发明了一种函数，用函数来封装以特定接口创建对象的细节。

```javascript
function createPerson(name,age,job){
           var o = new Object();
           o.name = name;
           o.age = age;
           o.job = job;
           o.sayName = function(){
               alert(this.name);
           };
           return o;
       }
var person1 = createPerson("wk",20,"student");
```
缺点：工厂模式解决了创建多个相似对象的问题，却没有解决对象识别的问题（即判断一个对象的类型）
### 2.2.2构造函数模式
我们知道构造函数可以创建指定类型的对象。除了Object、Array这样的原生构造函数，我们还可以自己创建定义构造函数。如下：

```javascript
function Person(name,age,job)
       {
           this.name = name;
           this.age = age;
           this.job = job;
           this.sayName = function(){
               alert(this.name);
           };
       }
       var person1 = Person("wk",20,"student");
       var person2 = Person("wk2",20,"student");
```
与工厂模式进行比较：

 - ①没有显示的创建对象②直接将属性和方法付给了this对象③没有return
 - Person使用的是大写开头的P，此处借鉴了其他的OO语言，**构造函数的开头字母大写，非构造函数开头字母小写**。构造函数本质上也是一种函数，只不过调用的方式不同，构造函数是**通过new操作符来调用的**。 
> 1.构造函数经历的阶段
> （1）创建一个新对象
> （2）讲构造函数的作用域赋给新对象，this也自然而然的指向了这个新对象
> （3）执行构造函数中的代码，给新对象添加属性
> （4）返回新对象
> 从构造函数经历的过程我们可以**通过instanceof来识别对象的类型，解决了工厂模式带来的问题。**
> 2.构造函数和普通函数的拓展
> （1）构造函数使用了new，将this指向了新创建的对象。
> （2）普通的函数调用，this会指向Global，即浏览器的window对象。
 
存在的问题：每个方法都要在每个实例上重新创建一边，导致了不同作用域链和标识符解析，不同实例上的同名函数时不相等的。
因为每通过构造函数new一个实例，构造函数中的代码就要执行一遍。对于字段属性来说，每个实例的字段本来就应该是独立的，当然没有问题；但是对于方法属性，我们是希望所有的实例是共享同一个的。

### 2.2.3原型模式
所有的函数都有prototype（原型）属性,这个属性是一个指针，指向一个对象。这样就解决了构造函数模型带来的问题。
```javascript
function Person(){

       }
Person.prototype.name = "wk";
Person.prototype.age = 20;
Person.prototype.job = "student";
Person.prototype.sayName = function(){
   alert(this.name);
};
var person1 = new Person();
person1.sayName();//"wk"

var person2 = new Person();
person2.sayName();//"wk"
      
alert(person1.sayName == person2.sayName);//true
```

#### 2.2.3.1.原型对象
简单的来说每创建一个函数，都会为函数创建一个prototype属性，这个属性指向函数的原型对象；而原型对象中都会有constructor属性，这个属性指向原函数。当代码读取某个对象的属性时会搜索给定名字的属性。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200603165102367.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)

 - isPrototypeOf()，判断指针是否存在

```javascript
alert(Person.prototype.isPrototypeOf(person1));//true
alert(Person.prototype.isPrototypeOf(person2));//true
```

 - Object.getPrototypeOf(),返回对象的原型
 

```javascript
alert(Object.getPrototypeOf(person1) == Person.prototype) //true;
alert(Object.getPrototypeOf(person1).name) //"wk"
```
>  - 当代码读取某个对象的属性时，会进行搜索，搜索顺寻如下：搜索首先是从对象实例本身开始的，如果找到了给定名字的属性就会返回该属性的值；如果没找到则继续再原型对象中查找给定名字的属性。
>- 对象实例的属性优先级高于原型对象中的属性，当对象实例中的属性与原型对象实例中的属性同名时，即使对象实例中的属性值为null，也会屏蔽原型对象中的属性。要想访问原型的属性，就得通过delete删除实例中的属性。
> - hasOwnProperty()方法，给定属性在实例中返回true，不存在属性或原型中返回false。
>  - in方法，如果属性存在则返回true，否则返回flase。

#### 2.2.3.2 语法简化
下面的语法虽然简化了，但是此时他的constructor属性不再指向Person，指向了Object。
```javascript
function Person(){
}
Person.prototype = {
  name:"wk",
  age:20,
  job:"student",
  sayName : function(){
     alert(this.name);
  }
};
```
所以 我们可以自行改变constructor
```javascript
function Person(){
}
Person.prototype = {
  constructor:Person,
  name:"wk",
  age:20,
  job:"student",
  sayName : function(){
     alert(this.name);
  }
};
```
但是修改constructor后[[Enumerable]]特性会被设置成true。而默认情况下，constructor是不可枚举的。可以通过Object.defineProperty()进行修改。
```javascript
function Person(){
}
Person.prototype = {
  constructor:Person,
  name:"wk",
  age:20,
  job:"student",
  sayName : function(){
     alert(this.name);
  }
};
Object.defineProperty(Person.prototype,"constructor",{
    enumerable:false,
    value:Person
})
```
#### 2.2.3.3 原型的动态性

 - 对原型进行的任何修改都可以立马从实例上反映出来
 - 对原型进行重写的话会切断实例域原型之间的关系

```javascript
var friend = new Person();
Person.prototype = {
    name:"wk",
    age:20,
    job:"student",
    sayName : function(){
    alert(this.name);
    }
};
friends.sayName();//error
```

#### 2.2.3.4 原生对象的原型
所有的引用类型都在其构造函数的原型上定义了方法。通过原生对象的原型，不仅可以取得多有默认方法的引用，还可以重新定义新方法。

#### 2.2.3.5 关于原型模式
1. JS里所有的原生引用类型都是通过这种模式进行创建的，如Object、Array、String等
2. 缺点：

 - 省略了为构造函数传递参数的环节，所有实例再默认情况下将获得相同的属性值
 - 共享性带来好处的同时也带来了不少麻烦



### 2.2.4 组合使用构造函数模式和原型模式(最推荐的模式)
组合使用构造函数模式，公共属性写入原型，传入属性写入构造函数。
```javascript
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
### 2.2.5 动态原型模式
把所有的信息都封装到构造函数中
```javascript
function Person(name,age,job)
{
       this.name = name;
       this.age = age;
       this.job = job;   
       if(typeof this.sayName != "function"){
       Person.prototype.sayName = function(){
            alert(this.name);
       } ;
    } 
}
```
### 2.2.5寄生构造模式
该模式只是在调用函数时和工厂模式不同

```javascript
function createPerson(name,age,job){
           var o = new Object();
           o.name = name;
           o.age = age;
           o.job = job;
           o.sayName = function(){
               alert(this.name);
           };
           return o;
       }
var person1 = new createPerson("wk",20,"student");
```
### 2.2.6稳妥模式
该模式与寄生构造函数类似，有两点不同
 - 新建对象的实例方法不引用this
 - 不适用new操作符调用构造函数
该模式适合在一些安全的环境中使用，或者防止数据在其他应用程序改动是使用。

```javascript
function createPerson(name,age,job){
           var o = new Object();
           o.name = name;
           o.age = age;
           o.job = job;
           o.sayName = function(){
               alert(name);
           };
           return o;
       }
var person1 = createPerson("wk",20,"student");
```
## 3.继承
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200603232617744.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)
### 3.1原型链
1.基本概念
ECMAScript中描述了原型链的概念，并将**原型链**作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

```javascript
function SuperType(){
    this.property = true;
}；
SuperType.prototype.getSuperValue = function(){
    return this.property;
};
function SubType(){
    this.subproperty = false;
};
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
     return this.subproperty;
};

var instance = new SubType();
alert(instance.getSuperValue()); //true
```

 - 原型链的搜索机制，沿着原型链一个一个的搜索属性，直到原型链的末端才会停下来。
 - 还需要注意的是所有函数的默认原型都是Object的实例，因此默认圆心都会包含一个内部指针指向Object.prototype。
 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200603220039172.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)

2.确定原型和实例的关系
(1)instanceof操作符

```javascript
       alert(instance instanceof Object);//true
       alert(instance instanceof SuperType);//true
       alert(instance instanceof SubType);//true
```

(2)isPrototypeOf()方法

```javascript
       alert(Object.prototype.isPrototypeOf(instance));//true
       alert(SuperType.prototype.isPrototypeOf(instance));//true
       alert(SubType.prototype.isPrototypeOf(instance));//true
```
3.谨慎地定义方法

 - 给原型添加的代码一定要放在替换原型的语句之后 。
 - 通过原型链实现继承时，不能使用对象字面量创建原型方法。
  
  4.存在的问题
  
 - 原型的共享导致了原先的实例属性顺理成章的变成了共享的了。
 - 创建子类型时，不能像超类型的构造函数中传递参数。
### 3.2借用构造函数
```javascript
      function SuperType(){
          this.colors = ["red","blue","green"];
      }

      function SubType(){
          SuperType.call(this);
      }
      var instance1 = new SubType();
      instance1.colors.push("black");
      alert(instance1.colors);//red,blue,green,black
      var instance2 = new SubType();
      alert(instance2.colors);//red,blue,green
```
### 3.3组合继承
将原型链和借用构造函数的技术结合到一起

### 3.4原型式继承

```javascript
      var person = {
          name:"wk",
          friends:["zf","grb","xjh"]
      };

      var anotherPerson = Object.create(person);
      anotherPerson.name = "grey";
      anotherPerson.friends.push("lyh");
      alert(person.friends);//zf,grb,xjh,lyh

      var anotherPerson2 = Object.create(person,{
          name:{
              value:"grb"
          }
      });
```
### 3.5寄生式继承

```javascript
function createAnother(original){
          var clone = object(original);
          clone.sayHi = function(){
              alert("hi");
          };
          return clone;
      }
```
### 3.6寄生组合式继承

```javascript
function SuperType(name) {
            this.name = name;
            this.colors = ["red", "blue", "green"];
        }

        SuperType.prototype.sayName = function () {
            alert(this.name);
        };

        function SubType(name, age) {
            SuperType.call(this, name);
            this.age = age;
        }

        inheritPrototype(SubType, SuperType);
        SubType.prototype.sayAge = function () {
            alert(this.age);
        }
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200603233252266.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)