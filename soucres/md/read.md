# read命令的作用是从标准流中读取输入，并把读取的内容放到某个变量中
> read [-ers] [-a aname] [-d delim] [-i text] [-n nchars] [-N nchars] [-p prompt] [-t timeout] [-u fd] [name ...]

| 参数 | 作用 |
|:---: |:---: |
| -e | 如果标准输入来自shell终端，使用"readline"来读取输入行 |
| -r | 反斜线这个转义字符不作特殊处理，当作普通字符 |
| -s | 安静模式，输入来自shell终端时，不进行回显echo |
| -a aname | 把各个单词依次赋值给数组aname中从0开始的连续下标，赋值之前aname被unset，使用了这个选项就会忽略其它的名称name |
| -d delim | 用分隔符delim的第一个字符来结束输入行，而不是换行符 |
| -i text | 如果使用"readline"来读取输入行，文本text在编辑前被放到编辑缓冲中 |
| -n nchars | 最多读取nchars个字符 |
| -N nchars | 读取nchars个字符，转义字符不进行转义 |
| -p prompt | 如果在shell终端读取输入，首先打印提示prompt，提示不换行 |
| -t timeout | 如果在超时时间timeout指定的秒数内还没有读入完整的一行，则读取超时并返回false。timeout可以是个带有小数的十进制数。这个选项只有在read命令从终端、管道、或者其它特殊文件读取输入时才有效，从普通文件读取输入时没有作用。如果timeout为0，则当指定的文件描述符可用时返回true，不可用时返回fasle。如果超时，返回状态大于128 |
| -u fd | 从文件描述符fd中读取输入 |