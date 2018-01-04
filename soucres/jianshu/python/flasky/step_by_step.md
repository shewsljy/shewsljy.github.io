# 一步步实现flasky

## 基础环境搭建
- 平台环境
    - ubuntu 16.04 64位
- 克隆代码库
    - `sudo apt install git`
    - `git clone https://github.com/miguelgrinberg/flasky.git`
    - `cd flasky`
    - `git checkout 1a`
- 设置虚拟环境
    - `sudo apt install python-virtualenv`
    - `virtualenv venv` or `virtualenv venv --no-site-packages`
- 将`pip list`的格式设为`columns`
    - `echo -e "[list]\nformat=columns" > venv/pip.conf`
- 在虚拟环境中安装flask
    - `source venv/bin/activate`
    - `pip install flask`
    - `deactivate`
