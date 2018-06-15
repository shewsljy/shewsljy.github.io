---
title: gitweb
date: 2018-06-13 14:41:27
updated: 2018-06-15 15:41:54
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
