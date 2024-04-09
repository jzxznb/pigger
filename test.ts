import Whale from "./main.ts";
import { Control, Module, Get, Inject, Put, Post, Delete } from "./src/core.ts";
import { HttpMethodEnum, koaBody } from "koa-body";

@Control("/user")
class UserControl {
    @Post("/print")
    print(ctx) {
        console.log(ctx.request.body);
        ctx.body = "user/hello2";
        return "user/hello";
    }
}

@Module({
    controls: [UserControl],
})
class UserModule {}

@Control("/app")
class AppControl {
    @Get("/print")
    async print(ctx) {
        ctx.body = "12";
        return "hello";
    }
}

@Inject
class AppService {
    find() {}
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
