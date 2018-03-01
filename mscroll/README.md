# mtime-scroll


参考Iscroll写的自定义滚动插件，适合业务需求

## 引入方式
- script 标签 
- 模块导入 require('MScroll')

## 使用方式
```
var myScroll = new MScroll('#stage', {options})
// 第一个参数为 必填, options为选填
```

## options参数说明
```
type: {} Objecg类型
topOffset: number 顶部偏移值，向上为负，向下为正,为了下拉刷新效果增加此变量
isUseAnimated: true 布尔值 是否启用 js 动画方式做 惯性滚动，优点可获取任何时刻的 坐标位移，缺点：性能不大好
scrollY: true 布尔值，启动 垂直方向滚动
scrollX: false 布尔值，启动 水平方向滚动

momentum: true 是否启动惯性
bounce： true 是否启动反弹效果
bounceTime: 600 启动反弹效果，如果用transition实现，过渡时间
bounceEasing: {} 反弹效果曲线

dragForce: 3 到达临界值后，滑动阻力系数，越大，阻力越大
deceleration: 0.0006 做惯性滑动时的加速度变化量,越小 惯性越大

scrollbars: true 是否需要滚动条
scrollbarsFade: true 启动fade效果

directionX: 水平方向滚动的话，向左（1）还是向右（-1）
directionY: 垂直方向滚动的话，向上（1）还是向下（-1）

enabled: true 滑动总开关

```

## 注册自定义钩子函数:
```
myScroll.on('scrollStart', function (){})
myScroll.on('scroll', function (){})
myScroll.on('scrollEnd', function (){})
```