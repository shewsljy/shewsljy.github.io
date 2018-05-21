---
title: tomcat
date: 2018-05-16 11:37:01
updated: 2018-05-16 11:37:01
categories:
    - Web
    - Tomcat
tags:
    - Web
    - Tomcat
---
## 解压jdk/tomcat
解压jdk，tomcat
``` bash
cd /opt/source/
wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u171-b11/512cd62ec5174c3487ac17c61aaa89e8/jdk-8u171-linux-x64.tar.gz
tar xzf jdk-8u171-linux-x64.tar.gz -C /opt/software/
wget http://mirrors.hust.edu.cn/apache/tomcat/tomcat-9/v9.0.8/bin/apache-tomcat-9.0.8.tar.gz
tar xzf apache-tomcat-9.0.8.tar.gz -C /opt/software/
```

<!-- more -->

## 编译安装apr/openssl
``` bash
cd /opt/source/
# 下载包
wget http://mirror.bit.edu.cn/apache//apr/apr-1.6.3.tar.gz
wget http://mirror.bit.edu.cn/apache//apr/apr-util-1.6.1.tar.gz
wget http://mirror.bit.edu.cn/apache//apr/apr-iconv-1.2.2.tar.gz
wget https://www.openssl.org/source/openssl-1.1.0h.tar.gz

# 解压包
tar xzf apr-1.6.3.tar.gz
tar xzf apr-util-1.6.1.tar.gz
tar xzf apr-iconv-1.2.2.tar.gz
tar xzf openssl-1.1.0h.tar.gz
# 编译安装apr
cd /opt/source/apr-1.6.3/
./configure --prefix=/opt/software/apr-1.6.3
make
make install
# 编译安装apr-util
cd /opt/source/apr-util-1.6.1/
./configure --prefix=/opt/software/apr-util-1.6.1 --with-apr=/opt/software/apr-1.6.3
make
make install
# 编译安装apr-iconv
cd /opt/source/apr-iconv-1.2.2/
./configure --prefix=/opt/software/apr-iconv-1.2.2 --with-apr=/opt/software/apr-1.6.3
make
make install
# 编译安装openssl -fPIC静态 enable-shared动态
cd /opt/source/openssl-1.1.0h/
./config -fPIC --prefix=/opt/software/openssl-1.1.0h enable-shared
make
make install
```

## 编译安装tomcat-apr
``` bash
yum install autoconf
cp /opt/software/apache-tomcat-9.0.8/bin/tomcat-native.tar.gz /opt/source/
cd /opt/source/
tar xzf tomcat-native.tar.gz
cd /opt/source/tomcat-native-1.2.16-src/native/
./buildconf --with-apr=/opt/source/apr-1.6.3
./configure --prefix=/opt/software/tomcat-native-1.2.16 --with-apr=/opt/software/apr-1.6.3 --with-ssl=/opt/software/openssl-1.1.0h --with-java-home=/opt/software/jdk1.8.0_171
```

## 配置tomcat环境
设置java跟apr的环境变量
``` bash
vim /opt/software/apache-tomcat-9.0.8/bin/setclasspath.sh
```
添加以下信息：
<pre>
export JAVA_HOME=/opt/software/jdk1.8.0_171
export LD_LIBRARY_PATH=/opt/software/tomcat-native-1.2.16/lib
</pre>

设置开启apr
``` bash
vim /opt/software/apache-tomcat-9.0.8/conf/server.xml
```
在`<Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" />`中添加`useAprConnector="true"`，设置为：
<pre>
<Listener className="org.apache.catalina.core.AprLifecycleListener" SSLEngine="on" useAprConnector="true" />
</pre>

测试tomcat启动：
``` bash
bash /opt/software/apache-tomcat-9.0.8/bin/configtest.sh
```
输出结果含有`INFO: Initializing ProtocolHandler ["http-apr-8080"]`，`INFO: Initializing ProtocolHandler ["ajp-apr-8009"]`即表示apr开启成功。
<pre>
May 18, 2018 2:17:34 PM org.apache.catalina.core.AprLifecycleListener lifecycleEvent
INFO: Loaded APR based Apache Tomcat Native library [1.2.16] using APR version [1.6.3].
May 18, 2018 2:17:34 PM org.apache.catalina.core.AprLifecycleListener lifecycleEvent
INFO: APR capabilities: IPv6 [true], sendfile [true], accept filters [false], random [true].
May 18, 2018 2:17:34 PM org.apache.catalina.core.AprLifecycleListener lifecycleEvent
INFO: APR/OpenSSL configuration: useAprConnector [true], useOpenSSL [true]
May 18, 2018 2:17:34 PM org.apache.catalina.core.AprLifecycleListener initializeSSL
INFO: OpenSSL successfully initialized [OpenSSL 1.1.0h  27 Mar 2018]
May 18, 2018 2:17:34 PM org.apache.coyote.AbstractProtocol init
INFO: Initializing ProtocolHandler ["http-apr-8080"]
May 18, 2018 2:17:34 PM org.apache.coyote.AbstractProtocol init
INFO: Initializing ProtocolHandler ["ajp-apr-8009"]
May 18, 2018 2:17:34 PM org.apache.catalina.startup.Catalina load
INFO: Initialization processed in 1411 ms
</pre>

## 非root用户启动tomcat
用root用户启动tomcat是一件非常危险的事，在这里设置为`nobody`启动。
编译生成`jsvc`：
``` bash
yum install libcap-devel
cp /opt/software/apache-tomcat-9.0.8/bin/commons-daemon-native.tar.gz /opt/source/
cd /opt/source/
tar xzf commons-daemon-native.tar.gz
cd /opt/source/commons-daemon-1.1.0-native-src/unix/
./configure --with-java=/opt/software/jdk1.8.0_171
make
```
复制`jsvc`到tomcat的bin目录下
``` bash
cp /opt/source/commons-daemon-1.1.0-native-src/unix/jsvc /opt/software/apache-tomcat-9.0.8/bin/
```
编辑tomcat的bin目录下的daemon.sh，添加环境变量
``` bash
vim /opt/software/apache-tomcat-9.0.8/bin/daemon.sh
```
添加的值为：
<pre>
export JAVA_HOME=/opt/software/jdk1.8.0_171
export CATALINA_BASE=/opt/software/apache-tomcat-9.0.8
export CATALINA_HOME=/opt/software/apache-tomcat-9.0.8
export LD_LIBRARY_PATH=/opt/software/tomcat-native-1.2.16/lib
</pre>
并将`test ".$TOMCAT_USER" = . && TOMCAT_USER=tomcat`中的`tomcat`，更改为`nobody`：
`test ".$TOMCAT_USER" = . && TOMCAT_USER=nobody`

将tomcat目录的所属者跟所属组设置为nobody：
``` bash
chown -R nobody:nobody /opt/software/apache-tomcat-9.0.8
```

启动、停止、前台运行、查看版本：
``` bash
/opt/software/apache-tomcat-9.0.8/bin/daemon.sh  start
/opt/software/apache-tomcat-9.0.8/bin/daemon.sh  stop
/opt/software/apache-tomcat-9.0.8/bin/daemon.sh  run
/opt/software/apache-tomcat-9.0.8/bin/daemon.sh  version
```

改成service启动方式：
``` bash
cp /opt/software/apache-tomcat-9.0.8/bin/daemon.sh /etc/init.d/tomcat
service tomcat version
service tomcat start
service tomcat stop
service tomcat run
```
