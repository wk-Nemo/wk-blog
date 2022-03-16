---
title: Java中的对象与类
date: 2021-11-08 17:06:13
categories: 后端
---

## 1. 面向的对象程序设计概述

### 1.1 类

**定义：**类是构造对象的模板或蓝图。由类构造对象的过程称为创建类的实例。

**封装：**是处理对象的一个重要概念。从行为上来看封装就是将数据和行为组合在一个包中，并对对象的使用者隐藏具体的实现方法。

- 其中对象的数据称为**实例字段**
- 操作数据的过程称为**方法**

**继承：**通过扩展一个类来建立另一个类的过程称为继承

### 1.2 对象

- 同一个类的所有对象实例，由于支持相同的行为而具有家族式的**相似性**。
- 每个对象都保存着当前描述当前状况的信息，这就是对象的**状态**。
  - 对象的状态可能会随时间发生改变，但不是自发的
  - 对象状态的改变必须通过调用方法实现
- 每一个对象都有一个唯一的标识。作为同一个类的实例，每个对象的标识总是不同的，状态往往也存在着差异。

### 1.3 类之间的关系

类之间最常见的关系有：

- 依赖（“uses-a”）
- 聚合（“has-a”）
- 继承（“is-a”）

## 2. 自定义类

类 = 构造器 + 实例字段 + 方法

### 2.1 构造器

- 构造器与类同名
- 每个类可以有一个以上的构造器
- 构造器可以有0个、1个或多个参数
- 构造器没有返回值
- 构造器总是伴随着new操作符一起调用

**1. 重载**

一个类可以有多个构造器，这种功能叫做重载。编译器必须挑出具体的方法：

- 如果匹配不到适合的参数，就会编译错误
- 如果找到合适的，就会调用该构造器

**2. 默认字段初始化**

如果构造器中没有显示地为字段设置初始值，那么就会被自动的赋为默认值：

- 数值：0
- 布尔值：false
- 对象：null

**3. 无参数的构造器**

很多类都会包含一个无参数构造器，又无参数构造器创建对象时，对象状态会置为适当的默认值

- 如果一个类没有编写构造器，则会默认提供一个无参数构造器
- 如果一个类提供了一个构造器（不是无参数构造器），那么构造对象时如果不提供参数就会报错

**4. 初始化数据字段**

- 构造器中设置
- 声明中设置
- 使用初始化块

### 2.2 隐式参数与显示参数

```java
class Employee {
    private double salary
    ...
    public void raiseSalary(double byPercent) {
        double raise = salary * byPercent / 100;
        salary += raise
    }
}
```

当我们调用这个方法：

```java
Employee number007 = new Employee(1000)
number007.raiseSalary(5)
```

其实执行的具体过程如下：

```java
double raise = number007.salary * byPercent / 100;
number007.salary += raise
```

`raiseSalary`有两个参数：

- 隐式参数，就是这里的`number007`。关键字this可以指向隐式参数，因此这个方法可以这样写

  ```java
  public void raiseSalary(double byPercent) {
      double raise = this.salary * byPercent / 100;
      this.salary += raise
  }
  ```

- 显示参数，跟在方法名后括号中的数值

### 2.3 基于类的访问权限

```java
class Employee {
    private String name
    ...
    public boolean equals(Employee other) {
        return name.equals(other.name)
    }
}
```

```java
if(harry.equals(boss)) {
    ...
}
```

因为`boss`是`Employee`类型的对象，而`Employee`类的方法可以访问任何`Employee`类型对象的私有字段

### 2.4 私有方法

大多数方法设计为公共的，但在一些情况下设计成私有的更有用：

- 一个公共函数的辅助方法，不需要称为公共接口的一部分

### 2.5 final 实例字段

定义为final的实例字段，必须确保在每一个构造器执行之后，这个字段已经被设置，并且以后不能修改这个字段

## 3. 静态字段和静态方法

接下来我们讨论`static`修饰符

### 3.1 静态字段

如果将一个字段定义为`static`，那么它将属于这个类：

- 非静态的实例字段，每个对象都有一个自己的副本
- 静态字段只属于类，这个类的所有实例共享一个静态字段

### 3.2 静态常量

`Math`类中的`PI`就是一个静态常量

```java
public class Math {
    ...
    public static final double PI = 3.1415926
    ...
}
```

这里还添加了`final`防止其值被恶意修改

### 3.3 静态方法

静态方法不是在对象上执行的方法，如`Math.pow()`。

- 可以认为静态方法是没有`this`参数的方法
- 静态方法不可以访问实例字段，但是可以访问静态字段

以下两种场景适合使用静态方法：

- 方法不需要访问对象的状态，所有的参数由显示参数提供
- 方法只需要访问类的静态字段

### 3.4 工厂方法

类似`LocalDate`和`NumberFormat`的类使用静态工厂方法来构造对象

```java
NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance();
NumberFormat precentFormatter = NumberFormat.getPrecentInstance();
double x = 0.1;
System.out.println(currencyFormatter.format(x)); // $0.10
System.out.println(precentFormatter.format(x)); // 10%
```

这里没有采用构造器有如下原因：

- 构造器必须与类名相同，但是这里希望两个不同的名字，分别得到货币的实例和百分比
- 使用构造器时无法改变构造对象的类型。而工厂方法实际上将返回`DecimalFormat`类的对象，这是`NumberFormat`的子类。

### 3.5 main方法

`main`是一个静态方法，`main`不对任何对象进行操作。

- 每一个类都可以有一个`main`方法，可以以此进行单元测试

## 4. 方法参数

Java程序设计总是按值调用，和js一样，不再赘述。

## 5. 包

包可以将类组织在一个集合中，能够帮助我们方便的组织自己的代码，并将自己的代码和别人提供的代码库分开管理。

### 5.1 类的导入

一个类可以使用所属包中的所有类，以及其他包中的公共类

访问公共类的两种方式：

- 使用完全限定名

  ```java
  java.time.LocalDate today = java.time.LocalDate.now();
  ```

- 使用`import`语句

  - 引入全部的包（注意使用*只能导入一个包）

    ```java
    import java.time.*;
    LocalDate today = LocalDate.now();
    ```

  - 引入特定的类

    ```java
    import java.time.LocalDate;
    LocalDate today = LocalDate.now();
    ```

### 5.2 静态导入

- 导入静态字段和方法

  ```java
  import static java.lang.System.*;
  
  out.println("hello world")
  ```

- 导入特定静态字段和方法

  ```java
  import static java.lang.System.out;
  
  out.println("hello world")
  ```

### 5.3 在包中添加类

使用`package`将类放入包中

```java
package com.horstman.corejava;
public class Employee {
    ...
}
```

如果没有在开头使用`package`，这个源文件中的类就属于**无名包**































