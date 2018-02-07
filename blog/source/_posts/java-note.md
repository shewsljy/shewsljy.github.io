---
title: Java 学习笔记
date: 2018-02-01 15:58:18
updated: 2018-02-07 17:20:21
categories:
    - Java
tags:
    - Java
---
## 前言
零碎的Java学习笔记，不定时更新。

## main()方法
在Java中，main()方法是Java应用程序的入口方法，也就是说，程序在运行的时候，第一个执行的方法就是main()方法，这个方法和其他的方法有很大的不同，比如方法的名字必须是`main`，方法必须是`public static void`类型的，方法必须接收一个字符串数组的参数等等。
在看Java中的main()方法之前，先看一个最简单的Java应用程序HelloWorld，将通过这个例子说明Java类中main()方法的奥秘，程序的代码如下：
<pre>
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
</pre>

<!-- more -->

### 类
HelloWorld类中有main()方法，说明这是个java应用程序，通过JVM直接启动运行的程序。
既然是类，java允许类不加`public`关键字约束，当然类的定义只能限制为`public`或者无限制关键字（默认的）。

### main()方法声明
这个main()方法的声明为：`public static void main(String[] args)`。必须这么定义，这是Java的规范。
为什么要这么定义，和JVM的运行有关系。
当一个类中有main()方法，执行命令`java 类名`则会启动虚拟机执行该类中名为`main`的方法。
由于JVM在运行这个Java应用程序的时候，首先会调用main()方法，调用时不实例化这个类的对象，而是通过类名直接调用因此需要是限制为`public static`。
对于java中的main()方法，jvm有限制，不能有返回值，因此返回值类型为`void`。
main()方法中还有一个输入参数，类型为`String[]`，这个也是java的规范，main()方法中必须有一个入参，类型必须`String[]`，至于字符串数组的名字，这个是可以自己设定的，根据习惯，这个字符串数组的名字一般和`sun java`规范范例中`mian`参数名保持一致，取名为`args`。
因此，main()方法定义必须是：`public static void main(String[] 字符串数组参数名)`。

### main()方法可以抛异常
比如写个`public static void main(String[] args) throws Exception`来定义main()方法是可以的。

### main()方法中字符串参数数组作用
main()方法中字符串参数数组作用是接收命令行输入参数的，命令行的参数之间用空格隔开。
下面给出一个例子，看看如何初始化和使用这个数组的。
<pre>
public class TestMain {
    public static void main(String[] args){
        System.out.println("打印main方法中的输入参数!");
        for(int i=0; i< args.length; i++){
            System.out.println(args[i]);
        }
    }
}
</pre>

执行方法和运行结果
``` bash
javac TestMain.java
java TestMain 1 2 3
```
输出为：
<pre>
打印main方法中的输入参数!
1
2
3
</pre>

<!-- ### HelloWorld的另外一个版本
<pre>
public class HelloWorld2 {
    static {
        System.out.println("Hello Wordld!");
    }
    public static void main(String[] args){
        System.exit(0);
    }
}
</pre>

这个main()方法执行的内容就一句`System.exit(0);`，目的是让程序正常结束。那`HelloWorld!`是从哪里打印的，秘密就是在`static`打印的，因为`static`代码块的内容会在main()调用前调用。 -->

## 注释
在Java中， 有3种标记注释的方式。
- 单行注释
- 多行注释
- 文档注释

最常用的方式是使用`//`，其注释内容从`//`开始到本行结尾。
当需要长篇的注释时，既可以在每行的注释前面标记`//`，也可以使用`/*`和`*/`将一段比较长的注释括起来。
第3种注释可以用来自动地生成文档。这种注释以`/**`开始，以`*/`结束。
<pre>
/**
 * @description 文档注释
 * @author jiayu
 * @date 2018/2/1 15:47
 * @param [args]
 * @return void
 */
public static void main(String[] args) {
    //单行注释
    /*
    多行注释
    多行注释
    多行注释
    */
    System.out.println("We will not use 'Hello, World!'");//单行注释
}
</pre>

## 数据类型
Java是一种强类型语言。这就意味着必须为每一个变量声明一种类型: 在Java中，一共有8种基本类型`primitive type`，其中有4种整型、2种浮点类型、1种用于表示`Unicode`编码的字符单元的字符类型`char`和1种用于表示真值的`boolean`类型。

