# linux常见的基本命令

## 目录及文件的基本操作命令
- 显示当前目录`pwd`

`/etc/init.d -> /etc/rc.d/init.d`
```bash
pwd #显示的是连接路径

/etc/init.d
```
```bash
pwd -L #目录连接链接时，输出连接路径

/etc/init.d
```
```bash
pwd -P #目录连接链接时，显示出实际路径

/etc/rc.d/init.d
```
- 切换当前工作目录`cd`
```bash
cd #切换至家目录
```
```bash
cd /usr/local #切换到/usr/local目录
```
```bash
cd .. #切换至上一级目录
```
```bash
cd - #切换至上一次的目录
```

## rpm以及yum在redhat体系中的常用命令：
   > rpm原称为“Redhat Package Manager”
   
   | 命令 | 作用 |
   |:---: |:---: |
   | rpm -ivh filename.rpm | 安装软件的命令格式 |
   | rpm -Uvh filename.rpm | 升级软件的命令格式 |
   | rpm -e filename.rpm | 卸载软件的命令格式 |
   | rpm -qpi filename.rpm | 查询软件的描述信息的命令格式 |
   | rpm -qpl filename.rpm | 列出软件的文件信息的命令格式 |
   | rpm -qf filename | 查询文件属于那个RPM的命令格式 |        
   
   > Yum仓库则是为进一步简化RPM管理软件难度而设计的
   
   | 命令 | 作用 |
   |:---: |:---: |
   | yum repolist all | 列出所有仓库 |
   | yum list all | 列出仓库中所有软件包 |
   | yum info 软件包名称 | 查看软件包信息 |
   | yum install 软件包名称 | 安装软件包 |
   | yum reinstall 软件包名称 | 重新安装软件包 |
   | yum update 软件包名称 | 升级软件包 |
   | yum remove 软件包名称 | 移除软件包 |
   | yum clean all | 清除所有仓库缓存 |
   | yum check-update | 检查可更新的软件包 |
   | yum grouplist | 查看系统中已经安装的软件包组 |
   | yum groupinstall 软件包组名称 | 安装指定的软件包组 |
   | yum groupremove 软件包组名称 | 移除指定的软件包组 |
   | yum groupinfo 软件包组名称 | 查询指定的软件包组信息 |

## 系统内存管理
- 查看内存文本信息`cat /proc/meminfo`
```bash
MemTotal:        4040584 kB
MemFree:         3330160 kB
Buffers:           97200 kB
Cached:            93824 kB
SwapCached:            0 kB
Active:           267404 kB
Inactive:         127088 kB
Active(anon):     203668 kB
Inactive(anon):        8 kB
Active(file):      63736 kB
Inactive(file):   127080 kB
Unevictable:           0 kB
Mlocked:               0 kB
SwapTotal:       2031612 kB
SwapFree:        2031612 kB
Dirty:                 8 kB
Writeback:             0 kB
AnonPages:        203480 kB
Mapped:            24252 kB
Shmem:               196 kB
Slab:             246856 kB
SReclaimable:     218920 kB
SUnreclaim:        27936 kB
KernelStack:        3840 kB
PageTables:         3880 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:     4051904 kB
Committed_AS:     713464 kB
VmallocTotal:   34359738367 kB
VmallocUsed:      174440 kB
VmallocChunk:   34359556404 kB
HardwareCorrupted:     0 kB
AnonHugePages:    172032 kB
HugePages_Total:       0
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
DirectMap4k:       10240 kB
DirectMap2M:     4184064 kB
```
- 查看内存命令`free`
```bash
usage: free [-b|-k|-m|-g|-h] [-l] [-o] [-t] [-s delay] [-c count] [-V]
  -b,-k,-m,-g show output in bytes, KB, MB, or GB
  -h human readable output (automatic unit scaling)
  -l show detailed low and high memory statistics
  -o use old format (no -/+buffers/cache line)
  -t display total for RAM + swap
  -s update every [delay] seconds
  -c update [count] times
  -a show available memory if exported by kernel (>80 characters per line)
  -V display version information and exit
```
```bash
free -h

             total       used       free     shared    buffers     cached
Mem:          3.9G       692M       3.2G       196K        94M        90M
-/+ buffers/cache:       507M       3.4G
Swap:         1.9G         0B       1.9G
```
- 查看共享内存命令`ipcs`
```bash
ipcs provides information on ipc facilities for which you have read access.
Resource Specification:
	-m : shared_mem
	-q : messages
	-s : semaphores
	-a : all (default)
Output Format:
	-t : time
	-p : pid
	-c : creator
	-l : limits
	-u : summary
-i id [-s -q -m] : details on resource identified by id
usage : ipcs -asmq -tclup 
	ipcs [-s -m -q] -i id
	ipcs -h for help.
```
```bash
ipcs

------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status      

------ Semaphore Arrays --------
key        semid      owner      perms      nsems     
0x00000000 0          root       600        1         
0x00000000 65537      root       600        1         

------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages    
```

