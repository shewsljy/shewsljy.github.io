---
title: Java 学习笔记
date: 2018-02-01 15:58:18
updated: 2018-02-01 15:58:18
categories:
    - Java
tags:
    - Java
---
## 前言
零碎的Java学习笔记，不定时更新。

## main方法
在Java中，main()方法是Java应用程序的入口方法，也就是说，程序在运行的时候，第一个执行的方法就是main()方法，这个方法和其他的方法有很大的不同，比如方法的名字必须是main，方法必须是public static void 类型的，方法必须接收一个字符串数组的参数等等。
在看Java中的main()方法之前，先看一个最简单的Java应用程序HelloWorld，我将通过这个例子说明Java类中main()方法的奥秘，程序的代码如下：
<pre>
public class HelloWorld {
    public static void main(String args[]) {
        System.out.println(" Hello World!" );
    }
}
</pre>

<!-- more -->

### 类
HelloWorld 类中有main()方法，说明这是个java应用程序，通过JVM直接启动运行的程序。
既然是类，java允许类不加public关键字约束，当然类的定义只能限制为public或者无限制关键字（默认的）。

### main()方法声明
这个main()方法的声明为：public static void main(String args[])。必须这么定义，这是Java的规范。
为什么要这么定义，和JVM的运行有关系。
当一个类中有main()方法，执行命令“java 类名”则会启动虚拟机执行该类中的main方法。
由于JVM在运行这个Java应用程序的时候，首先会调用main方法，调用时不实例化这个类的对象，而是通过类名直接调用因此需要是限制为public static。
对于java中的main方法，jvm有限制，不能有返回值，因此返回值类型为void。
main方法中还有一个输入参数，类型为String[]，这个也是java的规范，main()方法中必须有一个入参，类细必须String[]，至于字符串数组的名字，这个是可以自己设定的，根据习惯，这个字符串数组的名字一般和sun java规范范例中mian参数名保持一致，取名为args。
因此，main()方法定义必须是：“public static void main(String 字符串数组参数名[])”。

### main()方法可以 throws Exception
比如写个public static void main(String args[]) throws Exception来定义main方法是可以的。

### main()方法中字符串参数数组作用
main()方法中字符串参数数组作用是接收命令行输入参数的，命令行的参数之间用空格隔开。
下面给出一个例子，看看如何初始化和使用这个数组的。
<pre>
public class TestMain {
    public static void main(String args[]){
        System.out.println(" 打印main方法中的输入参数！" );
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
打印main方法中的输入参数！
1
2
3
</pre>

<!-- ### HelloWorld的另外一个版本
<pre>
public class HelloWorld2 {
    static {
        System.out.println(" Hello Wordld!" );
    }
    public static void main(String args[]){
        System.exit(0);
    }
}
</pre>

这个main()方法执行的内容就一句" System.exit(0); " ，目的是让程序正常结束。那“HelloWorld！”是从哪里打印的，秘密就是在static打印的，因为static代码块的内容会在main调用前调用。 -->

## 注释
在 Java 中， 有 3 种标记注释的方式。
- 单行注释
- 多行注释
- 文档注释

最常用的方式是使用`//`，其注释内容从`//`开始到本行结尾。
当需要长篇的注释时，既可以在每行的注释前面标记`//`，也可以使用`/*`和`*/`将一段比较长的注释括起来。
最后，第 3 种注释可以用来自动地生成文档。这种注释以`/**`开始，以`*/`结束。
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
    System.out.println("We will not use 'Hello, world!'");//单行注释
}
</pre>

## 数据类型
Java是一种强类型语言。这就意味着必须为每一个变量声明一种类型: 在Java中，一共有8种基本类型 ( primitive type ), 其中有 4 种整型、 2 种浮点类型、 1 种用于表示 Unicode 编码的字符单元的字符类型 char (请参见论述 char 类型的章节)和 1 种用于表示真值的 boolean 类型。

### 整型
整型用于表示没有小数部分的数值，Java 提供了 4 种整型。
<pre>
类型      存储需求
byte      1 字节
short     2 字节
int       4 字节
long      8 字节
</pre>