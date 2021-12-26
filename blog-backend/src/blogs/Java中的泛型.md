---
title: Java中的泛型
date: 2021-11-10 17:06:13
categories: 后端
---

## 1. 为什么使用泛型

泛型程序设计意味着编写的代码可以对多种不同类型的对象重用。

### 1.1 类型参数

在Java添加泛型类型之前，泛型程序设计是使用继承实现的。`ArrayList`类只维护一个`Object`引用的数组：

```java
public class ArrayList {
    private Object[] elementData;
    ...
    public Object get(int i) {...}
    public void add(Object o) {...}
}
```

存在问题：

- 获取一个值时，必须进行强制类型转换
- 没有错误坚持，可以向数组列表添加任何类的值



泛型的解决方案：类型参数，指示元素类型。

```java
ArrayList<String> files = new ArrayList<String>();
```

- 使用`get`时不需要进行强制类型转换
- 使用`add`方法时必须插入指定类型的参数
- 程序更加易读，也更加安全



## 2. 泛型类

泛型类就是有一个或多个类型变量的类。

```java
package generic;

public class Pair<T> {
  private T first;
  private T second;
  
  public Pair() {
    first = null;
    second = null;
  }
  
  public Pair(T first, T second) {
    this.first = first;
    this.second = second;
  }
  
  public T getFirst() {
    return first;
  }

  public T getSecond() {
    return second;
  }
  public void setFirst(T newValue) {
    first = newValue;
  }
}
```

```java
package generic;

public class pairTest {
  public static void main(String[] args) {
    String[] words = { "Mary", "had", "a", "little", "lamb" };
    Pair<String> mm = ArrayAlg.minmax(words);
    System.out.println("min = " + mm.getFirst());
    System.out.println("max = " + mm.getSecond());
  }
}

class ArrayAlg {
  public static Pair<String> minmax(String[] a) {
    if(a == null || a.length == 0) return null;
    String min = a[0];
    String max = a[0];
    for (int i = 1; i < a.length; i++) {
      if (min.compareTo(a[i]) > 0) min = a[i];
      if (min.compareTo(a[i]) < 0) max = a[i];
    }
    return new Pair<>(min, max);
  }
}

```

泛型类也可以有多个类型变量

```java
public class Pair<T, U> {...}
```



## 3. 泛型方法

不但可以定义泛型类，还可以定义泛型方法。

- 类型变量放在修饰符的后面，返回类型的前面
- 泛型方法可以在普通类中定义，也可以在泛型类中定义
- 当调用一个泛型方法时，可以把具体类型包围在尖括号中，放在方法名前

```java
class ArrayAlg {
    public static <T> T getMiddle(T... a) {
        return a[a.length / 2];
    }
}
```



## 4. 类型变量的限定

有时，类或方法需要对类型变量加以约束。比如：

```java
class ArrayAlg {
  public static <T> T min(T[] a) {
    if(a == null || a.length == 0) return null;
    T smallest = a[0];
    for(int i = 1; i < a.length; i++) {
      if(smallest.compareTo(a[i]) > 0) smallest = a[i];
    }
    return smallest;
  }
}
```

这里计算最新需要`T`拥有一个`Comparable`接口，我们可以对其加一个限定来实现：

```java
class ArrayAlg {
  public static <T extends Comparable> T min(T[] a) {
    if(a == null || a.length == 0) return null;
    T smallest = a[0];
    for(int i = 1; i < a.length; i++) {
      if(smallest.compareTo(a[i]) > 0) smallest = a[i];
    }
    return smallest;
  }
}
```

这样`min`方法只能在实现了`Compareable`接口的类的数组上调用。



为什么使用`extends`而不是`implements`？

```java
<T extends BoundingType>
```

表示`T`是限定类型的子类型。`T`和限定类型都可以是类，也可以是接口。选择`extends`是因为它更接近子类型的概念。

- 类型变量用逗号分隔
- 限定符号用`&`分隔



## 5. 泛型代码和虚拟机

虚拟机没有泛型类型对象——所有对象都属于普通类。接下来我们来学习编译器是如何“擦除”类型参数，以及这个过程对Java会产生什么影响。

### 5.1 类型擦除

无论何时定义一个泛型类型，都会自动提供一个相应的**原始类型**。

- 这个原始类型的名字就是去掉类型参数后的泛型类型名。
- 类型变量会被擦除
- 替换为其限定类（对于无限定类的会替换为Object）

看上面的`Pair`类，因为没有限定类型，会被替换成`Object`

```java
package generic;

public class Pair {
  private Object first;
  private Object second;

  public Pair() {
    first = null;
    second = null;
  }

  public Pair(Object first, Object second) {
    this.first = first;
    this.second = second;
  }

  public Object getFirst() {
    return first;
  }

  public Object getSecond() {
    return second;
  }
  public void setFirst(Object newValue) {
    first = newValue;
  }
}
```

### 5.2 转换泛型表达式

编写一个泛型方法或泛型字段调用时，如果擦除了返回类型，编译器会插入强制类型转换。

```java
Pair<Employee> buddies = ...;
Employee buddy = buddies.getFirst();
```

`getFirst`擦除类型后返回的是`Object`，编译器自动插入转换到`Employee`的强制类型转换。

- 对原始`Pair.getFirst`方法进行调用
- 将返回的`Object`类型强制转换为`Employee`类型

## 5.3 转换泛型方法

类型擦除也会发生在泛型方法中。**这里注意使用了桥方法保证多态。**



## 6. 限制与局限性

下面来看以下使用Java泛型时需要考虑的一些限制。

### 6.1 不能用基本类型代替参数类型

因为原型擦除后，会含有`Object`字段，而这个字段无法存储基本类型

### 6.2 运行时类型查询只适用于原始类型

虚拟机中的对象总有一个特定的泛型类型。因此所有的类型查询只产生原始类型。

```java
if(a instanceof Pair<String>); // Error
if(a instanceof Pair<T>); // Error
Pair<String> p = (Pair<String>) a; //Error
```

### 6.3 不能创建参数化类型的数组

数组会记住它的元素类型，如果试图存储其他类型的元素，会抛出错误。

### 6.4 Varargs警告

### 6.5 不能实例化类型变量

### 6.6 不能构造泛型数组

### 6.7 泛型类的静态上下文中类型变量无效

### 6.8 不能抛出或捕获泛型类的实例

### 6.9 可以取消对检查类型异常的检查

### 6.10 擦除后的冲突



## 7. 泛型类的继承规则



## 8. 通配符类型



## 9. 反射和泛型



























