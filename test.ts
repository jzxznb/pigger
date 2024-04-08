import Whale from "./main.ts";
import { Control, Module, Get, Inject } from "./src/core.ts";

@Control("/app")
class AppControl {
    @Get("/print")
    print() {
        return "hello";
    }
}

@Inject
class AppService {}

@Module({
    controls: [AppControl],
    injects: [AppService],
})
class AppModule {}

console.log(AppModule);
const start = () => {
    const app = new Whale({ module: AppModule });
};

start();
