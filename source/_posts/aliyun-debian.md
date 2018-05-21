---
title: 阿里云上的debian设置
date: 2018-05-09 16:07:38
updated: 2018-05-09 16:07:38
categories:
    - Linux
    - Debian
tags:
    - Linux
    - Debian
---
## 前言
阿里云上的系统换成了`Debian`，记录下来。

## 阿里云ECS创建密钥对
推荐使用密钥登录，增强服务器安全性。在阿里云ECS`密钥对管理`中点击`创建密钥对`，输入符合格式的名称后确定，并下载该密钥对到本地。
{% asset_img 创建密钥对.png [创建密钥对] %}

<!-- more -->

## 阿里云ECS服务器换系统
停止阿里云ECS实例后，在`配置信息`，点击`更换系统盘`(运行中的实例此按钮不可点击)，确认更换后进入系统选择界面。
{% asset_img 确认更换系统盘.png [更换系统盘] %}

`安全设置`选择`设置密钥`，`密钥对`则选择先前创建的，确认更换。
{% asset_img 更换系统.png [设置密钥登陆] %}

经过短信校验码核实后，等待实例自行启动。
{% asset_img 更换系统盘成功.png [更换系统盘成功] %}

## Securecrt使用密钥登录
先前下载的是`.pem`类型的密钥，需要生成公钥。
打开`Securecrt`，进入转换私钥的选项，途径为：
{% asset_img 生成私钥菜单.png [生成私钥菜单] %}

浏览文件夹，选择下载的密钥：
{% asset_img 选择下载文件.png [选择下载文件] %}

选中后，输入文件名，保存：
{% asset_img 保存私钥.png [保存私钥] %}

生成了私/公钥，公钥待用：
{% asset_img 密钥列表.png [密钥列表] %}

`Securecrt`创建新的会话，设置为：
{% asset_img 会话设置.png [会话设置] %}

密钥配置选择刚生成公钥：
{% asset_img 选择公钥.png [选择公钥] %}

配置后便可密钥登陆。

## 更新Debian系统软件
``` bash
apt update
apt list --upgradable
apt upgrade
apt autoremove
pip install --upgrade pip
```
创建swap：
``` bash
dd if=/dev/zero of=/swapfile bs=1024k count=2000
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo "/swapfile swap swap defaults 0 0" >> /etc/fstab
reboot
```
