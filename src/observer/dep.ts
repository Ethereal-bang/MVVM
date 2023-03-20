/**
 * An observable that
 * can have multiple directives subscribing to it.
 * 为每个数据建立一个依赖管理器.
 * */
export default class Dep {
    static target: DepTarget;
    subs: Array<DepTarget>; // 订阅数组

    constructor() {
        this.subs = [];
    }
    addSub(sub: DepTarget) {
        this.subs.push(sub);
    }

    depend() {}

    removeSub(sub: DepTarget) {
        this.subs.splice(this.subs.indexOf(sub), 1);
    }

    // 通知所有依赖更新
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}

interface DepTarget {
    // 添加到依赖管理器 Dep
    addDep(dep: Dep): void;
    // 更新
    update(): void;
}
