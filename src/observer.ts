/**
 * Is attached to each observed object.
 * */
class Observer {

    constructor(value: any,) {
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
    observe(val);   // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true,   // 枚举属性 默认false
        get: () => val,
        set: (newVal) => {
            console.log("listen change:", val, newVal)
            val = newVal;
        },
    })
}

/**
 * Test
 * */
const obj = {
    foo: 1,
    bar: {
        foo: -1,
    }
}
observe(obj)
const app = document.querySelector("#app");
setInterval(() => {
    ++obj.foo;
    --obj.bar.foo;
    app.innerHTML = `${obj.foo} ${obj.bar.foo}`
}, 1000)