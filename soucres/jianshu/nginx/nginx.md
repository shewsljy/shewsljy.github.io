# nginx编译安装

## 安装依赖
>`yum install -y gcc gcc-c++ automake pcre pcre-devel zlib zlib-devel openssl openssl-devel`


## 安装路径
>`/usr/local/nginx`

## 安装步骤
```bash
cd /usr/local
tar xzvf nginx-1.12.1.tar.gz
cd /usr/local/nginx-1.12.1
./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_v2_module --with-http_stub_status_module
make
make install
```

## 启停
```bash
/usr/local/nginx/sbin/nginx
/usr/local/nginx/sbin/nginx -s stop
/usr/local/nginx/sbin/nginx -s reload
```

## 支撑php
```bash
vi /usr/local/nginx/conf/nginx.conf

location / {
            root   html;
            index  index.php index.html index.htm;
        }
        
location ~ \.php$ {
            root           html;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            fastcgi_param  SCRIPT_NAME      $fastcgi_script_name;
            include        fastcgi_params;
        }
```

## nginx开启(二级)目录浏览功能
>ngx_http_autoindex_module

```bash
mkdir -p /usr/local/nginx/html/soft/{php,zabbix}
mv php-7.1.7.tar.gz /usr/local/nginx/html/soft/php
mv zabbix-3.2.6.tar.gz /usr/local/nginx/html/soft/zabbix

vi /usr/local/nginx/conf/nginx.conf

#开启二级目录浏览功能，提供常用软件下载
        location /soft/ {
            #开启目录浏览功能
            autoindex on;
            #人性化显示文件大小
            autoindex_exact_size off;
            #显示文件在服务器上的时间
            autoindex_localtime on;   
        }
```

# ubuntu编译安装

## 安装依赖 ssl pcre zlib
>`apt install openssl libssl-dev libpcre3 libpcre3-dev zlib1g zlib1g-dev`
```bash
The following packages have unmet dependencies:
 libpcre3-dev : Depends: libpcre3 (= 2:8.38-3.1) but 2:8.41-1+ubuntu16.04.1+deb.sury.org+1 is to be installed
E: Unable to correct problems, you have held broken packages.
apt install libpcre3=2:8.38-3.1 libpcre3-dev=2:8.38-3.1
```

## 编译参数
```bash
./configure --prefix=/opt/nginx-1.12.1 --with-http_ssl_module --with-http_v2_module --with-http_stub_status_module --user=www-data --group=www-data
```