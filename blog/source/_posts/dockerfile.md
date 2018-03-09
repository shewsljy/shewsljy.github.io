---
title: 通过 Dockerfile 构建 Docker 镜像
date: 2018-01-26 15:10:09
updated: 2018-03-09 13:13:32
categories:
    - Docker
tags:
    - Dockerfile
---
## 前言
这里通过Docker官方维护的Nginx镜像来讲解如何通过Dockerfile构建Docker镜像。

## Dockerfile
下面是具体内容，`#`所在的行内容代表注释。
<!-- more -->
<pre>
# FROM指定一个基础镜像，一般明确tag，没有则默认为latest
# FROM &lt;image&gt;:&lt;tag&gt;
FROM alpine:3.5

# LABEL用于为镜像添加元数据，元数据以键值对的形式指定，指定多条元数据时不同元数据之间通过空格分隔
# LABEL &lt;key&gt;=&lt;value&gt; &lt;key&gt;=&lt;value&gt; &lt;key&gt;=&lt;value&gt; ...
# maintainer 镜像作者
LABEL maintainer="NGINX Docker Maintainers &lt;docker-maint@nginx.com&gt;"

# ENV用于设置环境变量，按数量多寡有两种设置形式
# 单个ENV &lt;key&gt; &lt;value&gt;
# 多个ENV &lt;key&gt;=&lt;value&gt; &lt;key&gt;=&lt;value&gt; &lt;key&gt;=&lt;value&gt; ...
ENV NGINX_VERSION 1.12.2

# RUN命令将在当前image中执行任意合法命令并提交执行结果。命令执行提交后，就会自动执行Dockerfile中的下一个指令。
# RUN指令缓存不会在下个命令执行时自动失效。--no-cache 标志可以被用于强制取消缓存使用。
# RUN中可以设置变量，只在当前RUN中使用。
# RUN &lt;key&gt;=&lt;value&gt; && &lt;key&gt;=&lt;value&gt; && &lt;key&gt;=&lt;value&gt; ...
# apk add --no-cache 不使用本地缓存安装包数据库，直接从远程获取安装包信息安装。这样我们就不必通过 apk update 获取安装包数据库了。
# apk add --virtual .build-deps 将本次安装的所有包封装成一个名为 .build-deps 的虚拟包。这样做的好处是可以通过 apk del .build-deps一键清除这些包。

