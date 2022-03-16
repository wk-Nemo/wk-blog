---
title: Github Actions 自动化部署 Vue3 博客项目
date: 2022-03-16 21:53:09
categories: JavaScript
imgSrc: https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9243e4b5f49f4ebaae67be01a15d6a4d~tplv-k3u1fbpfcp-watermark.image
introduce: 通过实现自动化部署一个 vue 项目学习 GitHub Actions，使用 GitHub Actions 实现 CI/CD。
---

最近在开发自己的博客系统，每次迭代完一次代码就要重新手动部署一次，有时候部署后才发现一些bug，又要回过头来重新部署，十分的麻烦。自己的项目托管在github上，因此想实现每次push完代码到master分支上后，github可以自动的帮我进行部署这一步骤，这样就可以避免频繁的手动部署。

## 0 我的博客

线上地址：[wk-blog](http://travel.wutortoise.cn/)

github 地址：[项目 github](https://github.com/wk-Nemo/wk-blog)

项目简介：项目采用的是前后端分离的模式，前端的主要技术框架是 Vue3，后端使用的是 express

博客预览：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d7dd082a5294115becfb1df7e6e370f~tplv-k3u1fbpfcp-watermark.image?)

## 1 Github Actions 简介

> 参考文章：
> - [GitHub Actions自动化部署前端项目指南](https://zhuanlan.zhihu.com/p/433426848)
> - [使用Github Actions来实现项目的CI/CD](https://juejin.cn/post/7003278731171069982)


在我们前端常规的开发流程中，每次向远程分支推送完本次代码后，接下来进行的就是**打包生成静态资源**，再**推送至服务器**。这些步骤的特点就是在不同的项目中是类似的，且需要反复重复这些步骤。有没有一种方法可以在每次push完代码后，自动的去执行这些重复的动作呢？Giuthub Actions 就很好的解决了这一个问题。

GitHub Actions 是 GitHub 推出的一款持续集成（CI/CD）服务，它给我们提供了虚拟的服务器资源，让我们可以基于它完成自动化测试、集成、部署等操作，Github 把这些操作称作 actions。如果我们需要在push完代码后执行某一个action，我们可以直接引用他人写好的 action 即可。

官方文档传送门：[Github Actions](https://docs.github.com/cn/actions)

### 1.1 基本概念

**workflow** （工作流程）：持续集成一次运行的过程，就是一个 workflow。

- name：工作流程的名称
- on：触发工作流程的事件名称

**job** （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。

- runs-on：任务运行的虚拟环境

    ```
    # 目前可用的环境
    Windows Server 2019     windows-latest 或 windows-2019
    Ubuntu 20.04            ubuntu-20.04
    Ubuntu 18.04            ubuntu-latest 或 ubuntu-18.04
    Ubuntu 16.04            ubuntu-16.04
    macOS Catalina 10.15    macos-latest 或 macos-10.15
    
    # 使用
    runs-on: ubuntu-latest
    ```

**step**（步骤）：每个 job 由多个 step 构成，一步步完成。

- name：步骤名称
- run：该步骤的命令或 action
- env：所需要的环境变量
- uses：选择任务步骤中一部分运行的操作。其实就是步骤使用的`actions`，可以是一个或多个


**action** （动作）：每个 step 可以依次执行一个或多个命令（action）。因为很多操作在不同项目中都是类似的，所以 GitHub 把 action 设计为一个独立的脚本文件，可以存放到代码仓库里，让其他开发者使用。所以在实际的使用中，可以直接使用别人写好的 action 而不必所有的都自己写。GitHub也为此做了一个[marketplace](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fmarketplace%3Ftype%3Dactions "https://github.com/marketplace?type=actions")，这里就是action的官方市场。


## 2 Github Actions 小实验

> 实验代码：[CI-CD](https://github.com/wk-Nemo/CI-CD)

本次实验的目的是实现 vue 项目的自动化部署。当我们本地开发完项目向远程分支推送代码时，GitHub会帮我们自动构建，生成静态资源，并部署到远程服务器上。

实验大致分以下几个步骤：
- 准备好服务环境
- 创建 github 项目并创建 workflow
- 拉取 github 仓库，并新建一个 vue 项目，本地 push 代码
- 查看自动化部署是否完成

### step1 服务环境准备

这里我使用的是阿里云的轻量服务器，服务器使用的操作系统是 ubuntu-20.04。

这里你可以使用自己的服务器，**安装的操作系统自己也要记住**，因为在后面我们会使用到。我们进入自己的服务器，并使用 Linux 命令创建好存放静态资源的文件夹，你可以选择自己常用的文件夹，但是**需要记住这个路径**，后面会使用到。

```
// 这个文件夹是我部署项目的地方，你可以选择自己常用的文件夹，但是需要记住这个路径，后面会使用到
cd /www
sudo mkdir actionTest
```

### step2 创建 github 项目

在 github 上新建一个项目，这很 easy，不多赘述。

因为需要连接远程服务器，在创建 workflow 之前，我们需要创建一些需要使用的**暗号**。这个暗号就是一个**变量名**，然后它的值只有你和 Github 知道是什么，在需要使用的地方使用这个变量名，Github便能领会到这是一个私密的信息，并在执行流程时使用它**真正的值**去代替变量名。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c6eaa6fac4e4f0bac39a242bf4f09cb~tplv-k3u1fbpfcp-watermark.image?)

按照上面的顺序我们便可以创建暗号了。我们以此建立三个暗号，他们的变量名分别是：

- DR_HOST：你的服务器IP地址
- DR_USER：你的服务器账号，一般是 root
- DR_PASS：你的 SSH 登录密码

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c548432ddf54f2a89af38cc5acb310b~tplv-k3u1fbpfcp-watermark.image?)

准备好上面的内容我们就可以创建一个 workflow 了

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f71fcd268034f4bb594ae29fade60e9~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ba9f8b9f47e44b5bbc4313e9bb5e2b9~tplv-k3u1fbpfcp-watermark.image?)

最后我们能看到如下的界面：


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d72099cab904324970f10a81564246b~tplv-k3u1fbpfcp-watermark.image?)

我们将里面的代码删除，并换成下面的代码

```
name: build
on: 
  push: 
    branches: 
      - main # 这里表示push到main分支就会触发流程
jobs:
  build-and-deploy:
    runs-on: ubuntu-20.04
    steps:
      # 这是github官方的一个action，用于clone该仓库的源码到工作流中，
      - name: Checkout 🛎️
        uses: actions/checkout@v2
        with:
          persist-credentials: false

      - name: Build
        run: |
          cd my-project # 进入项目目录
          npm install  # 安装依赖
          npm run build  # 执行打包
  
      # 连接到ssh，并且做一个拷贝操作的action
      - name: Deploy 🚀
        uses: cross-the-world/scp-pipeline@master
        env:
          WELCOME: "ssh scp ssh pipelines"
          LASTSSH: "Doing something after copying"
        with:
         host: ${{ secrets.DR_HOST }}
         user: ${{ secrets.DR_USER }}
         pass: ${{ secrets.DR_PASS }}
         connect_timeout: 10s
         local: './my-project/dist/*' # 这里是下一步要创建的vue项目构建完成后的静态资源路径
         remote: /www/actionTest # 这里是 step1 中，在服务器上创建用于存放静态资源的文件夹

```

最后我们提交这部分代码,这里相当于在github仓库创建了一个 `/.github/workflows/build.yml` 的文件

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/154ed8ae17d04705b73d66190c067ddf~tplv-k3u1fbpfcp-watermark.image?)