### 整型
整型用于表示没有小数部分的数值，Java提供了4种整型。
`byte`的取值范围为（-128~127），占用1个字节（-2的7次方到2的7次方-1）
`short`的取值范围为（-32768~32767），占用2个字节（-2的15次方到2的15次方-1）
`int`的取值范围为（-2147483648~2147483647），占用4个字节（-2的31次方到2的31次方-1）
`long`的取值范围为（-9223372036854774808~9223372036854774807），占用8个字节（-2的63次方到2的63次方-1）
在通常情况下，`int`类型最常用。但如果表示星球上的居住人数，就需要使用`long`类型，其类型的数值有一个后缀`L`或`l`(例如，`2200000000L`)。`byte`和`short`类型主要用于特定的应用场合，例如，底层的文件处理或者需要控制占用存储空间量的大数组。

| 类型  | 存储需求  | 取值范围  |
| :---: | :---: | :---: |
| byte | 1 字节 | -128~127 |
| short | 2 字节 | -32768~32767 |
| int | 4 字节 | -2147483648~2147483647 |
| long | 8 字节 | -2的63次方~2的63次方-1 |

### 浮点类型
浮点类型用于表示有小数部分的数值，在Java中有两种浮点类型。
`float`的取值范围为（3.402823e+38 ~ 1.401298e-45），占用4个字节（e+38表示是乘以10的38次方，同样，e-45表示乘以10的负45次方）
`double`的取值范围为（1.797693e+308~ 4.9000000e-324），占用8个字节
`double`表示这种类型的数值精度是`float`类型的两倍(有人称之为双精度数值)。绝大部分应用程序都采用`double`类型。在很多情况下，`float`类型的精度很难满足需求。实际上，只有很少的情况适合使用`float`类型，例如，需要单精度数据的库，或者需要存储大量数据。
`float`类型的数值有一个后缀`F`或`f`(例如，`3.14F`)，没有后缀`F`或`f`的浮点数值(如`3.14`)默认为`double`类型。当然，也可以在浮点数值后面添加后缀`D`或`d`(例如，`3.14D`)。

| 类型  | 存储需求  | 取值范围  |
| :---: | :---: | :---: |
| float | 4 字节 | 3.402823e+38~1.401298e-45 |
| double | 8 字节 | 1.797693e+308~4.9000000e-324 |

### char类型
`char`类型原本用于表示单个字符。不过，现在情况已经有所变化。有些`Unicode`字符可以用一个`char`值描述，另外一些`Unicode`字符则需要两个`char`值。`char`类型的字面量值要用单引号括起来。在Java中，`char`类型描述了`UTF-16`编码中的一个代码单元。建议不要在程序中使用`char`类型，除非确实需要处理`UTF-16`代码单元，最好将字符串作为抽象数据类型处理。

### boolean类型
`boolean`(布尔)类型有两个值:`false`和`true`，用来判定逻辑条件，整型值和布尔值之间不能进行相互转换。

## 变量
在Java中，每个变量都有一个类型(type)。在声明变量时，变量的类型位于变量名之前，每个声明以分号结束。
<pre>
double salary;
int vacationDays;
long earthPopulation;
boolean done;
</pre>

变量名必须是一个以字母开头并由字母或数字构成的序列，字母包括大写字母`A~Z`、小写字母`a~z`、美元符号`$`、下划线`_`或在某种语言中表示字母的任何`Unicode`字符，数字包括`0~9`和在某种语言中表示数字的任何`Unicode`字符。

### 变量初始化
声明一个变量之后，必须用赋值语句对变量进行显式初始化，千万不要使用未初始化的变量。要想对一个已经声明过的变量进行赋值，就需要将变量名放在等号(=)左侧，相应取值的Java表达式放在等号的右侧。变量的声明尽可能地靠近变量第一次使用的地方，这是一种良好的程序编写风格。

### 常量
在Java中， 利用关键字`final`指示常量。关键字`final`表示这个变量只能被赋值一次。一旦被赋值之后，就不能够再更改了。习惯上，常量名使用全大写。经常希望某个常量可以在一个类中的多个方法中使用，通常将这些常量称为类常量。可以使用关键字`static final`设置一个类常量。如果一个常量被声明为`public`，那么其他类的方法也可以使用这个常量。 
<pre>
public class Final {
    //类中的常量
    static final double PI_VALUE_IN_CLASS = 3.144;

