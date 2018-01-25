---
title: Docker 在 CentOS 7.4 平台上的运用
date: 2018-01-25 09:40:07
updated: 2018-01-25 18:03:07
categories:
    - Docker
tags:
    - Docker
---
## 前言
如果有在服务器上部署过若干应用(服务)经历的同行，相信都会被其所需的环境给折腾到。编程语言环境：跑个JAVA程序，JRE需要安装，若是需编译代码，还得装个JDK。PHP，Python皆如此。部署WEB应用，HTTP服务器需要安装，可选有Nginx，Apache Tomcat，Apache HTTP Server。存储服务的Mysql···还需要规划相应的用户来运行其进程，繁琐至极。Docker的出现，可以很好的解决这一点。

## CentOS 7.4 安装 Docker CE
当然是选择Docker的社区版本Docker CE。安装之前先添加Docker的yum仓库源以及支持`devicemapper`存储驱动的依赖:
``` bash
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum update
yum install docker-ce
```
安装docker-ce会要求添加`GPG key`，同意即可。安装完成后，`docker`组会自动创建，但是没添加用户。只能以`root`用户操作docker命令，此时可以将普通用户添加至`docker`组，操作命令加`sudo`即可。
``` bash
usermod -aG docker your-user
```
下文皆以普通用户执行相关命令。

<!-- more -->

