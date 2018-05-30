---
title: CentOS7 解压安装 Mysql
date: 2018-05-30 17:21:17
updated: 2018-05-30 18:56:17
categories:
    - Mysql
tags:
    - Mysql
---
## 下载解压mysql
下载以及解压，并设置软连接至`/usr/local/mysql`：
``` bash
cd /opt/source/
wget https://dev.mysql.com/get/Downloads/MySQL-8.0/mysql-8.0.11-linux-glibc2.12-x86_64.tar.gz
tar xzf mysql-8.0.11-linux-glibc2.12-x86_64.tar.gz -C /opt/software/
ln -s /opt/software/mysql-8.0.11-linux-glibc2.12-x86_64 /usr/local/mysql
```

## 安装libaio依赖以及创建mysql用户
``` bash
yum install libaio
groupadd mysql
useradd -r -g mysql -s /bin/false mysql
```

## 创建my.cnf配置文件
``` bash
vim /usr/local/mysql/etc/my.cnf
```
配置如下：
<pre>
[client]
port = 3306
default-character-set = utf8
socket = /usr/local/mysql/mysql.sock


[mysqld]
user = mysql
port = 3306
lower_case_table_names = 1
basedir = /usr/local/mysql
datadir = /usr/local/mysql/data
plugin-dir = /usr/local/mysql/lib/plugin
log-error = /usr/local/mysql/data/mysql.error.log
pid-file = /usr/local/mysql/data/mysql.pid
socket = /usr/local/mysql/mysql.sock
character-set-server = utf8
</pre>

## 创建mariadb文件以及赋权mysql
`/usr/local/mysql/bin/mysqld_safe --user=mysql &`会用到
``` bash
mkdir -p /var/log/mariadb
touch /var/log/mariadb/mariadb.log
chown -R mysql:mysql /var/log/mariadb
mkdir -p /var/run/mariadb
chown -R mysql:mysql /var/run/mariadb
```

## 安装mysql
``` bash
/usr/local/mysql/bin/mysqld --initialize --user=mysql
/usr/local/mysql/bin/mysql_ssl_rsa_setup
chown -R mysql:mysql /opt/software/mysql-8.0.11-linux-glibc2.12-x86_64
/usr/local/mysql/bin/mysqld_safe --user=mysql &
/usr/local/mysql/bin/mysql -u root -p
```
初始密码通过`grep 'root@localhost' /usr/local/mysql/data/mysql.error.log`查询出来，改密码可以用`alter user 'root'@'localhost' identified by 'root';`。
`SHOW VARIABLES LIKE 'char%';`,`SHOW VARIABLES LIKE 'collation%';`查询编码。mysql日志在`/var/log/mariadb/mariadb.log`。

## 启动停止mysql
``` bash
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
service mysql start|stop|restart|reload|force-reload|status
```