这里我们相当于提交了一次代码到 main 分支上，因此会执行流程，但因为我们还没有创建 vue 项目，因此流程不会执行成功。我们接着进行下一步。

### step3 本地开发

> Vue脚手架官网传送地址：[Vue CLI](https://cli.vuejs.org/)

接着我们拉取远程分支的代码，并使用 vue-cli 创建一个 vue 项目，最后再提交代码到 main 分支上。

### step4 验证实验结果

在 github 中的 action 中可以查看到工作流程正常执行


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5877fc69c0624946b9cd8eb04e14b27f~tplv-k3u1fbpfcp-watermark.image?)

点进去也可以看到核心的 build 和 deploy 也正常执行了

- 正常构建
    ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f75de66214ad478393acedce96ce0268~tplv-k3u1fbpfcp-watermark.image?)

- 正常部署
    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04f6dbf583164909811ed1d9db6c07da~tplv-k3u1fbpfcp-watermark.image?)
    

我们再上服务器进行验证，可以发现 vue 项目打包后的 dist 中的内容正常部署到了我们服务器的目标文件夹中


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/967828d16050447b8c06d0949bf72e1f~tplv-k3u1fbpfcp-watermark.image?)

## 3 博客项目部署踩坑日记

在开头已经介绍过我的博客项目，前端使用的是 vue3，具体的部署和上述实验差不多。但是中间在执行 npm install 时遇到了问题，最后通过指定 node 版本解决了问题。代码如下：

