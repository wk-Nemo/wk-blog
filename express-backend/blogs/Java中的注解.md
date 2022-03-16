---
title: Java中的注解
date: 2021-11-12 17:06:13
categories: 后端
---

## 注解

**概念：** 注解，也叫元数据。JDK1.5后提出的新特性，用于描述新特性。使用注解：`@注解名称`

**作用分类：**

- 编写文档：通过代码里标识的注解生成文档
- 代码分析：通过代码里的标识的注解对代码进行分析【使用反射】

- 编译检查：通过代码里标识的注解让编译器能够实现基本的编译检查

## jdk预定义的注解

- @Deprecated 已过期，表示方法是不被建议使用的
- @Override 重写，标识覆盖它的父类的方法
- @SuppressWarnings 压制警告，抑制警告

**Deprecated 注解**

可以修饰类、方法、变量，在java源码中被@Deprecated修饰的类、方法、变量等表示不建议使用的，可能会出现错误的，可能以后会被删除的类、方法等，如果现在使用，则在以后使用了这些类、方法的程序在更新新的JDK、jar包等就会出错，不再提供支持。
个人程序中的类、方法、变量用@Deprecated修饰同样是不希望自己和别人在以后的时间再次使用此类、方法。当编译器编译时遇到了使用@Deprecated修饰的类、方法、变量时会提示相应的警告信息。

**Override 注解**

指明被注解的方法需要覆写超类中的方法，如果某个方法使用了该注解，却没有覆写超类中的方法(如大小写写错了，或者参数错了，或者是子类自己定义的方法)，编译器就会生成一个错误。
在子类中重写父类或接口的方法，@Overide并不是必须的。但是还是建议使用这个注解，在某些情况下，假设你修改了父类的方法的名字，那么之前重写的子类方法将不再属于重写，如果没有@Overide，你将不会察觉到这个子类的方法。有了这个注解修饰，编译器则会提示你这些信息。

**Suppresswarnings 注解**

@SuppressWarnings用来抑制编译器生成警告信息，可以修饰的元素为类，方法，方法参数，属性，局部变量。它可以达到抑制编译器编译时产生警告的目的，使用@SuppressWarnings注解，采用就近原则，比如一个方法出现警告，尽量使用@SuppressWarnings注解这个方法，而不是注解方法所在的类。所属范围越小越好，因为范围大了，不利于发现该类下其他方法的警告信息。
但是很不建议使用@SuppressWarnings注解，使用此注解，开发人员看不到编译时编译器提示的相应的警告，不能选择更好、更新的类、方法或者不能编写更规范的编码。同时后期更新JDK、jar包等源码时，使用@SuppressWarnings注解的代码可能受新的JDK、jar包代码的支持，出现错误，仍然需要修改。

## 自己定义注解

**格式：** `public @interface 名称`



**本质：** 就是一个接口，默认继承`Annotation`接口

- `public interface MyAnno extends java.lang.annotation.Annotation {}`



**属性：** 接口中的抽象方法，有如下要求：

- 属性的返回值类型
  - 基本数据类型
  - 字符串 `String`
  - 枚举
  - 注解
  - 以上类型的数组
- 定义了属性，在使用时需要给属性赋值
  - 可以使用`default`初始化默认值
  - 如果只有一个属性需要赋值，并且属性的名称是`value`可以直接写值
  - 数组赋值时，使用大括号。如果数组中只有一个值，大括号可以省略

```java
package cn.itcast.annotation;

public @interface MyAnno {
  int show1();
  String show2();

  Person per();
  MyAnno2 anno2();

  String[] strs();
  int age();
  String name() default "wk";
}
```

```java
package cn.itcast.annotation;

@MyAnno(age=12, name="cy", ...)
public class Worker {

}
```



**元注解：** 用于描述注解的注解

- `@Target`：描述注解能够作用的位置
  - `ElemenType.TYPE`：类
  - `ElemenType.METHOD`：方法
  - `ElemenType.FIELD`：成员变量上
- `@Retention`：描述注解被保留的阶段
  - `@Retention(value={RetentionPolicy.RUNTIME})`：当前被描述的注解，会保留到class字节码文件中，并被JVM读取到
- `@Documented`：描述注解是否被抽取到api文档
- `@Inherited`：描述注解是否被子类继承

## 在程序中使用注解

配合反射进行一个小测试

```java
package cn.itcast.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 描述需要去执行的类名和方法名
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface Pro {
  String className();
  String methodName();
}
```

```java
package cn.itcast.annotation;

import java.io.IOException;
import java.io.InputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.Properties;

@Pro(className = "cn.itcast.annotation.Demo1", methodName = "show")
public class ReflectTest {
  public static void main(String[] args) throws Exception {
    // 1. 解析注解
    // 1.1 获取该类的字节码文件
    Class<ReflectTest> reflectTestClass = ReflectTest.class;

    // 2. 获取上边的注解对象
    Pro an = reflectTestClass.getAnnotation(Pro.class);

    // 3. 调用注解中的抽象方法，获取返回值
    String className = an.className();
    String methodName = an.methodName();
    System.out.println(className);
    System.out.println(methodName);

    // 4. 加载该类进内存
    Class cls = Class.forName(className);

    // 5.创建对象
    Object obj = cls.newInstance();

    // 6. 获取方法对象
    Method method = cls.getMethod(methodName);

    // 7. 执行方法
    method.invoke(obj);
  }
}

```



























