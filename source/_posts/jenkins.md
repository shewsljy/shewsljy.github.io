---
title: jenkins
date: 2018-06-01 16:48:56
updated: 2018-06-05 19:42:56
categories:
    - Jenkins
tags:
    - Jenkins
---
## 下载以及放置Jenkins到tomcat下
``` bash
cd /opt/source/
wget http://mirrors.jenkins.io/war-stable/latest/jenkins.war
cp /opt/source/jenkins.war /opt/software/apache-tomcat-9.0.8/webapps/
```

## 设置Jenkins的家目录
添加在`/opt/software/apache-tomcat-9.0.8/bin/setclasspath.sh`，`/etc/init.d/tomcat`添加环境变量`JENKINS_HOME`：`export JENKINS_HOME=/opt/software/apache-tomcat-9.0.8/.jenkins`

## Nginx配置
在`nginx.conf`中的`http`添加下列信息：
<pre>
# 反向代理tomcat应用jenkins
upstream jenkins {
    server localhost:8080;
}

# 代理jenkins
location /jenkins/ {
    proxy_set_header   Host $host;
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header   X-Forwarded-Proto $scheme;
    proxy_pass         http://jenkins/jenkins/;
    proxy_redirect     off;
}
</pre>
