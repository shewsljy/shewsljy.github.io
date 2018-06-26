---
title: jenkins
date: 2018-06-01 16:48:56
updated: 2018-06-26 19:21:51
categories:
    - Jenkins
tags:
    - Jenkins
---
## 下载以及放置Jenkins到tomcat下
``` bash
yum install unzip
cp -rp /opt/software/apache-tomcat-9.0.8 /opt/software/jenkins-tomcat-9.0.8
cd /opt/source/
wget http://mirrors.jenkins.io/war-stable/latest/jenkins.war
unzip -q /opt/source/jenkins.war -d /opt/software/jenkins-tomcat-9.0.8/jenkins
chown -R nobody:nobody /opt/software/jenkins-tomcat-9.0.8/jenkins
```

## 设置Jenkins的家目录
在`/opt/software/jenkins-tomcat-9.0.8/bin/setclasspath.sh`添加下列信息：
<pre>
export JAVA_HOME=/opt/software/jdk1.8.0_171
export LD_LIBRARY_PATH=/opt/software/tomcat-native-1.2.16/lib
export JENKINS_HOME=/opt/software/jenkins-tomcat-9.0.8/.jenkins
</pre>
在`/opt/software/apache-tomcat-9.0.8/bin/daemon.sh`添加下列信息：
<pre>
export JAVA_HOME=/opt/software/jdk1.8.0_171
export CATALINA_BASE=/opt/software/jenkins-tomcat-9.0.8
export CATALINA_HOME=/opt/software/jenkins-tomcat-9.0.8
export LD_LIBRARY_PATH=/opt/software/tomcat-native-1.2.16/lib
export JENKINS_HOME=/opt/software/jenkins-tomcat-9.0.8/.jenkins
</pre>
在`/opt/software/jdk1.8.0_171/jre/lib/security/java.security`替换以下信息：
<pre>
# securerandom.source=file:/dev/random
securerandom.source=file:/dev/./urandom
</pre>

设置守护进程启动：
``` bash
cp /opt/software/apache-tomcat-9.0.8/bin/daemon.sh /etc/init.d/jenkins
```

<!-- more -->

## Nginx配置
在`nginx.conf`中的`http`添加下列信息：
<pre>
# 反向代理tomcat应用jenkins
upstream tomcat_jenkins {
    server localhost:8085;
}

# 代理jenkins
server {
        listen       80;
        listen       [::]:80;
        server_name  jenkins.yourdomain.cn;
        charset utf-8;
        return       301 https://jenkins.yourdomain.cn$request_uri;
}


server {
        listen       443 ssl;
        listen       [::]:443 ssl;
        server_name  jenkins.yourdomain.cn;

        charset utf-8;
        #client_header_buffer_size 512k;
        #large_client_header_buffers 4 512k;
        ssl on;

        ssl_certificate      /etc/letsencrypt/live/yourdomain.cn/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/yourdomain.cn/privkey.pem;

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

        ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        location / {
            error_log           logs/jenkins.error.log;
            access_log          logs/jenkins.access.log;
            proxy_set_header    Host $host;
            proxy_set_header    X-Real-IP $remote_addr;
            proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header    X-Forwarded-Proto $scheme;
            proxy_pass          http://tomcat_jenkins/;
            proxy_redirect      off;
        }   
}
</pre>

## 启动tomcat
``` bash
service jenkins start
tail -f /opt/software/jenkins-tomcat-9.0.8/logs/catalina-daemon.out
```
日志刷出下列信息后，稍等一会儿：
<pre>
*************************************************************
*************************************************************
*************************************************************

Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

This may also be found at: /opt/software/jenkins-tomcat-9.0.8/.jenkins/secrets/initialAdminPassword

*************************************************************
*************************************************************
*************************************************************
</pre>

