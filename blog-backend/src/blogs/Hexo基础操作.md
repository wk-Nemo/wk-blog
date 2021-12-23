---
title: Hexo基础操作
date: 2021-01-14 23:54:10
categories: 
- 后端
tags:
- 开始
---
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
$ hexo s
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
$ hexo g
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
$ hexo d
```

More info: [Deployment](https://hexo.io/docs/one-command-deployment.html)

## Writing

### create a new post or new page

``` bash
$ hexo new [layout] <title>
```

### create a new categories

``` bash
$ hexo new page categories
```

configure it in /source/categories

``` bash
---
title: 后端
date: 2021-01-14 23:54:10
type: "categories"
---
```

categorize articles

```bash
---
title: Hexo基础操作
date: 2021-01-14 23:54:10
categories: 
- 后端
```

### create a new tag

``` bash
$ hexo new page tags
```

configure it in /source/tags

``` bash
---
title: 开始
date: 2021-01-14 23:58:42
type: "tags"
---
```

tags for articles

```bash
---
title: Hexo基础操作
date: 2021-01-14 23:54:10
tags:
- 开始
---
```

