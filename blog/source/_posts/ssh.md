---
title: 禁用 root 通过 SSH 登录服务器
date: 2018-01-26 09:44:01
updated: 2018-01-26 10:30:05
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

显示从上一次登陆成功到本次登陆成功，中间有若干次尝试登陆`root`账户失败的情况。我的SSH端口22没改，为了防止暴力破解导致服务器被黑，需禁用`root`账号登录，改用授以`sudo`权限普通用户登录的方式。

## 禁用root账号登录
将`/etc/ssh/sshd_config`中的`PermitRootLogin yes`改为`PermitRootLogin no`，并重启`sshd`服务:
``` bash
sudo vi /etc/ssh/sshd_config
sudo service sshd restart
```
世界清静多了。