# WButton

props

- type        类型(目前仅可用'default', 'ghost', 'warning', 'primary')：'default', 'ghost', 'success', 'warning', 'error', 'primary', 'text', 'info', 默认：default
- size        尺寸(目前不可用)：'default', 'small', 'middle', 'large', 'long', 默认：default
- iconLeft    左边 icon：无默认 例如：'&#xe62b;'
- iconRight   右边 icon：无默认 例如：'&#xe62b;'
- width       按钮宽度：无默认 例如：'100'
- borderColor 边框颜色：无默认 例如：'#f1f1f1'
- color       字体颜色：无默认 例如：'#f1f1f1'
- disabled    是否禁用：false

events

- on-click-button 点击button触发

slot

- default 

``` html
// 基本用法
<w-button>按钮</w-button>
<w-button type="default">default</w-button>
<w-button type="default" :disabled="true">default</w-button>

// 事件
<w-button @on-click-button="your function name">按钮</w-button>

// 自定义
<w-button iconLeft="&#xe62b;" iconRight="&#xe60f;" type="ghost">按钮</w-button>
```