    public static void main(String[] args) {
        //方法中的常量
        final double PI_VALUE_METHOD = 3.14;

        //访问当前方法中的常量
        System.out.println("Final类中main()方法常量:" + PI_VALUE_METHOD);
        //访问当前类中的常量
        System.out.println("Final类常量:" + PI_VALUE_IN_CLASS);
        //访问其他类中的常量
        System.out.println("OtherFinal类常量:" + OtherFinal.PI_VALUE_OUT_CLASS);
    }
}
class OtherFinal {
    //类中的常量，设置public后其他类可以通过"OtherFinal.常量名"访问
    public static final double PI_VALUE_OUT_CLASS = 3.1444;
}
</pre>

## 运算符
在Java中，使用算术运算符`+`、`-`、`*`、`/`表示加、减、乘、除运算。当参与`/`运算的两个操作数都是整数时，表示整数除法；否则，表示浮点除法。整数的求余操作(有时称为取模 )用`%`表示。
整数被`0`除将会产生一个异常，而浮点数被`0`除将会得到无穷大或`NaN`结果。
正整数除以`0`的结果为正无穷大。计算`0/0`或者负数的平方根结果为`NaN`。

### 数学函数与常量
在`Math`类中，包含了各种各样的数学函数。求`x`的平方根`Math.sqrt(x)`，求`x`的`a`次幂运算`Math.pow(x, a)`。
Math类提供了一些常用的三角函数：
<pre>
Math.sin
Math.cos
Math.tan
Math.atan
Math.atan2
</pre>

还有指数函数以及它的反函数(自然对数)以及以10为底的对数：
<pre>
Math.exp
Math.log
Math.loglO
</pre>

最后，Java还提供了两个用于表示`π`和`e`常量的近似值：
<pre>
Math.PI
Math.E
</pre>

### 数值类型之间的转换
经常需要将一种数值类型转换为另一种数值类型。两个数值进行二元操作时(例如`n+f`，`n`是整数，`f`是浮点数)，先要将两个操作数转换为同一种类型， 然后再进行计算。
如果两个操作数中有一个是`double`类型，另一个操作数就会转换为`double`类型；
否则，如果其中一个操作数是`float`类型，另一个操作数将会转换为`float`类型；
否则，如果其中一个操作数是`long`类型，另一个操作数将会转换为`long`类型；
否则，两个操作数都将被转换为`int`类型。

### 强制类型转换
在必要的时候，`int`类型的值将会自动地转换为`double`类型。但另一方面，有时也需要将`double`转换成`int`。在Java中，允许进行这种数值之间的类型转换。当然，有可能会丢失一些信息。在这种情况下，需要通过强制类型转换(cast)实现这个操作。 强制类型转换的语法格式是在圆括号中给出想要转换的目标类型，后面紧跟待转换的变量名。
<pre>
double x = 9.997;
int nx = (int) x;
</pre>

### 结合赋值和运算符(二元运算符)
可以在赋值中使用二元运算符，这是一种很方便的简写形式。例如，`x += 4;` 等价于`x = x + 4;`，一般地，要把运算符放在`=`号左边，如`*=`或`%=`。
如果运算符得到一个值，其类型与左侧操作数的类型不同，就会发生强制类型转换。例如，如果`x`是一个`int`，则语句`x += 3.5;`是合法的，将把`x`设置为`(int)(x + 3.5)`。

### 自增与自减运算符
在Java中，提供了自增、自减运算符。这些运算符有两种形式，`n++`、`n--`是运算符放在操作数后面的`后缀`形式；还有一种`前缀`形式：`++n`、`--n`。后缀和前缀形式都会使变量值`加1`或`减1`。但用在表达式中时，二者就有区别了。前缀形式中变量值会先完成`加1`或`减1`的操作，再参与表达式运算; 而后缀形式中变量先使用原来的值进行表达式运算，再进行`加1`或`减1`的操作。
<pre>
int m = 7;
int n = 7;
int a = 2 * ++m; // m的值7先自增1变为8，乘以二后得16，再赋值给a
int b = 2 * n++; // n的值7先乘以二得14，赋值给b，最后n自增1为8
</pre>

