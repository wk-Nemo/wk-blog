# wk-blog
use vue3 to finish my blog

## 设计思路

博客前后端分离。

### 1. 前端

前端主要展示的内容有：封面、首页、归档、分类和标签。
- 顶部展示封面 √
- 进入页面后就是首页 √
- 归档、分类和标签等通过左侧导航栏来实现 √

博客内容展示考虑点
- 文档的读取与转换 √
- markdown 的样式 √

### 2. 后端

普通的接口编写，主要是操作数据库，将数据库中的内容传递给前端。

考虑的问题：不想再编写一个管理平台，因为只有以下几个部分的管理
- 分类添加
- 标签添加
- 文章添加 √

考虑使用node在后端处理文件，然后将其转换成相应的数据添加到数据库。

## 效果预览

### 1. 首页
pc端首页:

![image](https://user-images.githubusercontent.com/62100025/147316281-27587bf1-11be-4555-bcc4-d50afdf6d54b.png)

![image](https://user-images.githubusercontent.com/62100025/147316309-b4a55f94-3061-4604-a2e0-3f90d08835f0.png)


移动端首页：

![image](https://user-images.githubusercontent.com/62100025/147316335-1b5f74bd-6250-4d79-9625-f325a606a666.png)

### 2. 博客内容

pc端首页:

![image](https://user-images.githubusercontent.com/62100025/147316151-e319e40c-a0bf-418e-914c-8a35ad01e534.png)

移动端首页：

![image](https://user-images.githubusercontent.com/62100025/147316178-3de62062-a953-43f8-8ae0-e3e83d82dec6.png)

