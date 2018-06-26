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
复制gitweb目录到git用户下
``` bash
cp -r /opt/software/git-2.17.1/share/gitweb /home/git/
chown -R git:git /home/git/gitweb
vim /home/git/gitweb/gitweb.cgi
```

配置如下：
<pre>
our $projectroot = "/home/git/repositories";
</pre>

## 配置nginx
配置如下：
<pre>
server {
    error_log logs/git.error.log;  
    access_log logs/git.access.log;  
    listen       81;  
        server_name  192.168.0.101;  
    index       gitweb.cgi;  
        root /home/git;  
location ~ \.(cgi|pl).*$ {  
            gzip off;  
        fastcgi_pass unix:/var/run/fcgiwrap.socket;  
            fastcgi_param  SCRIPT_FILENAME    /home/git/gitweb.cgi;    
                                      fastcgi_param  SCRIPT_NAME        gitweb.cgi;    
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;  
            include fastcgi_params;  
}  
 location ~ ^.*\.git/objects/([0-9a-f]+/[0-9a-f]+|pack/pack-[0-9a-f]+.(pack|idx))$ {  
            root /home/git;  
}  
location ~ ^.*\.git/(HEAD|info/refs|objects/info/.*|git-(upload|receive)-pack)$ {  
            root /home/git;  
                                      fastcgi_param QUERY_STRING $query_string;  
        fastcgi_param SCRIPT_FILENAME /usr/libexec/git-core/git-http-backend;  
        fastcgi_param GIT_HTTP_EXPORT_ALL true;  
        fastcgi_param GIT_PROJECT_ROOT /home/git/repositories;  
        fastcgi_param PATH_INFO $uri;  
        include fastcgi_params;  
        fastcgi_pass unix:/var/run/fcgiwrap.socket;           
}  
try_files $uri @gitweb;  
            location @gitweb {  
            fastcgi_pass unix:/var/run/fcgiwrap.socket;  
            fastcgi_param SCRIPT_FILENAME /var/www/git/gitweb.cgi;  
            fastcgi_param PATH_INFO $uri;  
         fastcgi_param GITWEB_CONFIG /etc/gitweb.conf;  
            include fastcgi_params;  
    }  
</pre>

## 安装gitweb运行的依赖
``` bash
yum install perl-CGI perl-Time-HiRes perl-Digest-MD5
```
