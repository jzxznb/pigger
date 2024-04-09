import Koa from "koa";

class Whale extends Koa {
    server?: Koa = null;
    controlList: any[] = [];
    constructor(options?: any) {
        super(options);
        return this;
    }
    createFactory(module: any): Whale {
        const controlList = [];
        const findControl = appModule => {
            controlList.push(...appModule.controls);
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
