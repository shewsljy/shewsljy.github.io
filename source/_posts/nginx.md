---
title: nginx
date: 2018-05-14 10:42:08
updated: 2018-06-05 19:40:08
categories:
    - Web
    - Nginx
tags:
    - Web
    - Nginx
---
## CentOS7编译安装Nginx
创建存放源代码以及安装目录：
``` bash
mkdir /opt/{source,software}
cd /opt/source/
wget http://nginx.org/download/nginx-1.14.0.tar.gz
tar xzf nginx-1.14.0.tar.gz
cd nginx-1.14.0/
yum install gcc gcc-c++ pcre-devel zlib-devel openssl-devel libxslt-devel gd-devel GeoIP-devel gperftools-devel libatomic_ops-devel perl-ExtUtils-Embed
./configure --prefix=/opt/software/nginx-1.14.0 --user=nobody --group=nobody --with-select_module --with-poll_module --with-threads --with-file-aio --with-http_ssl_module --with-http_v2_module --with-http_realip_module --with-http_addition_module --with-http_xslt_module --with-http_image_filter_module --with-http_geoip_module --with-http_sub_module --with-http_dav_module --with-http_flv_module --with-http_mp4_module --with-http_gunzip_module --with-http_gzip_static_module --with-http_auth_request_module --with-http_random_index_module --with-http_secure_link_module --with-http_degradation_module --with-http_slice_module --with-http_stub_status_module --with-http_perl_module --with-mail --with-mail_ssl_module --with-stream --with-stream_ssl_module --with-stream_realip_module --with-stream_geoip_module --with-stream_ssl_preread_module --with-google_perftools_module --with-cpp_test_module --with-compat --with-pcre --with-pcre-jit --with-libatomic --with-debug
make
make install
```

<!-- more -->
## 创建nginx软连接
将nginx的软连接放在`/usr/local/sbin`下：
``` bash
ln -s /opt/software/nginx-1.14.0/sbin/nginx /usr/local/sbin/nginx
```

## nginx.conf配置
<pre>
worker_processes  1;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;

    server_tokens   off;
    sendfile        on;
    tcp_nopush      on;
    keepalive_timeout  65;
    gzip  on;

    # 非域名http(ip4/ip6)访问80端口返回444
    server {
        listen       80  default_server;
        listen       [::]:80 default_server;
        server_name  _;
        return       444;
    }

    # 非域名https(ip4/ip6)访问443端口返回444
    server {
        listen       443 ssl default_server;
        listen       [::]:443 ssl default_server;
        ssl_certificate      /etc/letsencrypt/live/yourdomain.cn/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/yourdomain.cn/privkey.pem;
        return       444;
    }

    # http访问 yourdomain.cn 这个域名跳转到https://www.yourdomain.cn
    server {
        listen       80;
        listen       [::]:80;
        server_name  yourdomain.cn;
        return       301 https://www.yourdomain.cn$request_uri;
    }

    # https访问 yourdomain.cn 这个域名跳转到https://www.yourdomain.cn
    server {
        listen       443 ssl;
        listen       [::]:443 ssl;
        server_name  yourdomain.cn;
        ssl_certificate      /etc/letsencrypt/live/yourdomain.cn/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/yourdomain.cn/privkey.pem;
        return       301 https://www.yourdomain.cn$request_uri;
    }

    # http/https访问 www.yourdomain.cn 这个域名跳转到https://www.yourdomain.cn
    server {
        listen       80;
        listen       [::]:80;
        server_name  www.yourdomain.cn;
        charset utf-8;
        return       301 https://www.yourdomain.cn$request_uri;
    }

    # https访问 www.yourdomain.cn
    server {
        listen       443 ssl;
        listen       [::]:443 ssl;
        server_name  www.yourdomain.cn;

        ssl on;
        ssl_certificate      /etc/letsencrypt/live/yourdomain.cn/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/yourdomain.cn/privkey.pem;
        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;
        ssl_protocols  TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers  HIGH:!aNULL:!MD5;
        ssl_prefer_server_ciphers  on;

        # 根目录
        location / {
            root   html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
}
</pre>
