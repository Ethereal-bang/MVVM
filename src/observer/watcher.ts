import Dep, {DepTarget} from "./dep";
import {Component} from "../types/component";

export default class Watcher implements DepTarget {
    vm: Component // vue实例
    cb: Function
    deps: Array<Dep>
    getter: Function
    value: any

    constructor(
        vm: Component,
        expOrFn: string | (() => any),
        cb: Function,
    ) {
        this.vm = vm;
        this.cb = cb;
        // 处理getter
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = parsePath(expOrFn);
        }
        this.value = this.get();
    }

    get() {
        Dep.target = this;  // 缓存当前Watcher实例
        const val = this.getter.call(this.vm, this.vm); // 获取被依赖数据，触发getter调用dep.depend()收集依赖
        Dep.target = null;
        return val;
    }

    addDep(dep: Dep): void {
        dep.addSub(this);
    }

    update(): void {
    }

}

/**
 * Parse simple path.
 * 将形如data.a.b的路径表示的值，从data对象中取出
 * EG:
 * data = {a: {b: {c: 2} } }
 * parsePath('a.b.c')(data)
 * */
function parsePath(path: string): Function | null {
    if (/[^\w.$]/.test(path)) return;

    const segments = path.split('.');
    return (obj) => {
        segments.forEach(segment => {
            if (!obj) return;
            obj = obj[segment];
        })
        return obj;
    }
}