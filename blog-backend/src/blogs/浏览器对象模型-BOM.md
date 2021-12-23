---
title: 浏览器对象模型----BOM
date: 2021-01-16 16:34:32
categories: JavaScript
---

# 浏览器对象模型——BOM
## 1.概述
### 1.1 JS代码嵌入网页
网页中切入JS代码的四种方式：

 - script元素直接嵌入代码。
 

```javascript
<script>
  var x = 1 + 5;
  console.log(x);
</script>
```

 - script标签加载外部脚本 
 

```javascript
<script src="https://www.example.com/script.js"></script>
```

 - 事件属性 
```javascript
<button id="myBtn" onclick="console.log(this.id)">点击</button>
```	
 - URL 协议
URL 支持javascript协议，即在 URL 的位置写入代码，使用这个 URL 的时候就会执行 JavaScript 代码。

```javascript
<a href="javascript:console.log('Hello')">点击</a>
```
### 1.2 script元素
#### 1.2.1 浏览器加载js工作原理

 1. 浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
 2. 解析过程中，浏览器发现script元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
 3. 如果script元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码。 
 4. JavaScript引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页。
> 加载外部脚本的时候，浏览器会停止渲染，等脚本下载执行完毕后才会继续渲染。
> 原因是 JavaScript 代码可以修改 DOM，所以必须把控制权让给它，否则会导致复杂的线程竞赛的问题。
> 如果外部脚本加载时间很长（一直无法完成下载），那么浏览器就会一直等待脚本下载完成，造成网页长时间失去响应，浏览器就会呈现“假死”状态，这被称为“阻塞效应”。
> 解决办法：①将script标签放在网页底部②使用script标签的onload属性
 
#### 1.2.2 onload属性
当script标签指定的外部脚本文件下载和解析完成，会触发一个load事件，可以把所需执行的代码，放在这个事件的回调函数里面。

```javascript
<script src="jquery.min.js" onload="console.log(document.body.innerHTML)">
</script>
```

#### 1.2.3 defer属性
defer属性的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本。运行流程如下：

 1. 浏览器开始解析 HTML 网页。 
 2. 解析过程中，发现带有defer属性的script元素。 
 3. 浏览器继续往下解析 HTML网页，同时并行下载script元素加载的外部脚本。 
 4. 浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本。

#### 1.2.4 async属性
async属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。

 1. 浏览器开始解析 HTML 网页。
 2. 解析过程中，发现带有async属性的script标签。 
 3. 浏览器继续往下解析 HTML网页，同时并行下载script标签中的外部脚本。
 4. 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
 5. 脚本执行完毕，浏览器恢复解析 HTML 网页。

### 1.3 浏览器的组成
浏览器的核心是两部分：渲染引擎和 JavaScript 解释器（又称 JavaScript 引擎）。
#### 1.3.1 渲染引擎
渲染引擎的主要作用是，将网页代码渲染为用户视觉可以感知的平面文档。
 1. Firefox：Gecko 引擎 
 2. Safari：WebKit 引擎 
 3. Chrome：Blink 引擎 
 4. IE: Trident 引擎
 5. Edge: EdgeHTML 引擎
 
渲染引擎处理网页，通常分成四个阶段：
 1. 解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
 2. 对象合成：将 DOM 和CSSOM 合成一棵渲染树（render tree）。 
 3. 布局：计算出渲染树的布局（layout）。 
 4. 绘制：将渲染树绘制到屏幕。
 > 渲染树转换为网页布局，称为“布局流”（flow）；布局显示到页面的这个过程，称为“绘制”（paint）。它们都具有阻塞效应，并且会耗费很多时间和计算资源。
 > 页面生成以后，脚本操作和样式表操作，都会触发“重流”（reflow）和“重绘”（repaint）。这些只会先知道相关的子树上，所消费的代价较小。
 > 作为开发者，应该尽量设法降低重绘的次数和成本。比如，尽量不要变动高层的 DOM 元素，而以底层 DOM 元素的变动代替；再比如，重绘table布局和flex布局，开销都会比较大。

以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。所以，会看到这种情况：网页的 HTML 代码还没下载完，但浏览器已经显示出内容了。

#### 1.3.2 JavaScript引擎
JavaScript 引擎的主要作用是，读取网页中的 JavaScript 代码，对其处理后运行。

JavaScript 是一种解释型语言，也就是说，它不需要编译，由解释器实时运行。

 - 优点：运行和修改都比较方便，刷新页面就可以重新解释 
 - 缺点：每次运行都要调用解释器，系统开销较大，运行速度慢于编译型语言

## 2.window对象

ES是JS的核心，但是如果要在Web中使用JS，那么BOM则是真正的核心。
-window即是通过JS访问浏览器窗口的一个接口，又是ES规定的Global对象。
 --这就意味着，在网页中定义任何一个对象、变量和函数都是以window作为其Global对象，因此有权访问parseInt()等方法。

#### 2.1全局作用域

