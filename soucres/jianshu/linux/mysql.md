# mysql

## show 显示数据库信息

- show databases; #可用数据库的一个列
- show tables; #一个数据库内的表的列表
- show columns from user; #`show columns from user;`等同快捷方式`describe user;`,user表中各列的字段名、数据类型、是否允许NULL、键信息、默认值以及其他信息
- show status; #广泛的服务器状态信息
- show create database mysql; #显示创建名为mysql数据库的MySQL语句
- show create table user; #显示创建名为user表的MySQL语句
- show grants; #用来显示授予用户（所有用户或特定用户）的安全权限
- show errors; #显示服务器错误消息
- show warnings; #显示服务器警告消息。

## distinct 过滤重复值

- select distinct host from user; #指示MySQL只返回不同的值

## limit 限制返回行的数目

- select user from user limit 5; #返回所有匹配的行(前5行)
- select user from user limit 3,2; #返回所有匹配的行(第三行以后的2行,即4,5行)
- select user from user limit 2 offset 3; #返回所有匹配的行(第三行以后的2行,即4,5行)

## order by 将查询结果排序后展示

- select user,host from user order by user; #默认升序排序
- select user,host from user order by user asc; #指定升序排序
- select user,host from user order by user desc; #指定降序排序
- select host,user,authentication_string from user order by host,user; #按多个列排序,排序完全按所规定的顺序进行

## where 指定搜索/过滤条件

- select user,host from user where user='root'; #查询用户为'root'的信息

| 操 作 符  | 说 明  |
| :---: | :---: |
| = | 等于 |
| <> | 不等于 |
| != | 不等于 |
| < | 小于 |
| <= | 小于等于 |
| `>` | 大于 |
| `>=` | 大于等于 |
| between and | 在指定的两个值之间 |

## null 空值检查

- select user,host from user where user is null; #它与字段包含0、空字符串或仅仅包含空格不同

## and 添加条件

- select user,host from user where user='root' and host = 'localhost'; #用户为'root'且IP为'localhost'的信息

## or 匹配任一条件,跟and一起用时and的次序优先,如需要调整次序用圆括号()限定

- select user,host from user where user='root' or host = 'localhost'; #用户为'root'或者IP为'localhost'的信息

## in 指定条件范围,取合法值的由逗号分隔的清单，全都括在圆括号

- select user,host from user where user in ('root','rundeck'); #查询用户为'root'和'rundeck'的用户信息

## not 否定它之后所跟的任何条件,MySQL支持使用NOT 对IN 、BETWEEN 和EXISTS子句取反

- select user,host from user where user not in ('root','rundeck'); #查询用户除'root','rundeck'之外的用户信息

## like 后跟的搜索模式利用通配符匹配而不是直接相等匹配进行比较

| 通配符  | 说 明  |
| :---: | :---: |
| 百分号（%） | 代表搜索模式中给定位置的0个、1个或多个字符 |
| 下划线（_） | 只匹配单个字符而不是多个字符 |

- select distinct user,host from user where user like 'r%'; #查询用户以'r'开头的用户信息
- select distinct user,host from user where user like 'roo_'; #查询用户以'roo'开头并后面跟着一个字符的用户信息

## regexp 指定正则表达式,过滤SELECT检索出的数据

| 通配符  | 说 明  |
| :---: | :---: |
| .abc | 正则表达式语言中一个特殊的字符,表示匹配任意一个字符 |
| a&#124;b&#124;c | 正则表达式的OR操作符,表示匹配其中之一 |
| [abc] | 正则表达式的另一种形式的OR语句,表示匹配其中字符 |
| ^[aba] | 正则表达式匹配指定字符开头的任何东西,表示匹配指定字符开头的字符 |
| [:alnum:] | 任意字母和数字（同[a-zA-Z0-9]） |
| [:alpha:] | 任意字符（同[a-zA-Z]） |
| [:blank:] | 空格和制表（同[\\t]） |
| [:cntrl:] | ASCII控制字符（ASCII 0到31和127） |
| [:digit:] | 任意数字（同[0-9]） |
| [:graph:] | 与[:print:]相同，但不包括空格 |
| [:lower:] | 任意小写字母（同[a-z]） |
| [:print:] | 任意可打印字符 |
| [:punct:] | 既不在[:alnum:]又不在[:cntrl:]中的任意字符 |
| [:space:] | 包括空格在内的任意空白字符（同[\\f\\n\\r\\t\\v]） |
| [:upper:] | 任意大写字母（同[A-Z]） |
| [:xdigit:] | 任意十六进制数字（同[a-fA-F0-9]） |
| * | 0个或多个匹配 |
| + | 1个或多个匹配（等于{1,}） |
| ? | 0个或1个匹配（等于{0,1}） |
| {n} | 指定数目的匹配 |
| {n,} | 不少于指定数目的匹配 |
| {n,m} | 匹配数目的范围（m不超过255） |

- select user,host from user where user regexp 'root'; #正则表达式查询用户名中带有'root'的用户信息
- select user,host from user where user regexp 'o|r'; #正则表达式查询用户名中带有'o'或者'r的用户信息
- select user,host from user where user regexp '[o|ck]'; #正则表达式查询用户名中带有'o'或者'ck'的用户信息
- select user,host from user where user regexp '^[rm]'; #正则表达式查询用户名中以'r'或者'm'开头的用户信息

## concat 拼接字段,oracle用'||'

- select concat(user,'(',host,')') from user; #按照user(host)这样的格式列出

## trim 去掉字段空格,仅去左边ltrim,仅去右边rtrim

- select concat(trim(user),'(',trim(host),')') from user; #按照user(host)并将user跟host的值去空格这样的格式列出

## as 别名,可省略关键字

- select concat(trim(user),'(',trim(host),')') as user_host from user;  #通过关键字as按user_host命名新列
- select concat(trim(user),'(',trim(host),')') user_host from user;  #省略关键字as按user_host命名新列