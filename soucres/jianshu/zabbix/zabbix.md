# zabbix安装配置

## 配置php.ini
```bash
vi /usr/local/php/etc/php.ini

max_execution_time = 300
memory_limit = 128M
post_max_size = 16M
upload_max_filesize = 2M
max_input_time = 300
date.timezone = PRC
```

## 安装路径
>`/usr/local/zabbix`

## 安装依赖
>`yum install net-snmp-devel libssh2-devel`

## 安装步骤
```bash
cd /usr/local
tar xzvf zabbix-3.2.6.tar.gz
cd /usr/local/zabbix-3.2.6
./configure --prefix=/usr/local/zabbix --enable-server --enable-agent --with-mysql --with-libxml2 --with-net-snmp --with-openssl --with-ssh2 --with-libcurl --with-iconv
make
make install
```

## 创建组及用户
```bash
groupadd zabbix
useradd -r -g zabbix -s /bin/false zabbix
```

## 初始化数据库
```bash
service mysql start
/usr/local/mysql/bin/mysql -u root -p

create database zabbix;
create user 'zabbix'@'%' identified by 'zabbix';
grant all privileges on zabbix.* to 'zabbix'@'%';
flush privileges;

quit;

/usr/local/mysql/bin/mysql -u root -p zabbix < /usr/local/zabbix-3.2.6/database/mysql/schema.sql
/usr/local/mysql/bin/mysql -u root -p zabbix < /usr/local/zabbix-3.2.6/database/mysql/images.sql
/usr/local/mysql/bin/mysql -u root -p zabbix < /usr/local/zabbix-3.2.6/database/mysql/data.sql
```

## 配置zabbix server
```bash
vi /usr/local/zabbix/etc/zabbix_server.conf

LogFile=/usr/local/zabbix/logs/zabbix_server.log
PidFile=/usr/local/zabbix/zabbix_server.pid
SNMPTrapperFile=/usr/local/zabbix/zabbix_traps.tmp
DBName=zabbix
DBUser=zabbix
DBPassword=zabbix
DBPort=3306
DBSocket=/usr/local/mysql/mysql.sock
```
## 启动zabbix server(10.211.55.24)
```bash
echo "/usr/local/mysql/lib" >>/etc/ld.so.conf
ldconfig
mkdir -p /usr/local/zabbix/logs
chown -R zabbix:zabbix /usr/local/zabbix

/usr/local/zabbix/sbin/zabbix_server
```

## 配置zabbix agentd(10.211.55.24)
```bash
vi /usr/local/zabbix/etc/zabbix_agentd.conf

PidFile=/usr/local/zabbix/zabbix_agentd.pid
LogFile=/usr/local/zabbix/logs/zabbix_agentd.log
Server=10.211.55.24
ServerActive=10.211.55.24
Hostname=Zabbix_server_centosc
```

## 启动zabbix agentd(10.211.55.24)
```bash
chown -R zabbix:zabbix /usr/local/zabbix
/usr/local/zabbix/sbin/zabbix_agentd
```

## 配置前端界面到nginx
```bash
mkdir -p /usr/local/nginx/html/zabbix
cp -rp /usr/local/zabbix-3.2.6/frontends/php/* /usr/local/nginx/html/zabbix/
cp -rp /usr/local/nginx/html/zabbix/conf/zabbix.conf.php.example /usr/local/nginx/html/zabbix/conf/zabbix.conf.php

vi /usr/local/nginx/html/zabbix/conf/zabbix.conf.php

<?php
// Zabbix GUI configuration file.
global $DB;

$DB['TYPE']     = 'MYSQL';
$DB['SERVER']   = '10.211.55.24';
$DB['PORT']     = '3306';
$DB['DATABASE'] = 'zabbix';
$DB['USER']     = 'zabbix';
$DB['PASSWORD'] = 'zabbix';

// Schema name. Used for IBM DB2 and PostgreSQL.
$DB['SCHEMA'] = '';

$ZBX_SERVER      = '10.211.55.24';
$ZBX_SERVER_PORT = '10051';
$ZBX_SERVER_NAME = 'zabbix_server_centosc';

$IMAGE_FORMAT_DEFAULT = IMAGE_FORMAT_PNG;


sed -i '/$last = strtolower(substr($val, -1));/a$val = substr($val,0,-1);' /usr/local/nginx/html/zabbix/include/func.inc.php
```

## 访问zabbix
```bash
http://10.211.55.24/zabbix
```