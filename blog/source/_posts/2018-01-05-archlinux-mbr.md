---
title: MBR 分区方式安装 ArchLinux
date: 2018-01-06 17:00:40
updated: 2018-01-06 17:00:40
categories:
    - Linux
    - Arch
tags:
    - ArchLinux
---
## 前言
鄙人电脑笔记本有些年头了，不太好使，故新加了块固态硬盘，并将原有的机械硬盘安装至光驱(光荣下岗)位置。固态硬盘安装了`win10`系统，机械硬盘就安装个`ArchLinux`吧。固态硬盘当时的分区方式为MBR，为了和(不)谐(想)统(折)一(腾)，机械硬盘也沿用MBR分区方式。

### 准备工作
U盘、`ArchLinux`镜像以及正常(有线/无线)网络环境。
- U盘 容量4G起
- [USBWriter](https://sourceforge.net/projects/usbwriter/files/USBWriter-1.3.zip/download/) 制作U盘启动的工具
- [ArchLinux](https://www.archlinux.org/download/) 可选择[国内镜像](http://mirrors.163.com/archlinux/iso/2018.01.01/archlinux-2018.01.01-x86_64.iso)下载

### 制作ArchLinux的U盘镜像
在Windows上解压`USBWriter-1.3.zip`，并运行`USBWriter.exe`，选择`archlinux-2018.01.01-x86_64.iso`镜像单击`Writer`写入选定的U盘，等待进度条完成。So Easy!

## 安装教程
分为基础系统、图形界面两部分。为了更好展示，图片用`virtualbox`虚拟机模拟安装的截图，所示步骤真机均验证通过。

### 安装基础系统
U盘插至电脑上，开启按`F2`进入`BIOS`界面(注意各家电脑厂家进入BIOS的方式不尽相同)，选择U盘为第一启动序列，回车。

### 安装图形界面