直到tomcat完全启动：
<pre>
14-Jun-2018 20:17:00.814 INFO [Finalizing set up] hudson.model.UpdateSite.updateData Obtained the latest update center data file for UpdateSource default
14-Jun-2018 20:17:00.827 INFO [Download metadata thread] hudson.model.UpdateSite.updateData Obtained the latest update center data file for UpdateSource default
14-Jun-2018 20:17:00.941 INFO [pool-6-thread-2] jenkins.InitReactorRunner$1.onAttained Completed initialization
14-Jun-2018 20:17:01.033 INFO [Jenkins initialization thread] hudson.WebAppMain$3.run Jenkins is fully up and running
14-Jun-2018 20:17:01.592 INFO [Download metadata thread] hudson.model.DownloadService$Downloadable.load Obtained the updated data file for hudson.tasks.Maven.MavenInstaller
14-Jun-2018 20:17:04.596 INFO [Download metadata thread] hudson.model.DownloadService$Downloadable.load Obtained the updated data file for hudson.tools.JDKInstaller
14-Jun-2018 20:17:04.600 INFO [Download metadata thread] hudson.model.AsyncPeriodicWork$1.run Finished Download metadata. 21,917 ms
14-Jun-2018 20:19:22.574 WARNING [main] org.apache.catalina.util.SessionIdGeneratorBase.createSecureRandom Creation of SecureRandom instance for session ID generation using [SHA1PRNG] took [169,068] milliseconds.
14-Jun-2018 20:19:23.820 INFO [main] org.springframework.context.support.AbstractApplicationContext.prepareRefresh Refreshing org.springframework.web.context.support.StaticWebApplicationContext@47a1b2f7: display name [Root WebApplicationContext]; startup date [Thu Jun 14 20:19:23 CST 2018]; root of context hierarchy
14-Jun-2018 20:19:23.821 INFO [main] org.springframework.context.support.AbstractApplicationContext.obtainFreshBeanFactory Bean factory for application context [org.springframework.web.context.support.StaticWebApplicationContext@47a1b2f7]: org.springframework.beans.factory.support.DefaultListableBeanFactory@406efe63
14-Jun-2018 20:19:23.843 INFO [main] org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons Pre-instantiating singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@406efe63: defining beans [authenticationManager]; root of factory hierarchy
14-Jun-2018 20:19:24.382 INFO [main] org.springframework.context.support.AbstractApplicationContext.prepareRefresh Refreshing org.springframework.web.context.support.StaticWebApplicationContext@79401d4f: display name [Root WebApplicationContext]; startup date [Thu Jun 14 20:19:24 CST 2018]; root of context hierarchy
14-Jun-2018 20:19:24.383 INFO [main] org.springframework.context.support.AbstractApplicationContext.obtainFreshBeanFactory Bean factory for application context [org.springframework.web.context.support.StaticWebApplicationContext@79401d4f]: org.springframework.beans.factory.support.DefaultListableBeanFactory@444456cb
14-Jun-2018 20:19:24.383 INFO [main] org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons Pre-instantiating singletons in org.springframework.beans.factory.support.DefaultListableBeanFactory@444456cb: defining beans [filter,legacy]; root of factory hierarchy
14-Jun-2018 20:19:24.584 INFO [main] org.apache.catalina.startup.HostConfig.deployWAR Deployment of web application archive [/opt/software/jenkins-tomcat-9.0.8/webapps/jenkins.war] has finished in [179,790] ms
14-Jun-2018 20:19:24.592 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-apr-8085"]
14-Jun-2018 20:19:24.713 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-apr-8009"]
14-Jun-2018 20:19:24.716 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 180081 ms
</pre>

## 浏览器访问jenkins
浏览器访问：`http://jenkins.yourdomain.cn`
{% asset_img initial-passwd.png [填入初始密码] %}
如图提示，将`cat /opt/software/jenkins-tomcat-9.0.8/.jenkins/secrets/initialAdminPassword`所得的初始密码填入，点击`继续`
等待一会儿：
{% asset_img waiting.png [等待] %}
选择默认插件
{% asset_img select-plugins.png [选择默认插件] %}
安装默认插件
{% asset_img install-plugins.png [安装默认插件] %}
创建admin账户
{% asset_img create-admin.png [创建admin账户] %}
jenkins开始
{% asset_img start.png [jenkins开始] %}
仪表盘
{% asset_img dashboard.png [仪表盘] %}
更新版本
{% asset_img upgrade.png [更新版本] %}
``` bash
cd /opt/source/
rm -rf jenkins.war
wget http://mirrors.jenkins.io/war-stable/latest/jenkins.war
service jenkins stop
unzip -oq /opt/source/jenkins.war -d /opt/software/jenkins-tomcat-9.0.8/jenkins
service jenkins start
```
