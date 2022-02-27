# wk-blog
use vue3 to finish my blog

## 设计思路

博客前后端分离。

### 1. 前端

前端主要展示的内容有：封面、首页、归档、分类和标签。
- 顶部展示封面 √
- 进入页面后就是首页 √
- 归档、分类和标签等通过左侧导航栏来实现 √

头部导航
- 首页 √
- 文章
- 关于
- 友链 √
- 模式（黑夜/白昼）

home页面
- 列表优化，进行分页处理
- 翻页到达顶部
  - windows √
  - ios

内部导航球
- 内容阅读
- 到顶
- 到底

分类设计
- 解析分类文件
- 将文章进行分类

标签设计
- 解析标签文件
- 将文章进行标签分类

博客内容展示考虑点
- 文档的读取与转换 √
- markdown 的样式 √

### 2. 后端

- 使用express框架给前端提供相应的接口
  - article
  - category
  - tag
- 本地检查博客文件，自动转换成mysql数据

## 效果预览

### 1. 首页
**pc端首页:**

- 白昼模式

![image](https://user-images.githubusercontent.com/62100025/147407630-bbc2b567-5f5f-44b2-bdb3-7c05ccfc0279.png)


- 黑夜模式

![image](https://user-images.githubusercontent.com/62100025/147407697-2e8b4fe0-002e-4842-8db5-c7a3c9e21619.png)

**移动端首页：**

- 白昼模式

![image](https://user-images.githubusercontent.com/62100025/147407751-85eec55a-57bb-4339-8c30-85cd36403845.png)

- 黑夜模式

![image](https://user-images.githubusercontent.com/62100025/147407765-ebdfb5cf-2dbe-44c3-bb01-f1a346e30218.png)

### 2. 博客内容

pc端首页:

- 白昼模式

![image](https://user-images.githubusercontent.com/62100025/147316151-e319e40c-a0bf-418e-914c-8a35ad01e534.png)

- 黑夜模式

![image](https://user-images.githubusercontent.com/62100025/147407814-5c9148d0-a492-4130-8b34-f35472a10de3.png)


移动端首页：

- 白昼模式

![image](https://user-images.githubusercontent.com/62100025/147316178-3de62062-a953-43f8-8ae0-e3e83d82dec6.png)

- 黑夜模式

![image](https://user-images.githubusercontent.com/62100025/147407836-df5d9453-de0e-40af-9064-d0d9ea077aa8.png)