```
name: frontend-build
on: 
  push: 
    branches: 
      - main
jobs:
  build-and-deploy:
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2
        with:
          persist-credentials: false
      
      # 指定 node 版本
      - uses: actions/setup-node@v2 
        with:
          node-version: '14'

      - name: Build
        run: |
          cd blog-frontend # 进入项目目录
          npm install  # 安装依赖
          npm run build  # 执行打包
  
      - name: Deploy 🚀
        uses: cross-the-world/scp-pipeline@master
        env:
          WELCOME: "ssh scp ssh pipelines"
          LASTSSH: "Doing something after copying"
        with:
         host: ${{ secrets.DR_HOST }}
         user: ${{ secrets.DR_USER }}
         pass: ${{ secrets.DR_PASS }}
         connect_timeout: 10s
         local: './blog-frontend/dist/*'
         remote: /www/wk-blog/dist
         last_ssh: |
            nginx -s reload # 部署成功后需要重启nginx
           
```

后端代码使用的是 express，服务器上使用 pm2 开启项目。因为数据库中的博客信息是通过 js 脚本解析的，因此最后还需要执行脚本重新解析所有的博客文件，当上传新的博客时会更新数据库中的信息。

```
name: backend-build
on: 
  push: 
    branches: 
      - main
jobs:
  backend:
    runs-on: ubuntu-20.04
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v2
        with:
          persist-credentials: false
          
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
  
      - name: Deploy 🚀
        uses: cross-the-world/scp-pipeline@master
        env:
          WELCOME: "ssh scp ssh pipelines"
          LASTSSH: "Doing something after copying"
        with:
         host: ${{ secrets.DR_HOST }}
         user: ${{ secrets.DR_USER }}
         pass: ${{ secrets.DR_PASS }}
         connect_timeout: 10s
         local: './express-backend/*'
         remote: /www/wk-blog/backend
         
      - name: ssh pipelines - npm install
        uses: cross-the-world/ssh-pipeline@master
        env:
          WELCOME: "ssh pipeline"
        with:
          host: ${{ secrets.DR_HOST }}
          user: ${{ secrets.DR_USER }}
          pass: ${{ secrets.DR_PASS }}
          connect_timeout: 10s
          script: |
            cd /www/wk-blog/backend
            npm install
      
      - name: ssh pipelines - read blogs
        uses: cross-the-world/ssh-pipeline@master
        env:
          WELCOME: "ssh pipeline"
        with:
          host: ${{ secrets.DR_HOST }}
          user: ${{ secrets.DR_USER }}
          pass: ${{ secrets.DR_PASS }}
          connect_timeout: 10s
          script: |
            cd /www/wk-blog/backend
            node parse.js
            
      - name: ssh pipelines - restart www
        uses: cross-the-world/ssh-pipeline@master
        env:
          WELCOME: "ssh pipeline"
        with:
          host: ${{ secrets.DR_HOST }}
          user: ${{ secrets.DR_USER }}
          pass: ${{ secrets.DR_PASS }}
          connect_timeout: 10s
          script: |
            cd bin
            pm2 restart www
```
