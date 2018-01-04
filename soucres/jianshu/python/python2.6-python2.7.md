# python2.6升2.7

## 安装步骤
```bash
yum install gcc gcc-c++ readline-devel sqlite-devel bzip2-devel openssl-devel gdbm-devel libdbi-devel ncurses-libs zlib-devel tcl-devel tk-devel db4-devel
python -V
tar xf Python-2.7.13.tar
cd Python-2.7.13
./configure --with-cxx-main=/usr/bin/gcc
make
make install
mv /usr/bin/python /usr/bin/python2.6.backup
ln -s /usr/local/bin/python /usr/bin/python
python -V
```

## yum
```bash
sed -i "1s/python/python2.6/" /usr/bin/yum
```

## setuptools
```bash
unzip setuptools-36.2.2.zip
cd setuptools-36.2.2
python setup.py install
```

## pip
```bash
tar xzvf pip-9.0.1.tar.gz
cd pip-9.0.1
python setup.py install
ln -s /usr/local/bin/pip /usr/bin/pip

vi /etc/pip.conf
[list]
format=columns

pip list
```