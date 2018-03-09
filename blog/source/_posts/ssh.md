---
title: 禁用 root 通过 SSH 登录服务器
date: 2018-01-26 09:44:01
updated: 2018-03-07 11:26:05
categories:
    - Linux
    - SSH
tags:
    - SSH
---
## 前言
一直在用`root`账号密码的方式登录服务器，最近发觉每天都有此类信息提示:
<pre>
Last failed login: Fri Jan 26 08:20:48 CST 2018 from 222.186.153.139 on ssh:notty
There were 12 failed login attempts since the last successful login.
</pre>

显示从上一次登陆成功到本次登陆成功，中间有若干次尝试登陆`root`账户失败的情况。我的SSH端口22没改，为了防止暴力破解导致服务器被黑，需禁用`root`账号登录，并更改SSH服务的22端口。用拥有`sudo`权限的普通用户登录服务器。

## 授以普通用户sudo权限
假设普通用户名为`username`，先用`root`用户执行`visudo`命令，在`root    ALL=(ALL)       ALL`这一行下添加`username   ALL=(ALL)       ALL`，如：
<pre>
root    ALL=(ALL)       ALL
username   ALL=(ALL)       ALL
</pre>

<!-- more -->

若是想要普通用户执行`sudo`命令时免密码输入，则可修改为：
<pre>
root    ALL=(ALL)       ALL
username   ALL=(ALL)       NOPASSWD: ALL
</pre>

## 禁用root账号SSH登录
这个推荐用拥有`sudo`权限的普通用户操作，将`/etc/ssh/sshd_config`中的`PermitRootLogin yes`改为`PermitRootLogin no`，并重启`sshd`服务：
<pre>
PermitRootLogin no
</pre>

``` bash
sudo vi /etc/ssh/sshd_config
sudo systemctl restart sshd
```

## 更改SSH服务默认的22端口
这个推荐用拥有`sudo`权限的普通用户操作，将`/etc/ssh/sshd_config`中`#Port 22`前面的注释`#`去除，另增一行`Port 10022`，并重启`sshd`服务：
<pre>
Port 22
Port 10022
</pre>

``` bash
sudo vi /etc/ssh/sshd_config
sudo systemctl restart sshd
```
这里开启双端口是为了保险，防止新的`10022`端口被其他服务占用导致重启`sshd`服务后连不上去(虽说可以用`netstat -an|grep 10022`查看是否被占用，但留条退路也是应该的)。通过新端口连上去后，就可以把`Port 22`注释掉，并再次重启`sshd`服务。

## 防火墙开放新端口
如果还设置了防火墙，记得开放新端口：
``` bash
sudo firewall-cmd --permanent --zone=public --add-port=10022/tcp
sudo firewall-cmd --reload
sudo firewall-cmd --list-all
```