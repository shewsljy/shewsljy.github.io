---
title: MBR 分区方式安装 ArchLinux
date: 2018-01-06 17:00:40
updated: 2018-01-12 17:30:24
categories:
    - Linux
    - Arch
tags:
    - ArchLinux
---
## 前言
我的电脑笔记本有些年头了，不太好使，故新加了块固态硬盘，并将原有的机械硬盘安装至光驱(光荣下岗)位置。固态硬盘安装了`Windows 10`系统，机械硬盘就安装个`ArchLinux`吧。固态硬盘当时的分区方式为MBR，为了和(不)谐(想)统(折)一(腾)，机械硬盘也沿用MBR分区方式。

### 准备工作
U盘、`ArchLinux`镜像以及正常(有线/无线)网络环境。
- U盘 容量4G起
- [USBWriter](https://sourceforge.net/projects/usbwriter/files/USBWriter-1.3.zip/download/) 制作U盘启动的工具
- [ArchLinux](https://www.archlinux.org/download/) 可选择[国内镜像](http://mirrors.163.com/archlinux/iso/2018.01.01/archlinux-2018.01.01-x86_64.iso)下载

### 制作ArchLinux的U盘镜像
在Windows上解压`USBWriter-1.3.zip`，并运行`USBWriter.exe`，选择`archlinux-2018.01.01-x86_64.iso`镜像单击`Writer`写入选定的U盘，等待进度条完成。So Easy!

<!-- more -->

## 安装教程
分为基础系统、图形界面两部分。为了更好展示，图片用`VirtualBox`虚拟机模拟安装的截图，所示步骤真机均验证通过。

### 安装基础系统
此部分参考ArchWiki的[Installation_Guide](https://wiki.archlinux.org/index.php/Installation_guide)。

#### 进入U盘启动的Live系统
U盘插至电脑上，开机按`F2`进入`BIOS`界面(注意各家电脑厂家进入`BIOS`的方式不尽相同)，选择U盘作为第一序列启动，待出现下图`Live`界面后，选择第一项回车。
{% asset_img live.png [archlinux_live选择界面] %}
稍等片刻，即可进入系统。

#### 验证启动模式
执行以下命令
``` bash
ls /sys/firmware/
```
如果`efi`目录存在，则系统以`UEFI`模式启动；否则，系统可能以`BIOS`或`CSM`模式启动。验证的结果决定接下来的分区方式。

#### 连接到因特网
ArchLinux安装需要连接网络。

##### 有线连接方式
守护进程`dhcpcd`已被默认启用来探测有线设备，并会尝试连接。如需验证网络是否正常，可以使用以下命令
``` bash
ping -c 3 baidu.com
```

##### 无线连接方式
倘若所处环境中无法提供有线连接，可以使用以下命令
``` bash
wifi-menu
```
图形操作选择有效的WiFi热点，进行连接(设密码的WiFi热点需输入密码)

#### 更新系统时间
使用以下命令，确保系统时间是正确的：
``` bash
timedatectl set-ntp true
```

#### 硬盘分区
磁盘若被系统识别到，就会被分配为一个块设备，如`/dev/sda`。使用命令
``` bash
fdisk -l
```
可查看这些设备信息，忽略输出中以`rom`、`loop`或`airoot`结尾的块设备信息。
{% asset_img check.png [archlinux检查环境] %}

##### 规划分区方式
系统以`BIOS`模式启动，选择`MBR`方式。20G硬盘(即`/dev/sda`)规划如下:
- 根分区 17.5G
- boot分区 500M
- swap分区 2G

##### 用fdisk进行MBR方式分区
使用命令
``` bash
fdisk /dev/sda
```
进入分区，分区过程如下:
{% asset_img fdisk01.png [划分根分区以及boot分区] %}
{% asset_img fdisk02.png [划分swap分区以及分区后效果] %}

#### 格式化分区
当分区配置好了, 这些分区应立即被格式化并使用一个合适的文件系统。使用命令
``` bash
mkfs.ext4 /dev/sda1
mkfs.ext4 /dev/sda2
mkswap /dev/sda3
```
将`/dev/sda1`以及`/dev/sda2`格式化成`ext4`，同时将`/dev/sda3`格式化为`swap`。

#### 挂载分区
首先将根分区挂载到`/mnt`，这里使用多个分区，还需要为其他分区(swap外)创建目录并挂载它们。
``` bash
mount /dev/sda1 /mnt
mkdir -p /mnt/boot
mount /dev/sda2 /mnt/boot
swapon /dev/sda3
```
{% asset_img mount.png [格式化并挂载各个分区] %}

#### 安装系统
安装一个基本的系统。

##### 选择国内镜像
`vim`编辑`/etc/pacman.d/mirrorlist`，选择国内的mirror排序在前列，下载速度起飞。

##### 安装基本系统
至此，基本环境都已设置好，可以进行`ArchLinux`系统安装了。执行`pacstrap`脚本，安装`base`和`base-devel`:
``` bash
pacstrap -i /mnt base base-devel vim dialog wpa_supplicant
```
一路回车确认即可，此时额外安装`vim`、`dialog`和`wpa_supplicant`三个软件。`vim`是个人喜好的文本编辑器，后两者是供`wifi-menu`无线设置依赖的组件，切换新系统后在所处环境中无法提供有线连接时可以进行无线连接。

#### 配置系统
新生成的系统需要一些配置。

##### 生成加载分区文件fstab
让系统顺利加载各个分区，用以下命令生成`fstab`文件:
``` bash
genfstab -U /mnt >> /mnt/etc/fstab
```
建议在执行完以上命令后，后检查一下生成的`/mnt/etc/fstab`文件是否正确。
{% asset_img fstab.png [配置并查看fstab] %}

##### 进入到新安装的系统
使用以下命令
``` bash
arch-chroot /mnt
```
进入新系统。

##### 设置连接网络
新安装的系统，需要再次设置网络。验证默认有线网络是否正常，可以使用以下命令
``` bash
ping -c 3 baidu.com
```
倘若所处环境中无法提供有线连接，可以使用以下命令
``` bash
wifi-menu
```
图形操作选择有效的WiFi热点，进行连接

##### 设置时区
设置本地时区为`Asia/Shanghai`
``` bash
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```
如果单系统或者另一个系统也是`Linux`，建议设置时间标准为`UTC`
``` bash
hwclock --systohc --utc
```
如果是双系统且另一个系统为`Windows`，建议设置时间标准为`localtime`
``` bash
hwclock --systohc --localtime
```
{% asset_img localtime.png [配置本地时间] %}

##### 本地化
本地化的程序与库若要本地化文本，都依赖`locale`, 后者明确规定地域、货币、时区日期的格式、字符排列方式和其他本地化标准等等。在下面设置两个文件：`/etc/locale.gen` 与 `/etc/locale.conf`。
``` bash
vim /etc/locale.gen
```
将以下字符前的注释打开:
<pre>
en_US.UTF-8 UTF-8
zh_CN.UTF-8 UTF-8
zh_TW.UTF-8 UTF-8
</pre>

接着执行`locale-gen`以生成locale信息:
``` bash
locale-gen
```
创建`/etc/locale.conf`并写入配置:
``` bash
echo LANG=en_US.UTF-8 > /etc/locale.conf
```
{% asset_img locale.png [配置本地化] %}

##### 设置主机名
要设置`hostname`，将其添加到`/etc/hostname`, `archjiayu`是我的主机名:
``` bash
echo archjiayu > /etc/hostname
```
建议添加对应的信息到`/etc/hosts`:
``` bash
vim /etc/hosts
```
设置如下格式:
<pre>
127.0.0.1	localhost.localdomain	localhost
::1		  localhost.localdomain	localhost
127.0.1.1	archjiayu.localdomain	archjiayu
</pre>

##### 设置root密码
设置`root`的密码:
``` bash
passwd
```

#### 安装引导程序
如果你使用`Intel CPU`，那么需要安装`intel-ucode`。注意的是，要安装到`/dev/sda`而不是`/dev/sda2`。
``` bash
pacman -S intel-ucode grub os-prober
grub-install --target=i386-pc /dev/sda
grub-mkconfig -o /boot/grub/grub.cfg
```
{% asset_img grub01.png [配置引导程序] %}

#### 重启
输入`exit`退出新系统环境，可选用`umount -R /mnt`手动卸载被挂载的分区。最后，通过执行`reboot`重启系统。不要忘记移除安装介质，然后使用`root`帐户登录到新系统。
``` bash
exit
umount -R /mnt
reboot
```
{% asset_img reboot.png [重启系统] %}

#### 进入新系统
移除安装介质，然后使用`root`帐户登录到新系统:
{% asset_img grub02.png [grub选项] %}
`root`登录新系统:
{% asset_img login.png [登录到新系统] %}
基础系统已经安装完毕，接下来进行图形界面安装。

### 安装图形界面
桌面系统选择`KDE plasma`，个人喜好。

#### 创建个人用户并开启sudo权限
日常使用root用户是不安全的。Linux为我们提供了强大的用户与组的权限管理，提高了整个系统的安全性。新建一个用户，在桌面登录时会有选择，root不在范围内。
``` bash
useradd -m -G wheel -s /bin/bash jiayu
visudo
```
`visudo`命令，在文件的后面部分找到`# %wheel ALL=(ALL)ALL`，然后将其改为`%wheel ALL=(ALL)ALL`。使得整个`wheel`组有sudo权限。

#### 安装显卡驱动
查看自己电脑的显卡型号:
``` bash
lspci | grep VGA
```
搜索匹配电脑显卡的驱动:
``` bash
pacman -Ss xf86-video
```
我电脑的显卡是`NVIDIA`，故安装对应的显卡驱动:
``` bash
pacman -S xf86-video-nouveau
```

#### 安装xorg
安装桌面环境基础依赖`xorg-server`:
``` bash
pacman -S xorg-server
```
如有选择，回车默认。

#### 安装KDE(Plasma)
直接安装`plasma`桌面软件包组即可，`kde-l10n-zh_cn`是支持中文的包，`wqy-microhei`是中文字体，`konsole`是终端软件:
``` bash
pacman -S plasma kde-l10n-zh_cn wqy-microhei konsole
```
如有选择，回车默认。

#### 安装登录管理器SDDM
桌面环境有了，但是还需要进入这个桌面的登录控制器，这里选择与其匹配的`sddm`:
``` bash
pacman -S sddm
systemctl enable sddm
```
并将`sddm`设置为开机自启动，这样起到的效果就是开机后会显示一个登录选择的界面。普通用户在选择列表中，输入相应的密码则转入`KDE`桌面系统中。
{% asset_img sddm.png [登录选择器] %}

#### 配置桌面网络
由于之前使用的一直都是`netctl`这个自带的网络服务，而桌面环境推荐使用的是`NetworkManager`这个网络服务，所以需要禁用`netctl`并启用`NetworkManager`:
``` bash
systemctl disable netctl
systemctl enable NetworkManager
```

#### 桌面效果
这个就是桌面系统:
{% asset_img kde.png [KDE桌面] %}