import Dep from "./dep";

/**
 * Is attached to each observed object.
 * */
class Observer {
    dep: Dep;

    constructor(value: any,) {
        this.dep = new Dep();
        // 遍历所有键，定义为响应式数据
        Object.keys(value).forEach(key => {
            defineReactive(value, key, value[key]);
        })
    }
}

const observe = (
    value: any,
): Observer => {
    if (!value || typeof value !== 'object') return;
    return new Observer(value);

}

/**
 * Define a reactive property on an object
 * */
const defineReactive = (
    data: object,
    key: string,
    val?: any,
) => {
    const dep = new Dep();
    observe(val);   // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true,   // 枚举属性 默认false
        get: () => {
            dep.depend();   // 收集依赖
            return val;
        },
        set: (newVal) => {
            console.log("listen change:", val, newVal)
            val = newVal;
            dep.notify(); // 通知所有订阅者
        },
    })
}
