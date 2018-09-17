# WHeader

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
