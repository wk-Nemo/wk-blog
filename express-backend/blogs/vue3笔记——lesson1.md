---
title: vue3笔记——lesson1
date: 2021-11-15 22:34:18
categories: Vue
---

## what is Vue

-   A **progressive framework** for building user interfaces
-   Designed from the ground up to be incrementally adoptable（自底向上逐层应用）
-   Core library is focused on the **view layer** only and is easy to pick up and integrate with other library or existing projects
-   Be capable of powering **sophisticated Single-Page Applications** when used in combination with modern tooling and supporting library

## Declarative Rending(声明式渲染)

render data to DOM using straightforward **template syntax**

```
<div id="counter">
  Counter: {{ counter }}
</div>
```

```
const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}
​
Vue.createApp(Counter).mount('#counter')
```

## Directive(指令)

### 1. v-bind

The `v-bind` attribute is called directive(指令).

-   Directives are prefixed with `v-` to indicate that they are special attributes provided by Vue.
-   Directives apply special reactive behavior to the rendered DOM

```
<div id="bind-attribute">
  <span v-bind:title="message">
    Hover your mouse over me for a few seconds to see my dynamically bound
    title!
  </span>
</div>
```

```
const AttributeBinding = {
  data() {
    return {
      message: 'You loaded this page on ' + new Date().toLocaleString()
    }
  }
}

Vue.createApp(AttributeBinding).mount('#bind-attribute')
```

### 2. v-on

we can use `v-on` directive to attach event listeners that invoke methods on our instances.

```
<div id="event-handling">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">反转 Message</button>
</div>
```

```
const EventHandling = {
  data() {
    return {
      message: 'Hello Vue.js!'
    }
  },
  methods: {
    reverseMessage() {
      this.message = this.message
        .split('')
        .reverse()
        .join('')
    }
  }
}
​
Vue.createApp(EventHandling).mount('#event-handling')
```

### 3. v- model

The `v-model` directive can make **two-way binding** between from input and app state breeze

```
<div id="two-way-binding">
  <p>{{ message }}</p>
  <input v-model="message" />
</div>
```

```
const TwoWayBinding = {
  data() {
    return {
      message: 'Hello Vue!'
    }
  }
}
​
Vue.createApp(TwoWayBinding).mount('#two-way-binding')
```

### 4. v-if

we can bind data to not only text and attributes, but also the structure of the DOM

```
<div id="conditional-rendering">
  <span v-if="seen">Now you see me</span>
</div>
```

```
const ConditionalRendering = {
  data() {
    return {
      seen: true
    }
  }
}

Vue.createApp(ConditionalRendering).mount('#conditional-rendering')
```

### 5. v-for

`v-for` directive can be used to display a list of items using the data from an array

```
<div id="list-rendering">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```
const ListRendering = {
  data() {
    return {
      todos: [
        { text: 'Learn JavaScript' },
        { text: 'Learn Vue' },
        { text: 'Build something awesome' }
      ]
    }
  }
}

Vue.createApp(ListRendering).mount('#list-rendering')
```

## Composing with Components

The component system is another important concept in Vue.

-   Allow us to build large-scale applications composed of small, self-contained, and often reusable components
-   Any type of application interface can be abstracted into a tree of components

**Registering a component**

```
const TodoItem = {
  template: `<li>This is a todo</li>`
}

// Create Vue application
const app = Vue.createApp({
  components: {
    TodoItem // Register a new component
  },
  ... // Other properties for the component
})

// Mount Vue application
app.mount(...)
```

compose it in another component's template

```
<ol>
  <!-- Create an instance of the todo-item component -->
  <todo-item></todo-item>
</ol>
```

pass data from the parent scope into child components by **prop**

```
app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})
```

```
<div id="todo-list-app">
  <ol>
    <!--
      Now we provide each todo-item with the todo object
      it's representing, so that its content can be dynamic.
      We also need to provide each component with a "key",
      which will be explained later.
    -->
    <todo-item
      v-for="item in groceryList"
      v-bind:todo="item"
      v-bind:key="item.id"
    ></todo-item>
  </ol>
</div>
```

```
const TodoList = {
  data() {
    return {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
  }
}

const app = Vue.createApp(TodoList)

app.component('todo-item', {
  props: ['todo'],
  template: `<li>{{ todo.text }}</li>`
})

app.mount('#todo-list-app')
```

