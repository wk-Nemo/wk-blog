---
title: go的数据结构
date: 2021-11-01 17:06:13
categories: 后端
---

## 基础数据类型

- 整型
- 浮点数
- 复数
- 布尔值
- 字符串
- 常量



## 复合数据类型

- 数组
- Slice
- Map
- 结构体
- JSON
- 文本和HTML模板



## 数组

数组是一个由固定长度的特定类型元素组成的序列，一个数组可以由零个或多个元素组成。

ps：因为数组的长度固定，因此Go语言中很少直接使用数组

**1. 数组的每个元素可以通过下标访问**

```go
var a [3]int             // array of 3 integers
fmt.Println(a[0])        // print the first element
fmt.Println(a[len(a)-1]) // print the last element, a[2]

// Print the indices and elements.
for i, v := range a {
    fmt.Printf("%d %d\n", i, v)
}

// Print the elements only.
for _, v := range a {
    fmt.Printf("%d\n", v)
}
```



**2. 数组的每个元素初始化为元素类型对应的零值**

可以使用数组面值语法用一组值初始化数组

```go
var q [3]int = [3]int{1, 2, 3}
var r [3]int = [3]int{1, 2}
fmt.Println(r[2]) // "0"
```

在数组字面值中，如果在数组的长度位置出现的是“...”省略号，则表示数组的长度是根据初始化值的个数来计算。因此，上面q数组的定义可以简化为

```go
q := [...]int{1, 2, 3}
fmt.Printf("%T\n", q) // "[3]int"
```

定义了一个含有100个元素的数组r，最后一个元素被初始化为-1，其它元素都是用0初始化。

```go
r := [...]int{99: -1}
```

如果一个数组的元素类型是可以相互比较的，那么数组类型也是可以相互比较的，这时候我们可以直接通过==比较运算符来比较两个数组，只有当两个数组的所有元素都是相等的时候数组才是相等的。不相等比较运算符!=遵循同样的规则。

```go
a := [2]int{1, 2}
b := [...]int{1, 2}
c := [2]int{1, 3}
fmt.Println(a == b, a == c, b == c) // "true false false"
d := [3]int{1, 2}
fmt.Println(a == d) // compile error: cannot compare [2]int == [3]int
```



## Slice

Slice（切片）代表变长的序列，序列中每个元素都有相同的类型。一个slice类型一般写作[]T，其中T代表slice中元素的类型；slice的语法和数组很像，只是没有固定长度而已。

- 一个slice是一个轻量级的数据结构，提供了访问数组子序列（或者全部）元素的功能
- 一个slice由三个部分构成：指针、长度和容量。
  - 指针指向第一个slice元素对应的底层数组元素的地址，要注意的是slice的第一个元素并不一定就是数组的第一个元素
  - 长度对应slice中元素的数目；长度不能超过容量，容量一般是从slice的开始位置到底层数据的结尾位置
  - 内置的len和cap函数分别返回slice的长度和容量

定义一个数组

```go
months := [...]string{1: "January", /* ... */, 12: "December"}
```

**切片操作**

```go
Q2 := months[4:7]
summer := months[6:9]
fmt.Println(Q2)     // ["April" "May" "June"]
fmt.Println(summer) // ["June" "July" "August"]
```

- slice的切片操作s[i:j]，其中0 ≤ i≤ j≤ cap(s)，用于创建一个新的slice，引用s的从第i个元素开始到第j-1个元素的子序列。
- 如果i位置的索引被省略的话将使用0代替，如果j位置的索引被省略的话将使用len(s)代替。
  - months[1:13]切片操作将引用全部有效的月份，和months[1:]操作等价；
  - months[:]切片操作则是引用整个数组。

**如果切片操作超出cap(s)的上限将导致一个panic异常**

```go
fmt.Println(summer[:20]) // panic: out of range
```

**但是超出len(s)则是意味着扩展了slice，因为新slice的长度会变大**

```go
endlessSummer := summer[:5] // extend a slice (within capacity)
fmt.Println(endlessSummer)  // "[June July August September October]"
```

**因为slice值包含指向第一个slice元素的指针，因此向函数传递slice将允许在函数内部修改底层数组的元素。**

```go
func reverse(s []int) {
    for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
        s[i], s[j] = s[j], s[i]
    }
}


a := [...]int{0, 1, 2, 3, 4, 5}
reverse(a[:])
fmt.Println(a) // "[5 4 3 2 1 0]"
```

**slice vs 数组**

- slice和数组的字面值语法很类似，它们都是用花括弧包含一系列的初始化元素，但是对于slice并没有指明序列的长度。这会隐式地创建一个合适大小的数组，然后slice的指针指向底层的数组。
- 和数组不同的是，slice之间不能比较，因此我们不能使用==操作符来判断两个slice是否含有全部相等元素。

**内置的append函数用于向slice追加元素**

```go
var runes []rune
for _, r := range "Hello, 世界" {
    runes = append(runes, r)
}
fmt.Printf("%q\n", runes) // "['H' 'e' 'l' 'l' 'o' ',' ' ' '世' '界']"
```



## Map

在Go语言中，一个map就是一个哈希表的引用，map类型可以写为map[K]V，其中K和V分别对应key和value。

**创建Map的两种方式：**

- 内置make函数

  ```go
  ages := make(map[string]int) // mapping from strings to ints
  ages["alice"] = 31
  ages["charlie"] = 34
  ```

- map字面值语法

  ```go
  ages := map[string]int{
      "alice":   31,
      "charlie": 34,
  }
  ```

**访问**

```go
ages["alice"] = 32
fmt.Println(ages["alice"]) // "32"
```

**删除**

```go
delete(ages, "alice") // remove element ages["alice"]
```

**所有这些操作是安全的**，即使这些元素不在map中也没有关系；如果一个查找失败将返回value类型对应的零值，例如，即使map中不存在“bob”下面的代码也可以正常工作，因为ages["bob"]失败时将返回0。

```go
ages["bob"] = ages["bob"] + 1 // happy birthday!
```

但是map中的元素并不是一个变量，因此我们**不能对map的元素进行取址操作**。禁止对map元素取址的原因是map可能随着元素数量的增长而重新分配更大的内存空间，从而可能导致之前的地址无效。

```go
_ = &ages["bob"] // compile error: cannot take address of map element
```

要想**遍历map中全部的key/value对**的话，可以使用range风格的for循环实现，和之前的slice遍历语法类似。下面的迭代语句将在每次迭代时设置name和age变量，它们对应下一个键/值对：

```go
for name, age := range ages {
    fmt.Printf("%s\t%d\n", name, age)
}
```



## 结构体

结构体是一种聚合的数据类型，是由零个或多个任意类型的值聚合成的实体。每个值称为结构体的成员。

下面两个语句声明了一个叫Employee的命名的结构体类型，并且声明了一个Employee类型的变量dilbert：

```go
type Employee struct {
    ID        int
    Name      string
    Address   string
    DoB       time.Time
    Position  string
    Salary    int
    ManagerID int
}

var dilbert Employee
```

