# mysql安装配置(centos 6)

## 安装版本
>`mysql-5.7.18-linux-glibc2.5-x86_64.tar.gz`

## 安装路径(10.211.55.[22,23])
>`/usr/local/mysql`
```bash
cd /usr/local
tar xzvf mysql-5.7.18-linux-glibc2.5-x86_64.tar.gz
mv mysql-5.7.18-linux-glibc2.5-x86_64 mysql
rm -rf mysql-5.7.18-linux-glibc2.5-x86_64.tar.gz
```

## 环境依赖
>MySQL has a dependency on the libaio library
```bash
rpm -qa | grep libaio
yum search libaio
yum install libaio
```

## 创建组及用户
```bash
groupadd mysql
useradd -r -g mysql -s /bin/false mysql
```

## 安装步骤
```bash
/usr/local/mysql/bin/mysqld --initialize --user=mysql
/usr/local/mysql/bin/mysql_ssl_rsa_setup
chown -R mysql:mysql /usr/local/mysql
/usr/local/mysql/bin/mysqld_safe --user=mysql &
/usr/local/mysql/bin/mysql -u root -p
alter user 'root'@'localhost' identified by 'root';
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
```

## mysql启停
```bash
service mysql start|stop|restart
```

## mysql的root用户放开远程登录配置
```bash
/usr/local/mysql/bin/mysql -u root -p
use mysql;
select user,host from user where user = 'root';
update user set host = '%' where user = 'root';
grant all privileges on *.* to 'root'@'%' identified by 'root' with grant option;
flush privileges;
```

## mysql默认字符设置
```bash
/usr/local/mysql/bin/my_print_defaults --help |grep my.cnf
mkdir -p /usr/local/mysql/etc
ps -ef|grep mysql
vi /usr/local/mysql/etc/my.cnf

[client]
port = 3306
default-character-set = utf8
socket = /usr/local/mysql/mysql.sock


[mysqld]
user = mysql
port = 3306
# 不区分表名的大小写
lower_case_table_names = 1
basedir = /usr/local/mysql
datadir = /usr/local/mysql/data
plugin-dir = /usr/local/mysql/lib/plugin
log-error=/usr/local/mysql/data/mysql.error.log
pid-file = /usr/local/mysql/data/mysql.pid
socket = /usr/local/mysql/mysql.sock
character-set-server = utf8

chown -R mysql:mysql /usr/local/mysql

/usr/local/mysql/bin/mysql -u root -p
SHOW VARIABLES LIKE 'char%';
SHOW VARIABLES LIKE 'collation%';
```