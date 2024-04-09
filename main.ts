import Koa from "koa";
import { ModuleParams } from "./types/core.type.ts";

class Whale extends Koa {
    server = null;
    constructor(options?: any) {
        super(options);
        this.server = new Koa();
    }
    createFactory(module: any): Whale {
        return this;
    }
}

export default Whale;
