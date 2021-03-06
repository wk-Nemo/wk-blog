---
title: vue3笔记——lesson3
date: 2021-11-19 22:34:18
categories: Vue
---

## Computed Properties

Template expressions are very convenient. Putting too much logic in your templates can make them bloated and hard to maintain.

```html
<div id="computed-basics">
  <p>Has published books:</p>
  <span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
  <span>{{ publishedBooksMessage }}</span>
</div>
```

```js
Vue.createApp({
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the vm instance
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
  }
}).mount('#computed-basics')
```

**computed vs methods:**

- Computed properties are cached based on their reactive denpendencies.
- A method will always run the function whenever a re-render happens.

## Watchers

Watcher is most useful when you want to perform **asynchronous or expensive operations** in response to changing data.

```html
<div id="watch-example">
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</div>
```

```js
const watchExampleVM = Vue.createApp({
data() {
  return {
    question: '',
    answer: 'Questions usually contain a question mark. ;-)'
  }
},
watch: {
  // whenever question changes, this function will run
  question(newQuestion, oldQuestion) {
    if (newQuestion.indexOf('?') > -1) {
      this.getAnswer()
    }
  }
},
methods: {
  getAnswer() {
    this.answer = 'Thinking...'
    axios
      .get('https://yesno.wtf/api')
      .then(response => {
        this.answer = response.data.answer
      })
      .catch(error => {
        this.answer = 'Error! Could not reach the API. ' + error
      })
  }
}
}).mount('#watch-example')
```

## Class and Style Bindings

Scince class and style are both attributes, we can use `v-bind`. However, meddling with string concatenation is annoying and error-prone. For this reason, Vue provides special enhancements when `v-bind` is used with `class` and `style`. In addition to strings, the expression can also evaluate to **objects or arrays**.

### Binding HTML Classes

**1. Object Syntax**

- we can pass an object to `:class` to dynamically toggle classes
    ```html
    /*before render*/
    <div
      class="static"
      :class="{ active: isActive, 'text-danger': hasError }"
    ></div>
    
    /*after render*/
    <div class="static active"></div>
    ```
    ```js
    data() {
      return {
        isActive: true,
        hasError: false
      }
    }
    ```
- The bound object doesn't have to be inline
    ```html
    <div :class="classObject"></div>
    ```
    ```js
    data() {
      return {
        classObject: {
          active: true,
          'text-danger': false
        }
      }
    }
    ```
- we can also use `computed property` that return an object.
    ```html
    <div :class="classObject"></div>
    ```
    ```js
    data() {
      return {
        isActive: true,
        error: null
      }
    },
    computed: {
      classObject() {
        return {
          active: this.isActive && !this.error,
          'text-danger': this.error && this.error.type === 'fatal'
        }
      }
    }
    ```

**2. Array Syntax**

- we can pass an array to `:class` to apply a list of classes
    ```html
    /*before render*/
    <div :class="[activeClass, errorClass]"></div>
    
    /*after render*/
    <div class="active text-danger"></div>
    ```
    ```js
    data() {
      return {
        activeClass: 'active',
        errorClass: 'text-danger'
      }
    }
    ```
- we can use tenary expression
    ```html
    <div :class="[isActive ? activeClass : '', errorClass]"></div>
    ```
- we can use the object syntax inside array syntax
    ```html
    <div :class="[{ active: isActive }, errorClass]"></div>
    ```
    
### Binding Inline Style

**1. Object Syntax**

- A easy way looks like CSS
    ```html
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    ```
    ```js
    data() {
      return {
        activeColor: 'red',
        fontSize: 30
      }
    }
    ```
- I think it's a better way using a style object directly
    ```html
    <div :style="styleObject"></div>
    ```
    ```js
    data() {
      return {
        styleObject: {
          color: 'red',
          fontSize: '13px'
        }
      }
    }
    ```

**2. Array Syntax**

- Apply multiple style objects to the same element
    ```html
    <div :style="[baseStyles, overridingStyles]"></div>
    ```
    
## v-if & v-show

The directive `v-if` is used to conditionally render a block. This block will only be rendered if the directive's expression returns a truthcy value. We can also use `v-if` or `v-else-if`  add another bolock.

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

we can get the same function by using `v-show`

```html
<h1 v-show="ok">Hello!</h1>
```

**`v-if` pk `v-show`**

- `v-if` is real conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destoryed and re-created during toggles
    - `v-if` has higher toggle costs
    - prefer `v-if` if the condition is unlikely to change at runtime

- `v-show` just only toggles the `display` CSS property of the element.
    - `v-show` has heiger initial render costs
    - prefer `v-show` if we need to toggle something often













