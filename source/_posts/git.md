---
title: git
date: 2018-06-06 14:50:57
updated: 2018-06-15 15:44:23
categories:
    - Git
tags:
    - Git
---
## 安装git clone https时运行的依赖
``` bash
yum install curl-devel
```

## 下载编译git
``` bash
yum install curl-devel
cd /opt/source/
wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.17.1.tar.gz
tar xzf git-2.17.1.tar.gz
cd /opt/source/git-2.17.1/
./configure --prefix=/opt/software/git-2.17.1
make
make install
ln -s /opt/software/git-2.17.1/bin/git* /usr/local/bin/
```

## 创建git以及appservice用户并配置
创建git以及appservice用户，设置gitolite，免密码登录。
``` bash
useradd appservice
passwd appservice
useradd git
passwd git
su - appservice
ssh-keygen -t rsa -f ~/.ssh/appservice
scp ~/.ssh/appservice.pub git@localhost:~/
exit
su - git
git clone https://github.com/sitaramc/gitolite.git
mkdir -p ~/bin
gitolite/install -to ~/bin
~/bin/gitolite setup -pk ~/appservice.pub
rm -rf ~/appservice.pub
exit
```

<!-- more -->

## 修改git目录文件的权限
将用户nobody加入git组，把/home/git/.gitolite.rc中的UMASK值0077修改为0027，把git用户设置为git-shell登录
``` bash
usermod -a -G git nobody
su - git
vim $HOME/.gitolite.rc
exit
```

<pre>
    UMASK                           =>  0027,
</pre>


``` bash
chmod 775 /home/git
chmod 775 /home/git/projects.list
chmod 775 -R /home/git/repositories
chmod 700 -R /home/git/repositories/gitolite-admin.git
cp -R /opt/source/git-2.17.1/contrib/git-shell-commands /home/git/
chown -R git:git /home/git/git-shell-commands
which git-shell
vim /etc/passwd
```

其中，`/usr/local/bin/git-shell`为`which git-shell`查到的路径
<pre>
git:x:1000:1001::/home/git:/usr/local/bin/git-shell
</pre>