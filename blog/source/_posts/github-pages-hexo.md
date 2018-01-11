---
title: GitHub Pages + Hexo 实现静态 Blog
date: 2018-01-05 13:45:22
updated: 2018-01-11 16:45:32
categories:
    - Blog
    - "Github Pages"
    - Hexo
tags:
    - Blog
    - "Github Pages"
    - Hexo
---
## 前言
很多同行会把自己的代码托管于[GitHub](https://github.com/)，同时部分Coder在各Blog平台上分享技术贴。现可以通过[Github Pages](https://pages.github.com/)将二者结合，达到Blog文章可展示、内容修订历史可追溯的效果。在此文章中仅提供一个思路，具体细节步骤还需各位看官自行解决。

### 准备工作
所需的平台以及技术，相关教程自行搜索学习。
- [GitHub](https://github.com/)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)
- [Hexo](https://hexo.io/)
- [Markdown](https://daringfireball.net/projects/markdown/syntax/)

### 实现原理
`GitHub`特殊仓库(xxx.github.io，`xxx`为用户账号名)，开启`GitHub Pages`(对该仓库做特殊处理，以支持静态页面)功能后，获得专属网络地址`https://xxx.github.io/`。`Hexo`是一个生成静态Blog的框架，通过本地生成静态内容推送至`xxx.github.io`仓库的`master`分支上，用户访问专属网络地址，就可以浏览其静态WEB内容。为了追溯内容变更历史，方便用户回退先前版本，在这个仓库新建一个分支专用于内容更改(撰写)，平时只需要维护专属分支上的内容即可。

<!-- more -->

## 安装教程
`GitHub`、`GitHub Pages`以及`Hexo`。

### GitHub
需要一个GitHub账号，没有的话先[注册](https://github.com/join/)。本文默认账号名为`abc`。
{% asset_img join.png [GitHub注册] %}

#### 新建一个仓库
假如你的GitHub账号名为`abc`，新建一个名为`abc.github.io`(命名格式需统一)的仓库，最终你新建仓库的地址为`https://github.com/abc/abc.github.io/`。
{% asset_img repository.png [创建新仓库] %}

#### 仓库新建一个分支
访问你新建立的GitHub仓库，只有一个默认的`master`分支。现在新建另一个分支，分支名随意，比如为`hexo`，并将其设置为默认分支。至此，新建仓库`abc.github.io`有两个分支，`master`以及`hexo`。往后所有对Blog内容的操作都是在`hexo`这个默认分支上，`master`分支只用来展示Blog的最终效果。
{% asset_img branch.png [创建新分支并设为默认] %}

#### 仓库开启GitHub Pages功能
访问你新建立的GitHub仓库，进入`Settings`选项(地址为`https://github.com/abc/abc.github.io/settings/`)，找到`GitHub Pages`，开启后不用理会`Jekyll`相关的东西，这个后面用`Hexo`来代替。`User pages must be built from the master branch.`这行标注信息也是为什么上面要再建立一个分支的原因。开启此项功能后，`https://abc.github.io/`就是`abc`用户的`GitHub Pages`页面，访问这个地址即可查看Blog内容。
{% asset_img pages.png [开启GitHub Pages功能] %}

#### Git拉取远程仓库到本地
本地[下载](https://git-scm.com/downloads/)并安装Git后，执行命令
``` bash
git clone https://github.com/abc/abc.github.io.git
```
将远程仓库拉取到本地，生成`abc.github.io`的本地文件夹。由于之前将`hexo`设置为默认分支，此时拉取到的就是`hexo`分支代码。

### Hexo
需要在本地安装`Hexo`，它依赖于`Node.js`，是一个静态Blog框架，可以跟`GitHub Pages`结合。

#### 本地安装Hexo
本地[下载](https://nodejs.org/en/download/)并安装`Node.js`后，执行命令
``` bash
sudo npm install hexo-cli -g
```
将`Hexo`全局安装到本地

#### 初始化Blog
进入`abc.github.io`本地文件夹里面，执行以下命令
``` bash
hexo init blog
cd blog
npm install
hexo server
```
将一个Blog创建好并且在本地运行起来，访问`http://localhost:4000/`可以查看效果，`Ctrl+C`可停止服务。

#### 更换Blog主题
`Hexo`默认的主题过于简陋，推荐更换`Next`。本地下载[Next](https://github.com/iissnan/hexo-theme-next/archive/master.zip)，并解压至`abc.github.io/blog/themes/`下，重命名为`next`。同时将`abc.github.io/blog/_config.yml`里默认主题配置`theme: landscape`更改为`theme: next`。执行以下命令
``` bash
hexo clean
hexo generate
hexo server
```
再次访问`http://localhost:4000/`查看`Next`主题效果。
{% asset_img finally.png [Next主题效果] %}

#### 推送至GitHub Pages
将`abc.github.io/blog/_config.yml`里关于`deploy`的配置更改如下:
<pre>
deploy:
  type: git
  repo: https://github.com/abc/abc.github.io.git
  branch: master
</pre>
执行以下命令
``` bash
hexo clean
hexo generate
hexo deploy
```
{% asset_img master.png [Master分支代码] %}

访问`https://abc.github.io/`查看Blog最终效果。
大功告成!