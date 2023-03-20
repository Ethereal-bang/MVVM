# MVVM
1. 实现数据劫持
2. 实现发布订阅者模式
3. 实现数据单向绑定
4. 实现双向绑定

# (一) Observer
> 实现一个数据监听器 Observer 对数据对象的所有属性监听变化通知订阅者
1. 响应式数据(使数据变得可预测) —— 监听 getter/setter `defineReactive`
2. 通知订阅者
   1. 依赖收集 —— Getter
   2. 通知订阅者 —— Setter
