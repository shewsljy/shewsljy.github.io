# flask备注信息

- 上下文
    >在 Flask 中有两种上下文:程序上下文和请求上下文。Flask 在分发请求之前激活(或推送)程序和请求上下文,请求处理完成后再将其删除。程序上下文被推送后,就可以在线程中使用 current_app 和 g 变量。类似地,请求上下文被推送后,就可以使用 request 和 session 变量。如果使用这些变量时我们没有激活程序上下文或请求上下文,就会导致错误

|  变量名  |  上下文  |  说明  |
| :---: | :---: | :---: |
| current_app | 程序上下文 | 当前激活程序的程序实例 |
| g | 程序上下文 | 处理请求时用作临时存储的对象,每次请求都会重设这个变量 |
| request | 请求上下文 | 请求对象,封装了客户端发出的 HTTP 请求中的内容 |
| session | 请求上下文 | 用户会话,用于存储请求之间需要“记住”的值的词典 |

- 请求调度
    >程序收到客户端发来的请求时,要找到处理该请求的视图函数。为了完成这个任务,Flask会在程序的 URL 映射中查找请求的 URL。URL 映射是 URL 和视图函数之间的对应关系。Flask 使用 app.route 修饰器或者非修饰器形式的 app.add_url_rule() 生成映射。URL 映射中的 HEAD 、 Options 、 GET 是请求方法,由路由进行处理。Flask 为每个路由都指定了请求方法,这样不同的请求方法发送到相同的 URL 上时,会使用不同的视图函数进行处理。 HEAD 和 OPTIONS 方法由 Flask 自动处理,因此可以这么说,在这个程序中,URL映射中的 3 个路由都使用 GET 方法

- 请求钩子
    >有时在处理请求之前或之后执行代码会很有用。例如,在请求开始时,我们可能需要创建数据库连接或者认证发起请求的用户。为了避免在每个视图函数中都使用重复的代码,Flask 提供了注册通用函数的功能,注册的函数可在请求被分发到视图函数之前或之后调用。请求钩子使用修饰器实现。Flask 支持以下 4 种钩子,在请求钩子函数和视图函数之间共享数据一般使用上下文全局变量 g 。例如, before_request 处理程序可以从数据库中加载已登录用户,并将其保存到 g.user 中。随后调用视图函数时,视图函数再使用 g.user 获取用户

|  钩子  |  作用  |
| :---: | :---: |
| before_first_request | 注册一个函数,在处理第一个请求之前运行 |
| before_request | 注册一个函数,在每次请求之前运行 |
| after_request | 注册一个函数,如果没有未处理的异常抛出,在每次请求之后运行 |
| teardown_request | 注册一个函数,即使有未处理的异常抛出,也在每次请求之后运行 |

- 响应
    >Flask 调用视图函数后,会将其返回值作为响应的内容。如果视图函数返回的响应需要使用不同的状态码,那么可以把数字代码作为第二个返回值,添加到响应文本之后。视图函数返回的响应还可接受第三个参数,这是一个由首部(header)组成的字典,可以添加到 HTTP 响应中。make_response() 函数可接受 1 个、2 个或 3 个参数(和视图函数的返回值一样),并返回一个 Response 对象。有时我们需要在视图函数中进行这种转换,然后在响应对象上调用各种方法,进一步设置响应。重定向经常使用 302 状态码表示,指向的地址由 Location 首部提供。重定向响应可以使用3 个值形式的返回值生成,也可在 Response 对象中设定。Flask 提供了 redirect() 辅助函数进行重定向。还有一种特殊的响应由 abort 函数生成,用于处理错误,abort 不会把控制权交还给调用它的函数,而是抛出异常把控制权交给 Web 服务器