（1）由于window对象同时伴着ES中Global对象的角色，因此所有在全局作用域中声明的变量、函数都会变成window对象的属性和方法。
（2）定义全局变量与在window上直接定义属性还有一点差别：全局变量不能通过delete删除而直接在window对象上定义的属性可以
*（3）尝试访问未声明的变量会出错，但是通过查询window对象不会出错，依次可以判别某个可能未声明的变量是否存在。

#### 2.2窗口关系及框架

如果网页包含框架，则每个框架都拥有自己的window对象，并且保存在frames集合中。
在frames集合中，可以通过数值索引或者框架名称来访问相应的window对象
每个window都有一个name属性，其中包含框架的名称。
（1）通过window.frame[数字]/window.frame["name"]访问框架
     通过top.frame[数字]/top.frame["name"]访问框架
     通过frame[数字]/frame["name"]访问框架
（2）框架中parent对象指向当前框架的直接上层框架
？（3）除非高层窗口是用过window.open()打开的，否则window对象的name属性不会包含任何值
？（4）框架中self始终指向window，self与window可以互换使用，self对象的目的是为了与top和parent对应起来。

#### 2.3窗口位置
用来确定和修改window对象位置的属性和方法很多。
（1）IE\Safari\Opera\Chrome 都提供了screenLeft和screenTop属性———>表示窗口相对于荧幕左边和上边的位置
（2）Firefox\Safari\Chrome 提供screenX和screenY属性 注意：Opera中也提供screenX和screenY属性，但是与screenLeft和screenTop属性不对应

#### 2.4窗口大小
跨浏览器确定一个窗口的大小不是一件简单的事情。
IE9+\Firefox\Safari\Opera\Chrome均提供了四个属性 innerWidth innerHeight outerWidth outerHeight
（1）在E9+\Firefox\Safari中 outerHeight和outerWidth返回浏览器窗口本身的尺寸（无论是从最外层的window对象还是从哪个窗口访问）
（2）在Opera中outerHeight和outerWidth这两个属性表示页面视图容器大小
（3）在Chrome中outerHeight和outerWidth这两个属性与innerWidth和innerHeight这两个属性具有相同的返回值（即视口大小而非浏览器窗口大小）

IE9+\Firefox\Safari\Opera\Chrome中 document.documentElement.clientWidth和document.documentElement.clientHeight中保存了页面视口的信息
（1）IE6中这些属性必须在标准模式下才有效；如果是混杂模式，必须通过document.body.clientWidth和document.body.clientHeight获取
（2）Chrome中，混杂模式下的document.documentElement和document.body中的clientWidth属性和clientHeight属性都可获得视口的大小

使用resizeTo()和resizeBy()方法可以调整浏览器窗口的大小
resizeTo()接受浏览器的新宽度和新高度
resizeBy()接受新窗口的原宽度和高度之差
（1）这两个方法有可能被浏览器禁用 在Opera和IE7以及更高的版本中默认是禁用的
（2）两个方法同样不适用于框架，只能对最外层的window对象使用

#### 2.5导航和打开窗口
window.open()方法既可以导航到一个特定的URL也可以打开一个新的浏览器。该方法可以接受四个参数：
（1）要加载的URL
（2）窗口目标，传递了该参数且该参数是已有窗口或框架的名称，那么就会在具有该名称的窗口或框架中打开第一个参数指定的URL
（3）一个特征字符串
（4）一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值
注：一般只需传递第一个参数，最后一个参数只在不打开新窗口的情况下使用

1.弹出窗口
window.open()
参数：
（1）如果给window.open()传递的第二个参数不是一个已经存在的窗口或者框架，该方法会根据第三个参数位置上传入的字符串创建一个新的窗口或者框架。
（2）如果给window.open()传递的第二个参数不是一个已经存在的窗口或者框架，没有传入第三个参数就会打开一个带有全部默认设置的新浏览器窗口。
（3）在不打开新的窗口的情况下，会自动忽略第三个参数
返回值：
window.open()方法会返回一个指向新窗口的引用，引用的对象与其他window对象大致相似，但是我们可以对其进行更多控制。
（1）可以像控制其他窗口一样使用resizeTo()和moveTo()方法
（2）通过close()方法关闭新打开的窗口，但是这个方法只能适用于window.open()方法打开的新窗口。对于浏览器的主窗口，如果没有得到用户的允许是不能关闭的
（3）新建的window对象有一个opener属性指向打开它的原始窗口，但是原始窗口没有这样的指针指向弹出的窗口

2.安全限制
！！了解各个浏览器处理垃圾弹窗的方法

3.弹出窗口屏蔽程序
大多数浏览器都内置弹出窗口屏蔽程序，没有内置的可以安装Yahoo！ Toolbar等带有内置屏蔽程序的实用工具。
在这些程序的作用下，window.open()很可能返回null，因此可以通过检测返回值确定窗口是否被屏蔽了。我们还要考虑被阻止了弹出窗口，window.open()会抛出一个
错误，因此想要更精确的检测出弹出窗口是否被屏蔽，必须在检测返回值的同时，将对window.open()的调用封装在一个try-catch块中
var blocked = false;
try{
     var wroxWin = window.open("http://www.wrox.com","_blank");
     if(wroxWin == null){
          blocked = true;
     }
}catch(ex){
     blocked = true；
}