RUN GPG_KEYS=B0F4253373F8F6F510D42178520A9993A1C052F8 \ #加密key，下载nginx的源码包后会对其进行校验
	&& CONFIG="\ #编译nginx的设置
		--prefix=/etc/nginx \ #安装路径
		--sbin-path=/usr/sbin/nginx \ #二进制命令路径
		--modules-path=/usr/lib/nginx/modules \ #存放编译模块的路径
		--conf-path=/etc/nginx/nginx.conf \ #nginx配置文件
		--error-log-path=/var/log/nginx/error.log \ #错误日志存放路径
		--http-log-path=/var/log/nginx/access.log \ #访问日志存放路径
		--pid-path=/var/run/nginx.pid \ #nginx进程的pid路径
		--lock-path=/var/run/nginx.lock \ #ginx进程的lock路径
		--http-client-body-temp-path=/var/cache/nginx/client_temp \ #http客户端请求临时文件路径
		--http-proxy-temp-path=/var/cache/nginx/proxy_temp \ #http代理临时文件路径
		--http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp \ #http通信fastcgi协议临时文件路径
		--http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp \ #http通信uwsgi协议临时文件路径
		--http-scgi-temp-path=/var/cache/nginx/scgi_temp \ #http通信scgi协议临时文件路径
		--user=nginx \ #进程所属用户
		--group=nginx \ #进程所属组
		--with-http_ssl_module \ #支持https请求，依赖于openssl
		--with-http_realip_module \ #支持显示真实来源IP地址，主要用于nginx做前端负载均衡服务器使用
		--with-http_addition_module \ #作为一个输出过滤器，能够在请求经过一个location前或后时在该location本身添加内容
		--with-http_sub_module \ #支持在nginx的应答中搜索并替换文本
		--with-http_dav_module \ #支持为文件和目录指定权限，限制不同类型的用户对于页面有不同的操作权限
		--with-http_flv_module \ #支持对FLV（flash）文件的拖动播放
		--with-http_mp4_module \ #支持H.264/AAC文件为伪流媒体
		--with-http_gunzip_module \ #对于不支持gzip编码的客户,为客户解压缩预压缩内容
		--with-http_gzip_static_module \ #支持在线实时压缩输出数据流
		--with-http_random_index_module \ #允许从目录中选择一个随机主页
		--with-http_secure_link_module \ #支持将一个哈希值链接到一个url中，只有那些使用正确的密码能够计算链接
		--with-http_stub_status_module \ #获取nginx自上次启动以来的工作状态
		--with-http_auth_request_module \ #支持基于服务器内部子请求的返回结果来控制用户鉴权
		--with-http_xslt_module=dynamic \ #支持使用多个 XSLT stylesheets（样式表）将xml相应进行相应变换的过滤器
		--with-http_image_filter_module=dynamic \ #集成图片处理，可实时处理缩放图片，旋转图片，验证图片有效性
		--with-http_geoip_module=dynamic \ #支持设置个中变量以便在配置区段中使用，针对(ip)地区访问控制
		--with-threads \ #支持线程池
		--with-stream \ #支持负载均衡
		--with-stream_ssl_module \ #支持负载均衡https请求
		--with-stream_ssl_preread_module \ #支持负载均衡分析数据
		--with-stream_realip_module \ #支持负载均衡显示真实来源IP地址
		--with-stream_geoip_module=dynamic \ #支持负载均衡针对(ip)地区访问控制
		--with-http_slice_module \ #支持Range回源
		--with-mail \ #支持POP3/IMAP4/SMTP邮件代理
		--with-mail_ssl_module \ #支持加密的POP3/IMAP4/SMTP邮件代理
		--with-compat \ #允许任何模块被编译并动态加载到相同版本的nginx实例
		--with-file-aio \ #支持file aio（一种APL文件传输格式）
		--with-http_v2_module \ #支持HTTP/2
	" \
	&& addgroup -S nginx \ #创建系统组nginx
	&& adduser -D -S -h /var/cache/nginx -s /sbin/nologin -G nginx nginx \ #创建不设密码不许登录的系统用户nginx，指定目录在/var/cache/nginx，并加入系统组nginx
	&& apk add --no-cache --virtual .build-deps \ #--no-cache 不使用本地缓存安装包数据库，--virtual .build-deps 将本次安装的所有包封装成一个名为 .build-deps 的虚拟包
		gcc \ #安装各项依赖
		libc-dev \
		make \
		openssl-dev \
		pcre-dev \
		zlib-dev \
		linux-headers \
		curl \
		gnupg \
		libxslt-dev \
		gd-dev \
		geoip-dev \
	&& curl -fSL http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz -o nginx.tar.gz \ #下载nginx源码包并校验
	&& curl -fSL http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz.asc  -o nginx.tar.gz.asc \
	&& export GNUPGHOME="$(mktemp -d)" \
	&& found=''; \
	for server in \
		ha.pool.sks-keyservers.net \
		hkp://keyserver.ubuntu.com:80 \
		hkp://p80.pool.sks-keyservers.net:80 \
		pgp.mit.edu \
	; do \
		echo "Fetching GPG key $GPG_KEYS from $server"; \
		gpg --keyserver "$server" --keyserver-options timeout=10 --recv-keys "$GPG_KEYS" && found=yes && break; \
	done; \
	test -z "$found" && echo >&2 "error: failed to fetch GPG key $GPG_KEYS" && exit 1; \
	gpg --batch --verify nginx.tar.gz.asc nginx.tar.gz \
	&& rm -r "$GNUPGHOME" nginx.tar.gz.asc \
	&& mkdir -p /usr/src \
	&& tar -zxC /usr/src -f nginx.tar.gz \ #解压nginx
	&& rm nginx.tar.gz \
	&& cd /usr/src/nginx-$NGINX_VERSION \
	&& ./configure $CONFIG --with-debug \ #debug编译nginx
	&& make -j$(getconf _NPROCESSORS_ONLN) \
	&& mv objs/nginx objs/nginx-debug \ #将debug编译生成的库文件移动指定目录
	&& mv objs/ngx_http_xslt_filter_module.so objs/ngx_http_xslt_filter_module-debug.so \
	&& mv objs/ngx_http_image_filter_module.so objs/ngx_http_image_filter_module-debug.so \
	&& mv objs/ngx_http_geoip_module.so objs/ngx_http_geoip_module-debug.so \
	&& mv objs/ngx_stream_geoip_module.so objs/ngx_stream_geoip_module-debug.so \
	&& ./configure $CONFIG \ #正式编译nginx
	&& make -j$(getconf _NPROCESSORS_ONLN) \
	&& make install \ #安装
	&& rm -rf /etc/nginx/html/ \ #删除nginx默认的html文件
	&& mkdir /etc/nginx/conf.d/ \ #nginx的配置路径
	&& mkdir -p /usr/share/nginx/html/ \ #创建nginx新的html路径，把初始化文件移动到此目录下，并将debug编译的库文件移动到模块目录下
	&& install -m644 html/index.html /usr/share/nginx/html/ \
	&& install -m644 html/50x.html /usr/share/nginx/html/ \
	&& install -m755 objs/nginx-debug /usr/sbin/nginx-debug \
	&& install -m755 objs/ngx_http_xslt_filter_module-debug.so /usr/lib/nginx/modules/ngx_http_xslt_filter_module-debug.so \
	&& install -m755 objs/ngx_http_image_filter_module-debug.so /usr/lib/nginx/modules/ngx_http_image_filter_module-debug.so \
	&& install -m755 objs/ngx_http_geoip_module-debug.so /usr/lib/nginx/modules/ngx_http_geoip_module-debug.so \
	&& install -m755 objs/ngx_stream_geoip_module-debug.so /usr/lib/nginx/modules/ngx_stream_geoip_module-debug.so \
	&& ln -s ../../usr/lib/nginx/modules /etc/nginx/modules \ #设置库文件目录软链接
	&& strip /usr/sbin/nginx* \ #用strip命令从特定文件中剥掉一些符号信息和调试信息，使文件变小
	&& strip /usr/lib/nginx/modules/*.so \
	&& rm -rf /usr/src/nginx-$NGINX_VERSION \ #删除解压的源文件
	\
	# 这一段好像是说移除gettext而不涉及envsubst（直接卸载gettext会将它依赖的envsubst也给干掉？）
	# Bring in gettext so we can get `envsubst`, then throw
	# the rest away. To do this, we need to install `gettext`
	# then move `envsubst` out of the way so `gettext` can
	# be deleted completely, then move `envsubst` back.
	&& apk add --no-cache --virtual .gettext gettext \
	&& mv /usr/bin/envsubst /tmp/ \
	\
	&& runDeps="$( \
		scanelf --needed --nobanner --format '%n#p' /usr/sbin/nginx /usr/lib/nginx/modules/*.so /tmp/envsubst \
			| tr ',' '\n' \
			| sort -u \
			| awk 'system("[ -e /usr/local/lib/" $1 " ]") == 0 { next } { print "so:" $1 }' \
	)" \
	&& apk add --no-cache --virtual .nginx-rundeps $runDeps \
	&& apk del .build-deps \
	&& apk del .gettext \
	&& mv /tmp/envsubst /usr/local/bin/ \
	\
	# forward request and error logs to docker log collector
	# 将系统标准输出/错误输出分别定向到nginx的access.log和error.log，通过docker拿到日志
	&& ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

# COPY 将文件从路径 &lt;src&gt; 复制添加到容器内部路径 &lt;dest&gt;。
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 声明docker运行容器时提供服务的端口。
EXPOSE 80

# STOPSIGNAL 进程信号处理
STOPSIGNAL SIGTERM

# CMD 容器启动执行的命令
CMD ["nginx", "-g", "daemon off;"]
</pre>

## 构建镜像
以Docker官方维护的Dockerfile(nginx)为例，构建镜像

### 目录结构
新建`nginx-alpine-1.12.2`，将构建镜像所需的Dockerfile文件以及nginx的两个配置文件放入，目录结构如下：
<pre>
nginx-alpine-1.12.2
├── Dockerfile
├── nginx.conf
└── nginx.vh.default.conf
</pre>

nginx.conf由`COPY nginx.conf /etc/nginx/nginx.conf`这条命令从当前路径拷贝到镜像中，其内容为：
<pre>
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
</pre>

nginx.vh.default.conf由`COPY nginx.vh.default.conf /etc/nginx/conf.d/default.conf`这条命令从当前路径拷贝到镜像中，其内容为：
<pre>
server {
    listen       80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    # }

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    # }

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    # }
}
</pre>

### 构建镜像以及打tag
在该目录下执行：
``` bash
docker build -t nginx:by-alpine-1.12.2 .
```
`-t`是给镜像起名跟打tag，后面跟着格式&lt;image_name&gt;:&lt;tag_name&gt;，不要忘记后面有个`.`，表示在当前目录下找`Dockerfile`
构建镜像需要一些时间，请耐心等待。

## 依据镜像创建并运行容器
运行命令：
``` bash
docker run --name mynginx -d -p 80:80 nginx:by-alpine-1.12.2
docker ps -a
```
<pre>
CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS                          PORTS                NAMES
807c345bfa0a        nginx:by-alpine-1.12.2           "nginx -g 'daemon of…"   7 seconds ago       Up 6 seconds                    0.0.0.0:80->80/tcp   mynginx
</pre>

`--name mynginx`是给容器起名字，`-d`是让容器后台运行，`-p 80:80`是做了宿主机跟容器的端口映射，格式为&lt;host_port&gt;:&lt;container_port&gt;，最后跟着&lt;image_name&gt;:&lt;tag_name&gt;

## 访问nginx
运行命令`curl http://localhost`：
{% asset_img welcome.png [curl访问] %}

浏览器访问`http://localhost`：
{% asset_img nginx.png [浏览器访问] %}

通过命令`docker logs mynginx`查看nginx日志。`mynginx`是容器名称，也可以换成容器ID。
<pre>
172.17.0.1 - - [09/Mar/2018:04:26:24 +0000] "GET / HTTP/1.1" 200 612 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0) Gecko/20100101 Firefox/58.0" "-"
2018/03/09 04:26:24 [error] 5#5: *1 open() "/usr/share/nginx/html/favicon.ico" failed (2: No such file or directory), client: 172.17.0.1, server: localhost, request: "GET /favicon.ico HTTP/1.1", host: "localhost"
172.17.0.1 - - [09/Mar/2018:04:26:24 +0000] "GET /favicon.ico HTTP/1.1" 404 169 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:58.0) Gecko/20100101 Firefox/58.0" "-"
</pre>

## 改造Dockerfile为己用
如果完全按照官方维护nginx的Dockerfile来构建镜像，感觉不是很合适自己的实际情况。比如，时间默认为UTC，日志通过`docker logs`命令获取，配置文件在容器中，不方便修改等。可以适当的更改Dockerfile，让其符合习惯。

### 更改配置
更改时区，增加端口，日志不通过docker命令获取：
{% asset_img rebuild.png [更改配置] %}

### 启动方式
运行`docker build -t nginx:mybuild-alpine-1.12.2 .`重新构建镜像后，将配置、html目录以及日志放置在宿主机中，执行命令前，在宿主机的相关目录下添加配置文件(nginx.conf，default.conf)，html文件(index.html，50x.html)。logs目录下的日志文件是运行时候自己生成的。
<pre>
dockerdata
└── nginx
    ├── etc
    │   ├── conf.d
    │   │   └── default.conf
    │   └── nginx.conf
    ├── html
    │   ├── 50x.html
    │   └── index.html
    └── logs
        ├── access.log
        └── error.log
</pre>

``` bash
docker run --name nginx -d -p 80:80 -p 443:443 -v /dockerdata/nginx/etc/nginx.conf:/etc/nginx/nginx.conf -v /dockerdata/nginx/etc/conf.d:/etc/nginx/conf.d -v /dockerdata/nginx/html:/usr/share/nginx/html -v /dockerdata/nginx/logs:/var/log/nginx nginx:mybuild-alpine-1.12.2
```
`-v 宿主机目录(文件) 容器中目录(文件)`是挂载命令的格式。