- flask-script扩展
    >Flask-Script 是一个 Flask 扩展,为 Flask 程序添加了一个命令行解析器。Flask-Script 自带了一组常用选项,而且还支持自定义命令
    - 安装扩展
        - `pip install flask-script`
    - 修改程序`hello.py`
        1. `from flask_script import Manager`
        2. `manager = Manager(app)`
        3. `if __name__ == '__main__':`
        4. `manager.run()`
    - 命令模式启动
        1. shell 命令用于在程序的上下文中启动 Python shell 会话。可以使用这个会话中运行维护任务或测试,还可调试异常
            - `python hello.py shell`
        2. runserver 将以调试模式启动 Web 服务器
            - `python hello.py runserver`
                - 命令后可附带参数
                    1. `-h HOST, --host HOST`
                    2. `-p PORT, --port PORT`
                    3. `-d, --debug`
                    4. `-D, --no-debug`
                    5. `-r, --reload`
                    6. `-R, --no-reload`

- Jinja2变量过滤器
    >可以使用过滤器修改变量,过滤器名添加在变量名之后,中间使用竖线分隔

|  过滤器名  |  说明  |
| :---: | :---: |
| safe | 渲染值时不转义 |
| capitalize | 把值的首字母转换成大写,其他字母转换成小写 |
| lower | 把值转换成小写形式 |
| upper | 把值转换成大写形式 |
| title | 把值中每个单词的首字母都转换成大写 |
| trim | 把值的首尾空格去掉 |
| striptags | 渲染之前把值中所有的 HTML 标签都删掉 |

- flask-bootstrap扩展
    >Bootstrap是 Twitter 开发的一个开源框架,它提供的用户界面组件可用于创建整洁且具有吸引力的网页,而且这些网页还能兼容所有现代 Web 浏览器。使用一个名为 Flask-Bootstrap 的 Flask 扩展,简化集成的过程
    - 安装扩展
        - `pip install flask-bootstrap`
    - 修改程序`hello.py`
        1. `from flask_bootstrap import Bootstrap`
        2. `bootstrap = Bootstrap(app)`

- flask-moment扩展
    >Flask-Moment 是一个 Flask 程序扩展,可以在浏览器中渲染日期和时间,能把moment.js 集成到 Jinja2 模板中
    - 安装扩展
        - `pip install flask-moment`
    - 修改程序`hello.py`
        1. `from flask_moment import Moment`
        2. `moment = Moment(app)`

- flask-wtf扩展
    >尽管 Flask 的请求对象提供的信息足够用于处理 Web 表单,但有些任务很单调,而且要重复操作。比如,生成表单的 HTML 代码和验证提交的表单数据。Flask-WTF 扩展可以把处理 Web 表单的过程变成一种愉悦的体验
    - 安装扩展
        - `pip install flask-wtf`
    - 修改程序`hello.py`
        1. `from flask_wtf import FlaskForm`

- WTForms支持的HTML标准字段
    >WTForms 支持的 HTML 标准字段

|  字段类型  |  说明  |
| :---: | :---: |
| StringField | 文本字段 |
| TextAreaField | 多行文本字段 |
| PasswordField | 密码文本字段 |
| HiddenField | 隐藏文本字段 |
| DateField | 文本字段,值为 datetime.date 格式 |
| DateTimeField | 文本字段,值为 datetime.datetime 格式 |
| IntegerField | 文本字段,值为整数 |
| DecimalField | 文本字段,值为 decimal.Decimal |
| FloatField | 文本字段,值为浮点数 |
| BooleanField | 复选框,值为 True 和 False |
| RadioField | 一组单选框 |
| SelectField | 下拉列表 |
| SelectMultipleField | 下拉列表,可选择多个值 |
| FileField | 文件上传字段 |
| SubmitField | 表单提交按钮 |
| FormField | 把表单作为字段嵌入另一个表单 |
| FieldList | 一组指定类型的字段 |

- WTForms 内建的验证函数
    >表4-2 WTForms验证函数

|  验证函数  |  说明  |
| :---: | :---: |
| Email | 验证电子邮件地址 |
| EqualTo | 比较两个字段的值;常用于要求输入两次密码进行确认的情况 |
| IPAddress | 验证 IPv4 网络地址 |
| Length | 验证输入字符串的长度 |
| NumberRange | 验证输入的值在数字范围内 |
| Optional | 无输入值时跳过其他验证函数 |
| Required | 确保字段中有数据 |
| Regexp | 使用正则表达式验证输入值 |
| URL | 验证 URL |
| AnyOf | 确保输入值在可选值列表中 |
| NoneOf | 确保输入值不在可选值列表中 |