#### 2.6间歇调用和超时调用
JS是单线程语言，但它允许通过设置超时值（指定的时间过后执行代码）和间歇时间值（每隔指定的时间执行依次代码）来调度代码在特定的时刻执行。
（1）超时调用
-使用window对象的setTimeout()方法，它接受两个参数：
①要执行的代码
ps：第一个参数可以是一个字符串也可以是一个函数，但是字符串可能导致性能损失，因此一般使用函数作为第一个参数。
setTimeout(function(){
    alert("Hello world!");
},1000);
②以毫秒表示的时间（在代码执行前需要等待多少毫秒）
JS是一个单线程解释器，一定时间内只能执行一段代码，所以JS有一个任务队列，这些任务会按照添加到队中的顺序执行。setTimeout()的第二个参数告诉JS再过多长
时间把当前任务添加到队列中。

-setTimeout()方法返回一个数值ID，该ID是计划执行代码的唯一标识符，可以通过该ID使用clearTimeout()方法来取消调用

（2）间歇调用
-setInterval()方法，接受两个参数：
①要执行的代码
②以毫秒表示的时间（在代码执行前需要等待多少毫秒）

-setInterval()方法返回一个数值ID，该ID是计划执行代码的唯一标识符，可以通过该ID使用clearInterval()方法来取消调用

#### 2.7系统对话框
浏览器可以通过alert()\confirm()\prompt()方法可以调用系统对话框向用户显示消息。
系统对话框与在浏览器中显示的网页没有关系，也不包含HTML。他们的外观由操作系统及浏览器设置决定的，而不是由CSS准备的。
通过几个方法打开的对话框都是同步和模态的，也就是说显示这些对话框的时候代码会停止执行，而关掉这些对话框后代码又会恢复执行。
（1）alert()接受一个字符串并呈现给用户  对话框有一个“确定”按钮
一般用于生成“警告”对话框向用户呈现一些他们无法控制的消息，例如错误消息。用户只能在看完消息后关闭对话框。
（2）confirm()接受一个字符串并呈现给用户  对话框有“确定”和“取消”按钮 单击确定返回true，单击取消返回false
（3）prompt()方法生成一个“提示”框，用于提示用户输入一些文本。 提示框中除了拥有显示“确定”和“取消”按钮外还会显示一个文本输入域
接受两个参数：要显示给用户的文本提示和文本输入域的默认值
如果用户点击了确定则返回文本输入域的值 如果没有点击确定而关闭了对话框则返回null

### 3.location对象
location是最有用的BOM对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。
location对象比较特殊，他既是window对象的属性，也是document对象的属性。（window.location和document.location是同一个对象）
location的属性.......

#### 3.1查询字符串参数
location.search返回从问好到URL末尾的所有内容 ，却没有办法逐个访问其中的每个查询字符串的参数，为此可以创建这样一个函数。
略；

#### 3.2位置操作
使用location对象可以通过多种方式改变浏览器的位置
（1）使用location.assign()方法
location.assign("URL");这样就可以打开一个新的URL并在浏览器历史记录中生成一条新的记录
如果将window.location或location.href设置为一个URL值，也相当于调用了assign()方法

（2）location.hash/search/hostname/pathname/port 
每次修改location的属性（hash除外）页面都会以新的URL重新加载。
任意一个修改可以在浏览器历史记录中生成一条新的记录，单击后退可以返回到原来的URL。

（3）replace()方法可以接受一个参数————要去往的URL，但是不会在历史记录中生成新纪录。

（4）reload()方法不去调用参数就会以最有效的方式重新加载当前显示的页面。

### 4.navigator对象

navigator的属性和方法————navigator对象的属性通常用于检测显示网页的浏览器类型

#### 4.1检测插件
（1）对于非IE浏览器，plugins数组可以检测浏览器中是否安装了特定的插件 ，该数组的每一项包含了下列属性：
name：插件的名字
description：插件的描述
filename：插件的文件名
length：插件所处理的MIME类型数量

（2）IE浏览器检测插件的唯一方式时使用转悠的ActiveXObject类型，并尝试创建一个特定插件的实例。

#### 4.2注册处理程序
略；

4.screen对象
screen对象在编程中作用不大，基本上用来表明客户端的能力，其中包括浏览器窗口外部显示器的信息，如像素、宽度和高度等。

5.history对象
history对象保存着用户上网的历史记录，从窗口被打开的那一刻计算器。因为history是window对象的属性，因此每个浏览器窗口、每个标签页每个框架都
有自己的history对象与特定的window对象关联。
处于安全考虑，开发人员无法得知用户浏览过的URL，不过借由用户访问的页面列表，可以在不知道实际URL的情况下实现后退和前进。
使用go()方法可以在用户的历史记录中任意跳转，该方法接受一个参数。
（1）给数字参数
history.go(1);//前进一页
history.go(-1);//后退一页

（2）传递字符串 此时浏览器会跳转到历史记录中包含该字符串的第一个位置，可能前进也可能后退，如果历史记录中不包含该字符串那么这个方法什么也不做
history.go("wrox.com");//跳转到最近的wrox.com页面

history.forward();//前进一页
history.back()//后退一页
