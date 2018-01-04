# ansible编译安装(python2.7)

## 安装git
```bash
yum install git
```

## 创建ansible用户
```bash
useradd ansible
```

## 切换ansible用户
```bash
su - ansible
```

## 递归克隆ansible项目代码
```bash
git clone git://github.com/ansible/ansible.git --recursive
```

## 更新代码
```bash
cd ~/ansible
git pull --rebase
git submodule update --init --recursive
```

## 安装步骤
```bash
cd ~/ansible
source ./hacking/env-setup
sudo pip install --trusted-host pypi.python.org -r requirements.txt
```

## bash_profile
```bash
vi .bash_profile
export PATH=$PATH:/home/ansible/ansible/bin:/home/ansible/ansible/test/runner
export PYTHONPATH=/home/ansible/ansible/lib:
export MANPATH=/home/ansible/ansible/docs/man:
```

## 互信配置
```bash
ssh-keygen -t rsa
ssh-copy-id root@10.211.55.22
ssh-copy-id root@10.211.55.23
ssh-copy-id root@10.211.55.24
```

## 配置文件
```bash
sudo mkdir -p /etc/ansible
sudo vi /etc/ansible/hosts

[ansibleserver]
10.211.55.22

[zabbixserver]
10.211.55.24

[mysqlservers]
10.211.55.22
10.211.55.23
10.211.55.24

[centosa]
10.211.55.22

[centosb]
10.211.55.23

[centosc]
10.211.55.24 
```

## 测试
```bash
ansible all -m ping -u root
ansible mysqlservers -m ping -u root
```