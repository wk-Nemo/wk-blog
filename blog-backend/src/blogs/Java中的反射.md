---
title: Java中的反射
date: 2021-11-12 17:06:13
categories: 后端
---

## 反射：框架设计的灵魂

**概念：** 将类的各个组成部分**封装为其他对象**，这就是反射机制。

**Java代码在计算机中经历的三个阶段：**

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7362531b029345ae822610dd5dd32891~tplv-k3u1fbpfcp-watermark.image?)

好处：
- 可以在程序运行的过程中可以操作这些对象
- 可以解耦，提高程序的可扩展性

**获取`class`对象的三个阶段，分别对应上面的三个阶段：**
- `class.forName("全类名")`：将字节码文件加载进内存，返回`class`对象
    - 多用于配置文件，将类名定义在配置文件中。读取文件，加载类。
- `类名.class`：通过类名的属性获取
    - 多用于参数的传递
- `对象.getClass()`：继承自`Object`的方法
    - 多用于对象的获取字节码的方式

```java
package cn.itcast.reflect;

import cn.itcast.domian.Person;

public class ReflectDemo1 {
  public static void main(String[] args) throws Exception {
    Class cls1 = Class.forName("cn.itcast.domian.Person");
    System.out.println(cls1);

    Class cls2 = Person.class;
    System.out.println(cls2);

    Person p = new Person();
    Class cls3 = p.getClass();
    System.out.println(cls3);

    System.out.println(cls1 == cls2); // true
    System.out.println(cls1 == cls3); // true
  }
}
```

结论：同一个字节码文件（.class）在一次程序运行的过程中，只会被加载一次，不论是通过哪一种方式获取的`class`对象都是一个。

## class对象的功能

### 获取成员变量们
- `Field[] getFileds()`：获取所有`public`修饰的成员变量
- `Field[] getFiled(String name)`：获取指定的`public`修饰的成员变量
- `Field[] getDeclareFileds()`：获取所有的成员变量（不考虑修饰符）
- `Field[] getDeclareFiled(String name)`：获取指定的成员变量（不考虑修饰符）

`Filed`：成员变量
- 获取值：`void set(Object obj, Object value)`
- 设置值：`get(Object obj)`

```java
package cn.itcast.reflect;

import cn.itcast.domian.Person;

import java.lang.reflect.Field;

public class ReflectDemo2 {
  public static void main(String[] args) throws Exception {
    Class personClass = Person.class;
    Person p = new Person();

    // 获取成员变量
    System.out.println("========getFields========");
    Field[] fileds = personClass.getFields();
    for(Field field: fileds) {
      System.out.println(field);
    }

    System.out.println("---------------");
    Field a = personClass.getField("a");
    Object value = a.get(p);
    System.out.println(value);
    a.set(p, "张三");
    System.out.println(p);

    System.out.println("=======getDeclaredFields=========");
    Field[] declareFileds = personClass.getDeclaredFields();
    for(Field field: declareFileds) {
      System.out.println(field);
    }

    System.out.println("---------------");
    Field name = personClass.getDeclaredField("name");
    // 直接访问private会报错，该设置可以忽略权限修饰符的安全检查
    name.setAccessible(true); // 暴力反射
    Object value2 = name.get(p);
    System.out.println(value2);
    name.set(p, "wk");
    System.out.println(p);
  }
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f37ccf0912ef487c8297dd00dd8275a3~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08bb66e65c7f424ba6392fcd116a8409~tplv-k3u1fbpfcp-watermark.image?)

### 获取构造方法们
- `Constructor<?>[] getConstructors()`
- `Constructor<T> getConstructor(类<?>... parameterTypes)`
- `Constructor<?>[] getDeclareConstructors()`
- `Constructor<T> getDeclareConstructor(类<?>... parameterTypes)`

`Constructor`：构造方法
- 创建对象：`T newInstance(Object... initargs)`

```java
package cn.itcast.reflect;

import cn.itcast.domian.Person;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;

public class ReflectDemo3 {
  public static void main(String[] args) throws Exception {
    Class personClass = Person.class;
    Person p = new Person();

    // 获取成员变量
    System.out.println("========getConstructors========");
    Constructor constructor = personClass.getConstructor(String.class, int.class);
    System.out.println(constructor);
    // 创建对象
    Object person = constructor.newInstance("zhangsan", 33);
    System.out.println(person);

    System.out.println("=======getDeclareConstructors=========");
  }
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86593d22a1364f9fa84e96e4b8897c20~tplv-k3u1fbpfcp-watermark.image?)

### 获取成员方法们
- `Method[] getMethods()`
- `Method getMethod(String name, 类<?>... parameterTypes)`
- `Method[] getDeclareMethods()`
- `Method getDeclareMethod(String name, 类<?>... parameterTypes)`

`Method`：方法对象
- 执行方法：`Object invoke(Objcet obj, Object... args)`
- 获取方法名称：`String getName()`

```java
package cn.itcast.reflect;

import cn.itcast.domian.Person;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;

public class ReflectDemo4 {
  public static void main(String[] args) throws Exception {
    Class personClass = Person.class;
    Person p = new Person();

    // 获取成员变量
    System.out.println("========getMethods========");
    Method[] methods = personClass.getMethods();
    for(Method m: methods) {
      System.out.println(m);
    }

    System.out.println("-----------------");
    Method eat_Method = personClass.getMethod("eat");
    eat_Method.invoke(p);

    Method eat_Method2 = personClass.getMethod("eat", String.class);
    eat_Method2.invoke(p,"apple");


    System.out.println("=======getDeclareConstructors=========");
    System.out.println("省略。。");
  }
}
```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eff07486ade04e78a124f076ed0741d9~tplv-k3u1fbpfcp-watermark.image?)

## 反射小应用

写一个“框架”，可以帮我们创造任意类的对象，并执行其中任意方法。

**实现：**
- 配置文件
- 反射

**步骤：**
- 将需要创建的对象的全类名和需要执行的方法定义在配置文件中
- 在程序中加载读取配置文件
- 使用反射技术加载类进内存
- 创建对象
- 执行方法

```java
package cn.itcast.reflect;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Method;
import java.util.Properties;

public class ReflectTest {
  public static void main(String[] args) throws IOException, Exception {
    // 可以帮我们创造任意类的对象，并执行其中任意方法

    // 1. 加载配置文件
    // 1.1 创建 Properties 对象
    Properties pro = new Properties();
    // 1.2 加载配置文件， 转换成一个集合
    ClassLoader classLoader = ReflectTest.class.getClassLoader();
    InputStream is = classLoader.getResourceAsStream("pro.properties");
    pro.load(is);

    // 2. 获取配置文件中的定义数据
    String className = pro.getProperty("className");
    String methodName = pro.getProperty("methodName");

    // 3. 加载该类进内存
    Class cls = Class.forName(className);

    // 4.创建对象
    Object obj = cls.newInstance();

    // 5. 获取方法对象
    Method method = cls.getMethod(methodName);

    // 6. 执行方法
    method.invoke(obj);
  }
}
```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bfadd2b295654f5384fb6186b1266a2e~tplv-k3u1fbpfcp-watermark.image?)
    