## 系统进程管理
- 查看进程管理命令`ps`
```bash
********* simple selection *********  ********* selection by list *********
-A all processes                      -C by command name
-N negate selection                   -G by real group ID (supports names)
-a all w/ tty except session leaders  -U by real user ID (supports names)
-d all except session leaders         -g by session OR by effective group name
-e all processes                      -p by process ID
                                      -q by process ID (unsorted & quick)
T  all processes on this terminal     -s processes in the sessions given
a  all w/ tty, including other users  -t by tty
g  OBSOLETE -- DO NOT USE             -u by effective user ID (supports names)
r  only running processes             U  processes for specified users
x  processes w/o controlling ttys     t  by tty
*********** output format **********  *********** long options ***********
-o,o user-defined  -f full            --Group --User --pid --cols --ppid
-j,j job control   s  signal          --group --user --sid --rows --info
-O,O preloaded -o  v  virtual memory  --cumulative --format --deselect
-l,l long          u  user-oriented   --sort --tty --forest --version
-F   extra full    X  registers       --heading --no-heading --context
                                      --quick-pid
                    ********* misc options *********
-V,V  show version      L  list format codes  f  ASCII art forest
-m,m,-L,-T,H  threads   S  children in sum    -y change -l format
-M,Z  security data     c  true command name  -c scheduling class
-w,w  wide output       n  numeric WCHAN,UID  -H process hierarchy
```
```bash
ps -ef|grep mysql

root     13486     1  0 Apr26 ?        00:00:00 /bin/sh /usr/bin/mysqld_safe --datadir=/var/lib/mysql --socket=/var/lib/mysql/mysql.sock --pid-file=/var/run/mysqld/mysqld.pid --basedir=/usr --user=mysql
mysql    13588 13486  0 Apr26 ?        00:00:05 /usr/libexec/mysqld --basedir=/usr --datadir=/var/lib/mysql --user=mysql --log-error=/var/log/mysqld.log --pid-file=/var/run/mysqld/mysqld.pid --socket=/var/lib/mysql/mysql.sock
root     14450 14285  0 04:20 pts/1    00:00:00 grep mysql
```
```bash
ps axu|grep mysql

root     13486  0.0  0.1 106088  1504 ?        S    Apr26   0:00 /bin/sh /usr/bin/mysqld_safe --datadir=/var/lib/mysql --socket=/var/lib/mysql/mysql.sock --pid-file=/var/run/mysqld/mysqld.pid --basedir=/usr --user=mysql
mysql    13588  0.0  2.6 377048 26800 ?        Sl   Apr26   0:05 /usr/libexec/mysqld --basedir=/usr --datadir=/var/lib/mysql --user=mysql --log-error=/var/log/mysqld.log --pid-file=/var/run/mysqld/mysqld.pid --socket=/var/lib/mysql/mysql.sock
root     14452  0.0  0.0 103332   888 pts/1    S+   04:21   0:00 grep mysql
```