---
title: nginx
date: 2018-05-14 10:42:08
updated: 2018-05-14 10:42:08
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
