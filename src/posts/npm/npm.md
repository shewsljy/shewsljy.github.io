---
typora-root-url: ..\..\.vuepress\public
---

# 查看node版本

```bash
node -v
```

# 查看npm版本

```bash
npm -v
```

# 设置全局代理

```bash
npm config set registry="https://registry.npm.taobao.org"
```

# 安装时代理

```bash
npm install -g pnpm --registry=https://registry.npm.taobao.org
```

# 安装包

```bash
npm install pnpm //本地目录安装
npm install -g pnpm //全局安装
```

# 卸载包

```bash
npm uninstall pnpm //本地目录卸载
npm uninstall -g pnpm //全局卸载
```

# 更新包

```bash
npm update pnpm //本地目录更新
npm update -g pnpm //全局更新
```

# 查看npm全局安装的包

```bash
npm list -g --depth=0
```

