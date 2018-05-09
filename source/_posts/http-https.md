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

### CentOS7开启epel源
epel(Extra Packages for Enterprise Linux)
``` bash
sudo yum install epel-release
```

### 安装certbot-nginx
因为配置是在nginx上，所以选择了相对应的版本。
``` bash
sudo yum install yum-utils
sudo yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional
sudo yum install certbot-nginx
```

此时，界面显示:

<pre>
Failed:
  python-urllib3.noarch 0:1.10.2-3.el7
</pre>
和系统自带的urllib3有冲突，解决方法:
``` bash
sudo pip uninstall urllib3
sudo yum install python-urllib3
sudo pip install --upgrade urllib3
sudo pip install pyOpenSSL
```
