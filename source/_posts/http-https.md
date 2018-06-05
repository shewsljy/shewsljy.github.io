---
title: http-https
date: 2018-05-07 15:09:29
updated: 2018-06-05 18:56:29
categories:
    - Http
    - https
tags:
    - Http
    - Https
---
## 前言
将 http 换成 https ，通过 letsencrypt 申请免费的证书，nginx 配置。

## 申请免费的证书
通过 letsencrypt 申请免费的证书

### 下载certbot-auto脚本
用 yum 安装 certbot ，不是很顺利，遇到 Python 各种报错问题，故转而使用 certbot-auto
``` bash
wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
vim certbot-auto # 将`export VENV_PATH="/opt/eff.org/certbot/venv"`的路径改为`export VENV_PATH="/opt/software/certbot/venv"`
./certbot-auto --help
./certbot-auto certificates
```
<!-- more -->

## certbot / certbot-auto 的两种工作方式
certbot (实际上是 certbot-auto )有两种方式生成证书：
standalone 方式：
certbot 会自己运行一个 web server 来进行验证。如果我们自己的服务器上已经有 web server 正在运行 (比如 Nginx 或 Apache )，用 standalone 方式的话需要先关掉它，以免冲突。
webroot 方式：
certbot 会利用既有的 web server，在其 web root目录下创建隐藏文件， Let’s Encrypt 服务端会通过域名来访问这些隐藏文件，以确认你的确拥有对应域名的控制权。

## letsencrypt 生成证书
事先应该把nginx的命令放在PATH中，我建立了软连接：
``` bash
ln -s /opt/software/nginx-1.14.0/sbin/nginx /usr/local/sbin/nginx
./certbot-auto certonly --email youremail@163.com --webroot -w /opt/software/nginx-1.14.0/html -d yourdomain.cn -d www.yourdomain.cn
```
`certonly` 的意思是只生成证书，不改写`nginx.conf`中的配置信息。`--email`接着自己的邮箱地址。`--webroot`是运行现有的`web server`来进行，`-w` 后面跟着`nginx`的`web`目录，`-d`跟着域名。我这里带了一级跟二级域名。

## 配置nginx中ssl
<pre>
server {
        listen       443 ssl;
        listen       [::]:443 ssl;
        server_name  www.yourdomain.cn;
        ssl_certificate      /etc/letsencrypt/live/yourdomain.cn/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/yourdomain.cn/privkey.pem;
        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;
        ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;
        location / {
            root   html;
            index  index.html index.htm;
        }
    }
</pre>
