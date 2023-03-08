---
typora-root-url: ..\..\.vuepress\public
---

# typescript安装（npm全局）

```bash
npm install -g typescript
```

# 编译、运行

**源码：`basetype.ts`**

```typescript
let x: any = 1; // 数字类型
console.log(x);
x = 'I am who I am'; // 字符串类型
console.log(x);
x = false;  // 布尔类型
console.log(x);
```

**编译：生成`basetype.js`**

```bash
tsc basetype.ts
```

**运行：`basetype.js`**

```bash
node basetype.js
```

**效果：**

![image-20230308160121330](/assets/image/image-20230308160121330.png)

# 基础类型

|    类型     |  关键字   |                             描述                             |
| :---------: | :-------: | :----------------------------------------------------------: |
|   any类型   |    any    |           声明为 any 的变量可以赋予任意类型的值。            |
| unknown类型 |  unknown  |           赋值时跟 any 相似，但使用前需检查类型。            |
|  数字类型   |  number   |        双精度 64 位浮点值。它可以用来表示整数和分数。        |
| 字符串类型  |  string   | 一个字符系列，使用单引号（**'**）或双引号（**"**）来表示字符串类型。反引号（**`**）来定义多行文本和内嵌表达式。 |
|  布尔类型   |  boolean  |                 表示逻辑值：true 和 false。                  |
|  数组类型   |    无     |                       声明变量为数组。                       |
|    元组     |    无     | 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。 |
|    枚举     |   enum    |                  枚举类型用于定义数值集合。                  |
|    void     |   void    |       用于标识方法返回值的类型，表示该方法没有返回值。       |
|    null     |   null    |                       表示对象值缺失。                       |
|  undefined  | undefined |                用于初始化变量为一个未定义的值                |
|    never    |   never   | never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。 |

## any 类型/ unknown 类型区别

任意值是 `typescript` 针对编程时类型不明确的变量使用的一种数据类型，它常用于以下三种情况。

1. 任何类型都可以是 `any` 类型，`any` 类型就相当于是免检标签，给了开发者很大的自由，`typescript ` 允许 `any` 类型的值进行任何操作，对它一路绿灯。
2. 任何类型也都可以是 `unknown` 类型，但与 `any` 完全相反，`unknown` 类型就像是 `typescript` 给打上了一个重点检查的标签。在没有对它进行类型检查之前，`unknown` 类型的变量是不能进行任何操作的。
3. 任意类型的值都是可以复制给 `any` 与 `unknown` 二者， `any` 会绕过类型检查，直接可用，而  `unknown` 则必须要在判断完它是什么类型之后才能继续用，`any` 就是个自行车辅助轮, 习惯了 `typescript` 的强类型检查规则应该尽快扔掉使用类型更安全的 `unknown` 。

# typescript 类型保护

`typescript` 使用了一些内置的 `javascript` 操作符，**比如 `typeof`、`instanceof` 和 `in` 操作符，这些操作符用于确定一个对象是否包含属性。** 类型保护可以让你指导 `typescript` 编译器在特定的上下文中推断出变量的特定类型，确保参数的类型与你指定的一致。

1. `typeof` 判断变量是否为某种类型

   ```typescript
   function reverse(target: string | number) {
     if (typeof target === 'string') {
       target.toFixed(2) // Error，在这个代码块中，target 是 string 类型，没有 toFixed 方法
       return target.split('').reverse().join('')
     }
       
     if (typeof target === 'number') {
       target.toFixed(2) // OK
       return +[...target.toString()].reverse().join('')
     }
       
     target.forEach(element => {}) // Error，在这个代码块中，target 是 string 或 number 类型，没有 forEach 方法
   }
   ```

   

2. `instanceof` 判断对象是否为某个对象的实例

   ```typescript
   class User {
     public nickname: string | undefined
     public group: number | undefined
   }
   
   class Log {
     public count: number = 10
     public keyword: string | undefined
   }
   
   function typeGuard(arg: User | Log) {
     if (arg instanceof User) {
       arg.count = 15 // Error, User 类型无此属性
     }
   
     if (arg instanceof Log) {
       arg.count = 15 // OK
     }
   }
   ```

3. `in` 判断属性是否存在于某个对象上

   ```typescript
   class User {
     public nickname: string | undefined
     public groups!: number[]
   }
   
   class Log {
     public count: number = 10
     public keyword: string | undefined
   }
   
   function typeGuard(arg: User | Log) {
     if ('nickname' in arg) {
       // (parameter) arg: User，编辑器将推断在当前块作用域 arg 为 User 类型
       arg.nickname = 'imooc'
     }
   
     if ('count' in arg) {
       // (parameter) arg: Log，编辑器将推断在当前块作用域 arg 为 Log 类型
       arg.count = 15
     }
   }
   ```

4. `as`或`<>`断言

   ```typescript
   let someValue: any = "this is a string";
   
   let strLength1: number = (<string>someValue).length; // <>
   let strLength2: number = (someValue as string).length; // as
   ```

5. 字面量类型保护

   ```typescript
   type Success = {
     success: true,
     code: number,
     object: object
   }
   
   type Fail = {
     success: false,
     code: number,
     errMsg: string,
     request: string
   }
   
   function test(arg: Success | Fail) {
     if (arg.success === true) {
       console.log(arg.object) // OK
       console.log(arg.errMsg) // Error, Property 'errMsg' does not exist on type 'Success'
     } else {
       console.log(arg.errMsg) // OK
       console.log(arg.object) // Error, Property 'object' does not exist on type 'Fail'
     }
   }
   ```

   