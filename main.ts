import Koa from "koa";
import { mergeClass } from "./src/util.ts";

class Whale extends Koa {
    server?: Koa = null;
    controlList: any[] = [];
    constructor(options?: any) {
        super(options);
        return this;
    }
    createFactory(module): Whale {
        const controlList = [];
        const findControl = appModule => {
            controlList.push(...appModule.controls);
            const service = mergeClass(appModule.injects);
            appModule.controls.forEach(item => {
                if (!item.prototype) return;
                item.service = service;
            });
            appModule?.modules.forEach(item => findControl(item));
        };
        findControl(module);
        this.controlList = controlList;
        return this;
    }
    routing(): Whale {
        this.controlList.forEach(control => {
            this.use(control.router.routes());
        });
        return this;
    }
}

export default Whale;
