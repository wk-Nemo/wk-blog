---
title: vue3笔记——lesson2
date: 2021-11-17 22:34:18
categories: Vue
---


## Lifecycle Hooks

Each component instance goes through a series of initialization steps when it's created. it also run functions called **lifecycle hooks**, giving user the opportunity to add their own code at specific stages.

```js
Vue.createApp({
  data() {
    return { count: 1 }
  },
  created() {
    // `this` points to the vm instance
    console.log('count is: ' + this.count) // => "count is: 1"
  }
})
```

Here we can't use arrow function on an options property or callback.Since an arrow function doesn't have a `this`, `this` will be treated as any other variable and lexically look up through parent scopes until found.

Below is a diagram for the instance lifecycle
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/270b68730de24913bbe737eceb3ba485~tplv-k3u1fbpfcp-watermark.image?)

## Template Syntax

**Mustache Syntax(double curly braces)**

The mustache tag will be replaced of the value of the msg property from the correnponding component instance. It will also be updated whenever the msg property changes.

```html
<span>Message: {{ msg }}</span>
```

The double mustaches interprets the data as plain text, not HTML. In order to output real HTML, you will need to use `v-html` directive.

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a8747886a35a4dc39fbc9587312c65de~tplv-k3u1fbpfcp-watermark.image?)

## Directives

we have learned in lesson1 such as `v-if`, `v-for`, `v-on` and so on.

### arguments(参数)

Some directives can take an "argument", donated by a colon after the directive name.

```html
<a v-bind:href="url"> ... </a>
<a v-on:click="doSomething"> ... </a>
```

### Dynamic Arguments

Here `attributeName` will be dynamicly evaluated as a JavaScript expression, its value will be used as the final value for the argument.

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

when `evetName`'s value is `focus`, `v-on:[eventName]` will be equivalent to `v-on:focus`.

### Modifiers(修饰符)

Modifiers are special postfixes(后缀) donated by a dot, which indicate that a directive should be bound in some special way.

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

### Shorthand

`v-bind`:

```html
<!-- full syntax -->
<a v-bind:href="url"> ... </a>

<!-- shorthand -->
<a :href="url"> ... </a>

<!-- shorthand with dynamic argument -->
<a :[key]="url"> ... </a>
```

`v-on`:

```html
<!-- full syntax -->
<a v-on:click="doSomething"> ... </a>

<!-- shorthand -->
<a @click="doSomething"> ... </a>

<!-- shorthand with dynamic argument -->
<a @[event]="doSomething"> ... </a>
```

## Data Properties

The `data` option for a component is a function. Vue calls this function as part of creating a new component instance.

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  }
})
```

- it should return an object, which Vue will then wrap in its reactivity system and store on the component instance as `$data`
    ```js
    const vm = app.mount('#app')
    console.log(vm.$data.count) // => 4
    vm.count = 5
    console.log(vm.$data.count) // => 5
    ```
- any top-level properties of that object are also exposed directively via the component instance+
    ```js
    const vm = app.mount('#app')
    console.log(vm.count)       // => 4
    vm.$data.count = 6
    console.log(vm.count) // => 6
    ```
    
## Methods

To add methods to a component instance we use the `methods` option. This should be an object containing  the desired methods:

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  },
  methods: {
    increment() {
      // `this` will refer to the component instance
      this.count++
    }
  }
})
```

Vue automaltically binds `this` value for `methods` so that it always refers to the component instance. 
- This ensures that a method retains the correct `this` value if it's used as an event listener or callback. 
- You should avoid using arrow functions when defining `methods`, as that prevent Vue from binding the appropriate `this` value.


**Inside a template they are most commonly used as event listeners**

```html
<button @click="increment">Up vote</button>
```







