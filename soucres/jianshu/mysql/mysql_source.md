# mysql源码安装配置(centos 6)

## 安装版本
> `mysql-boost-5.7.19.tar.gz`

## 安装路径
> `/usr/local/mysql`

## 环境依赖
`yum install cmake make git gcc gcc-c++ ncurses-devel bison libaio-devel`

## 编译安装
```bash
cd /usr/local
tar zxvf mysql-boost-5.7.19.tar.gz
cd /usr/local/mysql-5.7.19
mkdir bld
cd bld
cmake .. -DWITH_BOOST=/usr/local/mysql-5.7.19/boost/boost_1_59_0 -DENABLE_DOWNLOADS=1 -DBUILD_CONFIG=mysql_release -DCPACK_MONOLITHIC_INSTALL=ON -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DDEFAULT_CHARSET=utf8 -DDEFAULT_COLLATION=utf8_general_ci -DMYSQLX_TCP_PORT=33060 -DMYSQL_UNIX_ADDR=/usr/local/mysql/mysql.sock -DMYSQL_TCP_PORT=3306 -DMYSQLX_UNIX_ADDR=/usr/local/mysql/mysqlx.sock -DMYSQL_DATADIR=/usr/local/mysql/data -DSYSCONFDIR=/usr/local/mysql/etc
make
make install
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
