# MVVM
1. 实现数据劫持
2. 实现发布订阅者模式
3. 实现数据单向绑定
4. 实现双向绑定

# 流程
**初始化:**
1. 实例化 VUE
2. 调用 `defineReactive` 监听对象中数据
3. 实例化 Watcher
4. 触发被监听数据 getter
5. Dep 将 Watcher 实例收集到依赖

**数据更改:**
1. 触发 setter
2. 调用 `dep.notify`
3. 触发 `dep.subs` 数组中每一 `Watcher` 实例依赖的 `update()`
4. 触发回调，视图更新

# (一) Observer | 响应式对象
> 实现一个数据监听器 Observer 对数据对象的所有属性监听变化通知订阅者
1. 响应式数据(使数据变得可预测) —— 监听 getter/setter `defineReactive`
2. `Dep` 通知订阅者
   1. 依赖收集 —— Getter
   2. 通知订阅者 —— Setter

# (二) Watcher | 依赖收集
> 订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
1. 实例化时将自己添加进 Dep
   1. `this.get()` 将 Watcher 实例赋给唯一对象 `Dep.target`
   2. `this.getter` 返回值为依赖数据的函数
   3. `this.getter.call(vm, vm)` 获取被依赖数据，触发 getter
   4. getter 中调用 `dep.depend` 收集依赖
   5. `dep.depend` 取 `Dep.target` 存入依赖数组
2. 数据 setter 触发
   1. 调用 `dep.notify`
   2. 遍历所有依赖 (Watcher 实例)，执行 `dep.update()`


# (三) Compile | 模板编译
> 解析模板指令，将模板中变量替换成数据，然后渲染页面视图