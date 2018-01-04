# php编译安装

## 安装依赖
>`yum install gcc make libtool gd-devel libjpeg-devel libpng-devel libxml2-devel bzip2-devel libcurl-devel`

## 安装路径
>`/usr/local/php`

## 安装步骤
```bash
cd /usr/local
tar xzvf php-7.1.7.tar.gz
cd /usr/local/php-7.1.7
./configure --prefix=/usr/local/php --with-config-file-path=/usr/local/php/etc --with-bz2 --with-curl --enable-ftp --enable-sockets --with-gd --enable-gd-native-ttf --with-iconv --enable-mbstring --enable-calendar --with-gettext --with-zlib --with-pdo-mysql=mysqlnd --with-mysqli=mysqlnd --enable-dom --enable-xml --enable-fpm --with-libdir=lib64 --enable-bcmath --with-png-dir --with-jpeg-dir --with-freetype-dir --with-xpm-dir
make
make install
```

## 配置
```bash
cp /usr/local/php-7.1.7/php.ini-production /usr/local/php/etc/php.ini
cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf
/usr/local/php/sbin/php-fpm
```

# ubuntu编译

## 安装依赖
>`apt install libxml2-dev libbison-dev re2c libjpeg-dev libvpx-dev ···`

## 编译参数
```bash
./configure --prefix=/opt/php-5.6.31 --enable-fpm --with-fpm-user=www-data --with-fpm-group=www-data --with-config-file-path=/opt/php-5.6.31/etc --with-libxml-dir --with-zlib --with-curl --with-bz2 --enable-bcmath --enable-calendar --with-pcre-regex --with-pcre-dir --enable-ftp --with-gd --with-vpx-dir --with-jpeg-dir --with-png-dir --with-t1lib --with-zlib-dir --with-xpm-dir --with-freetype-dir --enable-gd-native-ttf --enable-gd-jis-conv --with-gettext --with-gmp --with-mhash --enable-mbstring --with-mcrypt --with-mysql --with-pdo-mysql --enable-zip
```