### 关系和boolean运算符
关系运算符中，要检测相等性，可以使用两个等号`==`；使用`!=`检测不相等。还有经常使用的`<(小于)`、`>(大于)`、`<=(小于等于)`和`>=(大于等于)`运算符。
使用`&&`表示逻辑`与`运算符，使用`||`表示逻辑`或`运算符。从`!=`运算符可以想到，感叹号`!`就是逻辑非运算符。`&&`和`||`运算符是按照`短路`方式来求值的：如果第一个操作数已经能够确定表达式的值，第二个操作数就不必计算了。
Java支持三元操作符`?:`，这个操作符有时很有用。如果条件为`true`，表达式`condition ? expression1 : expression2`就为第一个表达式的值，否则计算为第二个表达式的值。`x<y ? x:y`会返回`x`和`y`中较小的一个。

### 位运算符
处理整型类型时，可以直接对组成整型数值的各个位完成操作。这意味着可以使用掩码技术得到整数中的各个位。
位运算符包括：`&("and")`、`|("or")`、`^("xor")`、`~("not")`
还有`>>`和`<<`运算符将位模式左移或右移，`>>>`运算符会用`0`填充高位，这与`>>`不同，它会用符号位填充高位。

### 括号与运算符级别
给出了运算符的优先级。 如果不使用圆括号，就按照给出的运算符优先级次序进行计算。同一个级别的运算符按照从左到右的次序进行计算(除了表中给出的右结合运算符外)。

| 运算符  | 结合性 |
| :---: | :---: |
| [] . ()(方法调用) | 从左向右 |
| ! ~ ++ \-\- +(一元运算) -(一元运算) ()(强制类型转换) new | 从右向左 |
| * / % | 从左向右 |
| + - | 从左向右 |
| << >> >>> | 从左向右 |
| < <= > >= instanceof | 从左向右 |
| == != | 从左向右 |
| & | 从左向右 |
| ^ | 从左向右 |
| &#124; | 从左向右 |
| && | 从左向右 |
| &#124;&#124; | 从左向右 |
| ?: | 从右向左 |
| = += -= *= /= %= &= &#124;= ^= <<= >>= >>>= | 从右向左 |

### 枚举类型
有时候，变量的取值只在一个有限的集合内。针对这种情况，可以自定义枚举类型，枚举类型包括有限个命名的值。例如：
<pre>
enum Size { SMALL, MEDIUM, LARGE, EXTRA_LARCE };
//现在， 可以声明这种类型的变量:
Size s = Size.MEDIUM;
</pre>

`Size`类型的变量只能存储这个类型声明中给定的某个枚举值，或者`null`值，`null`表示这个变量没有设置任何值。

## 字符串
从概念上讲，Java字符串就是`Unicode`字符序列。Java没有内置的字符串类型，而是在标准Java类库中提供了一个预定义类，很自然地叫做 `String`。每个用双引号括起来的字符串都是`String`类的一个实例。

### 子串
`String`类的`substring`方法可以从一个较大的字符串提取出一个子串。例如：
<pre>
String greeting = "Hello";
String s = greeting.substring(0, 3);
</pre>

创建了一个由字符`Hel`组成的字符串。`substring`方法的第二个参数是不想复制的第一个位置，`"Hello".substring(0, 3)`表示提取字符串`Hello`中的`0`、`1`、`2`的字符`Hel`，效果为左开右闭类似[0, 3)。字符串`s.substring(a, b)`的长度为`b-a`。

### 拼接
Java语言允许使用`+`号连接(拼接)两个字符串。当将一个字符串与一个非字符串的值进行拼接时，后者被转换成字符串。
如果需要把多个字符串放在一起，用一个定界符分隔，可以使用静态`join`方法：
<pre>
//subtring 截取字符创 输出：Hel
String hello = "Hello!";
String subhel = hello.substring(0, 3);
System.out.println(subhel);
//+ 拼接字符串，将前后两个字符串连接起来 输出：Hello World!
String a = "Hello";
String b = " World!";
String c = a + b;
System.out.println(c);
//join 拼接多个字符串，以某个字符将各个字符串连接起来 输出：S/M/L/XL
String all = String.join("/", "S", "M", "L", "XL");
System.out.println(all);
</pre>

### 不可变字符串
`String`类没有提供用于修改字符串的方法。由于不能修改`Java`字符串中的字符，所以在`String`类对象为不可变字符串，如同数字3永远是数字3一样，字符串`Hello`永远包含字符`H`、`e`、`l`、`l`和`o`的代码单元序列，而不能修改其中的任何一个字符。当然，可以修改字符串变量，让它引用另外一个字符串。
不可变字符串有一个优点：编译器可以让字符串共享。可以想象将各种字符串存放在公共的存储池中，字符串变量指向存储池中相应的位置。如果复制一个字符串变量，原始字符串与复制的字符串共享相同的字符。

