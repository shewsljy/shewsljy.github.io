---
title: git
date: 2018-06-06 14:50:57
updated: 2018-06-07 10:59:23
categories:
    - Git
tags:
    - Git
---
## 下载编译git
``` bash
cd /opt/source/
wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.17.1.tar.gz
tar xzf git-2.17.1.tar.gz
cd /opt/source/git-2.17.1/
./configure --prefix=/opt/software/git-2.17.1
make
make install
ln -s /opt/software/git-2.17.1/bin/git* /usr/local/bin/
```

## 创建git用户
``` bash
useradd -s /usr/bin/git-shell git
passwd git
cp -R /opt/source/git-2.17.1/contrib/git-shell-commands /home/git/
chown -R git:git /home/git/git-shell-commands
mkdir -p /home/git/.ssh
touch /home/git/.ssh/authorized_keys
chmod 700 /home/git/.ssh
chmod 644 /home/git/.ssh/authorized_keys
chown -R git:git /home/git/.ssh
```

<!-- more -->

## 本地用git账号ssh登录服务器
前面两步操作，已经在服务器上安装了git以及设定git用户登录默认方式是`git-shell`，此时配置本地用git账号通过`ssh`方式登录服务器。
先在本地生成公钥，然后把公钥拷贝到服务器上git用户的authorized_keys上。
本地操作：
``` bash
ssh-keygen -t rsa
cat ~/.ssh/id_rsa.pub
```
服务器上操作，将本地公钥拷贝到authorized_keys：
``` bash
vim /home/git/.ssh/authorized_keys
```
本地ssh登录：
``` bash
ssh git@xxx.xx.xxx.xxx
或者指定端口xxxx
ssh git@xxx.xx.xxx.xxx -p xxxx
```
出现类似提示则成功，随后`exit`退出：
<pre>
Last login: Thu Jun  7 10:21:41 2018 from xxx.xxx.xxx.xxx

Welcome to Alibaba Cloud Elastic Compute Service !

Run 'help' for help, or 'exit' to leave.  Available commands:
list
git> exit
Connection to xxx.xxx.xxx.xxx closed.
</pre>

## 创建git仓库存储目录和权限
``` bash
mkdir -p /home/git/repositories
chmod 755 /home/git/repositories
cd /home/git/repositories/
git init --bare wechat.git
chown -R git:git /home/git/repositories
```

## 把远程服务器上的仓库clone到本地
若是本地没有仓库，可以之间将服务器上的仓库clone到本地，在本地添加文件后push服务器上：
``` bash
git clone git@xxx.xxx.xxx.xxx:/home/git/repositories/wechat.git
或者指定ssh端口xxxx
git clone ssh://git@xxx.xxx.xxx.xxx:xxxx/home/git/repositories/wechat.git
```

## 将本地仓库与远程服务器上的仓库关联
若是本地存在了仓库，可以先将本地仓库与远程服务器上的仓库关联，本地添加文件后，再push服务器上：
``` bash
git remote add origin git@xxx.xxx.xxx.xxx:/home/git/repositories/wechat.git
git push -u origin master
或者指定ssh端口xxxx
git remote add origin ssh://git@xxx.xxx.xxx.xxx:xxxx/home/git/repositories/wechat.git
git push -u origin master
```

## user.{name,email}全局跟局部设置
全局配置：
``` bash
git config --global --list
git config --global user.name "global"
git config --global user.email "global@xxx.com"
```
局部配置(需要进入仓库执行)：
``` bash
git config --local --list
git config user.name "local"
git config user.email "local@xxx.com"
```
