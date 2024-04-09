import Whale from "./main.ts";
import { Control, Module, Get, Inject } from "./src/core.ts";

@Control("/user")
class UserControl {
    @Get("/print")
    print() {
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
    print(t) {
        return "hello";
    }
}

@Inject
class AppService {}

@Module({
    modules: [UserModule],
    controls: [AppControl],
    injects: [AppService],
})
class AppModule {}

const start = () => {
    const app = new Whale();
    app.createFactory(AppModule);
    // app.listen(3000);
};

start();
