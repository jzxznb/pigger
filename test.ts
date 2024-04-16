import Whale from "./main.ts";
import { Control, Module, Get, Inject, Put, Post, Delete } from "./core";
import { koaBody } from "koa-body";

const sleep = time =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });

class AppService {
    find(p) {
        console.log("这是", p);
    }
}
@Control("/user")
class UserControl {
    [x: string]: any;
    @Post("/print")
    async print(ctx) {
        this.service.find("123");
        await sleep(1000);
        ctx.response.body = { data: "user/hello2" };
        return "user/hello";
    }
}

@Module({
    controls: [UserControl],
    injects: [AppService],
})
class UserModule {}

@Control("/app")
class AppControl {
    [x: string]: any;
    @Get("/print")
    async print(ctx) {
        this.service.find("app");
        ctx.body = "12";
        return "hello";
    }
}

@Module({
    modules: [UserModule],
    controls: [AppControl],
    injects: [AppService],
})
class AppModule {}

const start = () => {
    const app = new Whale();
    app.createFactory(AppModule);
    app.use(
        koaBody({
            multipart: true,
            formidable: {
                maxFileSize: 50 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
            },
        })
    );
    app.routing();
    app.listen(3000);
};

start();
