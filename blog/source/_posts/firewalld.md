---
title: CentOS 7.4 防火墙(firewalld)设置
date: 2018-01-24 14:51:25
updated: 2018-01-24 17:08:25
categories:
    - Linux
    - "CentOS 7.4"
    - Firewalld
tags:
    - Firewalld
---
## 前言
我在阿里云上购买了ECS云服务器，通过公共镜像安装了`CentOS 7`系统。后来发觉阿里默认安装了云盾安骑士，其服务一直在服务器上扫描，很是不喜。随即通过[官方教程](https://help.aliyun.com/document_detail/31777.html)手动方式卸载了云盾安骑士客户端`Agent`，但发觉云盾安骑士的服务端还是会通过IP来扫描，此时需要屏蔽其IP。`CentOS 7`默认用`firewalld`替代了`iptables`，紧随时代趋势便用`firewalld`进行防火墙设置。

## 查找云盾扫描云服务器的IP
通过[官方安全公告](https://help.aliyun.com/knowledge_detail/37436.html)找到了云盾扫描云服务器的固定IP，如下:
<pre>
140.205.201.0/28
140.205.201.16/29
140.205.201.32/28
140.205.225.192/29
140.205.225.200/30
140.205.225.184/29
140.205.225.183/32
140.205.225.206/32
140.205.225.205/32
140.205.225.195/32
140.205.225.204/32
106.11.224.0/26
106.11.224.64/26
106.11.224.128/26
106.11.224.192/26
106.11.222.64/26
106.11.222.128/26
106.11.222.192/26
106.11.223.0/26
</pre>

<!-- more -->

## firewalld相关配置
分服务及配置两部分，都是用`root`执行相关命令。

### firewalld服务
安装、启动、停止、查看状态以及开机自启。
安装:
``` bash
yum install firewalld
```
启动:
``` bash
systemctl start firewalld
```
查看状态:
``` bash
systemctl status firewalld
firewall-cmd --state
```
停止:
``` bash
systemctl stop firewalld
```
开机自启:
``` bash
systemctl enable firewalld
```
取消开机自启:
``` bash
systemctl disable firewalld
```

### firewalld配置
配置规则、查看配置以及生效配置。
配置规则(屏蔽指定IP段):
``` bash
firewall-cmd --permanent --zone=public --add-rich-rule='rule family=ipv4 source address="140.205.201.0/28" reject'
```
配置规则(取消被屏蔽的指定IP段):
``` bash
firewall-cmd --permanent --zone=public --remove-rich-rule='rule family=ipv4 source address="140.205.201.0/28" reject'
```
配置规则(开放80端口):
``` bash
firewall-cmd --permanent --zone=public --add-port=80/tcp
```
配置规则(关闭80端口):
``` bash
firewall-cmd --permanent --zone=public --remove-port=80/tcp
```
生效配置:
``` bash
firewall-cmd --reload
```
查看配置:
``` bash
firewall-cmd --list-all
```
{% asset_img list_all.png [查看firewalld配置规则] %}