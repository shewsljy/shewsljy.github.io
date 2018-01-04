# Linux操作系统初始化进程systemd
> 开机过程首先从BIOS开始→进入"Boot Loader"→加载内核→内核的初始化→启动初始化进程，初始化进程作为系统第一个进程，它需要完成相关的初始化工作，为用户提供合适的工作环境。

> 红帽RHEL7系统已经替换掉了大家熟悉的初始化进程System V init，并正式采用全新的初始化进程systemd。初始化进程systemd使用了并发启动机制，所以开机速度得到了不小的提升。

> 在红帽RHEL7系统中systemd用"目标(target)"代替了“运行级别”这个概念。

| Sysvinit运行级别 | Systemd目标名称 | 作用 |
|:---------------: |:--------------: |:----:|
| 0 | runlevel0.target, poweroff.target | 关机 |
| 1 | runlevel1.target, rescue.target | 单用户模式 |
| 2 | runlevel2.target, multi-user.target | 等同于级别3 |
| 3 | runlevel3.target, multi-user.target | 多用户的文本界面 |
| 4 | runlevel4.target, multi-user.target | 等同于级别3 |
| 5 | runlevel5.target, graphical.target | 多用户的图形界面 |
| 6 | runlevel6.target, reboot.target | 重启 |
| emergency | emergency.target | 紧急Shell |

> systemctl管理服务的启动、重启、停止、重载、查看状态的命令：

| Sysvinit命令(红帽RHEL6系统) | Systemctl命令(红帽RHEL7系统) | 作用 |
|:--------------------------: |:---------------------------: |:----:|
| service foo start | systemctl start foo.service | 启动服务 |
| service foo restart | systemctl restart foo.service | 重启服务 |
| service foo stop | systemctl stop foo.service | 停止服务 |
| service foo reload | systemctl reload foo.service | 重新加载配置文件(不终止服务) |
| service foo status | systemctl status foo.service | 查看服务状态 |

> systemctl设置服务的开机启动、不启动、查看各级别下服务启动状态的命令：

| Sysvinit命令(红帽RHEL6系统) | Systemctl命令(红帽RHEL7系统) | 作用 |
|:--------------------------: |:---------------------------: |:----:|
| chkconfig foo on | systemctl enable foo.service | 开机自动启动 |
| chkconfig foo off | systemctl disable foo.service | 开机不自动启动 |
| chkconfig foo | systemctl is-enabled foo.service | 查看特定服务是否为开机自启动 |
| chkconfig --list | systemctl list-unit-files --type=service | 查看各个级别下服务的启动与禁用情况 |