### 检测字符串是否相等
可以使用`equals`方法检测两个字符串是否相等。对于表达式：`s.equals(t)`，如果字符串`s`与字符串`t`相等，则返回`true`；否则，返回`false`。需要注意，`s`与`t`可以是字符串变量，也可以是字符串字面量。例如，该表达式是合法的：`"Hello".equals(greeting)`
要想检测两个字符串是否相等，而不区分大小写，可以使用`equalsIgnoreCase`方法。`"Hello".equalsIgnoreCase("hello")`
一定不要使用`==`运算符检测两个字符串是否相等！这个运算符只能够确定两个字串是否放置在同一个位置上。当然，如果字符串放置在同一个位置上，它们必然相等。但是，完全有可能将内容相同的多个字符串的拷贝放置在不同的位置上。
<pre>
String greeting = "Hello"; //声明并赋值给变量"greeting"，值为"Hello"
if (greeting == "Hello") ...
    // 所在位置相等，两个字符串相等
if (greeting.substring(0, 3) == "Hel") ...
    // 所在位置不等，两个字符串相等
</pre>

如果虚拟机始终将相同的字符串共享，就可以使用`==`运算符检测是否相等。但实际上只有字符串常量是共享的，而`+`或`substring`等操作产生的结果并不是共享的。因此，千万不要使用`==`运算符测试字符串的相等性，以免在程序中出现糟糕的bug。

### 空串与null串
空串`""`是长度为0的字符串。可以调用代码检查一个字符串是否为空：
<pre>
if (str.length() == 0)
或者
if (str.equals(""))
</pre>

空串是一个Java对象，有自己的串长度(0) 和内容(空)。不过，`String`变量还可以存放一个特殊的值，名为`null`，这表示目前没有任何对象与该变量关联。要检查一个字符串是否为`null`, 要使用以下条件：
<pre>
if (str == null)
</pre>

检查字符串既不是`null`也不为空串，首先要检查`str`不为`null`，这种情况下就需要使用以下条件：
<pre>
if (str != null && str.length() != 0)
</pre>

### 码点与代码单元
Java字符串由`char`值序列组成。`char`数据类型是一个采用`UTF-16`编码表示`Unicode`码点的代码单元。大多数的常用`Unicode`字符使用一个代码单元就可以表示，而辅助字符需要一对代码单元表示。
`length()`方法将返回采用`UTF-16`编码表示的给定字符串所需要的代码单元数量；要想得到实际的长度，即码点数量，可以调用`codePointCount()`；调用`s.charAt(n)`将返回位置`n`的代码单元，`n`介于`0 ~ s.length()-1`之间；要想得到第i个码点，应该使用`offsetByCodePoints()`以及`codePointAt()`。
<pre>
//length() 返回字符串的长度
String greeting = "Hello";
int n = greeting.length();// n的值为5
System.out.println(n);

//codePointCount(int startlndex, int endlndex) 返回 startlndex 和 endludex- l 之间的代码点数量
int cpCount = greeting.codePointCount(0, greeting.length());// cpCount的值为5
System.out.println(cpCount);

//charAt(int index) 返回给定位置的代码单元。除非对底层的代码单元感兴趣， 否则不需要调用这个方法。
char first = greeting.charAt(0); // first 为 'H'
System.out.println(first);
char last = greeting.charAt(4); // last 为 'o'
System.out.println(last);

//offsetByCodePoints(int startlndex, int cpCount) 返回从 startlndex 代码点开始， 位移 cpCount 后的码点索引。
int index = greeting.offsetByCodePoints(0,0); //拿到'H'的码点索引
System.out.println(index);
//codePointAt( int Index) 返回从给定位置开始的码点
int cp = greeting.codePointAt(index); //'H'对应ASCII码位
System.out.println(cp);
</pre>

### 构建字符串
有些时候，需要由较短的字符串构建字符串。例如，按键或来自文件中的单词。采用字符串连接的方式达到此目的效率比较低。每次连接字符串，都会构建一个新的`String`对象，既耗时，又浪费空间。使用`StringBuilder`类就可以避免这个问题的发生。如果需要用许多小段的字符串构建一个字符串，那么应该按照下列步骤进行。 
<pre>
//构建一个空的字符串构建器
StringBuilder builder = new StringBuilder();

