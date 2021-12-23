---
title: React基础知识学习笔记
date: 2021-04-28 10:50:21
categories: 前端框架
---

# 第一章 课程简介

略

# 第二章 、第三章 React基础语法

参考官方文档

1. 跟着官方文档做一个井字棋：[入门教程: 认识 React](https://react.docschina.org/tutorial/tutorial.html)
2. 基础概念阅读：[开始](https://react.docschina.org/docs/getting-started.html)

# 第四章 React高级内容

## 4.1 React的插件安装

在谷歌应用商城可以下载



## 4.2 PropTypes, DefaultProps

分别可以预定义参数的类型和值



## 4.3 props，state和render的关系

当组建的props或state发生改变时，render函数就会重新执行



## 4.4 React中的虚拟DOM

一、大致思路

1. state 数据

2. ISX 模板

3. 数据 + 模板 结合，生成真实的DOM，进行显示

4. state发生改变

5. 数据 + 模板 结合，生成真实的DOM，替换原始的DOM



缺陷：

第一次生成了一个完整的DOM片段

第二次又生成了一个完整的DOM片段

第二次的DOM替换第一次的DOM，十分消耗性能



二、改进

1. state 数据

2. ISX 模板

3. 数据 + 模板 结合，生成真实的DOM，进行显示

4. state发生改变

5. 数据 + 模板 结合，生成真实的DOM
6. 新DOM（DocumentFragment）和原始DOM进行比较，找差异
7. 找出input框发生了变化
8. 只用新DOM中的input框替代老DOM中的input框



缺陷：

新DOM的生成对比的性能消耗增大，性能提升不明显



三、虚拟DOM：减少了真实DOM的创建和对比

1. state 数据

2. ISX 模板
3. 生成虚拟DOM（虚拟DOM是一个JS对象，用它描述真实的DOM）

4. 用虚拟DOM的结构生成真实的DOM，进行显示

5. state发生变化

6. 数据 + 模板 生成新的虚拟DOM（极大的提升了新能，因为生成真实的DOM消耗的性能是很大的，而虚拟DOM是JS对象，性能消耗很低）

7. 比较原始虚拟DOM和新的虚拟DOM的区别，找到区别

8. 直接操作DOM，改变内容

 

## 4.5 深入了解虚拟DOM

JSX -> JS对象 -> 真实DOM

JSX -> JS对象相当于使用了React.creatElement('标签',  {属性},  '子节点')



虚拟DOM的优点：

1. 新能提升
2. 跨端应用得以实现，让一些没有DOM概念的地方可以使用虚拟DOM转换成所需要的



## 4.6 虚拟DOM中的Diff算法

Diff算法即原始DOM和虚拟DOM进行比对的过程

一、setState是异步的，将多次setState合并成一次，提高性能。

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-uL2JBJtg-1619577222824)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210423152311212.png)\]](https://img-blog.csdnimg.cn/20210428103453493.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)


二、比对过程是同层比对

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-NPzDdtq1-1619577222827)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210423152505614.png)\]](https://img-blog.csdnimg.cn/20210428103508751.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)


若上层的比对结果不一样则替换下面的所有的DOM，这样虽然造成了一些DOM不能复用，但是却大大的减小了DOM的比对时间，算法也相对简单。



三、为什么index不适合做key值

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-fSujuHvg-1619577222828)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210423153118445.png)\]](https://img-blog.csdnimg.cn/20210428103525503.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)


虚拟DOM可以根据key值很方便的进行比对，如果使用index就不能确保拥有相同key值的新虚拟DOM和原始的虚拟DOM节点对应的是同一个节点



## 4.7 React中的ref

尽量不要操作DOM



## 4.8 React的生命周期函数

生命周期函数是在某一个时刻会自动执行的函数

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-j7In2kgL-1619577222830)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210423154829966.png)\]](https://img-blog.csdnimg.cn/20210428103541202.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)




一、constructor虽然不是react的生命周期函数，但是效果上一直，会在组件被创建的那一刻自动执行



二、初始化：Initialzation



三、挂载：Mounting

1. componentWillMount：在页面即将挂载到页面的时候自动执行，只执行一次
2. render：每个组件必须要有，执行情况：a.挂载 b.数据更新 c.父组件的render函数执行时
3. componentDidMount：组件被挂载到页面之后自动被执行，只执行一次



三、更新：Undation

注意区分props和states的变化



props和states共同部分：

1. shouldComponentUpdate：组件被更新前会自动执行

   需要返回一个Boolean类型的结果（理解为组件需要更新吗？）：true表示更新，false表示不更新

2. componentWillUpdate：确定更新后，组件更新之前自动执行

3. render

4. componentDidUpdate：组件更新完成之后执行



props独有部分：

1. componentWillReceiveProps：子组件在接受父组件传过来的数据之前自动执行

   ps：注意第一次存在于父组件中不会执行，如果之前已经存在于父组件中就会执行



四、Unmounting

componentWillUnmount：组件即将被剔除时执行



## 4.9 React生命周期函数的使用场景

一、子组件的性能优化

我们知道当父组件的render函数执行时，子组件的render函数也会执行，这样会造成一些不必要的性能浪费

```javascript
shouldComponentUpdate(nextProps, nextState) {
  if (nextProps.content !== this.state.content) {
    return true;
  } else {
    return false;
  }
}
```

可以在子组件使用shouldComponentUpdate设置返回fasle



二、Ajax请求

1. 不能放在render函数中，因为render函数会被反复执行
2. componentWillMount会和其他技术冲突

3. 一般放在componentDidMount，该函数只会执行一次
4. constructor中也可以放Ajax请求，但是componentDidMount最为推荐



## 4.10 Charles进行接口数据模拟

很简单，网上教程也很多



# 第五章 Redux入门

## 5.1 Redux简介

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-ein4iMY8-1619577222832)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210424140551466.png)\]](https://img-blog.csdnimg.cn/2021042810375791.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)


将数据放在一个公共的store中，这样就避免了不同层次组件之间传值的麻烦



Redux = Reducer + Flux



## 5.2 Redux的工作流程

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-nTt6W3I3-1619577222834)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210425143013193.png)\]](https://img-blog.csdnimg.cn/2021042810381597.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)


将整个过程比作图书馆借书：

1. React Components 相当于图书馆借书的人
2. Action Creators 相当于借书人说要借什么书的话
3. store 相当于图书馆的管理员
4. Reducers 相当于图书的记录本，方便管理员对图书进行管理



核心API

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-ts87ad5O-1619577222834)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210425161428840.png)\]](https://img-blog.csdnimg.cn/20210428103826125.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)


1. createStore：创建一个store
2. store.dispatch：
   - 通过action将新的数据传给store
   - store再将其记录在reducer
   - reducer返回一个新的数据给store
   - store对自己进行修改

3. store.getState: 获取store的数据
4. store.subscribe：感知store数据的变化，并可以执行传入的函数



# 第六章、Redux进阶

## 6.1 UI组件（傻瓜组件）和容器组件（聪明组件）

将一个大的组件拆分为UI和逻辑两个部分，分别放在UI组件和容器组件中



## 6.2 无状态组件

当组件只有一个render函数，而不需要组件的其他生命周期函数的时候，可以使用无状态组件代替。提高了性能。

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-5EMi8pE2-1619577222835)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210425173030707.png)\]](https://img-blog.csdnimg.cn/20210428103849738.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)




## 6.3 使用axios发送ajax请求

简单



## 6.4 使用Redux-thunk中间件发送ajax请求

1. npm install redux-thunk --save
2. 在store下进行调用

 ![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-GyOWIfUn-1619577222836)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210427161819189.png)\]](https://img-blog.csdnimg.cn/20210428103907565.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)


3. actionCreator上编写函数

```javascript
export const getTodoList = () => {
  return (dispatch) => {
    axios.get('./list.json').then((res) => {
      const data = res.data;
      const action = initListAction(data);
      dispatch(action);
    })
  }
}
```

4. 在componentDidMount()生命周期函数中调用getTodoList()，此时函数返回的也是一个函数，将该函数使用dispatch进行传递，因为中间件的存在使之可行。

```javascript
componentDidMount() {
    const action = getTodoList();
    store.dispatch(action);
}
```



## 6.5 Redux-thunk原理介绍

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-toHLjcRA-1619577222837)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210427162442626.png)\]](https://img-blog.csdnimg.cn/20210428103924252.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)






在原始的redux中，action将对象派发给store。

但是在Redux-thunk中间件的帮助下，可以派发函数给store。是因为中间件对dispatch进行了一个升级，使之可以处理函数。



## 6.6 - 6.7 Redux-saga中间件的使用

[sagas官方文档](https://github.com/redux-saga/redux-saga)，使用过程如下：

1. 引入saga

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-679QMtx4-1619577222838)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210427171125386.png)\]](https://img-blog.csdnimg.cn/2021042810394152.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)


2. redux正常操作

```javascript
componentDidMount() {
    const action = getInitList();
    store.dispatch(action)
    store.subscribe(this.handleStoreChange);
}
```



3. 编写sagas文件，在dispatch给store传输数据的时候，sagas文件也会接收到相关信息，并执行相关函数。

![\[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-NiQlUkh0-1619577222839)(C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20210427171055243.png)\]](https://img-blog.csdnimg.cn/2021042810400117.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk1MDE0Mg==,size_16,color_FFFFFF,t_70)


## 6.8 React-Redux的使用
使用过程如下：

1. store的index.js文件和reducer.js文件正常创建编写

```javascript
// store/index.js
import { createStore } from 'redux';
import reducer from './reducer'

const store = createStore(reducer);

export default store;

// store/reducer.js
const defaultState = {
  inputValue: 'ashdkashd',
  list: []
}

export default (state = defaultState, action) => {
  if (action.type === 'change_input_value') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }
  if (action.type === 'add_list_item') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(state.inputValue);
    newState.inputValue = '';
    return newState;
  }
  if (action.type === 'delete_list_item') {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }
  return state
}
```



2. index文件使用react-redux中的Provider

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList2';
import { Provider } from 'react-redux';
import store from './store2'

const App = (
  <Provider store={store}>
    <TodoList />
  </Provider>
);


ReactDOM.render(App, document.getElementById('root'));
```



3. TodoList 文件使用react-redux中的connect,并在传入的两个参数内分别获取和改变数据

```javascript
import React, {Component} from 'react';
import { connect } from 'react-redux'

const TodoList = (props) => {
  const {inputValue, changeInputValue, handleClick, handleDeleteItem, list} = props;
  return (
    <div>
      <div>
        <input value={inputValue} onChange={changeInputValue}/>
        <button onClick={handleClick}>提交</button>
      </div>
      <ul>
        {
          list.map((item, index) => {
            return <li onClick={() => handleDeleteItem(index)} key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    inputValue: state.inputValue,
    list: state.list
  }
}

// store.dispatch, props
const mapDispatchToProps = (dispatch) => {
  return {
    changeInputValue (e) {
      const action = {
        type: 'change_input_value',
        value: e.target.value
      }
      dispatch(action);
    },
    handleClick () {
      const action = {
        type: 'add_list_item'
      };
      dispatch(action);
    },
    handleDeleteItem (index) {
      const action = {
        type: 'delete_list_item',
        index: index
      }
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```








