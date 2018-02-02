---
title: Java 学习笔记
date: 2018-02-01 15:58:18
updated: 2018-02-02 17:20:21
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
<pre>
类型      存储需求                    取值范围
byte      1 字节                    -128~127
short     2 字节                  -32768~32767
int       4 字节             -2147483648~2147483647
long      8 字节    -9223372036854774808~9223372036854774807
</pre>

### 浮点类型
浮点类型用于表示有小数部分的数值，在Java中有两种浮点类型。
`float`的取值范围为（3.402823e+38 ~ 1.401298e-45），占用4个字节（e+38表示是乘以10的38次方，同样，e-45表示乘以10的负45次方）
`double`的取值范围为（1.797693e+308~ 4.9000000e-324），占用8个字节
`double`表示这种类型的数值精度是`float`类型的两倍(有人称之为双精度数值)。绝大部分应用程序都采用`double`类型。在很多情况下，`float`类型的精度很难满足需求。实际上，只有很少的情况适合使用`float`类型，例如，需要单精度数据的库，或者需要存储大量数据。
`float`类型的数值有一个后缀`F`或`f`(例如，`3.14F`)，没有后缀`F`或`f`的浮点数值(如`3.14`)默认为`double`类型。当然，也可以在浮点数值后面添加后缀`D`或`d`(例如，`3.14D`)。
<pre>
类型      存储需求                    取值范围
float      4 字节           3.402823e+38~1.401298e-45
double     8 字节          1.797693e+308~4.9000000e-324
</pre>

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

变量名必须是一个以字母开头并由字母或数字构成的序列，字母包括大写字母`A~Z`、小写字母`a~z`、下划线`_`或在某种语言中表示字母的任何`Unicode`字符，数字包括`0~9`和在某种语言中表示数字的任何`Unicode`字符。

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

### 关系和boolean运算符
要检测相等性，可以使用两个等号`==`；使用`!=`检测不相等。
使用`&&`表示逻辑`与`运算符，使用`||`表示逻辑`或`运算符。从`!=`运算符可以想到，感叹号`!`就是逻辑非运算符。`&&`和`||`运算符是按照`短路`方式来求值的：如果第一个操作数已经能够确定表达式的值，第二个操作数就不必计算了。
Java支持三元操作符`?:`，这个操作符有时很有用。如果条件为`true`，表达式`condition ? expression1 : expression2`就为第一个表达式的值，否则计算为第二个表达式的值。`x<y ? x:y`会返回`x`和`y`中较小的一个。

## 字符串
从概念上讲，Java字符串就是`Unicode`字符序列。Java没有内置的字符串类型，而是在标准Java类库中提供了一个预定义类，很自然地叫做 `String`。每个用双引号括起来的字符串都是`String`类的一个实例。

### 子串
`String`类的`substring`方法可以从一个较大的字符串提取出一个子串。

### 拼接
Java语言允许使用`+`号连接(拼接)两个字符串。当将一个字符串与一个非字符串的值进行拼接时，后者被转换成字符串。

### 不可变字符串
`String`类没有提供用于修改字符串的方法。

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
