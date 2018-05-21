---
title: http-https
date: 2018-05-07 15:09:29
updated: 2018-05-07 15:09:29
categories:
    - Http
    - https
tags:
    - Http
    - Https
---
## 前言
将http换成https，通过letsencrypt申请免费的证书，nginx配置。

## 申请免费的证书
通过letsencrypt申请免费的证书

### 下载certbot-auto脚本
用yum安装certbot，不是很顺利，遇到Python各种报错问题，故转而使用certbot-auto
``` bash
wget https://dl.eff.org/certbot-auto
chmod u+x certbot-auto
vim certbot-auto # 将`export VENV_PATH="/opt/eff.org/certbot/venv"`的路径改为`export VENV_PATH="/opt/software/certbot/venv"`
./certbot-auto --help
./certbot-auto certificates
./certbot-auto --nginx
```
<!-- more -->
