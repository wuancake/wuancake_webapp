# wuancake_webapp

> 这是一个 Lavas PWA 项目

## npm 相关命令

``` bash
# 安装工程依赖
npm install

# 在本地启动调试 server
npm run dev

# 构建线上生产环境产物
npm run build

# 启动编译后的代码，注意，需要在 dist 目录中启动，仅 SSR 模式下有效
npm run start

# 检查代码是否符合规范
npm run lint
```

Lavas 工程模版基于 [vue-template-vue](https://github.com/lavas-project/lavas-template-vue/) 模版的 `release-*` 分支创建。
如果想要了解具体如何玩转整个 Lavas 创建的 PWA 工程, 请查看[Lavas 官网教程](https://lavas.baidu.com/guide)。

## Changelog

详细的 Changelog 请看 [Release Notes](https://github.com/lavas-project/lavas-template-vue/releases)

## 组件书写规范

- 每个组件必须进行长宽比处理，尺寸以UI图为准。
- 组件应包含属性（props），插槽（slot），事件（events）
- 组件使用说明必须注明 属性（props），插槽（slot），事件（events）
- 注：组件命名以 W... 开头，事件名格式 on-...

## 组件使用说明

组件所有使用说明在 /components_md

### WHeader

props

- title 标题

events

- on-click-left 点击左侧区域触发
- on-click-title 点击标题区域触发
- on-click-right 点击右侧区域触发

slot

- left 左侧区域
- right 右侧区域
- default 标题区域

``` html
// 基本用法
<w-header>标题</w-header>
<w-header title="标题"></w-header>

// 事件
<w-header @on-click-left="your function name">标题</w-header>

// 自定义
<w-header>
  <div slot="left"></div>
  <div></div>
  <div slot="right"></div>
</w-header>
```

## 目录规范

- 所有的页面都放在 /pages 目录下，首字母大写，如 Index.vue
- 所有页面的子页面放在父页面的目录中。如 Index.vue 页面的子页面放在 /pages/index 的目录中。
- 所有页面中需要用到的组件，放在 /components 目录下，自行分组到不同目录。
参考：[Lavas 基础教程 - 基本功能](https://lavas.baidu.com/guide/v2/basic/init)

## 页面动画效果

页面过渡和动画使用 vue 的 transition 组件结合 animate.css。使用方式参考[vue2-animate](https://github.com/asika32764/vue2-animate)、[vue2使用animate css](https://blog.csdn.net/qq_25804071/article/details/70911421)

## 建议

git 代码更新后，重新 lavas dev 一下，因为 router.js 、config.js 、skeleton.js 是 lavas 自动更新的，每个人的会不一样。