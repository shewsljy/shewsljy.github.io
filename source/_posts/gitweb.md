---
title: gitweb
date: 2018-06-13 14:41:27
updated: 2018-06-26 19:20:54
categories:
    - Git
    - Gitweb
tags:
    - Git
    - Gitweb
---
## 安装gitweb运行的依赖
``` bash
yum install perl-CGI perl-Time-HiRes perl-Digest-MD5 highlight
```

## 安装spawn-fcgi
``` bash
cd /opt/source/
wget http://download.lighttpd.net/spawn-fcgi/releases-1.6.x/spawn-fcgi-1.6.4.tar.gz
tar xzf spawn-fcgi-1.6.4.tar.gz
cd /opt/source/spawn-fcgi-1.6.4/
./configure --prefix=/opt/software/spawn-fcgi-1.6.4
make
make install
```

## 安装fcgiwrap
``` bash
cd /opt/source/
wget https://github.com/gnosek/fcgiwrap/archive/1.1.0.tar.gz -O fcgiwrap-1.1.0.tar.gz
tar xzf fcgiwrap-1.1.0.tar.gz
cd /opt/source/fcgiwrap-1.1.0/
yum install automake fcgi-devel
autoreconf -i
./configure --prefix=/opt/software/fcgiwrap-1.1.0
make
make install
```

<!-- more -->

## 配置fcgiwrap启动脚本
``` bash
vim /etc/init.d/fcgiwrap
chmod 755 /etc/init.d/fcgiwrap
service fcgiwrap start|stop|restart|status
```

配置如下：
<pre>
#!/bin/bash
### BEGIN INIT INFO
# Provides:          fcgiwrap
# Required-Start:    $remote_fs
# Required-Stop:     $remote_fs
# Should-Start:
# Should-Stop:
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: FastCGI wrapper
# Description:       Simple server for running CGI applications over FastCGI
### END INIT INFO

PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/opt/software/spawn-fcgi-1.6.4/bin:/opt/software/fcgiwrap-1.1.0/sbin
SPAWN_FCGI="/opt/software/spawn-fcgi-1.6.4/bin/spawn-fcgi"
DAEMON="/opt/software/fcgiwrap-1.1.0/sbin/fcgiwrap"
NAME="fcgiwrap"

PIDFILE="/var/run/$NAME.pid"

FCGI_SOCKET="/var/run/$NAME.socket"
FCGI_USER="nobody"
FCGI_GROUP="nobody"
FORK_NUM=1
SCRIPTNAME=/etc/init.d/$NAME

case "$1" in
    start)
        echo -n "Starting $NAME... "

        PID=`pidof $NAME`
        if [ ! -z "$PID" ]; then
            echo " $NAME already running"
            exit 1
        fi

        $SPAWN_FCGI -u $FCGI_USER -g $FCGI_GROUP -s $FCGI_SOCKET -P $PIDFILE -F $FORK_NUM -f $DAEMON

        if [ "$?" != 0 ]; then
            echo " Start failed"
            exit 1
        else
            echo " Start successed"
        fi
    ;;

    stop)
        echo -n "Stoping $NAME... "

        PID=`pidof $NAME`
        if [ ! -z "$PID" ]; then
            kill `pidof $NAME`
            if [ "$?" != 0 ]; then
                echo " Stop failed. re-quit"
                exit 1
            else
                rm -f $pid
                echo " Stop successed"
            fi
        else
            echo "$NAME is not running."
            exit 1
        fi
    ;;

    status)
        PID=`pidof $NAME`
        if [ ! -z "$PID" ]; then
            echo "$NAME (pid $PID) is running..."
        else
            echo "$NAME is stopped"
            exit 0
        fi
    ;;

    restart)
        $SCRIPTNAME stop
        sleep 3
        $SCRIPTNAME start
    ;;

    *)
        echo "Usage: $SCRIPTNAME {start|stop|restart|status}"
        exit 1
    ;;
esac
</pre>

## 配置gitweb
新建配置文件
``` bash
vim /etc/gitweb.conf
```

配置如下：
<pre>
$projectroot = "/home/git/repositories";
$projects_list = $projectroot;
$strict_export = 1;
$home_link = $my_uri || "/";
@stylesheets = ("static/gitweb.css");
$javascript = "static/gitweb.js";
$logo = "static/git-logo.png";
$favicon = "static/git-favicon.png";
@diff_opts = ();
$feature{'blame'}{'default'} = [1];
$feature {'blame'}{'override'} = 1;
$feature {'snapshot'}{'default'} = ['zip', 'tgz'];
$feature {'snapshot'}{'override'} = 1;
$feature{'highlight'}{'default'} = [1];
</pre>

## 配置网页gitweb的访问权限
新建配置文件，其中user/password分别为账号密码
``` bash
htpasswd -cb /opt/software/nginx-1.14.0/conf/gitweb_user.db user password
```

## 配置nginx
配置如下：
<pre>
server {
        listen       80;
        listen       [::]:80;
        server_name  gitweb.jiayuli.cn;
        charset      utf-8;
        return       301 https://gitweb.jiayuli.cn$request_uri;
}


server {
        listen       443 ssl;
        listen       [::]:443 ssl;
        server_name  gitweb.jiayuli.cn;

        charset utf-8;
        #client_header_buffer_size 512k;
        #large_client_header_buffers 4 512k;
        ssl on;

        ssl_certificate      /etc/letsencrypt/live/jiayuli.cn/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/jiayuli.cn/privkey.pem;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        auth_basic "Git User Authentication";
        auth_basic_user_file /opt/software/nginx-1.14.0/conf/gitweb_user.db;

        location /gitweb.cgi {
                fastcgi_pass unix:/run/fcgiwrap.socket;
                fastcgi_param PATH_INFO $uri;
                fastcgi_param GITWEB_CONFIG /etc/gitweb.conf;
                fastcgi_param SCRIPT_FILENAME /opt/software/git-2.17.1/share/gitweb/gitweb.cgi;
                include fastcgi_params;
        }

        location / {
                root /opt/software/git-2.17.1/share/gitweb;
                index gitweb.cgi;
                error_log logs/gitweb.error.log;
                access_log logs/gitweb.access.log;
        }

}
</pre>
