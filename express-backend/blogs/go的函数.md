---
title: go的数据结构
date: 2021-11-04 17:06:13
categories: 后端
---

## 函数声明

函数声明包括**函数名**、**形参**、**返回值**和**函数体**

```go
func hypot(x, y float64) float64 {
    return math.Sqrt(x*x + y*y)
}
fmt.Println(hypot(3,4)) // "5"
```

- 形式参数列表描述了函数的参数名以及参数类型。这些参数作为局部变量，其值由参数调用者提供。
- 返回值列表描述了函数返回值的变量名以及类型。如果函数返回一个无名变量或者没有返回值，返回值列表的括号是可以省略的。

**如果一组形参或返回值有相同的类型，我们不必为每个形参都写出参数类型。**

```go
func f(i, j, k int, s, t string)                 { /* ... */ }
func f(i int, j int, k int,  s string, t string) { /* ... */ }
```

**返回值也可以像形式参数一样被命名。** 

- 在这种情况下，每个返回值被声明成一个局部变量，并根据该返回值的类型，将其初始化为该类型的零值。 
- 如果一个函数在声明时，包含返回值列表，该函数必须以 return语句结尾，除非函数明显无法运行到结尾处。

```go
func add(x int, y int) int   {return x + y}
func sub(x, y int) (z int)   { z = x - y; return}
```

在函数体中，**函数的形参作为局部变量，被初始化为调用者提供的值**。函数的形参和有名返回值作为函数最外层的局部变量，被存储在相同的词法块中。

**实参通过值的方式传递，因此函数的形参是实参的拷贝。** 对形参进行修改不会影响实参。但是，如果实参包括引用类型，如指针，slice(切片)、map、function、channel等类型，实参可能会由于函数的间接引用被修改。



## 返回多个值

**在Go中，一个函数可以返回多个值。** 许多标准库中的函数返回2个值，一个是期望得到的返回值，另一个是函数出错时的错误信息。

```go
func findLinks(url string) ([]string, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    if resp.StatusCode != http.StatusOK {
        resp.Body.Close()
        return nil, fmt.Errorf("getting %s: %s", url, resp.Status)
    }
    doc, err := html.Parse(resp.Body)
    resp.Body.Close()
    if err != nil {
        return nil, fmt.Errorf("parsing %s as HTML: %v", url, err)
    }
    return visit(nil, doc), nil
}
```

**调用多返回值函数时，返回给调用者的是一组值，调用者必须显式的将这些值分配给变量**

```go
links, err := findLinks(url)
```

**如果某个值不被使用，可以将其分配给blank identifier**

```go
links, _ := findLinks(url) // errors ignored
```

**如果一个函数所有的返回值都有显式的变量名，那么该函数的return语句可以省略操作数。这称之为bare return。**

```go
func CountWordsAndImages(url string) (words, images int, err error) {
    resp, err := http.Get(url)
    if err != nil {
        return
    }
    doc, err := html.Parse(resp.Body)
    resp.Body.Close()
    if err != nil {
        err = fmt.Errorf("parsing HTML: %s", err)
        return
    }
    words, images = countWordsAndImages(doc)
    return
}
```

按照返回值列表的次序，返回所有的返回值，在上面的例子中，每一个return语句等价于：

```
return words, images, err
```



## 可变参数

参数数量可变的函数称为可变参数函数。典型的例子就是fmt.Printf和类似函数。Printf首先接收一个必备的参数，之后接收任意个数的后续参数。

```go
func sum(vals ...int) int {
    total := 0
    for _, val := range vals {
        total += val
    }
    return total
}

fmt.Println(sum())           // "0"
fmt.Println(sum(3))          // "3"
fmt.Println(sum(1, 2, 3, 4)) // "10"
```

如果原始参数已经是切片类型，只需在最后一个参数后加上省略符。

```go
values := []int{1, 2, 3, 4}
fmt.Println(sum(values...)) // "10"
```



## 匿名函数

拥有函数名的函数只能在包级语法块中被声明，通过函数字面量（function literal），我们可绕过这一限制，在任何表达式中表示一个函数值。函数字面量的语法和函数声明相似，区别在于func关键字后没有函数名。函数值字面量是一种表达式，它的值被称为匿名函数（anonymous function）。

```go
strings.Map(func(r rune) rune { 
    return r + 1 
}, "HAL-9000")
```

在函数内部可以声明匿名函数，但不能声明一个正常的函数

```go
func a(data1 int) {
   fmt.Println(data1)
   b := func(data2 int) {
      fmt.Println(data2)
   }
   b(3)
}
```



## 闭包函数

通过这种方式定义的函数可以访问完整的词法环境（感觉类似js的闭包），这意味着在函数中定义的内部函数可以引用该函数的变量，如下例所示：

```go
// squares返回一个匿名函数。
// 该匿名函数每次被调用时都会返回下一个数的平方。
func squares() func() int {
    var x int
    return func() int {
        x++
        return x * x
    }
}
func main() {
    f := squares()
    fmt.Println(f()) // "1"
    fmt.Println(f()) // "4"
    fmt.Println(f()) // "9"
    fmt.Println(f()) // "16"
}
```



## 自执行函数

```go
func main() {
   // 自执行函数
   (func() {
      fmt.Println("hello world")
   })()
}
```



## Deferred函数

延迟调用，即无论在哪，加了defer的函数会最后执行

```go
func main() {
   defer def1()
   fmt.Println("1")
   fmt.Println("2")
   defer def2()
   fmt.Println("3")
}

func def1() {
   fmt.Println("i am defer1")
}

func def2() {
   fmt.Println("i am defer2")
}
```

最后输出结果：

- 1
- 2
- 3
- i am defer2
- i am defer1
- 