## 启动及配置Docker加速器地址
启动命令如下:
``` bash
sudo systemctl start docker
```
docker默认拉取官方`docker hub`仓库的镜像，由于你懂得的原因，下载速度很慢。此时可以设置镜像的加速器地址，国内的有阿里以及docker中国。
docker中国加速器:
``` bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
阿里专属加速器:
``` bash
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xxxxxxxx.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```
具体地址请上阿里云控制台查看，没有的话就用docker中国的。用`docker info`命令，在输出内容的最后出现`Registry Mirrors`字样的则设置成功。

## Docker常用命令
不定时补充docker命令。

### 官方示例 hello-world
``` bash
docker run hello-world
```
输出:
<pre>
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
ca4f61b1923c: Pull complete 
Digest: sha256:66ef312bbac49c39a89aa9bcc3cb4f3c9e7de3788c944158df3ee0176d32b751
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://cloud.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/engine/userguide/
</pre>

第一行`Unable to find image 'hello-world:latest' locally`说是在本地没找到`hello-world`镜像，镜像名称冒号后跟着版本标签，不指明镜像版本时默认为`latest`。然后docker通过网络去其仓库下载`hello-world`(latest版本)镜像，通过`run`命令创建并运行以`hello-world`镜像为基础的容器，容器输出相应内容后经`Docker daemon`接收，转接输出到当前的显示设备上。

### 查看本地镜像
``` bash
docker images
```
<pre>
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         latest              f2a91732366c        2 months ago        1.85kB
</pre>

### 搜索镜像
``` bash
docker search hello-world
```
<pre>
NAME                                       DESCRIPTION                                     STARS               OFFICIAL            AUTOMATED
hello-world                                Hello World! (an example of minimal Dockeriz…   430                 [OK]                
kitematic/hello-world-nginx                A light-weight nginx container that demonstr…   88                                      
tutum/hello-world                          Image to test docker deployments. Has Apache…   48                                      [OK]
dockercloud/hello-world                    Hello World!                                    13                                      [OK]
hypriot/armhf-hello-world                  Hello World! (an example of minimal Dockeriz…   5                                       
armhf/hello-world                          Hello World! (an example of minimal Dockeriz…   5                                       
marcells/aspnet-hello-world                ASP.NET vNext - Hello World                     4                                       [OK]
bonomat/nodejs-hello-world                 a simple nodejs hello world container           3                                       [OK]
crccheck/hello-world                       Hello World web server in under 2.5 MB          2                                       [OK]
carinamarina/hello-world-app               This is a sample Python web application, run…   1                                       [OK]
ppc64le/hello-world                        Hello World! (an example of minimal Dockeriz…   1                                       
kevindockercompany/hello-world                                                             0                                       
ansibleplaybookbundle/hello-world-apb      An APB which deploys a sample Hello World! a…   0                                       [OK]
ansibleplaybookbundle/hello-world-db-apb   An APB which deploys a sample Hello World! a…   0                                       [OK]
s390x/hello-world                          Hello World! (an example of minimal Dockeriz…   0                                       
infrastructureascode/hello-world           A tiny "Hello World" web server with a healt…   0                                       [OK]
hello-seattle                              Hello from DockerCon 2016 (Seattle)!            0                   [OK]                
lkungs/docker-hello-world                  Simple Hello World Example                      0                                       [OK]
stumacsolutions/hello-world-container                                                      0                                       
gscrivano/hello-world                      hello world example system container            0                                       [OK]
ashleybarrett/node-hello-world             Simple "hello world" image using node.          0                                       
uniplaces/hello-world                                                                      0                                       
sharor/hello-world                                                                         0                                       
jensendw/hello-world                                                                       0                                       
acstest/hello-world-java                                                                   0                                       
</pre>

`OFFICIAL`代表官方维护的镜像，`STARS`代表该镜像的收藏量，`NAME`这列是镜像信息，`hello-world`前面带有`xxxxx/`代表该镜像是用户上传的，`AUTOMATED`代表自动接收最新的镜像版本。

### 查看容器
``` bash
docker ps -a
```
<pre>
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
33de67c2e8ee        hello-world         "/hello"            6 minutes ago       Exited (0) 6 minutes ago                       kind_ritchie
</pre>

先前通过`docker run hello-world`这一条命令，创建了该容器。`CONTAINER ID`是创建时自动生成的容器ID，`IMAGE`顾名思义是容器使用的镜像，`COMMAND`是容器运行时其执行的命令，可以看出镜像中根目录下的`hello`是一个二进制文件，`NAMES`的值为`kind_ritchie`是自动生成的容器别名，也可以在创建时指定。

### 删除容器
``` bash
docker rm 33de67c2e8ee
```

### 本地构建镜像
以`hello-world`为例子，本地构建，需要从官网下载[hello](https://github.com/docker-library/hello-world/raw/master/amd64/hello-world/hello)这个二进制文件。放置到新建的`hello-world`目录下，同时新建名为`Dockerfile`的文件。目录文件结构如下:
<pre>
hello-world
├── Dockerfile
└── hello
</pre>

`Dockerfile`中内容如下:
<pre>
FROM scratch
COPY hello /
CMD ["/hello"]
</pre>

文件内容中第一行`FROM scratch`是以`scratch`这个特殊的空的镜像为基础镜像；第二行`COPY hello /`则是把当前目录下的`hello`文件拷贝到基础镜像中的`/`目录下；第三行`CMD ["/hello"]`是容器运行时要执行的命令。
在`hello-world`目录下，通过以下命令生成镜像:
``` bash
docker build -t hello-world:mybuild .
```
先解释一下构建的命令，`docker build`是构建指令，`-t`参数指明构建的镜像名称，`hello-world:mybuild`是镜像的名称(hello-world)以及标签版本号(mybuild)，中间的冒号以示区分，最后的`.`则指明构建文件的路径为当前目录下，docker会自动找到名为`Dockerfile`的文件。
构建过程输出如下:
<pre>
Sending build context to Docker daemon  4.608kB
Step 1/3 : FROM scratch
 ---> 
Step 2/3 : COPY hello /
 ---> bca7d798d6f3
Step 3/3 : CMD ["/hello"]
 ---> Running in 6f64c769c5a7
Removing intermediate container 6f64c769c5a7
 ---> d6da9d986ad4
Successfully built d6da9d986ad4
Successfully tagged hello-world:mybuild
</pre>

第一步是基于`scratch`这个特殊的空镜像，没有ID；第二步是把当前目录下的`hello`文件复制到`空镜像`中的`/`目录下，由此生成了新的commit，ID为`bca7d798d6f3`；第三步是以之为基础，运行它并创建了ID为`6f64c769c5a7`的容器，容器执行`/hello`命令后结束并销毁，同时生成新的commit，ID为`d6da9d986ad4`。这个最后commit的ID则为镜像ID。`docker images`对比一下本地构建和官方的`hello-world`镜像:
<pre>
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
hello-world         mybuild             d6da9d986ad4        38 seconds ago      1.85kB
hello-world         latest              f2a91732366c        2 months ago        1.85kB
</pre>

看上去是一样的，以本地构建的镜像创建容器运行看一下效果，命令执行:
``` bash
docker run hello-world:mybuild
```
输出报错，纳尼？
<pre>
docker: Error response from daemon: OCI runtime create failed: container_linux.go:296: starting container process caused "exec: \"/hello\": permission denied": unknown.
</pre>

`permission denied`没有权限，怎么会？后来，我尝试着将`hello`文件加了可执行权限`chmod u+x hello`，删除相关的容器以及镜像，重新构建后，再次执行`docker run hello-world:mybuild`
<pre>
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://cloud.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/engine/userguide/
</pre>

这才对嘛！