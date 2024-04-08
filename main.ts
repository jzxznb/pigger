import Koa from "koa";

class Whale extends Koa {
    server = null;
    constructor(options?: any) {
        super(options);
        this.server = new Koa();
    }
}

export default Whale;