//需要添加一部分内容时，就调用 append() 方法
builder.append('H');//char
builder.append("ello, World!");//string

//构建字符串时就凋用 toString 方法， 将可以得到一个 String 对象， 其中包含了构建器中的字符序列
String completedString = builder.toString();

//输出 Hello, World!
System.out.println(completedString);
</pre>

## 输入输出
有些Java程序能够接收输入，并以适当的格式输出，现在介绍简单的用于输入输出的控制台。

### 读取输入
打印输出到`标准输出流(System.out，控制台窗口)`是一件非常容易的事情，只要调用`System.out.println()`即可。然而，读取`标准输人流(System.in)`就没有那么简单了。要想通过控制台进行输人，首先需要构造一个`Scanner`对象，并与`标准输人流(System.in)`关联。
<pre>
//构造一个Scanner对象，并与"标准输人流"System.in关联。
Scanner in = new Scanner(System.in);

// get first input
System.out.print("What is your name? ");
// nextLine() 读取输入的下一行内容，包含空格。next() 读取一个单词(以空白符作为分隔符)的内容
String name = in.nextLine();

// get second input
System.out.print("How old are you? ");
// nextInt() 读取并转换下一个表示整数的字符序列。
int age = in.nextInt();

// display output on console
System.out.println("Hello, " + name + ". Next year, you'll be " + (age + 1));
</pre>

### 格式化输出
Java沿用了C语言库函数中的`printf`方法。在`printf`中，可以使用多个参数， 
`System.out.printf("Hello, %s. Next year, you'll be %d", name, age);`
每一个以`%`字符开始的格式说明符都用相应的参数替换。格式说明符尾部的转换符将指示被格式化的数值类型：`f`表示浮点数，`s`表示字符串，`d`表示十进制整数。

| 转换符  | 类型  | 举例  |
| :---: | :---: | :---: |
| d | 十进制整数 | 159 |
| x | 十六进制整数 | 9f |
| o | 八进制整数 | 237 |
| f | 定点浮点数 | 15.9 |
| e | 指数浮点数 | 1.59e+01 |
| g | 通用浮点数 | --- |
| a | 十六进制浮点数 | 0x1.fccdp3 |
| s | 字符串 | Hello |
| c | 字符 | H |
| b | 布尔 | true |
| h | 散列码 | 42628b2 |
| tx或Tx | 日期时间(T强制大写) | 已经过时，应改用java.time类 |
| % | 百分号 | % |
| n | 与平台有关的行分隔符 | --- |

还可以给出控制格式化输出的各种标志。逗号标志增加了分组的分隔符，`Systen.out.printf("%,.2f", 10000.0 / 3.0);`会打印`3, 333.33`；

| 标志  | 目的  | 举例  |
| :---: | :---: | :---: |
| + | 打印正数和负数的符号 | +3333.33 |
| 空格 | 在正数之前添加空格 | &#124; 3333.33&#124; |
| 0 | 数字前面补0 | 003333.33 |
| - | 左对齐 | &#124;3333.33 &#124; |
| ( | 将负数括在括号内 | (3333.33) |
| , | 添加分组分隔符 | 3,333.33 |
| #(对于f格式) | 包含小数点 | 3,333. |
| #(对于x或0格式) | 添加前缀0x或0 | 0xcafe |
| $ | 给定被格式化的参数索引 | %1$d,%1$x(159 9F) |
| < | 格式化前面说明的数值 | %d%<x(159 9F) |

可以使用静态的`String.format`方法创建一个格式化的字符串，而不打印输出：`String message = String.format("Hello, %s. Next year, you'll be %d", name, age);`

### 文件输入与输出
要想对文件进行读取，就需要一个用`File`对象构造一个`Scanner`对象：`Scanner in = new Scanner(Paths.get("myfile.txt"), "UTF-8");`。如果文件名中包含反斜杠符号，就要记住在每个反斜杠之前再加一个额外的反斜杠：`c:\\mydirectory\\myfile.txt`。
要想写入文件，就需要构造一个`PrintWriter`对象。在构造器中，只需要提供文件名：`PrintWriter out = new PrintWriter("myfile.txt", "UTF-8");`，如果文件不存在，创建该文件。