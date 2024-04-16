import { ModuleParams } from "../types/core.type.ts";
import { Context, Next } from "koa";
import Router from "koa-router";

export function Module(options: ModuleParams): any {
    return function (target) {
        target.modules = options.modules || [];
        target.controls = options.controls || [];
        target.injects = options.injects || [];
    };
}

export function Control(path: string): any {
    return function (target) {
        target.prefix = path;
        target.router && target.router.prefix(path);
        return target;
    };
}

export function Inject(target: any): void {}

export function Post(path: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.constructor?.router) {
            target.constructor.router = new Router();
        }
        const router = target.constructor.router;
        router.post(path, async (ctx: Context, next: Next) => {
            await descriptor.value.call(target.constructor, ctx);
        });
        return descriptor;
    };
}

export function Get(path: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.constructor?.router) {
            target.constructor.router = new Router();
        }
        const router = target.constructor.router;
        router.get(path, async (ctx: Context) => {
            await descriptor.value.call(target.constructor, ctx);
        });
        return descriptor;
    };
}

export function Put(path: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.constructor?.router) {
            target.constructor.router = new Router();
        }
        const router = target.constructor.router;
        router.put(path, async (ctx: Context) => {
            await descriptor.value.call(target.constructor, ctx);
        });
        return descriptor;
    };
}

export function Delete(path: string): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        if (!target.constructor?.router) {
            target.constructor.router = new Router();
        }
        const router = target.constructor.router;
        router.delete(path, async (ctx: Context) => {
            await descriptor.value.call(target.constructor, ctx);
        });
        return descriptor;
    };
}
